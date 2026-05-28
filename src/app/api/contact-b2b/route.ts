import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const data = Object.fromEntries(formData.entries())

  const required = ['nombre', 'empresa', 'ciudad', 'telefono', 'email', 'tipo_negocio']
  for (const field of required) {
    if (!data[field]) {
      return NextResponse.json({ success: false, error: `Campo ${field} requerido` }, { status: 400 })
    }
  }

  if (!process.env.RESEND_API_KEY) {
    console.log('[contact-b2b] dev mode — form submission:', data)
    return NextResponse.redirect(new URL('/mayoristas/?submitted=true', req.url))
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'web@kendamoto.cl',
      to: process.env.CONTACT_EMAIL ?? 'mayoristas@kendamoto.cl',
      subject: `Nueva solicitud B2B — ${data.empresa} (${data.ciudad})`,
      html: `
        <h2>Nueva solicitud de cuenta B2B</h2>
        <table>
          <tr><td><strong>Nombre:</strong></td><td>${data.nombre}</td></tr>
          <tr><td><strong>Empresa:</strong></td><td>${data.empresa}</td></tr>
          <tr><td><strong>Tipo negocio:</strong></td><td>${data.tipo_negocio}</td></tr>
          <tr><td><strong>Ciudad:</strong></td><td>${data.ciudad}</td></tr>
          <tr><td><strong>Teléfono:</strong></td><td>${data.telefono}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>
          <tr><td><strong>Volumen estimado:</strong></td><td>${data.volumen ?? 'No indicado'}</td></tr>
        </table>
      `,
    })
  } catch (err) {
    console.error('[contact-b2b] email error:', err)
  }

  return NextResponse.redirect(new URL('/mayoristas/?submitted=true', req.url))
}
