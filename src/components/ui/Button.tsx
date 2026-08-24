import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'solid' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

type Base = {
  variant?: ButtonVariant
  size?: ButtonSize
  arrow?: boolean
  full?: boolean
  children: ReactNode
  className?: string
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-[0.82rem] gap-1.5',
  md: 'h-11 px-5 text-[0.92rem] gap-2',
  lg: 'h-[3.35rem] px-7 text-[0.98rem] gap-2.5',
}

const VARIANTS: Record<ButtonVariant, string> = {
  solid:
    'bg-accent text-on-accent border border-transparent hover:brightness-110 active:brightness-95 shadow-soft',
  outline: 'border border-line-2 text-ink hover:border-ink hover:bg-ink/[0.04]',
}

export function buttonClasses({
  variant = 'solid',
  size = 'md',
  full,
  className,
}: Pick<Base, 'variant' | 'size' | 'full' | 'className'>) {
  return cn(
    'group/btn relative inline-flex items-center justify-center rounded-btn font-medium',
    'transition-[background-color,color,border-color,opacity,filter,transform] duration-300 ease-brand',
    'whitespace-nowrap select-none disabled:opacity-50 disabled:pointer-events-none',
    SIZES[size],
    VARIANTS[variant],
    full && 'w-full',
    className,
  )
}

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          className="size-4 shrink-0 transition-transform duration-300 ease-brand group-hover/btn:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  )
}

export function Button({
  variant,
  size,
  arrow,
  full,
  className,
  children,
  ...rest
}: Base & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClasses({ variant, size, full, className })} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  )
}

export function ButtonLink({
  variant,
  size,
  arrow,
  full,
  className,
  children,
  ...rest
}: Base & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={buttonClasses({ variant, size, full, className })} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </a>
  )
}
