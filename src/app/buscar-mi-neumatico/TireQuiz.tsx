'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { getMotosByType, type MotoType } from '@/data/moto-compatibility'
import { getRecommendation, type UsoPrincipal, type NivelUso, type QuizResult } from '@/lib/quiz-recommendation'

type Step = 1 | 2 | 3 | 4 | 'result'

interface Answers {
  tipo: MotoType | null
  motoLabel: string | null
  uso: UsoPrincipal | null
  nivel: NivelUso | null
}

const TIPO_OPTIONS: { value: MotoType; label: string; desc: string }[] = [
  { value: 'adventure',  label: 'Adventure',  desc: 'BMW GS, Africa Twin, Ténéré, KTM Adventure' },
  { value: 'enduro',     label: 'Enduro',     desc: 'KTM EXC, Husqvarna TE/FE, Beta RR, GasGas' },
  { value: 'mx',         label: 'Motocross',  desc: 'Honda CRF, Kawasaki KX, Yamaha YZ, KTM SX' },
  { value: 'dualsport',  label: 'Dual Sport', desc: 'CRF 300L, KLX 300, DR 650, Himalayan' },
]

const USO_OPTIONS: { value: UsoPrincipal; label: string; desc: string; bars: { asfalto: number; ripio: number; offroad: number } }[] = [
  { value: 'mixto',   label: 'Uso mixto',         desc: 'Carretera con tramos de ripio — rutas, cordillera, Carretera Austral', bars: { asfalto: 50, ripio: 40, offroad: 10 } },
  { value: 'offroad', label: 'Off-road intenso',   desc: 'Senderos, roca, piedra, tierra suelta — poca carretera',              bars: { asfalto: 10, ripio: 20, offroad: 70 } },
  { value: 'ciudad',  label: 'Ciudad y carretera', desc: 'Commuting diario, autopistas — salidas ocasionales a ripio suave',    bars: { asfalto: 75, ripio: 20, offroad: 5  } },
]

const NIVEL_OPTIONS: { value: NivelUso; label: string; desc: string }[] = [
  { value: 'comp',    label: 'Competición',      desc: 'Enduro federado, MX, rally — máxima exigencia' },
  { value: 'sport',   label: 'Sport / Aventura', desc: 'Travesías largas, rutas exigentes, viajes' },
  { value: 'leisure', label: 'Paseo / Diario',   desc: 'Recreativo, commuting, fin de semana' },
]

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('es-CL')

// ─── STYLES ──────────────────────────────────────────────────────

