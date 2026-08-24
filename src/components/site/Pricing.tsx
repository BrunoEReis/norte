import { useState } from 'react'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { EASE_BRAND } from '@/lib/motion'
import { brl, cn } from '@/lib/utils'

export type Plan = {
  name: string
  description: string
  /** Par [ciclo 1, ciclo 2] para recorrência, número único para projeto fechado. */
  price: [number, number] | number | 'sob-consulta'
  unit?: string
  /** Prefixa o valor com "a partir de" — para escopo aberto. */
  from?: boolean
  features: string[]
  cta: string
  highlight?: boolean
  badge?: string
}

export function Pricing({
  plans,
  /** `false` esconde o alternador — use em preço de projeto fechado. */
  cycles = ['Mensal', 'Anual · 2 meses grátis'],
  onSelect,
  className,
}: {
  plans: Plan[]
  cycles?: [string, string] | false
  onSelect?: (plan: Plan) => void
  className?: string
}) {
  const [cycle, setCycle] = useState<0 | 1>(0)
  /** Se um plano tem "a partir de", todos reservam a linha — senão os valores
      saem desalinhados entre os cards. */
  const algumFrom = plans.some((p) => p.from)

  return (
    <div className={className}>
      {cycles !== false && (
        <div className="mb-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Ciclo de cobrança"
            className="relative inline-flex rounded-btn border border-line bg-surface p-1"
          >
            {cycles.map((label, i) => (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={cycle === i}
                onClick={() => setCycle(i as 0 | 1)}
                className={cn(
                  'relative rounded-btn px-4 py-2 text-[0.85rem] font-medium transition-colors duration-300 sm:px-5',
                  cycle === i ? 'text-on-accent' : 'text-ink-2 hover:text-ink',
                )}
              >
                {/* A pílula NÃO pode usar z-index negativo: o `relative` do botão
                    não cria contexto de empilhamento, então ela iria parar atrás
                    do fundo do container e o rótulo ativo (text-on-accent) some
                    contra a superfície. Ela fica em fluxo normal e o rótulo sobe
                    com `relative z-10`. */}
                {cycle === i && (
                  <motion.span
                    layoutId="pricing-cycle"
                    transition={{ duration: 0.4, ease: EASE_BRAND }}
                    className="absolute inset-0 rounded-btn bg-accent"
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={cn('grid gap-5', plans.length === 2 ? 'md:grid-cols-2' : 'lg:grid-cols-3')}>
        {plans.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.08} className="h-full">
            <div
              className={cn(
                'flex h-full flex-col gap-6 rounded-card border p-7 transition-all duration-400 ease-brand sm:p-8',
                plan.highlight
                  ? 'border-accent bg-surface shadow-lift lg:-translate-y-3'
                  : 'border-line bg-surface hover:border-line-2',
              )}
            >
              {/* A tarja divide a linha só com o nome. Se ela ficasse ao lado
                  do bloco inteiro, estreitaria a descrição e o card em destaque
                  quebraria numa linha a mais que os vizinhos — desalinhando os
                  três preços. */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="t-h3 font-display text-ink">{plan.name}</h3>
                  {plan.badge && (
                    <span className="mt-0.5 shrink-0 rounded-full bg-accent px-3 py-1 text-[0.7rem] font-medium uppercase tracking-wider text-on-accent">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-pretty text-[0.9rem] text-ink-2">{plan.description}</p>
              </div>

              <div className="border-y border-line py-6">
                {algumFrom && (
                  <p
                    className={cn('mb-1.5 text-[0.82rem] text-ink-3', !plan.from && 'invisible')}
                    aria-hidden={!plan.from}
                  >
                    a partir de
                  </p>
                )}
                {plan.price === 'sob-consulta' ? (
                  <p className="font-display text-[2rem] leading-none text-ink">Sob consulta</p>
                ) : (
                  <p className="flex items-baseline gap-1.5">
                    <span className="font-display text-[clamp(2.2rem,4vw,2.8rem)] leading-none tabular-nums text-ink">
                      {brl(Array.isArray(plan.price) ? plan.price[cycle] : plan.price)}
                    </span>
                    <span className="text-[0.88rem] text-ink-3">{plan.unit ?? '/mês'}</span>
                  </p>
                )}
              </div>

              <ul className="flex flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[0.92rem] text-ink-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-pretty">{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlight ? 'solid' : 'outline'}
                size="lg"
                full
                arrow
                className="mt-auto"
                onClick={() => onSelect?.(plan)}
              >
                {plan.cta}
              </Button>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
