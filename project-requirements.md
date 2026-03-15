# Panama JUG — Project Requirements

**Versión:** 1.0  
**Fecha:** Marzo 2026  
**Estado:** En desarrollo activo

---

## Tabla de contenidos

1. [Visión general](#1-visión-general)
2. [Stack tecnológico](#2-stack-tecnológico)
3. [Arquitectura del sistema](#3-arquitectura-del-sistema)
4. [Modelo de datos](#4-modelo-de-datos)
5. [Fase 1 — Presencia web](#5-fase-1--presencia-web)
6. [Fase 2 — Membresía](#6-fase-2--membresía)
7. [Fase 3 — Panel administrativo](#7-fase-3--panel-administrativo)
8. [Fase 4 — Pulido y crecimiento](#8-fase-4--pulido-y-crecimiento)
9. [Seguridad y acceso](#9-seguridad-y-acceso)
10. [Variables de entorno](#10-variables-de-entorno)
11. [Estructura de carpetas](#11-estructura-de-carpetas)
12. [Convenciones de código](#12-convenciones-de-código)
13. [Deploy y CI/CD](#13-deploy-y-cicd)

---

## 1. Visión general

**Panama JUG** es el sitio web oficial del Java User Group de Panamá. Su objetivo es centralizar la presencia digital de la comunidad, facilitar el registro de miembros, gestionar eventos y comunicarse con la audiencia.

### Objetivos por prioridad

| Prioridad | Objetivo |
|---|---|
| 1 | Presencia en web — posicionamiento SEO y credibilidad institucional |
| 2 | Escaparate para sponsors y partners |
| 3 | Portal de membresía gratuita para acceder a eventos |
| 4 | Panel administrativo para gestión interna |

### Principios de diseño del producto

- **Luma gestiona eventos** — Panama JUG no reinventa la rueda. El registro, waitlists, recordatorios y tickets son responsabilidad de Luma. El sitio solo consume su embed.
- **Membresía gratuita** — sin pagos, sin Stripe, sin complejidad de billing.
- **Un solo tema visual** — modo oscuro únicamente. Sin toggle light/dark.
- **Mobile-first** — la mayoría de miembros accede desde dispositivos móviles.
- **Generado por agentes de AI** — el frontend lo genera v0/Stitch; el documento técnico lo dirige el backend.

---

## 2. Stack tecnológico

| Capa | Herramienta | Versión | Justificación |
|---|---|---|---|
| Framework | Next.js (App Router) | 14.x | Óptimo para codegen con AI, Vercel nativo |
| Lenguaje | TypeScript | 5.x | Tipado estricto, mejor autocompletado en AI tools |
| Estilos | Tailwind CSS | 3.x | Utility-first, bien soportado por v0 |
| Auth | Supabase Auth | — | JWT, OAuth, email OTP incluidos |
| Base de datos | Supabase Postgres | — | RLS nativo, free tier generoso |
| Storage | Supabase Storage | — | Logos de sponsors, assets |
| Email | Resend | — | 100 emails/día gratis, API simple |
| Eventos | Luma (embed) | — | SaaS externo, no se gestiona internamente |
| Hosting | Vercel | — | CI/CD automático desde GitHub |
| Repo | GitHub | — | Source of truth, integración Vercel |

### Dependencias principales del proyecto

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@supabase/supabase-js": "^2.0.0",
    "@supabase/ssr": "^0.1.0",
    "resend": "^3.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "tailwindcss": "^3.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0"
  }
}
```

---

## 3. Arquitectura del sistema

### Diagrama de capas

```
┌─────────────────────────────────────────────────────┐
│                    USUARIOS                          │
│         Visitante · Miembro · Admin                  │
└───────────────────┬─────────────────────────────────┘
                    │ HTTPS
┌───────────────────▼─────────────────────────────────┐
│              NEXT.JS (Vercel)                         │
│                                                      │
│  app/                 components/        lib/        │
│  ├── page.tsx         ├── Navbar         ├── data.ts │
│  ├── eventos/         ├── Hero           ├── supabase│
│  ├── unete/           ├── Events         └── resend  │
│  ├── admin/           └── ...                        │
│  └── api/                                            │
│      ├── members/                                    │
│      └── email/                                      │
└──────────┬───────────────────────┬───────────────────┘
           │                       │
┌──────────▼──────────┐  ┌─────────▼──────────────────┐
│     SUPABASE         │  │         RESEND              │
│                      │  │                             │
│  Auth (JWT)          │  │  Email transaccional        │
│  Postgres DB         │  │  Campañas masivas           │
│  Storage             │  │  Templates HTML             │
│  Row Level Security  │  │                             │
└──────────────────────┘  └─────────────────────────────┘
           │
┌──────────▼──────────┐
│       LUMA           │
│  (servicio externo)  │
│  Eventos embed       │
│  Registro            │
│  Waitlists           │
└──────────────────────┘
```

### Flujo de autenticación

```
Usuario visita /unete
        │
        ▼
Formulario de registro
(nombre, email, empresa, país)
        │
        ▼
POST /api/members/register
        │
        ├── Crea usuario en supabase.auth.users
        ├── Inserta registro en public.members
        └── Envía email de bienvenida via Resend
                │
                ▼
        Supabase retorna JWT
                │
                ▼
        Cookie httpOnly (manejada por @supabase/ssr)
                │
                ▼
        Acceso a rutas protegidas (/eventos/proximos)
```

### Middleware de protección de rutas

```typescript
// middleware.ts (raíz del proyecto)
// Rutas que requieren sesión activa:
const PROTECTED_ROUTES = [
  '/eventos/proximos',   // ver registro de eventos futuros
  '/perfil',             // perfil del miembro
  '/admin',              // panel administrativo (requiere role=admin)
]
```

---

## 4. Modelo de datos

### Tablas en Supabase Postgres

#### `members`
```sql
create table public.members (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text unique not null,
  full_name   text not null,
  company     text,
  country     text default 'Panama',
  bio         text,
  avatar_url  text,
  role        text not null default 'member'  -- 'member' | 'admin'
              check (role in ('member', 'admin')),
  status      text not null default 'active'  -- 'active' | 'inactive'
              check (status in ('active', 'inactive')),
  joined_at   timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- RLS
alter table public.members enable row level security;

-- Cualquier miembro puede leer su propio perfil
create policy "members_read_own" on public.members
  for select using (auth.uid() = id);

-- Solo admins pueden leer todos los miembros
create policy "admins_read_all" on public.members
  for select using (
    exists (
      select 1 from public.members
      where id = auth.uid() and role = 'admin'
    )
  );

-- Solo admins pueden actualizar cualquier miembro
create policy "admins_update_all" on public.members
  for update using (
    exists (
      select 1 from public.members
      where id = auth.uid() and role = 'admin'
    )
  );

-- Un miembro puede actualizar su propio perfil (excepto role y status)
create policy "members_update_own" on public.members
  for update using (auth.uid() = id)
  with check (role = 'member' and status = 'active');
```

#### `events`
```sql
create table public.events (
  id              uuid primary key default gen_random_uuid(),
  luma_event_id   text,               -- ID del evento en Luma, e.g. evt-JMflFSoDIHu4QhA
  luma_embed_url  text,               -- URL completa del embed de Luma
  title           text not null,
  description     text,
  event_date      timestamptz not null,
  event_type      text default 'virtual'  -- 'virtual' | 'presencial' | 'hibrido'
                  check (event_type in ('virtual', 'presencial', 'hibrido')),
  status          text default 'upcoming'  -- 'upcoming' | 'past' | 'cancelled'
                  check (status in ('upcoming', 'past', 'cancelled')),
  is_members_only boolean default true,
  youtube_url     text,               -- URL de la grabación post-evento
  thumbnail_url   text,               -- Imagen del evento
  tags            text[],             -- e.g. ['Jakarta EE', 'Spring Boot']
  speaker_name    text,
  speaker_company text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- RLS: eventos públicos (past) visibles para todos
-- eventos upcoming solo para miembros autenticados
alter table public.events enable row level security;

create policy "past_events_public" on public.events
  for select using (status = 'past');

create policy "upcoming_events_members_only" on public.events
  for select using (
    status = 'upcoming'
    and auth.uid() is not null
  );

create policy "admins_full_events" on public.events
  for all using (
    exists (
      select 1 from public.members
      where id = auth.uid() and role = 'admin'
    )
  );
```

#### `sponsors`
```sql
create table public.sponsors (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  website_url text,
  logo_url    text,             -- path en Supabase Storage
  tier        text not null     -- 'gold' | 'silver' | 'bronze'
              check (tier in ('gold', 'silver', 'bronze')),
  is_active   boolean default true,
  sort_order  int default 0,    -- control manual del orden en la página
  created_at  timestamptz default now()
);

-- RLS: sponsors visibles para todos (público)
alter table public.sponsors enable row level security;

create policy "sponsors_public_read" on public.sponsors
  for select using (is_active = true);

create policy "admins_full_sponsors" on public.sponsors
  for all using (
    exists (
      select 1 from public.members
      where id = auth.uid() and role = 'admin'
    )
  );
```

#### `email_campaigns`
```sql
create table public.email_campaigns (
  id              uuid primary key default gen_random_uuid(),
  subject         text not null,
  body_html       text not null,
  audience        text not null default 'all'  -- 'all' | 'active' | 'test'
                  check (audience in ('all', 'active', 'test')),
  status          text default 'draft'  -- 'draft' | 'sending' | 'sent' | 'failed'
                  check (status in ('draft', 'sending', 'sent', 'failed')),
  recipient_count int,
  resend_batch_id text,               -- ID del batch en Resend para tracking
  sent_by         uuid references public.members(id),
  sent_at         timestamptz,
  created_at      timestamptz default now()
);

-- Solo admins
alter table public.email_campaigns enable row level security;

create policy "admins_full_campaigns" on public.email_campaigns
  for all using (
    exists (
      select 1 from public.members
      where id = auth.uid() and role = 'admin'
    )
  );
```

### Trigger: updated_at automático

```sql
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger members_updated_at
  before update on public.members
  for each row execute function public.handle_updated_at();

create trigger events_updated_at
  before update on public.events
  for each row execute function public.handle_updated_at();
```

### Trigger: crear registro en `members` al registrarse

```sql
-- Se ejecuta automáticamente cuando Supabase Auth crea un usuario
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.members (id, email, full_name, company)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'company'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
```

---

## 5. Fase 1 — Presencia web

**Duración estimada:** 2 semanas  
**Estado:** ✅ En desarrollo (prototipo en v0)  
**Auth requerida:** No  
**Base de datos:** No (datos estáticos en `/lib/data.ts`)

### Secciones de la página

| Componente | Ruta | Descripción |
|---|---|---|
| `<Navbar />` | — | Navegación sticky, logo, links, CTA "Únete gratis" |
| `<Hero />` | — | Headline, subheadline, stats (miembros, eventos, años) |
| `<About />` | — | Misión de Panama JUG, features pills |
| `<UpcomingEvents />` | — | Cards de próximos eventos (hardcoded), con aviso de membresía |
| `<PastEvents />` | — | Grid de eventos pasados con thumbnail, tags, link a YouTube |
| `<EventsEmbed />` | — | iframe de Luma para el evento más próximo |
| `<Sponsors />` | — | Grid de logos por tier (Gold, Silver, Bronze) |
| `<JoinCTA />` | — | Sección roja de conversión a membresía |
| `<Footer />` | — | Links, redes sociales, copyright |

### Datos estáticos requeridos (`/lib/data.ts`)

```typescript
// Tipos
export type EventStatus = 'upcoming' | 'past'
export type SponsorTier = 'gold' | 'silver' | 'bronze'

export interface Event {
  id: string
  title: string
  description: string
  date: string             // ISO string
  type: 'virtual' | 'presencial' | 'hibrido'
  status: EventStatus
  speaker: string
  speakerCompany: string
  tags: string[]
  youtubeUrl?: string      // solo past events
  thumbnailUrl?: string
  lumaEventId?: string     // solo upcoming events
}

export interface Sponsor {
  id: string
  name: string
  websiteUrl: string
  logoUrl: string
  tier: SponsorTier
}

// Arrays exportados: upcomingEvents, pastEvents, sponsors
```

### Criterios de completitud Fase 1

- [ ] Todas las secciones renderizan correctamente en mobile, tablet y desktop
- [ ] El iframe de Luma carga sin el error "This content is blocked" (requiere servidor HTTP, no `file://`)
- [ ] Logos de sponsors con efecto grayscale → color en hover
- [ ] Stats del hero con animación de count-up al cargar
- [ ] Navegación sticky funcional con smooth scroll a secciones
- [ ] Meta tags SEO correctos (title, description, og:image)
- [ ] Lighthouse score ≥ 90 en Performance y Accessibility
- [ ] Desplegado en Vercel con dominio provisional

---

## 6. Fase 2 — Membresía

**Duración estimada:** 2 semanas  
**Dependencias:** Fase 1 completada, Supabase proyecto creado  
**Auth requerida:** Sí (Supabase Auth)

### Nuevas rutas

| Ruta | Tipo | Descripción |
|---|---|---|
| `/unete` | Pública | Formulario de registro de miembro |
| `/login` | Pública | Login con email/password o magic link |
| `/perfil` | Protegida | Ver y editar perfil del miembro |
| `/eventos/proximos` | Protegida | Lista de eventos futuros con embed de Luma |

### Configuración de Supabase Auth

```
Providers habilitados:
  - Email/Password
  - Magic Link (recomendado como opción principal — sin fricción de contraseña)

Redirect URLs:
  - https://jugpanama.com/auth/callback
  - http://localhost:3000/auth/callback

Email templates a personalizar en Supabase Dashboard:
  - Confirm signup     → bienvenida de Panama JUG
  - Magic Link         → acceso sin contraseña
  - Reset password     → (Fase 2, opcional)
```

### Formulario de registro (`/unete`)

Campos requeridos:
- `full_name` — texto, requerido
- `email` — email, requerido, único
- `company` — texto, opcional
- `country` — select, default "Panama"

Campos opcionales (pueden editarse desde `/perfil`):
- `bio` — textarea
- `avatar_url` — upload de imagen

Flujo post-registro:
1. POST a Supabase Auth (`signUp`)
2. Trigger `on_auth_user_created` crea el registro en `members`
3. Supabase envía email de confirmación
4. Al confirmar → redirige a `/eventos/proximos`
5. API route `/api/members/welcome` envía email de bienvenida via Resend

### API Route: registro (`/api/members/register`)

```typescript
// app/api/members/register/route.ts
// POST — crea usuario en Supabase Auth y envía welcome email
// Body: { email, full_name, company?, country? }
// Response: { success: boolean, message: string }
```

Este endpoint no crea directamente en `members` — eso lo hace el trigger de Supabase. Solo dispara el email de bienvenida via Resend.

### Gating de eventos futuros

Lógica en `<UpcomingEvents />`:

```typescript
// Si el usuario NO está autenticado:
//   → Mostrar cards con overlay "Únete gratis para registrarte"
//   → CTA que lleva a /unete

// Si el usuario SÍ está autenticado:
//   → Mostrar cards completas con botón "Registrarse" que abre Luma embed
//   → La sección /eventos/proximos muestra el iframe de Luma desbloqueado
```

**Importante:** el iframe de Luma no es el único mecanismo de protección. La ruta `/eventos/proximos` está protegida por middleware de Next.js que verifica la sesión de Supabase. Alguien que obtenga el link del iframe de Luma puede acceder directamente a Luma — esto es aceptado dado que la membresía es gratuita y el valor real está en la comunidad, no en la restricción de acceso.

### Email de bienvenida (Resend)

```typescript
// Template mínimo requerido:
// - Asunto: "Bienvenido a Panama JUG ☕"
// - Saludo personalizado con full_name
// - Descripción breve de qué es Panama JUG
// - Link a /eventos/proximos
// - Link a redes sociales
// - Footer con opción de unsubscribe
```

### Criterios de completitud Fase 2

- [ ] Formulario de registro funcional con validación client-side y server-side
- [ ] Login con magic link funcionando
- [ ] Middleware protege `/eventos/proximos` y `/perfil`
- [ ] Trigger de Supabase crea registro en `members` automáticamente
- [ ] Email de bienvenida se envía via Resend al confirmar registro
- [ ] Página `/perfil` permite editar `full_name`, `company`, `country`, `bio`
- [ ] Upload de avatar a Supabase Storage desde `/perfil`
- [ ] Los eventos futuros muestran el iframe de Luma solo si hay sesión activa
- [ ] Visitantes sin sesión ven CTA de registro en lugar del iframe

---

## 7. Fase 3 — Panel administrativo

**Duración estimada:** 1.5 semanas  
**Dependencias:** Fase 2 completada  
**Auth requerida:** Sí, `role = 'admin'`

### Acceso al panel

La ruta `/admin` requiere sesión activa y `role = 'admin'`. El middleware verifica ambas condiciones. No existe página de registro de admins — el primer admin se crea directamente en Supabase Dashboard cambiando el campo `role` en la tabla `members`.

```typescript
// middleware.ts — lógica de protección
if (pathname.startsWith('/admin')) {
  const member = await getMemberRole(supabase, user.id)
  if (member?.role !== 'admin') {
    redirect('/') // o /403
  }
}
```

### Subrutas del panel

| Ruta | Descripción |
|---|---|
| `/admin` | Dashboard — resumen: total miembros, últimos registros, próximo evento |
| `/admin/miembros` | Lista de miembros con búsqueda, filtros, paginación |
| `/admin/miembros/[id]` | Detalle y edición de un miembro |
| `/admin/eventos` | CRUD de eventos (se crean aquí, Luma maneja el registro) |
| `/admin/sponsors` | CRUD de sponsors — subir logo, asignar tier, reordenar |
| `/admin/emails` | Crear campaña de email, seleccionar audiencia, enviar |
| `/admin/emails/[id]` | Historial y stats de una campaña enviada |

### Módulo: Gestión de miembros

**Lista (`/admin/miembros`):**
- Tabla paginada (25 por página) con columnas: nombre, email, empresa, país, fecha de registro, estado
- Búsqueda en tiempo real por nombre o email
- Filtro por `status` (activo/inactivo) y `country`
- Exportar a CSV (todos o filtrados)
- Acción rápida: activar/desactivar miembro sin entrar al detalle

**Detalle (`/admin/miembros/[id]`):**
- Ver todos los campos del miembro
- Editar: `full_name`, `company`, `country`, `bio`, `status`
- No se puede cambiar `email` ni `role` desde aquí (seguridad)
- Historial de eventos a los que se registró (via Luma — futuro)
- Botón eliminar con confirmación (elimina de `auth.users`, el cascade elimina de `members`)

**API routes requeridas:**

```
GET    /api/admin/members          → lista paginada con filtros
GET    /api/admin/members/[id]     → detalle de un miembro
PATCH  /api/admin/members/[id]     → actualizar campos permitidos
DELETE /api/admin/members/[id]     → eliminar miembro
GET    /api/admin/members/export   → CSV de miembros
```

### Módulo: Gestión de eventos

Los eventos en la base de datos local son metadatos que complementan lo que Luma gestiona. Luma es la fuente de verdad para registro y asistentes.

**Campos gestionables desde el admin:**
- `title`, `description`, `event_date`, `event_type`, `status`
- `luma_event_id` — ID del evento en Luma para construir el embed URL
- `luma_embed_url` — URL completa del iframe
- `youtube_url` — se agrega después del evento
- `thumbnail_url` — upload a Supabase Storage
- `tags` — array de strings
- `speaker_name`, `speaker_company`
- `is_members_only` — toggle

**Cambio automático de status:** cuando `event_date` pasa, el status cambia de `upcoming` a `past`. Implementar como una Supabase Edge Function con cron diario o simplemente calcularlo en el query (`event_date < now()`).

### Módulo: Gestión de sponsors

- CRUD completo de sponsors
- Upload de logo a Supabase Storage bucket `sponsors/`
- Asignación de tier (gold/silver/bronze)
- Control de `sort_order` para reordenar dentro del mismo tier (drag & drop opcional en Fase 4)
- Toggle `is_active` para ocultar temporalmente sin eliminar

**Supabase Storage — bucket `sponsors`:**
```
Bucket: sponsors (público)
Path: /logos/{sponsor-id}.{ext}
Max file size: 2MB
Tipos permitidos: image/png, image/svg+xml, image/webp
```

### Módulo: Envío de emails masivos

**Flujo de creación de campaña:**

1. Admin va a `/admin/emails/nueva`
2. Completa: `subject`, `body_html` (editor rico o textarea con preview)
3. Selecciona audiencia:
   - `all` — todos los miembros (activos + inactivos)
   - `active` — solo miembros con `status = 'active'`
   - `test` — solo envía al email del admin actual
4. Vista previa del email renderizado
5. Clic en "Enviar" → POST a `/api/admin/emails/send`

**API route de envío (`/api/admin/emails/send`):**

```typescript
// app/api/admin/emails/send/route.ts
// POST — envía campaña de email masivo
// Requiere: sesión activa + role=admin

// Flujo interno:
// 1. Consulta emails según audiencia seleccionada
// 2. Inserta campaña en email_campaigns con status='sending'
// 3. Envía batch via Resend (resend.batch.send)
// 4. Actualiza campaña con resend_batch_id, recipient_count, status='sent', sent_at
// 5. Retorna { success, recipientCount, campaignId }

// Límites a respetar:
// - Resend free tier: 100 emails/día
// - Resend rate limit: 10 requests/segundo
// - Para listas grandes (+100): usar Resend Broadcasts (Fase 4)
```

**Gestión de errores en envío:**
- Si Resend falla, actualizar `status = 'failed'` en la campaña
- No reintentar automáticamente — el admin puede ver el error y reintentar manualmente
- Loggear el error en consola (Vercel logs)

### Criterios de completitud Fase 3

- [ ] Middleware bloquea `/admin` para usuarios sin `role = 'admin'`
- [ ] Lista de miembros con búsqueda, filtro y paginación
- [ ] Editar y desactivar miembros funcional
- [ ] Exportar miembros a CSV
- [ ] CRUD de eventos completo con upload de thumbnail
- [ ] CRUD de sponsors completo con upload de logo a Supabase Storage
- [ ] Formulario de campaña de email con selector de audiencia
- [ ] Envío masivo via Resend con feedback de éxito/error
- [ ] Historial de campañas enviadas visible en `/admin/emails`

---

## 8. Fase 4 — Pulido y crecimiento

**Duración estimada:** Continua / iterativa  
**Dependencias:** Fases 1–3 completadas

### Funcionalidades planificadas

#### Directorio público de miembros
- Página `/comunidad` con grid de miembros (avatar, nombre, empresa, país)
- Solo miembros con `status = 'active'` y que hayan dado consentimiento explícito
- Requiere campo adicional: `show_in_directory boolean default false` en `members`

#### Integración YouTube Live
- Sección en la landing que detecta si hay un live activo y embede el player
- API route que consulta YouTube Data API v3 para saber si el canal está en vivo
- Si no hay live activo, muestra el último video del canal

#### Notificaciones por email automáticas
- Recordatorio 24h antes de un evento (Supabase cron → Resend)
- Resumen mensual de actividad de la comunidad
- Implementar con Supabase Edge Functions + pg_cron

#### Analytics básicas en el panel admin
- Total de miembros por mes (gráfico)
- Países de origen de los miembros (mapa o tabla)
- Tasa de apertura de emails (via Resend webhooks)

#### Mejoras de UX
- Drag & drop para reordenar sponsors dentro del mismo tier
- Editor WYSIWYG para el cuerpo de los emails (TipTap o similar)
- Internacionalización básica (es / en) con `next-intl`

#### SEO y performance
- `sitemap.xml` generado automáticamente con `next-sitemap`
- Open Graph images dinámicas para eventos via `@vercel/og`
- Schema.org markup para eventos (tipo `Event`)

---

## 9. Seguridad y acceso

### Roles del sistema

| Role | Descripción | Acceso |
|---|---|---|
| `visitor` | Sin cuenta | Solo contenido público + embeds Luma de eventos pasados |
| `member` | Cuenta activa | + eventos futuros, perfil propio |
| `admin` | Cuenta con `role=admin` | + panel completo |

### Políticas críticas de RLS

- Ningún usuario puede cambiar su propio `role` — solo admins
- Ningún usuario puede cambiar su propio `status` — solo admins  
- Los miembros inactivos (`status=inactive`) pierden acceso a `/eventos/proximos` — implementar en middleware

### Protección de API routes

Todas las rutas bajo `/api/admin/*` deben verificar:

```typescript
// lib/auth.ts — helper reutilizable
export async function requireAdmin(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  const { data: member } = await supabase
    .from('members')
    .select('role, status')
    .eq('id', user.id)
    .single()

  if (member?.role !== 'admin' || member?.status !== 'active') {
    throw new Error('Forbidden')
  }

  return user
}
```

### Headers de seguridad (Next.js config)

```javascript
// next.config.js
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://assets.lu.ma",
      "frame-src https://luma.com https://www.youtube.com",
      "img-src 'self' data: https://*.supabase.co",
      "connect-src 'self' https://*.supabase.co https://api.resend.com",
    ].join('; ')
  }
]
```

---

## 10. Variables de entorno

### `.env.local` (desarrollo)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # NUNCA exponer al cliente

# Resend
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@jugpanama.com
RESEND_FROM_NAME=Panama JUG

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Panama JUG
```

### Variables requeridas en Vercel

Las mismas que en `.env.local`, más:

```bash
NEXT_PUBLIC_APP_URL=https://jugpanama.com   # URL de producción
```

**Regla crítica:** cualquier variable con prefijo `NEXT_PUBLIC_` es visible en el cliente (browser). Nunca usar `NEXT_PUBLIC_` para claves secretas como `SUPABASE_SERVICE_ROLE_KEY` o `RESEND_API_KEY`.

---

## 11. Estructura de carpetas

```
jugpanama/
├── app/
│   ├── layout.tsx                    # Root layout, fuentes, metadata global
│   ├── page.tsx                      # Landing page (compone todas las secciones)
│   ├── globals.css                   # CSS variables, reset global
│   │
│   ├── unete/
│   │   └── page.tsx                  # Formulario de registro
│   ├── login/
│   │   └── page.tsx                  # Login / magic link
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts              # Handler OAuth/magic link de Supabase
│   ├── perfil/
│   │   └── page.tsx                  # Perfil del miembro (protegido)
│   ├── eventos/
│   │   └── proximos/
│   │       └── page.tsx              # Eventos futuros (protegido)
│   │
│   └── admin/
│       ├── layout.tsx                # Layout del panel admin (sidebar nav)
│       ├── page.tsx                  # Dashboard del admin
│       ├── miembros/
│       │   ├── page.tsx              # Lista de miembros
│       │   └── [id]/
│       │       └── page.tsx          # Detalle/edición de miembro
│       ├── eventos/
│       │   ├── page.tsx              # Lista de eventos
│       │   └── [id]/
│       │       └── page.tsx          # Crear/editar evento
│       ├── sponsors/
│       │   └── page.tsx              # CRUD de sponsors
│       └── emails/
│           ├── page.tsx              # Historial de campañas
│           ├── nueva/
│           │   └── page.tsx          # Crear campaña
│           └── [id]/
│               └── page.tsx          # Detalle de campaña enviada
│
├── api/                              # (dentro de app/)
│   ├── members/
│   │   └── register/
│   │       └── route.ts
│   └── admin/
│       ├── members/
│       │   ├── route.ts              # GET lista, (no POST - lo hace Supabase Auth)
│       │   ├── [id]/
│       │   │   └── route.ts          # GET, PATCH, DELETE
│       │   └── export/
│       │       └── route.ts          # GET CSV
│       ├── events/
│       │   ├── route.ts              # GET, POST
│       │   └── [id]/
│       │       └── route.ts          # GET, PATCH, DELETE
│       ├── sponsors/
│       │   ├── route.ts              # GET, POST
│       │   └── [id]/
│       │       └── route.ts          # PATCH, DELETE
│       └── emails/
│           ├── route.ts              # GET lista campañas
│           └── send/
│               └── route.ts          # POST envío masivo
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── UpcomingEvents.tsx
│   │   ├── PastEvents.tsx
│   │   ├── EventsEmbed.tsx
│   │   ├── Sponsors.tsx
│   │   └── JoinCTA.tsx
│   ├── auth/
│   │   ├── RegisterForm.tsx
│   │   └── LoginForm.tsx
│   ├── admin/
│   │   ├── Sidebar.tsx
│   │   ├── MembersTable.tsx
│   │   ├── EventForm.tsx
│   │   ├── SponsorForm.tsx
│   │   └── EmailCampaignForm.tsx
│   └── ui/                           # Componentes reutilizables (Button, Badge, Card, etc.)
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Card.tsx
│       └── ...
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 # createBrowserClient
│   │   ├── server.ts                 # createServerClient
│   │   └── middleware.ts             # createMiddlewareClient
│   ├── resend.ts                     # instancia y helpers de Resend
│   ├── data.ts                       # datos estáticos (Fase 1)
│   └── utils.ts                      # helpers generales
│
├── types/
│   └── index.ts                      # Tipos TypeScript globales
│
├── middleware.ts                     # Protección de rutas
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── .env.local
```

---

## 12. Convenciones de código

### Componentes

- Componentes de página en `app/` son Server Components por defecto
- Componentes con interactividad (formularios, estado) usan `'use client'` al inicio del archivo
- Nombre de archivos de componentes: `PascalCase.tsx`
- Props tipadas con `interface` (no `type`) para componentes

### API Routes

```typescript
// Estructura estándar de una API route
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // lógica...
    return NextResponse.json({ success: true, data: result }, { status: 200 })
  } catch (error) {
    console.error('[/api/ruta]', error)
    return NextResponse.json(
      { success: false, message: 'Error interno' },
      { status: 500 }
    )
  }
}
```

### Queries a Supabase

- Siempre usar `supabase.from('table').select('columnas específicas')` — nunca `select('*')` en producción
- Manejar siempre el error: `const { data, error } = await supabase...`
- En Server Components: usar `createServerClient` de `lib/supabase/server.ts`
- En Client Components: usar `createBrowserClient` de `lib/supabase/client.ts`

---

## 13. Deploy y CI/CD

### Entornos

| Entorno | Branch | URL |
|---|---|---|
| Producción | `main` | https://jugpanama.com |
| Preview | cualquier PR | https://jugpanama-git-[branch].vercel.app |

### Flujo de trabajo

```
Desarrollo local → commit → push → PR
                                    │
                             Vercel Preview Deploy (automático)
                                    │
                             Review + tests manuales
                                    │
                             Merge a main
                                    │
                             Vercel Production Deploy (automático)
```

### Checklist de deploy a producción

- [ ] Variables de entorno configuradas en Vercel Dashboard
- [ ] Supabase: URL en producción apunta a proyecto de producción (no al de desarrollo)
- [ ] Dominio personalizado configurado en Vercel
- [ ] Supabase Auth: URL de producción agregada en `Redirect URLs`
- [ ] Resend: dominio verificado para evitar spam
- [ ] `robots.txt` y `sitemap.xml` accesibles

### Supabase: separación de entornos

Se recomienda tener dos proyectos en Supabase:

| Proyecto | Uso | Variables |
|---|---|---|
| `jugpanama-dev` | Desarrollo local | `.env.local` |
| `jugpanama-prod` | Producción | Vercel Environment Variables |

Las migraciones SQL se aplican manualmente via Supabase Dashboard o Supabase CLI.

---

*Documento mantenido por el equipo de Panama JUG. Actualizar al completar cada fase.*
