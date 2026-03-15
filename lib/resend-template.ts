type SendResendTemplateEmailParams = {
  apiKey: string
  from: string
  to: string
  subject: string
  templateId: string
  variables: Record<string, string | number>
  replyTo?: string
}

export async function sendResendTemplateEmail({
  apiKey,
  from,
  to,
  subject,
  templateId,
  variables,
  replyTo,
}: SendResendTemplateEmailParams) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      ...(replyTo ? { replyTo } : {}),
      template: {
        id: templateId,
        variables,
      },
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`[Resend template] ${response.status} ${errorBody}`)
  }

  return response.json().catch(() => null)
}
