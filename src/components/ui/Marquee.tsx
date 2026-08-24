import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Faixa infinita em CSS puro (sem JS de scroll). Pausa no hover e e desligada
 * por prefers-reduced-motion.
 */
export function Marquee({
  children,
  duration = 42,
  gap = '3.5rem',
  reverse,
  className,
}: {
  children: ReactNode
  duration?: number
  gap?: string
  reverse?: boolean
  className?: string
}) {
  return (
    <div
      className={cn('marquee', className)}
      data-reverse={reverse ? 'true' : undefined}
      style={{ ['--mq-dur' as string]: duration + 's', ['--mq-gap' as string]: gap }}
    >
      <div className="marquee__track">{children}</div>
      <div className="marquee__track" aria-hidden="true">
        {children}
      </div>
    </div>
  )
}
