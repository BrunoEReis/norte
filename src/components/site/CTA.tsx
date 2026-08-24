import type { ReactNode } from 'react'
import { Container, Section } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

/**
 * Bloco de conversão final. `band` fecha a página com peso;
 * `editorial` usa tipografia grande e silêncio ao redor.
 */
export function CTA({
  id = 'cta',
  eyebrow,
  title,
  description,
  actions,
  note,
  variant = 'band',
  className,
}: {
  id?: string
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  actions: ReactNode
  note?: ReactNode
  variant?: 'band' | 'editorial'
  className?: string
}) {
  if (variant === 'editorial') {
    return (
      <Section id={id} className={cn('overflow-hidden', className)}>
        <Container size="xl">
          <Reveal className="flex flex-col items-start gap-8">
            {eyebrow && <span className="t-eyebrow text-ink-3">{eyebrow}</span>}
            <h2 className="t-display max-w-4xl text-balance font-display">{title}</h2>
            {description && <p className="t-lead max-w-xl text-pretty text-ink-2">{description}</p>}
            <div className="flex flex-wrap items-center gap-3">{actions}</div>
            {note && <p className="t-small text-ink-3">{note}</p>}
          </Reveal>
        </Container>
      </Section>
    )
  }

  return (
    <Section id={id} className={cn(className)}>
      <Container size="xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl2 border border-line bg-raise px-6 py-14 text-center sm:px-12 sm:py-20">
            <div
              className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-56 w-[36rem] max-w-full rounded-full opacity-40 blur-3xl"
              style={{ background: 'radial-gradient(circle, var(--c-accent) 0%, transparent 70%)' }}
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-center gap-6">
              {eyebrow && <span className="t-eyebrow text-ink-3">{eyebrow}</span>}
              <h2 className="t-h1 max-w-3xl text-balance font-display">{title}</h2>
              {description && <p className="t-lead max-w-xl text-pretty text-ink-2">{description}</p>}
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">{actions}</div>
              {note && <p className="t-small text-ink-3">{note}</p>}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
