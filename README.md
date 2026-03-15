# JUG Panama Website

Sitio web oficial de JUG Panama para compartir informacion de la comunidad Java en Panama.

## Que incluye

- Pagina principal con informacion del grupo.
- Secciones de eventos proximos y eventos pasados.
- Paginas informativas como contacto, sponsors, codigo de conducta y unete.
- Contenido gestionado en archivos Markdown dentro de `content/`.

## Stack

- Next.js
- TypeScript
- React

## Ejecutar en local

```bash
npm install
npm run dev
```

Luego abre `http://localhost:3000`.

## Build de produccion

```bash
npm run build
npm start
```

## Formularios por correo (Resend)

Los formularios de `contactanos` y `conviertete-en-sponsor` envian correos por Resend.

Variables requeridas:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL="Panama JUG <forms@panamajug.org>"
CONTACT_INBOX_EMAIL="contact.jugpanama@gmail.com"
RESEND_TEMPLATE_CONTACT_ACK_ID=""
RESEND_TEMPLATE_SPONSOR_ACK_ID=""
TURNSTILE_SITE_KEY=""
TURNSTILE_SECRET_KEY=""
```

Si defines `RESEND_TEMPLATE_CONTACT_ACK_ID` o `RESEND_TEMPLATE_SPONSOR_ACK_ID`,
las auto-respuestas se enviaran usando templates del dashboard de Resend.
Si no estan definidos, el sistema usa texto plano como fallback.

Puedes usar `.env.example` como referencia para configurar variables locales y en Vercel.

## CAPTCHA recomendado (Next.js)

Se usa **Cloudflare Turnstile** en ambos formularios (`contactanos` y `conviertete-en-sponsor`).

1. Crea un sitio en Cloudflare Turnstile para tu dominio.
2. Configura `TURNSTILE_SITE_KEY` y `TURNSTILE_SECRET_KEY`.
3. En frontend se obtiene `TURNSTILE_SITE_KEY` desde `/api/turnstile/config`, se renderiza el widget y se envía `cf-turnstile-response`.
4. En backend se valida el token con la API `siteverify` antes de enviar correos.

## Objetivo

Mantener una presencia web simple, clara y actualizada para las actividades de JUG Panama.
