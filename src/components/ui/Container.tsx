import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

const WIDTHS = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-[1600px]',
} as const

export function Container({
  as: Tag = 'div',
  size = 'xl',
  className,
  children,
}: {
  as?: ElementType
  size?: keyof typeof WIDTHS
  className?: string
  children: ReactNode
}) {
  return <Tag className={cn('mx-auto w-full px-5 sm:px-8', WIDTHS[size], className)}>{children}</Tag>
}

/**
 * Ritmo vertical das seções. O espaçamento vem de um prop (não de utilitários
 * no className) para não competir por especificidade com a classe base.
 */
const PAD = {
  lg: 'py-20 sm:py-28 lg:py-32',
  md: 'py-14 sm:py-20',
  sm: 'py-8 sm:py-12',
  none: '',
} as const

export function Section({
  id,
  className,
  children,
  pad = 'lg',
  ...rest
}: {
  id?: string
  className?: string
  children: ReactNode
  pad?: keyof typeof PAD
  'data-invert'?: boolean
}) {
  return (
    <section id={id} className={cn('relative', PAD[pad], className)} {...rest}>
      {children}
    </section>
  )
}
