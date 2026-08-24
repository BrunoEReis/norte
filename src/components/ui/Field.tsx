import { useId } from 'react'
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

const control =
  'w-full rounded-btn border border-line-2 bg-surface px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-3 ' +
  'transition-colors duration-200 hover:border-ink-3 focus:border-accent focus:outline-none'

function Wrapper({
  label,
  hint,
  id,
  children,
}: {
  label: string
  hint?: ReactNode
  id: string
  children: ReactNode
}) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <span className="text-[0.78rem] font-medium uppercase tracking-[0.1em] text-ink-3">{label}</span>
      {children}
      {hint && <span className="t-small text-ink-3">{hint}</span>}
    </label>
  )
}

export function Input({
  label,
  hint,
  className,
  ...rest
}: { label: string; hint?: ReactNode } & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId()
  return (
    <Wrapper label={label} hint={hint} id={id}>
      <input id={id} className={cn(control, className)} {...rest} />
    </Wrapper>
  )
}

export function Select({
  label,
  hint,
  className,
  children,
  ...rest
}: { label: string; hint?: ReactNode } & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId()
  return (
    <Wrapper label={label} hint={hint} id={id}>
      <select id={id} className={cn(control, 'appearance-none pr-10', className)} {...rest}>
        {children}
      </select>
    </Wrapper>
  )
}

export function Textarea({
  label,
  hint,
  className,
  ...rest
}: { label: string; hint?: ReactNode } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId()
  return (
    <Wrapper label={label} hint={hint} id={id}>
      <textarea id={id} rows={4} className={cn(control, 'resize-none', className)} {...rest} />
    </Wrapper>
  )
}
