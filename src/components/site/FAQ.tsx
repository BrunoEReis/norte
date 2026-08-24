import type { ReactNode } from 'react'
import { Accordion } from '@/components/ui/Accordion'
import type { QA } from '@/components/ui/Accordion'
import { Container, Section } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/utils'

export function FAQ({
  id = 'faq',
  eyebrow = 'Dúvidas frequentes',
  title,
  description,
  items,
  aside,
  className,
}: {
  id?: string
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  items: QA[]
  /** Bloco lateral opcional (contato, garantia, atendimento). */
  aside?: ReactNode
  className?: string
}) {
  return (
    <Section id={id} className={cn(className)}>
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow={eyebrow} title={title} description={description} />
            {aside && <div className="mt-8">{aside}</div>}
          </div>
          <Accordion items={items} />
        </div>
      </Container>
    </Section>
  )
}
