import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { cn } from '@/lib/utils'

function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('t-eyebrow inline-flex items-center gap-2 text-ink-3', className)}>
      <span className="h-px w-6 bg-current opacity-50" aria-hidden="true" />
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  size = 'h2',
  className,
  titleClassName,
  actions,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  size?: 'h1' | 'h2'
  className?: string
  titleClassName?: string
  actions?: ReactNode
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        actions && 'md:flex-row md:items-end md:justify-between md:gap-10',
        className,
      )}
    >
      <div
        className={cn('flex flex-col gap-4', align === 'center' && 'items-center', actions && 'md:max-w-2xl')}
      >
        {eyebrow && (
          <Reveal y={10} duration={0.5}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <Reveal delay={0.06}>
          <h2 className={cn(size === 'h1' ? 't-h1' : 't-h2', 'font-display text-balance', titleClassName)}>
            {title}
          </h2>
        </Reveal>
        {description && (
          <Reveal delay={0.12}>
            <p className={cn('t-lead max-w-xl text-pretty text-ink-2', align === 'center' && 'mx-auto')}>
              {description}
            </p>
          </Reveal>
        )}
      </div>
      {actions && (
        <Reveal delay={0.18} className="shrink-0">
          {actions}
        </Reveal>
      )}
    </div>
  )
}
