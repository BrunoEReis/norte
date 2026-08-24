import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Img } from '@/components/ui/Img'
import { Reveal } from '@/components/ui/Reveal'
import { Stars } from '@/components/ui/Stars'
import { EASE_BRAND } from '@/lib/motion'
import { cn } from '@/lib/utils'

export type Testimonial = {
  quote: string
  name: string
  role: string
  face: string
  rating?: number
  /** Métrica em destaque no card (ex.: "-41% no tempo de fechamento"). */
  metric?: string
}

function Avatar({ id, name, size = 44 }: { id: string; name: string; size?: number }) {
  return (
    <Img
      id={id}
      alt={`Retrato de ${name}`}
      w={size * 2}
      tone="mute"
      className="shrink-0 rounded-full"
      imgClassName="rounded-full"
    />
  )
}

/** Grade de depoimentos — densa, boa para SaaS e DTC. */
export function TestimonialGrid({
  items,
  cols = 3,
  className,
}: {
  items: Testimonial[]
  /** Colunas no desktop. */
  cols?: 2 | 3
  className?: string
}) {
  return (
    <div className={cn('grid gap-4 md:grid-cols-2', cols === 3 && 'lg:grid-cols-3', className)}>
      {items.map((t, i) => (
        <Reveal key={t.name} delay={i * 0.06}>
          <figure className="flex h-full flex-col gap-5 rounded-card border border-line bg-surface p-6 transition-all duration-400 ease-brand hover:-translate-y-1 hover:border-line-2 hover:shadow-soft sm:p-7">
            {t.rating && <Stars value={t.rating} />}
            {t.metric && <p className="font-display text-[1.5rem] leading-tight text-accent">{t.metric}</p>}
            <blockquote className="text-pretty text-ink-2">“{t.quote}”</blockquote>
            <figcaption className="mt-auto flex items-center gap-3 pt-2">
              <div className="size-11">
                <Avatar id={t.face} name={t.name} />
              </div>
              <div className="leading-tight">
                <p className="text-[0.92rem] font-medium text-ink">{t.name}</p>
                <p className="text-[0.82rem] text-ink-3">{t.role}</p>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  )
}

/** Um depoimento por vez, com navegação — bom para páginas mais silenciosas. */
export function TestimonialCarousel({ items, className }: { items: Testimonial[]; className?: string }) {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const t = items[i]

  const go = (d: number) => {
    setDir(d)
    setI((prev) => (prev + d + items.length) % items.length)
  }

  return (
    <div className={cn('relative', className)}>
      <div className="min-h-[19rem] sm:min-h-[16rem]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.figure
            key={i}
            initial={{ opacity: 0, x: dir * 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -28 }}
            transition={{ duration: 0.45, ease: EASE_BRAND }}
            className="flex flex-col gap-7"
          >
            <blockquote className="t-h2 max-w-3xl text-balance font-display text-ink">“{t.quote}”</blockquote>
            <figcaption className="flex items-center gap-4">
              <div className="size-14">
                <Avatar id={t.face} name={t.name} size={56} />
              </div>
              <div className="leading-snug">
                <p className="font-medium text-ink">{t.name}</p>
                <p className="text-[0.88rem] text-ink-3">{t.role}</p>
              </div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Depoimento anterior"
          className="grid size-11 place-items-center rounded-btn border border-line text-ink-2 transition-colors hover:border-ink hover:text-ink"
        >
          <ArrowLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Próximo depoimento"
          className="grid size-11 place-items-center rounded-btn border border-line text-ink-2 transition-colors hover:border-ink hover:text-ink"
        >
          <ArrowRight className="size-4" />
        </button>
        <span className="ml-2 font-mono text-[0.8rem] text-ink-3">
          {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}
