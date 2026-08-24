import { Check, Sparkles } from 'lucide-react'
import { Container, Section } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Pricing } from '@/components/site/Pricing'
import { CONDICOES, CUIDADO, EXTRAS, INCLUSO, PACOTES } from '@/lib/precos'
import { brl } from '@/lib/utils'
import { cn } from '@/lib/utils'

/**
 * A parte comercial do showcase. Substituiu a seção "Como foi feito", que
 * contava a arquitetura do código — informação que não ajuda nem o cliente
 * nem quem apresenta os modelos. Os mesmos diferenciais continuam aqui, mas
 * ditos como benefício, em "Incluso em qualquer pacote".
 *
 * Todo número vem de `src/lib/precos.ts`.
 */
export function Precos() {
  return (
    <>
      {/* PACOTES ---------------------------------------------------------- */}
      <Section id="planos" className="border-t border-line bg-wash">
        <Container size="xl">
          <SectionHeading
            eyebrow="Investimento"
            title="Quanto custa colocar a sua no ar"
            description="Três níveis de desenvolvimento com preço fechado. O que sair do escopo entra como funcionalidade avulsa, com valor de tabela — sem surpresa no meio do projeto."
          />

          <Pricing plans={PACOTES} cycles={false} className="mt-14" />

          <Reveal delay={0.15} className="mt-8">
            <ul className="flex flex-col gap-3 rounded-card border border-line bg-surface p-6 sm:p-7">
              {CONDICOES.map((c) => (
                <li key={c} className="flex items-start gap-3 text-[0.92rem] text-ink-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-pretty">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* O que justifica o preço, dito para quem compra ----------------- */}
          <div className="mt-20 border-t border-line pt-14">
            <Reveal>
              <h3 className="t-h3 font-display">Incluso em qualquer pacote</h3>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {INCLUSO.map((item, i) => {
                const Icon = item.icon
                return (
                  <Reveal key={item.titulo} delay={i * 0.07}>
                    <div className="flex h-full gap-5 rounded-card border border-line bg-surface p-7">
                      <span className="grid size-11 shrink-0 place-items-center rounded-btn border border-line bg-raise text-accent">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h4 className="font-display text-[1.1rem] text-ink">{item.titulo}</h4>
                        <p className="mt-2 text-[0.94rem] text-pretty text-ink-2">{item.texto}</p>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* EXTRAS ----------------------------------------------------------- */}
      <Section id="extras" className="border-t border-line">
        <Container size="xl">
          <SectionHeading
            eyebrow="Funcionalidades avulsas"
            title="Some só o que o seu negócio precisa"
            description="Cada item entra em cima de qualquer pacote e o valor é fechado antes de começar. Combinações comuns: catálogo com filtro numa loja, agendamento numa clínica, carrinho numa adega."
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-x-14">
            {EXTRAS.map((g, gi) => (
              <Reveal key={g.grupo} delay={gi * 0.08}>
                <h3 className="t-eyebrow text-ink-3">{g.grupo}</h3>
                <ul className="mt-5 border-t border-line">
                  {g.itens.map((item) => (
                    <li
                      key={item.nome}
                      className="flex items-start justify-between gap-6 border-b border-line py-5"
                    >
                      <div>
                        <p className="font-medium text-ink">{item.nome}</p>
                        <p className="mt-1 text-[0.88rem] text-pretty text-ink-2">{item.detalhe}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-display text-[1.15rem] tabular-nums text-ink">
                          {item.preco === null ? 'Sob consulta' : brl(item.preco)}
                        </p>
                        {item.medida && <p className="mt-0.5 text-[0.78rem] text-ink-3">{item.medida}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          {/* RECORRÊNCIA --------------------------------------------------- */}
          <div className="mt-20 border-t border-line pt-14">
            <Reveal>
              <h3 className="t-h3 font-display">Depois que estiver no ar</h3>
              <p className="mt-3 max-w-xl text-pretty text-ink-2">
                Opcional. Nenhum pacote obriga a contratar — a página funciona sozinha e você pode hospedar
                onde quiser.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {CUIDADO.map((c, i) => (
                <Reveal key={c.nome} delay={i * 0.08}>
                  <div
                    className={cn(
                      'flex h-full flex-col gap-4 rounded-card border p-7',
                      c.destaque ? 'border-accent bg-surface' : 'border-line bg-surface',
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="font-display text-[1.15rem] text-ink">{c.nome}</h4>
                      {c.destaque && <Sparkles className="size-4 shrink-0 text-accent" aria-hidden="true" />}
                    </div>
                    <p className="flex items-baseline gap-1.5">
                      <span className="font-display text-[2rem] leading-none tabular-nums text-ink">
                        {brl(c.preco)}
                      </span>
                      <span className="text-[0.85rem] text-ink-3">/mês</span>
                    </p>
                    <p className="text-[0.92rem] text-pretty text-ink-2">{c.descricao}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
