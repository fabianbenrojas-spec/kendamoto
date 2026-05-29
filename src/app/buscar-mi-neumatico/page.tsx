import type { Metadata } from 'next'
import { TireQuiz } from './TireQuiz'
import { absoluteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Busca tu neumático Kenda ideal | Quiz en 4 pasos | Kenda Moto Chile',
  description: 'Quiz gratuito: encuentra el neumático Kenda perfecto para tu moto en 4 preguntas. Medida exacta delantera y trasera según tu modelo. Distribuidor oficial ZOFRI Iquique.',
  alternates: {
    canonical: absoluteUrl('/buscar-mi-neumatico/'),
  },
  openGraph: {
    title: 'Encuentra tu neumático Kenda en 4 pasos',
    description: 'Quiz gratuito para encontrar la medida exacta para tu moto. Resultado inmediato con precio y enlace directo.',
    url: absoluteUrl('/buscar-mi-neumatico/'),
  },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo elegir el neumático Kenda correcto para tu moto en Chile',
  description: 'Guía en 4 pasos para encontrar el neumático Kenda ideal según tu tipo de moto, modelo, uso principal y nivel de exigencia.',
  totalTime: 'PT2M',
  supply: [
    { '@type': 'HowToSupply', name: 'Moto con neumáticos a reemplazar' },
    { '@type': 'HowToSupply', name: 'Modelo exacto de tu moto' },
  ],
  tool: [
    { '@type': 'HowToTool', name: 'Buscador de neumático Kenda Moto Chile' },
  ],
  step: [
    {
      '@type': 'HowToStep',
      name: 'Selecciona el tipo de moto',
      text: 'Elige entre Adventure, Enduro, Motocross o Dual Sport según tu tipo de moto.',
      position: 1,
    },
    {
      '@type': 'HowToStep',
      name: 'Indica tu modelo de moto',
      text: 'Selecciona la marca y modelo exacto de tu moto del listado de compatibilidades.',
      position: 2,
    },
    {
      '@type': 'HowToStep',
      name: 'Define tu uso principal',
      text: 'Indica si usas la moto principalmente en uso mixto carretera-ripio, off-road intenso o ciudad y carretera.',
      position: 3,
    },
    {
      '@type': 'HowToStep',
      name: 'Especifica tu nivel de exigencia',
      text: 'Selecciona entre competición, sport y aventura, o paseo y uso diario.',
      position: 4,
    },
    {
      '@type': 'HowToStep',
      name: 'Recibe tu recomendación personalizada',
      text: 'El sistema muestra el modelo Kenda recomendado, las medidas exactas delantera y trasera para tu moto, el precio y el enlace directo para comprar.',
      position: 5,
    },
  ],
}

export default function BuscarMiNeumaticoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <main style={{ background: 'var(--ink)', minHeight: '100vh', padding: '48px 0 80px' }}>
        <div className="wrap" style={{ maxWidth: '600px' }}>
          <div style={{ marginBottom: '32px' }}>
            <div
              className="eyebrow"
              style={{ color: 'var(--kenda)', marginBottom: '8px' }}
            >
              Buscador inteligente
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(28px, 5vw, 48px)',
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                lineHeight: 1,
                color: 'white',
                marginBottom: '12px',
              }}
            >
              Encuentra tu neumático Kenda
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'var(--dim)',
                lineHeight: 1.6,
              }}
            >
              4 preguntas · Medida exacta · Resultado en menos de 2 minutos
            </p>
          </div>

          <TireQuiz />
        </div>
      </main>
    </>
  )
}
