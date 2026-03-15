import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { escapeHtml, sanitizeEmail, sanitizeMultiline, sanitizeOptionalUrl, sanitizeSingleLine } from '@/lib/form-sanitization'
import { sendResendTemplateEmail } from '@/lib/resend-template'
import { verifyTurnstileToken } from '@/lib/turnstile'

const sponsorSchema = z.object({
  fullName: z.preprocess(sanitizeSingleLine, z.string().min(2).max(120)),
  email: z.preprocess(sanitizeEmail, z.string().email()),
  company: z.preprocess(sanitizeSingleLine, z.string().min(2).max(140)),
  websiteUrl: z.preprocess(sanitizeOptionalUrl, z.string().url().optional().or(z.literal(''))),
  interest: z.preprocess(sanitizeSingleLine, z.string().min(2).max(120)),
  message: z.preprocess(sanitizeMultiline, z.string().min(10).max(5000)),
  website: z.preprocess(sanitizeSingleLine, z.string().optional()),
  captchaToken: z.preprocess(sanitizeSingleLine, z.string().min(1).max(2048)),
})

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = sponsorSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos de formulario invalidos.' }, { status: 400 })
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true })
  }

  const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY
  if (!turnstileSecretKey) {
    return NextResponse.json({ error: 'TURNSTILE_SECRET_KEY no esta configurada.' }, { status: 500 })
  }

  const forwardedFor = request.headers.get('x-forwarded-for')
  const remoteIp = forwardedFor?.split(',')[0]?.trim()
  const captchaResult = await verifyTurnstileToken({
    secretKey: turnstileSecretKey,
    token: parsed.data.captchaToken,
    remoteIp,
  })

  if (!captchaResult.success) {
    return NextResponse.json({ error: 'Captcha invalido. Intenta nuevamente.' }, { status: 400 })
  }

  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    return NextResponse.json({ error: 'RESEND_API_KEY no esta configurada.' }, { status: 500 })
  }

  const resend = new Resend(resendApiKey)
  const toEmail = process.env.CONTACT_INBOX_EMAIL ?? 'contact.jugpanama@gmail.com'
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'Panama JUG <forms@panamajug.org>'
  const sponsorAckTemplateId = process.env.RESEND_TEMPLATE_SPONSOR_ACK_ID
  const messageForTemplate =
    parsed.data.message.length > 1900 ? `${parsed.data.message.slice(0, 1900)}...` : parsed.data.message

  await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: parsed.data.email,
    subject: `[Web] Sponsor - ${parsed.data.company}`,
    text: [
      `Nombre: ${parsed.data.fullName}`,
      `Correo: ${parsed.data.email}`,
      `Empresa: ${parsed.data.company}`,
      `Sitio web: ${parsed.data.websiteUrl || 'No especificado'}`,
      `Interes: ${parsed.data.interest}`,
      '',
      'Mensaje:',
      parsed.data.message,
    ].join('\n'),
  })

  // Send acknowledgment to the sponsor contact. This should not block the main flow.
  try {
    if (sponsorAckTemplateId) {
      await sendResendTemplateEmail({
        apiKey: resendApiKey,
        from: fromEmail,
        to: parsed.data.email,
        subject: 'Recibimos tu solicitud de sponsor - Panama JUG',
        templateId: sponsorAckTemplateId,
        variables: {
          FULL_NAME: escapeHtml(parsed.data.fullName),
          COMPANY: escapeHtml(parsed.data.company),
          INTEREST: escapeHtml(parsed.data.interest),
          MESSAGE: escapeHtml(messageForTemplate),
          RESPONSE_TIME: '24-48 horas',
          WEBSITE_URL: 'https://panamajug.org',
        },
      })
    } else {
      await resend.emails.send({
        from: fromEmail,
        to: parsed.data.email,
        subject: 'Recibimos tu solicitud de sponsor - Panama JUG',
        text: [
          `Hola ${parsed.data.fullName},`,
          '',
          'Gracias por tu interes en colaborar como sponsor con Panama JUG.',
          'Recibimos tu solicitud y nuestro equipo la esta validando.',
          'Te responderemos por correo en un plazo estimado de 24-48 horas.',
          '',
          `Empresa: ${parsed.data.company}`,
          `Interes: ${parsed.data.interest}`,
          '',
          'Resumen de tu mensaje:',
          parsed.data.message,
          '',
          'Equipo Panama JUG',
          'https://panamajug.org',
        ].join('\n'),
      })
    }
  } catch (error) {
    console.error('[sponsor] Failed to send template auto-reply, falling back to text:', error)

    try {
      await resend.emails.send({
        from: fromEmail,
        to: parsed.data.email,
        subject: 'Recibimos tu solicitud de sponsor - Panama JUG',
        text: [
          `Hola ${parsed.data.fullName},`,
          '',
          'Gracias por tu interes en colaborar como sponsor con Panama JUG.',
          'Recibimos tu solicitud y nuestro equipo la esta validando.',
          'Te responderemos por correo en un plazo estimado de 24-48 horas.',
          '',
          `Empresa: ${parsed.data.company}`,
          `Interes: ${parsed.data.interest}`,
          '',
          'Resumen de tu mensaje:',
          parsed.data.message,
          '',
          'Equipo Panama JUG',
          'https://panamajug.org',
        ].join('\n'),
      })
    } catch (fallbackError) {
      console.error('[sponsor] Failed to send fallback auto-reply:', fallbackError)
    }
  }

  return NextResponse.json({ ok: true })
}
