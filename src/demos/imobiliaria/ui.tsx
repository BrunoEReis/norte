import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Img } from '@/components/ui/Img'
import { EASE_BRAND } from '@/lib/motion'
import { cn } from '@/lib/utils'

export type Room = { x: number; y: number; w: number; h: number; label: string }

/**
 * Planta baixa desenhada em SVG: escala com a tela, acompanha a paleta do tema
 * e anima o traço na entrada — sem depender de imagem rasterizada.
 */
export function FloorPlan({ rooms, className }: { rooms: Room[]; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <svg
      viewBox="0 0 400 300"
      className={cn('w-full', className)}
      role="img"
      aria-label="Planta baixa ilustrativa"
    >
      <rect x="4" y="4" width="392" height="292" fill="none" stroke="var(--c-line-2)" strokeWidth="1" />
      {rooms.map((r, i) => (
        <g key={r.label}>
          <motion.rect
            x={r.x}
            y={r.y}
            width={r.w}
            height={r.h}
            fill="var(--c-surface)"
            stroke="var(--c-accent)"
            strokeWidth="0.9"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: EASE_BRAND }}
            style={{ transformOrigin: `${r.x + r.w / 2}px ${r.y + r.h / 2}px` }}
          />
          <text
            x={r.x + r.w / 2}
            y={r.y + r.h / 2 + 3}
            textAnchor="middle"
            className="fill-[var(--c-ink-2)] font-sans"
            style={{ fontSize: 9, letterSpacing: '0.06em' }}
          >
            {r.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export type Shot = { id: string; caption: string; alt: string }

/** Galeria com rolagem horizontal por snap e controles de teclado/mouse. */
export function Gallery({ shots }: { shots: Shot[] }) {
  const track = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: number) => {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 720), behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={track}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        tabIndex={0}
        aria-label="Galeria do empreendimento"
      >
        {shots.map((s) => (
          <figure key={s.id} className="w-[82vw] shrink-0 snap-start sm:w-[58vw] lg:w-[42vw]">
            <Img id={s.id} alt={s.alt} w={1400} tone="mute" className="aspect-[3/2] w-full" />
            <figcaption className="mt-3 flex items-center gap-3 text-[0.82rem] uppercase tracking-[0.14em] text-ink-3">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              {s.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Imagem anterior"
          className="grid size-11 place-items-center border border-line-2 text-ink-2 transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Próxima imagem"
          className="grid size-11 place-items-center border border-line-2 text-ink-2 transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  )
}
