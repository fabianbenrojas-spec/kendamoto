'use client'

import { useState } from 'react'
import { WHATSAPP_NUMBER } from '@/lib/site'

type TipoNegocio = 'taller' | 'tienda' | 'distribuidor' | 'concesionario' | ''

const tiposNegocio = [
  { id: 'taller', label: 'Taller mecánico', icon: '🔧' },
  { id: 'tienda', label: 'Tienda repuestos', icon: '🏪' },
  { id: 'distribuidor', label: 'Distribuidor', icon: '🚚' },
  { id: 'concesionario', label: 'Concesionario', icon: '🏍️' },
]

const volumenOptions = [
  { value: '6-12', label: '6 – 12 unidades / mes' },
  { value: '12-30', label: '12 – 30 unidades / mes' },
  { value: '30-50', label: '30 – 50 unidades / mes' },
  { value: '50+', label: '+50 unidades / mes' },
]

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid var(--line-2)',
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  background: 'var(--paper)',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '12px',
  fontWeight: 600,
  color: 'var(--muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  display: 'block',
  marginBottom: '4px',
}

export function B2BForm() {
  const [step, setStep] = useState(1)
  const [tipo, setTipo] = useState<TipoNegocio>('')
  const [ciudad, setCiudad] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [volumen, setVolumen] = useState('')

  const step1Valid = tipo !== '' && ciudad.trim() !== '' && empresa.trim() !== ''
  const step2Valid = nombre.trim() !== '' && telefono.trim() !== '' && email.trim() !== ''

  const handleStep2 = () => {
    if (step2Valid) {
      const msg = [
        `Hola, solicito cuenta B2B para Kenda Moto Chile.`,
        `Tipo: ${tiposNegocio.find(t => t.id === tipo)?.label ?? tipo}`,
        `Empresa: ${empresa}`,
        `Ciudad: ${ciudad}`,
        `Nombre: ${nombre}`,
        `Email: ${email}`,
        `Tel: ${telefono}`,
        volumen ? `Volumen estimado: ${volumen} unidades/mes` : '',
      ]
        .filter(Boolean)
        .join(' | ')

      const wa = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`
      window.open(wa, '_blank')
      setStep(3)
    }
  }

  const stepLabel = (n: number) => (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: '12px',
        background: step >= n ? 'var(--kenda)' : 'var(--line-2)',
        color: 'white',
        flexShrink: 0,
      }}
    >
      {n}
    </span>
  )

  return (
    <div style={{ background: 'white', color: 'var(--text)', padding: '32px' }}>
      {/* Progress header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '24px',
        }}
      >
        {stepLabel(1)}
        <div style={{ flex: 1, height: '1px', background: step >= 2 ? 'var(--kenda)' : 'var(--line)' }} />
        {stepLabel(2)}
        <div style={{ flex: 1, height: '1px', background: step >= 3 ? 'var(--kenda)' : 'var(--line)' }} />
        {stepLabel(3)}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '18px',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              marginBottom: '4px',
            }}
          >
            Tu negocio
          </div>

          {/* Tipo negocio chips */}
          <div>
            <span style={labelStyle}>Tipo de negocio</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              {tiposNegocio.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTipo(t.id as TipoNegocio)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 14px',
                    border: tipo === t.id ? '2px solid var(--kenda)' : '1px solid var(--line-2)',
                    background: tipo === t.id ? 'var(--kenda-tint)' : 'transparent',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'var(--text)',
                    textAlign: 'left',
                    transition: 'all 0.15s',
                  }}
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={labelStyle}>Empresa / Taller</label>
            <input
              type="text"
              placeholder="Nombre de tu empresa"
              value={empresa}
              onChange={e => setEmpresa(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Ciudad</label>
            <input
              type="text"
              placeholder="ej. Santiago, Concepción, Iquique..."
              value={ciudad}
              onChange={e => setCiudad(e.target.value)}
              style={inputStyle}
            />
          </div>

          <button
            onClick={() => step1Valid && setStep(2)}
            disabled={!step1Valid}
            className={step1Valid ? 'btn-primary' : ''}
            style={{
              marginTop: '4px',
              justifyContent: 'center',
              opacity: step1Valid ? 1 : 0.5,
              cursor: step1Valid ? 'pointer' : 'not-allowed',
              ...(step1Valid
                ? {}
                : {
                    background: 'var(--line-2)',
                    color: 'var(--muted)',
                    padding: '12px 24px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '14px',
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.1em',
                    border: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                  }),
            }}
          >
            Continuar →
          </button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '18px',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              marginBottom: '4px',
            }}
          >
            Datos de contacto
          </div>

          <div>
            <label style={labelStyle}>Nombre completo</label>
            <input
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Teléfono / WhatsApp</label>
            <input
              type="tel"
              placeholder="+56 9 1234 5678"
              value={telefono}
              onChange={e => setTelefono(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              placeholder="correo@empresa.cl"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Volumen mensual estimado</label>
            <select
              value={volumen}
              onChange={e => setVolumen(e.target.value)}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              <option value="">Seleccionar...</option>
              {volumenOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <button
              onClick={() => setStep(1)}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '12px 16px',
                background: 'transparent',
                color: 'var(--muted)',
                border: '1px solid var(--line-2)',
                cursor: 'pointer',
              }}
            >
              ← Volver
            </button>
            <button
              onClick={handleStep2}
              disabled={!step2Valid}
              className={step2Valid ? 'btn-primary' : ''}
              style={{
                flex: 1,
                justifyContent: 'center',
                opacity: step2Valid ? 1 : 0.5,
                cursor: step2Valid ? 'pointer' : 'not-allowed',
                ...(step2Valid
                  ? {}
                  : {
                      background: 'var(--line-2)',
                      color: 'var(--muted)',
                      padding: '12px 24px',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '14px',
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.1em',
                      border: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      textDecoration: 'none',
                    }),
              }}
            >
              Enviar por WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Success */}
      {step === 3 && (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '22px',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              marginBottom: '12px',
            }}
          >
            ¡Solicitud enviada!
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--muted)',
              lineHeight: 1.6,
              marginBottom: '20px',
            }}
          >
            Tu solicitud ha sido enviada por WhatsApp. Nuestro equipo te contactará en 24-48 horas
            hábiles con el catálogo de precios mayoristas.
          </p>
          <button
            onClick={() => {
              setStep(1)
              setTipo('')
              setCiudad('')
              setEmpresa('')
              setNombre('')
              setTelefono('')
              setEmail('')
              setVolumen('')
            }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--muted)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Nueva solicitud
          </button>
        </div>
      )}
    </div>
  )
}
