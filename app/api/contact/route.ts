import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { escapeHtml, sanitizeEmail, sanitizeMultiline, sanitizeSingleLine } from '@/lib/form-sanitization'
import { sendResendTemplateEmail } from '@/lib/resend-template'
import { verifyTurnstileToken } from '@/lib/turnstile'

const contactSchema = z.object({
  name: z.preprocess(sanitizeSingleLine, z.string().min(2).max(120)),
  email: z.preprocess(sanitizeEmail, z.string().email()),
  topic: z.preprocess(sanitizeSingleLine, z.string().min(2).max(120)),
  message: z.preprocess(sanitizeMultiline, z.string().min(10).max(5000)),
  website: z.preprocess(sanitizeSingleLine, z.string().optional()),
  captchaToken: z.preprocess(sanitizeSingleLine, z.string().min(1).max(2048)),
})

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = contactSchema.safeParse(body)

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
  const contactAckTemplateId = process.env.RESEND_TEMPLATE_CONTACT_ACK_ID
  const messageForTemplate =
    parsed.data.message.length > 1900 ? `${parsed.data.message.slice(0, 1900)}...` : parsed.data.message

  await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: parsed.data.email,
    subject: `[Web] Contacto - ${parsed.data.topic}`,
    text: [
      `Nombre: ${parsed.data.name}`,
      `Correo: ${parsed.data.email}`,
      `Categoria: ${parsed.data.topic}`,
      '',
      'Mensaje:',
      parsed.data.message,
    ].join('\n'),
  })

  // Send acknowledgment to the submitter. This should not block the main flow.
  try {
    if (contactAckTemplateId) {
      await sendResendTemplateEmail({
        apiKey: resendApiKey,
        from: fromEmail,
        to: parsed.data.email,
        subject: 'Recibimos tu mensaje - Panama JUG',
        templateId: contactAckTemplateId,
        variables: {
          NAME: escapeHtml(parsed.data.name),
          TOPIC: escapeHtml(parsed.data.topic),
          MESSAGE: escapeHtml(messageForTemplate),
          RESPONSE_TIME: '24-48 horas',
          WEBSITE_URL: 'https://panamajug.org',
        },
      })
    } else {
      await resend.emails.send({
        from: fromEmail,
        to: parsed.data.email,
        subject: 'Recibimos tu mensaje - Panama JUG',
        text: [
          `Hola ${parsed.data.name},`,
          '',
          'Recibimos tu mensaje correctamente y nuestro equipo lo esta revisando.',
          'Te responderemos por correo en un plazo estimado de 24-48 horas.',
          '',
          `Categoria: ${parsed.data.topic}`,
          '',
          'Resumen de tu mensaje:',
          parsed.data.message,
          '',
          'Gracias por contactar a Panama JUG.',
          'https://panamajug.org',
        ].join('\n'),
      })
    }
  } catch (error) {
    console.error('[contact] Failed to send template auto-reply, falling back to text:', error)

    try {
      await resend.emails.send({
        from: fromEmail,
        to: parsed.data.email,
        subject: 'Recibimos tu mensaje - Panama JUG',
        text: [
          `Hola ${parsed.data.name},`,
          '',
          'Recibimos tu mensaje correctamente y nuestro equipo lo esta revisando.',
          'Te responderemos por correo en un plazo estimado de 24-48 horas.',
          '',
          `Categoria: ${parsed.data.topic}`,
          '',
          'Resumen de tu mensaje:',
          parsed.data.message,
          '',
          'Gracias por contactar a Panama JUG.',
          'https://panamajug.org',
        ].join('\n'),
      })
    } catch (fallbackError) {
      console.error('[contact] Failed to send fallback auto-reply:', fallbackError)
    }
  }

  return NextResponse.json({ ok: true })
}