const S = {
  wrap:    { fontFamily: "var(--font-body, 'Barlow', sans-serif)", background: '#141414', borderRadius: '4px', overflow: 'hidden' as const, border: '1px solid #2a2a2a' },
  header:  { background: '#E30613', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  brand:   { fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 800, fontSize: '20px', letterSpacing: '0.04em', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' },
  brandBox:{ background: '#fff', color: '#E30613', padding: '1px 8px', fontSize: '16px', fontWeight: 900 },
  body:    { padding: '28px 24px 24px' },
  eyebrow: { fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#E30613', marginBottom: '6px' },
  q:       { fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 800, fontSize: '24px', textTransform: 'uppercase' as const, letterSpacing: '-0.01em', lineHeight: 1.05 as const, color: '#fff', marginBottom: '20px' },
  grid2:   { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '20px' },
  opt:     (sel: boolean): React.CSSProperties => ({ background: '#1e1e1e', border: sel ? '2px solid #E30613' : '1px solid #2e2e2e', borderRadius: '4px', padding: '14px 12px', cursor: 'pointer', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '5px', transition: 'border-color 0.15s', width: '100%' }),
  optName: { fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: '15px', textTransform: 'uppercase' as const, letterSpacing: '0.04em', color: '#fff' },
  optDesc: (sel: boolean): React.CSSProperties => ({ fontFamily: "var(--font-body, 'Barlow', sans-serif)", fontSize: '12px', color: sel ? '#aaa' : '#555', lineHeight: 1.4 }),
  optRow:  (sel: boolean): React.CSSProperties => ({ background: '#1e1e1e', border: sel ? '2px solid #E30613' : '1px solid #2e2e2e', borderRadius: '4px', padding: '14px 16px', cursor: 'pointer', marginBottom: '8px', transition: 'border-color 0.15s' }),
  nav:     { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #2a2a2a', paddingTop: '16px' },
  back:    { fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#444', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', display: 'flex', alignItems: 'center', gap: '6px' },
  next:    (ready: boolean): React.CSSProperties => ({ fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 800, fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', background: '#E30613', border: 'none', borderRadius: '4px', padding: '10px 24px', cursor: ready ? 'pointer' : 'not-allowed', opacity: ready ? 1 : 0.3, display: 'flex', alignItems: 'center', gap: '8px', transition: 'opacity 0.2s' }),
  barRow:  { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' },
  barLbl:  { fontFamily: "var(--font-body, 'Barlow', sans-serif)", fontSize: '11px', color: '#555', width: '52px', flexShrink: 0 as const },
  barTrack:{ flex: 1, height: '3px', background: '#2a2a2a', borderRadius: '99px', overflow: 'hidden' as const },
  barPct:  { fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: '11px', color: '#555', width: '28px', textAlign: 'right' as const },
} as const

function TerrainBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div style={S.barRow}>
      <span style={S.barLbl}>{label}</span>
      <div style={S.barTrack}>
        <div style={{ width: `${pct}%`, height: '100%', borderRadius: '99px', background: color }} />
      </div>
      <span style={S.barPct}>{pct}%</span>
    </div>
  )
}

function ProgressPills({ current }: { current: Step }) {
  const currentNum = current === 'result' ? 5 : current
  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
      {([1, 2, 3, 4, 5] as const).map(s => (
        <div
          key={s}
          style={{
            width: '24px',
            height: '4px',
            borderRadius: '99px',
            background: s <= currentNum ? '#fff' : 'rgba(255,255,255,0.3)',
            transition: 'background 0.3s',
          }}
        />
      ))}
    </div>
  )
}

function MotoSelect({ tipo, value, onChange }: { tipo: MotoType; value: string; onChange: (v: string) => void }) {
  const motos = getMotosByType(tipo)
  return (
    <div style={{ background: '#1e1e1e', border: '1px solid #2e2e2e', borderRadius: '4px', padding: '4px 12px', marginBottom: '12px' }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#fff', padding: '10px 0', cursor: 'pointer', appearance: 'none' }}
      >
        <option value="" style={{ background: '#1e1e1e' }}>Selecciona tu moto...</option>
        {motos.map(m => (
          <option key={m.label} value={m.label} style={{ background: '#1e1e1e' }}>
            {m.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function QuizResultView({ result, onRestart }: { result: QuizResult; onRestart: () => void }) {
  const { moto, razon, alertaTT, cuotasMensual } = result
  const total = moto.priceDelantera + moto.priceTrasera
  const urlDel = `/neumaticos-kenda-moto/${moto.categoria}/${moto.productSlug}/${moto.delanteraSlug}/`
  const urlTras = `/neumaticos-kenda-moto/${moto.categoria}/${moto.productSlug}/${moto.traseraSlug}/`
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP?.replace(/[^0-9]/g, '') ?? '56900000000'
  const waMsg = encodeURIComponent(
    `Hola Kenda Moto, el buscador me recomendó el ${moto.modelRef} para mi ${moto.label}: delantera ${moto.delantera} + trasera ${moto.trasera}. ¿Tienen stock? ¿Cuál es el precio con envío?`
  )

  return (
    <div>
      <div style={S.eyebrow}>Tu resultado</div>

      {/* Result card */}
      <div style={{ background: '#1a0000', border: '1px solid #E30613', borderRadius: '4px', padding: '20px', marginBottom: '12px' }}>
        <span style={{ display: 'inline-block', background: '#E30613', color: '#fff', fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '99px', marginBottom: '10px' }}>
          Recomendado para ti
        </span>
        <div style={{ fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 800, fontSize: '30px', textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#fff', lineHeight: 1, marginBottom: '4px' }}>
          {moto.modelRef}
        </div>
        <div style={{ fontFamily: "var(--font-body, 'Barlow', sans-serif)", fontSize: '13px', color: '#888', marginBottom: '16px' }}>
          Para tu {moto.label}
        </div>

        {/* Reason */}
        <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '4px', padding: '12px 14px', marginBottom: '14px' }}>
          <p style={{ fontFamily: "var(--font-body, 'Barlow', sans-serif)", fontSize: '13px', color: '#999', lineHeight: 1.65, margin: 0 }}>{razon}</p>
        </div>

        {/* TT alert */}
        {alertaTT && (
          <div style={{ background: '#1a1200', border: '1px solid #BA7517', borderRadius: '4px', padding: '10px 14px', marginBottom: '14px' }}>
            <p style={{ fontFamily: "var(--font-body, 'Barlow', sans-serif)", fontSize: '12px', color: '#BA7517', lineHeight: 1.5, margin: 0 }}>
              ⚠ {alertaTT}
            </p>
          </div>
        )}

        {/* Sizes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
          {[
            { pos: 'Delantera', medida: moto.delantera, price: moto.priceDelantera, href: urlDel },
            { pos: 'Trasera',   medida: moto.trasera,   price: moto.priceTrasera,   href: urlTras },
          ].map(({ pos, medida, price, href }) => (
            <Link
              key={pos}
              href={href}
              style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: '4px', padding: '12px', textDecoration: 'none', display: 'block' }}
            >
              <div style={{ fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555', marginBottom: '4px' }}>
                {pos}
              </div>
              <div style={{ fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 800, fontSize: '20px', color: '#fff', letterSpacing: '0.02em', marginBottom: '3px' }}>
                {medida}
              </div>
              <div style={{ fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: '15px', color: '#E30613' }}>
                {fmt(price)}
              </div>
            </Link>
          ))}
        </div>

        {/* Total */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #2a2a2a', paddingTop: '12px', marginBottom: '14px' }}>
          <div>
            <div style={{ fontFamily: "var(--font-body, 'Barlow', sans-serif)", fontSize: '12px', color: '#555', lineHeight: 1.4 }}>Par completo · Envío gratis · IVA incluido</div>
            <div style={{ fontFamily: "var(--font-body, 'Barlow', sans-serif)", fontSize: '12px', color: '#444', marginTop: '2px' }}>o {fmt(cuotasMensual)}/mes en 12 cuotas sin interés</div>
          </div>
          <div style={{ fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 800, fontSize: '28px', color: '#fff', letterSpacing: '-0.01em' }}>
            {fmt(total)}
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <a
            href={`https://wa.me/${waNumber}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: '#25D366', border: 'none', borderRadius: '4px', padding: '11px 8px', fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textDecoration: 'none' }}
          >
            Comprar por WhatsApp
          </a>
          <Link
            href={urlDel}
            style={{ background: '#1e1e1e', border: '1px solid #333', borderRadius: '4px', padding: '11px 8px', fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#aaa', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textDecoration: 'none' }}
          >
            Ver ficha técnica
          </Link>
        </div>
      </div>

      {/* Construction + installments */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
        <div style={{ background: '#1e1e1e', borderRadius: '4px', padding: '10px 12px' }}>
          <div style={{ fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#555', marginBottom: '3px' }}>Tipo de construcción</div>
          <div style={{ fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: '13px', color: '#fff' }}>
            {moto.constructionType === 'TT' ? 'TT — Con cámara' : 'TL — Tubeless'}
          </div>
        </div>
        <div style={{ background: '#1e1e1e', borderRadius: '4px', padding: '10px 12px' }}>
          <div style={{ fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#555', marginBottom: '3px' }}>Cuotas sin interés</div>
          <div style={{ fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: '13px', color: '#fff' }}>
            Hasta 12 cuotas · {fmt(cuotasMensual)}/mes
          </div>
        </div>
      </div>

      {/* Restart */}
      <button
        onClick={onRestart}
        style={{ width: '100%', background: 'none', border: 'none', fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#333', cursor: 'pointer', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
      >
        ↺ Empezar de nuevo
      </button>
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────

export function TireQuiz() {
  const [step, setStep] = useState<Step>(1)
  const [answers, setAnswers] = useState<Answers>({ tipo: null, motoLabel: null, uso: null, nivel: null })
  const [result, setResult] = useState<QuizResult | null>(null)

  const set = useCallback(<K extends keyof Answers>(key: K, val: Answers[K]) => {
    setAnswers(prev => ({ ...prev, [key]: val }))
  }, [])

  const handleShowResult = useCallback(() => {
    if (!answers.tipo || !answers.motoLabel || !answers.uso || !answers.nivel) return
    const rec = getRecommendation({
      tipo: answers.tipo,
      motoLabel: answers.motoLabel,
      uso: answers.uso,
      nivel: answers.nivel,
    })
    setResult(rec)
    setStep('result')
  }, [answers])

  const restart = useCallback(() => {
    setAnswers({ tipo: null, motoLabel: null, uso: null, nivel: null })
    setResult(null)
    setStep(1)
  }, [])

  const trustStrip = (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', borderTop: '1px solid #1e1e1e' }}>
      {[
        { label: 'Distribuidor oficial', val: 'Kenda Tires® · Chile' },
        { label: 'Stock ZOFRI',          val: '+200 referencias' },
        { label: 'Envío gratis',         val: 'A las 16 regiones' },
        { label: 'Despacho',             val: '24-72h hábiles' },
      ].map(({ label, val }) => (
        <div key={label} style={{ background: '#0e0e0e', padding: '12px 14px', borderTop: '1px solid #1e1e1e' }}>
          <div style={{ fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: '10px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#E30613', marginBottom: '2px' }}>{label}</div>
          <div style={{ fontFamily: "var(--font-body, 'Barlow', sans-serif)", fontSize: '12px', color: '#444' }}>{val}</div>
        </div>
      ))}
    </div>
  )

  return (
    <div style={S.wrap}>
      {/* Header */}
      <div style={S.header}>
        <div style={S.brand}>
          <span style={S.brandBox}>KENDA</span>
          MOTO CHILE
        </div>
        <ProgressPills current={step} />
      </div>

      <div style={S.body}>

        {/* STEP 1 — Tipo */}
        {step === 1 && (
          <>
            <div style={S.eyebrow}>Paso 1 de 4 — Tipo de moto</div>
            <div style={S.q}>¿Qué tipo de moto tienes?</div>
            <div style={S.grid2}>
              {TIPO_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  style={S.opt(answers.tipo === opt.value)}
                  onClick={() => set('tipo', opt.value)}
                >
                  <div style={S.optName}>{opt.label}</div>
                  <div style={S.optDesc(answers.tipo === opt.value)}>{opt.desc}</div>
                </button>
              ))}
            </div>
            <div style={S.nav}>
              <span />
              <button
                style={S.next(!!answers.tipo)}
                disabled={!answers.tipo}
                onClick={() => setStep(2)}
              >
                Continuar →
              </button>
            </div>
          </>
        )}

        {/* STEP 2 — Moto */}
        {step === 2 && answers.tipo && (
          <>
            <div style={S.eyebrow}>Paso 2 de 4 — Tu moto</div>
            <div style={S.q}>¿Cuál es tu moto?</div>
            <MotoSelect
              tipo={answers.tipo}
              value={answers.motoLabel ?? ''}
              onChange={v => set('motoLabel', v || null)}
            />
            {answers.motoLabel && (
              <p style={{ fontFamily: "var(--font-body, 'Barlow', sans-serif)", fontSize: '12px', color: '#E30613', marginBottom: '20px', paddingLeft: '4px' }}>
                {(() => {
                  const m = getMotosByType(answers.tipo!).find(x => x.label === answers.motoLabel)
                  return m ? `${m.modelRef} · DEL ${m.delantera} · TRA ${m.trasera}` : ''
                })()}
              </p>
            )}
            <div style={S.nav}>
              <button style={S.back} onClick={() => setStep(1)}>← Atrás</button>
              <button
                style={S.next(!!answers.motoLabel)}
                disabled={!answers.motoLabel}
                onClick={() => setStep(3)}
              >
                Continuar →
              </button>
            </div>
          </>
        )}

        {/* STEP 3 — Uso */}
        {step === 3 && (
          <>
            <div style={S.eyebrow}>Paso 3 de 4 — Uso principal</div>
            <div style={S.q}>¿Cómo usas tu moto?</div>
            <div style={{ marginBottom: '20px' }}>
              {USO_OPTIONS.map(opt => (
                <div
                  key={opt.value}
                  style={S.optRow(answers.uso === opt.value)}
                  onClick={() => set('uso', opt.value)}
                >
                  <div style={{ fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)", fontWeight: 800, fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#fff', marginBottom: '4px' }}>
                    {opt.label}
                  </div>
                  <div style={{ fontFamily: "var(--font-body, 'Barlow', sans-serif)", fontSize: '12px', color: answers.uso === opt.value ? '#aaa' : '#555', marginBottom: '8px' }}>
                    {opt.desc}
                  </div>
                  <TerrainBar label="Asfalto"  pct={opt.bars.asfalto} color="#185FA5" />
                  <TerrainBar label="Ripio"    pct={opt.bars.ripio}   color="#BA7517" />
                  <TerrainBar label="Off-road" pct={opt.bars.offroad} color="#639922" />
                </div>
              ))}
            </div>
            <div style={S.nav}>
              <button style={S.back} onClick={() => setStep(2)}>← Atrás</button>
              <button
                style={S.next(!!answers.uso)}
                disabled={!answers.uso}
                onClick={() => setStep(4)}
              >
                Continuar →
              </button>
            </div>
          </>
        )}

        {/* STEP 4 — Nivel */}
        {step === 4 && (
          <>
            <div style={S.eyebrow}>Paso 4 de 4 — Nivel de exigencia</div>
            <div style={S.q}>¿Cuál es tu nivel de uso?</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {NIVEL_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  style={S.opt(answers.nivel === opt.value)}
                  onClick={() => set('nivel', opt.value)}
                >
                  <div style={S.optName}>{opt.label}</div>
                  <div style={S.optDesc(answers.nivel === opt.value)}>{opt.desc}</div>
                </button>
              ))}
            </div>
            <div style={S.nav}>
              <button style={S.back} onClick={() => setStep(3)}>← Atrás</button>
              <button
                style={S.next(!!answers.nivel)}
                disabled={!answers.nivel}
                onClick={handleShowResult}
              >
                Ver mi neumático →
              </button>
            </div>
          </>
        )}

        {/* RESULT */}
        {step === 'result' && result && (
          <QuizResultView result={result} onRestart={restart} />
        )}

      </div>

      {trustStrip}
    </div>
  )
}
