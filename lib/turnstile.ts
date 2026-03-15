type TurnstileVerifyResult = {
  success: boolean
  challenge_ts?: string
  hostname?: string
  'error-codes'?: string[]
  action?: string
  cdata?: string
}

export async function verifyTurnstileToken(input: {
  secretKey: string
  token: string
  remoteIp?: string
}): Promise<TurnstileVerifyResult> {
  const formData = new URLSearchParams()
  formData.set('secret', input.secretKey)
  formData.set('response', input.token)

  if (input.remoteIp) {
    formData.set('remoteip', input.remoteIp)
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
    cache: 'no-store',
  })

  if (!response.ok) {
    return { success: false, 'error-codes': ['verification-request-failed'] }
  }

  const data = (await response.json()) as TurnstileVerifyResult
  return data
}
