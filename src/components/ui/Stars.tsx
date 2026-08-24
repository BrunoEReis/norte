import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Stars({
  value = 5,
  size = 'sm',
  className,
}: {
  value?: number
  size?: 'sm' | 'md'
  className?: string
}) {
  const px = size === 'md' ? 'size-[18px]' : 'size-[14px]'
  return (
    <span
      className={cn('inline-flex items-center gap-0.5 text-accent', className)}
      aria-label={`${value} de 5 estrelas`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn(px, i < value ? 'fill-current' : 'opacity-25')} aria-hidden="true" />
      ))}
    </span>
  )
}
