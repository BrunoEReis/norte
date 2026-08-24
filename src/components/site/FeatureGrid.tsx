import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

export type Feature = {
  icon?: LucideIcon
  title: string
  text: string
  /** Ocupa duas colunas no bento. */
  wide?: boolean
  /** Conteúdo visual dentro do card (mockup, gráfico, imagem). */
  visual?: ReactNode
}

export function FeatureGrid({
  items,
  variant = 'grid',
  className,
}: {
  items: Feature[]
  /** `bento` alterna larguras; `grid` é uniforme; `list` é editorial numerada. */
  variant?: 'bento' | 'grid' | 'list'
  className?: string
}) {
  if (variant === 'list') {
    return (
      <div className={cn('divide-y divide-line border-y border-line', className)}>
        {items.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.05}>
            <div className="group grid gap-3 py-7 md:grid-cols-[6rem_1fr_1.1fr] md:items-baseline md:gap-8 md:py-9">
              <span className="font-mono text-[0.8rem] text-ink-3">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="t-h3 font-display text-ink transition-transform duration-500 ease-brand md:group-hover:translate-x-1.5">
                {f.title}
              </h3>
              <p className="text-pretty text-ink-2">{f.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'grid gap-4',
        variant === 'bento' ? 'md:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {items.map((f, i) => {
        const Icon = f.icon
        return (
          <Reveal
            key={f.title}
            delay={i * 0.06}
            className={cn(variant === 'bento' && f.wide && 'md:col-span-2')}
          >
            <div className="group flex h-full flex-col gap-4 rounded-card border border-line bg-surface p-6 transition-all duration-400 ease-brand hover:border-line-2 hover:shadow-soft sm:p-7">
              {Icon && (
                <span className="grid size-11 place-items-center rounded-btn border border-line bg-raise text-accent transition-colors duration-400 group-hover:border-accent/40">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
              )}
              <h3 className="t-h3 font-display text-ink">{f.title}</h3>
              <p className="text-pretty text-[0.95rem] text-ink-2">{f.text}</p>
              {f.visual && <div className="mt-2">{f.visual}</div>}
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
