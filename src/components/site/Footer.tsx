import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'

export type FooterColumn = { title: string; links: string[] }

export function Footer({
  brand,
  tagline,
  columns,
  note,
  wordmark,
  className,
}: {
  brand: ReactNode
  tagline: string
  columns: FooterColumn[]
  note?: ReactNode
  /** Assinatura tipográfica gigante na base da página. */
  wordmark?: string
  className?: string
}) {
  return (
    <footer className={cn('border-t border-line bg-wash pt-16 sm:pt-20', className)}>
      <Container size="xl">
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">{brand}</div>
            <p className="max-w-xs text-pretty text-ink-2">{tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <h3 className="t-eyebrow text-ink-3">{col.title}</h3>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#top"
                        className="text-[0.92rem] text-ink-2 transition-colors duration-200 hover:text-ink"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {wordmark && (
          <div className="mt-16 select-none overflow-hidden border-t border-line pt-8 sm:mt-20">
            <span
              className="block w-full whitespace-nowrap font-display leading-[0.85] text-ink/[0.09]"
              style={{ fontSize: 'clamp(3.5rem, 16vw, 15rem)' }}
              aria-hidden="true"
            >
              {wordmark}
            </span>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-3 border-t border-line py-8 text-[0.82rem] text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>{note}</p>
          <p className="text-pretty">Página demonstrativa — marca, textos e dados são fictícios.</p>
        </div>
      </Container>
    </footer>
  )
}
