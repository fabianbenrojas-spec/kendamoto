'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const neumaticosMenu = {
  terreno: [
    { label: 'Enduro', href: '/neumaticos-kenda-moto/enduro/' },
    { label: 'Trail Adventure', href: '/neumaticos-kenda-moto/trail-adventure/' },
    { label: 'Motocross', href: '/neumaticos-kenda-moto/cross-motocross/' },
    { label: 'Dual Sport', href: '/neumaticos-kenda-moto/dual-sport/' },
    { label: 'Calle / Carretera', href: '/neumaticos-kenda-moto/calle-carretera/' },
    { label: 'Scooter', href: '/neumaticos-kenda-moto/scooter/' },
    { label: 'Supermoto / Pista', href: '/neumaticos-kenda-moto/supermoto-pista/' },
    { label: 'Custom / Chopper', href: '/neumaticos-kenda-moto/custom-chopper/' },
  ],
  modelos: [
    { label: 'K784 Big Block', href: '/neumaticos-kenda-moto/trail-adventure/kenda-k784-big-block/' },
    { label: 'K778 Enduro Hard', href: '/neumaticos-kenda-moto/enduro/kenda-k778/' },
    { label: 'K779 Enduro Soft', href: '/neumaticos-kenda-moto/enduro/kenda-k779/' },
    { label: 'K785 Millville MX', href: '/neumaticos-kenda-moto/cross-motocross/kenda-k785-millville/' },
    { label: 'K782 Sand Mad', href: '/neumaticos-kenda-moto/cross-motocross/kenda-k782-sand-mad/' },
    { label: 'K761 Dual Sport', href: '/neumaticos-kenda-moto/dual-sport/kenda-k761-dual-sport/' },
    { label: 'K787 Equilibrium', href: '/neumaticos-kenda-moto/calle-carretera/kenda-k787-equilibrium/' },
  ],
  medidas: [
    { label: '90/90B21', href: '/neumaticos-kenda-moto/medida/90-90b21/' },
    { label: '150/70B17', href: '/neumaticos-kenda-moto/medida/150-70b17/' },
    { label: '170/60B17', href: '/neumaticos-kenda-moto/medida/170-60b17/' },
    { label: '90/90-21', href: '/neumaticos-kenda-moto/medida/90-90-21/' },
    { label: '110/100-18', href: '/neumaticos-kenda-moto/medida/110-100-18/' },
    { label: '80/100-21', href: '/neumaticos-kenda-moto/medida/80-100-21/' },
    { label: 'Ver todas las medidas →', href: '/neumaticos-kenda-moto/medida/' },
  ],
}

export function Nav() {
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMegaOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <header
        style={{
          background: 'white',
          borderBottom: '1px solid var(--line)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div className="wrap flex items-center justify-between" style={{ height: '64px' }}>
          {/* Brand */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                background: 'var(--kenda)',
                color: 'white',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '20px',
                letterSpacing: '-0.01em',
                padding: '4px 10px',
                lineHeight: 1,
              }}
            >
              KENDA
            </div>
            <div style={{ lineHeight: 1.1 }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '14px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--text)',
                }}
              >
                MOTO CHILE
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  color: 'var(--muted)',
                  letterSpacing: '0.02em',
                }}
              >
                Distribuidor Oficial
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {/* MegaMenu Neumáticos — click-based */}
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <button
                onClick={() => setMegaOpen(v => !v)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--text)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Neumáticos {megaOpen ? '▴' : '▾'}
              </button>

              {megaOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'white',
                    border: '1px solid var(--line)',
                    width: '720px',
                    padding: '24px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '24px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    zIndex: 200,
                  }}
                >
                  <div>
                    <div className="eyebrow mb-3" style={{ fontSize: '10px' }}>Por Terreno</div>
                    {neumaticosMenu.terreno.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMegaOpen(false)}
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-body)',
                          fontSize: '13px',
                          color: 'var(--text)',
                          textDecoration: 'none',
                          padding: '4px 0',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--kenda)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  <div>
                    <div className="eyebrow mb-3" style={{ fontSize: '10px' }}>Por Modelo</div>
                    {neumaticosMenu.modelos.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMegaOpen(false)}
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-body)',
                          fontSize: '13px',
                          color: 'var(--text)',
                          textDecoration: 'none',
                          padding: '4px 0',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--kenda)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  <div>
                    <div className="eyebrow mb-3" style={{ fontSize: '10px' }}>Por Medida</div>
                    {neumaticosMenu.medidas.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMegaOpen(false)}
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-body)',
                          fontSize: '13px',
                          color: 'var(--text)',
                          textDecoration: 'none',
                          padding: '4px 0',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--kenda)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {[
              { label: 'Cámaras', href: '/camaras-aire-moto-kenda/' },
              { label: 'Kenda', href: '/marca-kenda/' },
              { label: 'Blog', href: '/blog/' },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--text)',
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </Link>
            ))}

            <Link href="/mayoristas/" className="btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }}>
              Mayoristas B2B
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              fontWeight: 700,
              color: 'var(--text)',
            }}
          >
            {mobileOpen ? '✕ CERRAR' : '☰ MENÚ'}
          </button>
        </div>
      </header>

      {/* Mobile full-screen drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'var(--ink)',
            color: 'white',
            overflowY: 'auto',
            paddingTop: '80px',
            paddingBottom: '40px',
          }}
        >
          {/* Tap-background to close */}
          <div style={{ position: 'absolute', inset: 0 }} onClick={() => setMobileOpen(false)} />

          <nav style={{ position: 'relative', padding: '0 24px' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--kenda)',
                marginBottom: '12px',
              }}
            >
              Por Terreno
            </div>
            {neumaticosMenu.terreno.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '20px',
                  textTransform: 'uppercase',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '10px 0',
                  borderBottom: '1px solid var(--line-dark)',
                }}
              >
                {item.label}
              </Link>
            ))}

            <div style={{ marginTop: '24px' }}>
              {[
                { label: 'Cámaras de Aire', href: '/camaras-aire-moto-kenda/' },
                { label: 'Marca Kenda', href: '/marca-kenda/' },
                { label: 'Blog', href: '/blog/' },
                { label: 'Mayoristas B2B', href: '/mayoristas/' },
              ].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '16px',
                    textTransform: 'uppercase',
                    color: 'var(--dim)',
                    textDecoration: 'none',
                    padding: '10px 0',
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
