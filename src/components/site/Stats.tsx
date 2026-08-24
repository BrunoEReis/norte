import { Counter } from '@/components/ui/Counter'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

export type Stat = {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
  note?: string
}

export function Stats({
  items,
  variant = 'row',
  className,
}: {
  items: Stat[]
  /** `row` = linha divisória; `cards` = blocos; `stack` = coluna editorial. */
  variant?: 'row' | 'cards' | 'stack'
  className?: string
}) {
  return (
    <div
      className={cn(
        variant === 'row' && 'grid grid-cols-2 gap-px overflow-hidden rounded-card bg-line lg:grid-cols-4',
        variant === 'cards' && 'grid gap-4 sm:grid-cols-2 lg:grid-cols-4',
        variant === 'stack' && 'flex flex-col divide-y divide-line border-y border-line',
        className,
      )}
    >
      {items.map((s, i) => (
        <Reveal
          key={s.label}
          delay={i * 0.07}
          className={cn(
            variant === 'row' && 'bg-bg p-6 sm:p-8',
            variant === 'cards' && 'rounded-card border border-line bg-surface p-6 sm:p-7',
            variant === 'stack' && 'flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:gap-5',
          )}
        >
          <span
            className={cn(
              'block font-display tabular-nums leading-none text-ink',
              variant === 'stack' ? 'text-[clamp(2.2rem,4vw,3.1rem)]' : 'text-[clamp(2rem,3.6vw,3rem)]',
            )}
          >
            {s.prefix}
            <Counter to={s.value} decimals={s.decimals} />
            {s.suffix}
          </span>
          <span
            className={cn(
              'block text-pretty text-[0.94rem] text-ink-2',
              variant === 'stack' ? 'sm:mt-0' : 'mt-2',
            )}
          >
            {s.label}
          </span>
          {s.note && <span className="mt-1 block text-[0.8rem] text-ink-3">{s.note}</span>}
        </Reveal>
      ))}
    </div>
  )
}
