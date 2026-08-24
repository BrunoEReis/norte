import { Container } from '@/components/ui/Container'
import { Marquee } from '@/components/ui/Marquee'
import { cn } from '@/lib/utils'

/**
 * "Logos" de clientes desenhados em tipografia: cada marca fictícia recebe
 * peso, tracking e caixa próprios, então a faixa lê como um conjunto de
 * logotipos — sem imagens de terceiros.
 */
const STYLES = [
  'font-display text-[1.35rem] tracking-[-0.02em]',
  'font-sans text-[1.05rem] font-semibold uppercase tracking-[0.22em]',
  'font-sans text-[1.3rem] font-light tracking-[-0.01em]',
  'font-mono text-[1rem] uppercase tracking-[0.12em]',
  'font-sans text-[1.2rem] font-bold tracking-[-0.03em]',
  'font-display text-[1.4rem] italic',
  'font-sans text-[1.05rem] font-medium uppercase tracking-[0.3em]',
]

/**
 * `nowrap` só na faixa: lá a quebra de linha destruiria a animação. Na grade
 * ele precisa poder quebrar — um nome longo como "Vitória Alimentos" estourava
 * a coluna no celular e criava rolagem horizontal na página inteira.
 */
function Wordmark({ name, i, nowrap }: { name: string; i: number; nowrap: boolean }) {
  return (
    <span
      className={cn(
        'text-ink-2 opacity-70 transition-all duration-400 ease-brand hover:text-ink hover:opacity-100',
        nowrap ? 'shrink-0 whitespace-nowrap' : 'max-w-full text-center text-balance',
        STYLES[i % STYLES.length],
      )}
    >
      {name}
    </span>
  )
}

export function LogoCloud({
  label,
  names,
  variant = 'marquee',
  className,
}: {
  label?: string
  names: string[]
  variant?: 'marquee' | 'grid'
  className?: string
}) {
  return (
    <div className={cn('py-12 sm:py-16', className)}>
      <Container size="xl">
        {label && <p className="t-small mb-8 text-center text-ink-3">{label}</p>}
        {variant === 'grid' ? (
          <div className="grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-6">
            {names.map((n, i) => (
              <Wordmark key={n} name={n} i={i} nowrap={false} />
            ))}
          </div>
        ) : (
          <Marquee duration={38} gap="4rem">
            {names.map((n, i) => (
              <Wordmark key={n} name={n} i={i} nowrap={true} />
            ))}
          </Marquee>
        )}
      </Container>
    </div>
  )
}
