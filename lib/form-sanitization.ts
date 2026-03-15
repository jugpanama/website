const CONTROL_CHARS_REGEX = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g

export function sanitizeSingleLine(value: unknown): string {
  return String(value ?? '')
    .replace(CONTROL_CHARS_REGEX, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function sanitizeMultiline(value: unknown): string {
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(CONTROL_CHARS_REGEX, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export function sanitizeEmail(value: unknown): string {
  return sanitizeSingleLine(value).toLowerCase()
}

export function sanitizeOptionalUrl(value: unknown): string {
  return sanitizeSingleLine(value)
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
