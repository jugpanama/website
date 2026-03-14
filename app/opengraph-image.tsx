import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          position: 'relative',
          background: 'linear-gradient(135deg, #355B8F 0%, #2F4F7A 42%, #22385A 100%)',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 15% 15%, rgba(248,152,32,0.24), transparent 30%), radial-gradient(circle at 80% 20%, rgba(126,184,247,0.18), transparent 28%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: -80,
            top: -40,
            width: 420,
            height: 760,
            borderRadius: 9999,
            border: '42px solid rgba(248,152,32,0.45)',
            transform: 'rotate(12deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 40,
            top: -120,
            width: 320,
            height: 760,
            borderRadius: 9999,
            border: '32px solid rgba(126,184,247,0.28)',
            transform: 'rotate(12deg)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            padding: '58px 64px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                display: 'flex',
                width: 82,
                height: 82,
                borderRadius: 20,
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.14)',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                fontWeight: 800,
              }}
            >
              PJ
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: 52, fontWeight: 800, lineHeight: 1 }}>
                <span>Panama</span>
                <span style={{ color: '#F89820', marginLeft: 10 }}>JUG</span>
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 18,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: '#D7E1EE',
                }}
              >
                Comunidad Java en Panamá
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 720 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                padding: '10px 18px',
                borderRadius: 9999,
                border: '1px solid rgba(248,152,32,0.35)',
                background: 'rgba(248,152,32,0.10)',
                color: '#FFD8A6',
                fontSize: 18,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 2,
              }}
            >
              Eventos, talleres y networking
            </div>
            <div style={{ marginTop: 28, fontSize: 66, fontWeight: 800, lineHeight: 1.05 }}>
              El punto de encuentro para la comunidad Java en Panamá
            </div>
            <div style={{ marginTop: 22, fontSize: 28, lineHeight: 1.4, color: '#D7E1EE' }}>
              Meetups, speakers, sponsors y aprendizaje continuo para el ecosistema Java y JVM.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                display: 'flex',
                borderRadius: 22,
                background: '#FFFFFF',
                overflow: 'hidden',
                boxShadow: '0 18px 40px rgba(0,0,0,0.18)',
              }}
            >
              {[
                ['+1', 'Año de comunidad'],
                ['+1', 'Evento programado'],
                ['Java', 'Ecosistema activo'],
              ].map(([value, label]) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '18px 26px',
                    borderRight: label === 'Ecosistema activo' ? 'none' : '1px solid #E5E7EB',
                  }}
                >
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#22385A' }}>{value}</div>
                  <div style={{ fontSize: 16, color: '#6B7280' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    size
  )
}