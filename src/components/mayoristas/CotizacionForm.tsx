'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'

const productos = [
  'Neumáticos moto enduro / off-road',
  'Neumáticos moto trail / adventure',
  'Neumáticos moto dual sport',
  'Cámaras de aire estándar',
  'Cámaras de aire reforzadas',
  'Cámaras de aire scooter',
  'Mix neumáticos + cámaras',
]

export default function CotizacionForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState({
    empresa: '',
    rut: '',
    nombre: '',
    email: '',
    telefono: '',
    producto: '',
    cantidad: '',
    mensaje: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        await fetch('/api/contact-b2b', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, tipo: 'cotizacion' }),
        })
      } catch {}
      setSubmitted(true)
    })
  }

  if (submitted) {
    return (
      <section style={{ padding: '96px 0', background: 'var(--paper)', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="wrap" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '64px', color: 'var(--kenda)', marginBottom: '16px' }}>✓</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '32px', textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '16px' }}>
            Cotización recibida
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '32px' }}>
            Gracias {form.nombre}. Revisaremos tu solicitud y te enviaremos una cotización detallada a <strong>{form.email}</strong> en menos de 24 horas hábiles.
          </p>
          <Link href="/mayoristas/" className="btn-primary">Volver al portal mayoristas</Link>
        </div>
      </section>
    )
  }

  return (
    <section style={{ padding: '64px 0', background: 'var(--paper)' }}>
      <div className="wrap" style={{ maxWidth: '720px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>
                Empresa / Razón social *
              </label>
              <input
                type="text"
                name="empresa"
                required
                value={form.empresa}
                onChange={handleChange}
                style={{ fontFamily: 'var(--font-body)', fontSize: '14px', padding: '12px 16px', border: '1px solid var(--line)', background: 'var(--cream)', color: 'var(--text)', outline: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>
                RUT empresa *
              </label>
              <input
                type="text"
                name="rut"
                required
                placeholder="76.123.456-7"
                value={form.rut}
                onChange={handleChange}
                style={{ fontFamily: 'var(--font-body)', fontSize: '14px', padding: '12px 16px', border: '1px solid var(--line)', background: 'var(--cream)', color: 'var(--text)', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>
                Nombre de contacto *
              </label>
              <input
                type="text"
                name="nombre"
                required
                value={form.nombre}
                onChange={handleChange}
                style={{ fontFamily: 'var(--font-body)', fontSize: '14px', padding: '12px 16px', border: '1px solid var(--line)', background: 'var(--cream)', color: 'var(--text)', outline: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>
                Teléfono de contacto
              </label>
              <input
                type="tel"
                name="telefono"
                placeholder="+56 9 ..."
                value={form.telefono}
                onChange={handleChange}
                style={{ fontFamily: 'var(--font-body)', fontSize: '14px', padding: '12px 16px', border: '1px solid var(--line)', background: 'var(--cream)', color: 'var(--text)', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>
              Email de contacto *
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              style={{ fontFamily: 'var(--font-body)', fontSize: '14px', padding: '12px 16px', border: '1px solid var(--line)', background: 'var(--cream)', color: 'var(--text)', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>
                Tipo de producto *
              </label>
              <select
                name="producto"
                required
                value={form.producto}
                onChange={handleChange}
                style={{ fontFamily: 'var(--font-body)', fontSize: '14px', padding: '12px 16px', border: '1px solid var(--line)', background: 'var(--cream)', color: 'var(--text)', outline: 'none', appearance: 'none' }}
              >
                <option value="">Seleccionar...</option>
                {productos.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>
                Cantidad aproximada *
              </label>
              <input
                type="text"
                name="cantidad"
                required
                placeholder="Ej: 20 unidades mensuales"
                value={form.cantidad}
                onChange={handleChange}
                style={{ fontFamily: 'var(--font-body)', fontSize: '14px', padding: '12px 16px', border: '1px solid var(--line)', background: 'var(--cream)', color: 'var(--text)', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>
              Detalle del pedido / medidas específicas
            </label>
            <textarea
              name="mensaje"
              rows={5}
              placeholder="Indica medidas específicas, marcas de moto compatibles, o cualquier detalle relevante para la cotización."
              value={form.mensaje}
              onChange={handleChange}
              style={{ fontFamily: 'var(--font-body)', fontSize: '14px', padding: '12px 16px', border: '1px solid var(--line)', background: 'var(--cream)', color: 'var(--text)', outline: 'none', resize: 'vertical' }}
            />
          </div>

          <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--muted)', lineHeight: 1.6 }}>
            Al enviar este formulario aceptas que tus datos sean utilizados para responder tu solicitud de cotización. No compartimos datos con terceros.
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn-primary"
            style={{ alignSelf: 'flex-start', opacity: isPending ? 0.7 : 1, cursor: isPending ? 'wait' : 'pointer' }}
          >
            {isPending ? 'Enviando...' : 'Solicitar cotización →'}
          </button>
        </form>
      </div>
    </section>
  )
}
