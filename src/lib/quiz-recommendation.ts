import type { MotoEntry, MotoType } from '@/data/moto-compatibility'
import { getMotoByLabel } from '@/data/moto-compatibility'

export type UsoPrincipal = 'mixto' | 'offroad' | 'ciudad'
export type NivelUso = 'comp' | 'sport' | 'leisure'

export interface QuizAnswers {
  tipo: MotoType
  motoLabel: string
  uso: UsoPrincipal
  nivel: NivelUso
}

export interface QuizResult {
  moto: MotoEntry
  razon: string
  alertaTT?: string
  cuotasMensual: number
}

const RAZONES: Record<string, Record<UsoPrincipal, string>> = {
  'trail-adventure': {
    mixto: 'El K784 Big Block es el neumático trail más vendido en Chile para uso mixto. Su construcción bias-belt ofrece estabilidad en asfalto y sus bloques grandes dan tracción en ripio suelto — perfecto para la Carretera Austral o los caminos cordilleranos.',
    offroad: 'Para tu uso off-road intenso, el K784 Big Block maximiza la tracción con sus bloques de gran taco, manteniendo la homologación DOT para volver a la carretera. Durabilidad comprobada en el ripio del Atacama.',
    ciudad: 'El K784 en versión street ofrece el equilibrio perfecto entre confort en ciudad y grip en el ripio del fin de semana. La construcción tubeless hace la gestión de presiones más fácil en viajes largos.',
  },
  'enduro': {
    mixto: 'El sistema K779 + K778 Knarly es el par de enduro diseñado para terrenos duros e intermedios — la combinación del norte rocoso chileno. Compuesto duro para máxima durabilidad.',
    offroad: 'El sistema K779 (delantera) + K778 (trasera) Knarly es la combinación estándar para enduro de competición. Homologado FIM. Bloques escalonados bidireccionales para tracción extrema en piedra, tierra compacta y roca.',
    ciudad: 'El K778/K779 Knarly es la opción correcta para tu moto de enduro. Construcción TT — asegúrate de montar con cámara de aire compatible con tu llanta de radios de acero.',
  },
  'cross-motocross': {
    mixto: 'El K785 Millville II es el estándar MX para terrenos blandos e intermedios. Diseño direccional con bloques centrales altos para máxima propulsión en pista.',
    offroad: 'Para competición MX, el K785 Millville II ofrece bloques centrales de gran altura para propulsión máxima y hombros anchos para trazadas precisas en las esquinas de tierra blanda.',
    ciudad: 'El K785 Millville II es la opción correcta para tu moto de motocross. Construcción TT estándar MX.',
  },
  'dual-sport': {
    mixto: 'El K761 Dual Sport equilibra bajo ruido en asfalto con grip suficiente en ripio compacto. Banda central continua para ciudad, bloques en hombro para caminos de tierra y ripio suave.',
    offroad: 'Para tu uso mixto con bastante off-road, el K761 Dual Sport te da tracción en ripio compacto sin sacrificar la durabilidad en el asfalto de los días laborales.',
    ciudad: 'El K761 Dual Sport es el neumático ideal para commuting diario con salidas ocasionales. Bajo ruido, alta durabilidad en asfalto, aprobado DOT para vías públicas de Chile.',
  },
}

export function getRecommendation(answers: QuizAnswers): QuizResult | null {
  const moto = getMotoByLabel(answers.motoLabel)
  if (!moto) return null

  const razon = RAZONES[moto.categoria]?.[answers.uso]
    ?? `El ${moto.modelRef} es la recomendación correcta para tu ${moto.label} según tu perfil de uso.`

  const total = moto.priceDelantera + moto.priceTrasera

  return {
    moto,
    razon,
    alertaTT: moto.constructionType === 'TT'
      ? 'Construcción TT (con cámara): asegúrate de montar con cámara de aire Kenda compatible con tu llanta de radios.'
      : undefined,
    cuotasMensual: Math.round(total / 12),
  }
}
