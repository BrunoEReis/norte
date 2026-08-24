import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Check, Sparkles } from 'lucide-react'
import { EASE_BRAND } from '@/lib/motion'
import { cn } from '@/lib/utils'

/* ---------------------------------------------------------------------------
   Mockups de produto desenhados em CSS.
   Preferimos interface "de verdade" a screenshot de banco de imagem: carrega
   rápido, acompanha o tema e pode ser animada.
   Todos os números são fictícios.
--------------------------------------------------------------------------- */

export function AppWindow({
  title,
  children,
  className,
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('overflow-hidden rounded-xl2 border border-line-2 bg-surface shadow-lift', className)}>
      <div className="flex items-center gap-3 border-b border-line bg-raise/60 px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-ink-3/40" />
          <span className="size-2.5 rounded-full bg-ink-3/40" />
          <span className="size-2.5 rounded-full bg-ink-3/40" />
        </span>
        <span className="mx-auto rounded-md border border-line bg-bg px-3 py-1 font-mono text-[0.7rem] text-ink-3">
          {title}
        </span>
      </div>
      {children}
    </div>
  )
}

export function Metric({
  label,
  value,
  delta,
  up = true,
}: {
  label: string
  value: string
  delta: string
  up?: boolean
}) {
  return (
    <div className="rounded-btn border border-line bg-bg p-4">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-3">{label}</p>
      <p className="mt-2 text-[1.5rem] font-semibold leading-none tracking-tight text-ink">{value}</p>
      <p
        className={cn(
          'mt-2 inline-flex items-center gap-1 text-[0.75rem]',
          up ? 'text-accent-2' : 'text-accent',
        )}
      >
        {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
        {delta}
      </p>
    </div>
  )
}

const BARS = [38, 52, 44, 61, 55, 72, 66, 84, 76, 92, 88, 100]

export function BarChart({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <div className={cn('flex h-32 items-end gap-1.5 sm:h-40 sm:gap-2', className)} aria-hidden="true">
      {BARS.map((h, i) => (
        <motion.span
          key={i}
          initial={reduce ? { opacity: 0 } : { scaleY: 0 }}
          whileInView={reduce ? { opacity: 1 } : { scaleY: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: i * 0.045, ease: EASE_BRAND }}
          style={{ height: `${h}%`, transformOrigin: 'bottom' }}
          className={cn('flex-1 rounded-t-[3px]', i >= BARS.length - 3 ? 'bg-accent' : 'bg-line-2')}
        />
      ))}
    </div>
  )
}

export function Spark({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <svg viewBox="0 0 120 32" className={cn('h-8 w-full', className)} fill="none" aria-hidden="true">
      <motion.path
        d="M0 26 L14 22 L28 25 L42 16 L56 19 L70 11 L84 14 L98 6 L120 2"
        stroke="var(--c-accent-2)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? { opacity: 0 } : { pathLength: 0 }}
        whileInView={reduce ? { opacity: 1 } : { pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE_BRAND }}
      />
    </svg>
  )
}

export function InsightCard({
  title,
  body,
  actions = ['Aplicar', 'Ver origem do dado'],
  className,
}: {
  title: string
  body: string
  actions?: string[]
  className?: string
}) {
  return (
    <div className={cn('rounded-btn border border-accent/35 bg-accent/[0.07] p-4', className)}>
      <p className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent">
        <Sparkles className="size-3.5" aria-hidden="true" />
        {title}
      </p>
      <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink">{body}</p>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {actions.map((a, i) => (
          <span
            key={a}
            className={cn(
              'rounded-md px-2.5 py-1 text-[0.72rem]',
              i === 0 ? 'bg-accent text-on-accent' : 'border border-line text-ink-2',
            )}
          >
            {a}
          </span>
        ))}
      </div>
    </div>
  )
}

export function ChecklistPanel({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((t, i) => (
        <motion.li
          key={t}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5, ease: EASE_BRAND }}
          className="flex items-center gap-3 rounded-btn border border-line bg-bg px-3.5 py-3 text-[0.85rem] text-ink-2"
        >
          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent-2/15 text-accent-2">
            <Check className="size-3" />
          </span>
          {t}
        </motion.li>
      ))}
    </ul>
  )
}

/** Painel completo usado no hero e nas abas. */
export function Dashboard({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn('grid gap-4 p-4 sm:p-5', compact ? '' : 'lg:grid-cols-[1.5fr_1fr]')}>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Metric label="Margem líquida" value="18,4%" delta="+2,1 p.p." />
          <Metric label="Ruptura" value="1,9%" delta="-3,4 p.p." up={false} />
          <Metric label="Ciclo de caixa" value="27 d" delta="-6 dias" />
        </div>
        <div className="rounded-btn border border-line bg-bg p-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[0.82rem] font-medium text-ink">Receita por praça · 12 semanas</p>
            <span className="font-mono text-[0.68rem] text-ink-3">atualizado 4 min</span>
          </div>
          <BarChart />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <InsightCard
          title="Órion detectou"
          body="A praça Sul perde 3,2 p.p. de margem toda quinta por remarcação manual. Corrigir a regra recupera R$ 214 mil/mês."
        />
        <div className="rounded-btn border border-line bg-bg p-4">
          <p className="text-[0.82rem] font-medium text-ink">Previsão de demanda</p>
          <Spark className="mt-3" />
          <p className="mt-2 font-mono text-[0.68rem] text-ink-3">erro médio 3,1% · 8 semanas</p>
        </div>
      </div>
    </div>
  )
}
