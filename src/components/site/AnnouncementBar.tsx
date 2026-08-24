import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Faixa fixa acima da navbar (frete, horário, aviso de campanha).
 *
 * Fica acima da navbar no eixo Z e a empurra para baixo — por isso a `Navbar`
 * dessas páginas recebe `offsetTop={36}`. As duas partes do texto existem
 * porque a frase inteira quebra em duas linhas no celular e estoura a altura
 * fixa: `resto` some abaixo de `sm`.
 */
export function AnnouncementBar({
  icon: Icon,
  children,
  resto,
  tone = 'accent',
  className,
}: {
  icon?: LucideIcon
  children: React.ReactNode
  /** Complemento exibido só a partir de `sm`. */
  resto?: React.ReactNode
  tone?: 'accent' | 'ink'
  className?: string
}) {
  return (
    <div
      className={cn(
        'fixed inset-x-0 top-0 z-55 flex h-9 items-center justify-center gap-1.5 px-4',
        'text-center text-[0.72rem] font-medium sm:text-[0.78rem]',
        tone === 'accent' ? 'bg-accent text-on-accent' : 'bg-ink text-bg',
        className,
      )}
    >
      {Icon && <Icon className="size-3.5 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
      {resto && <span className="hidden sm:inline">{resto}</span>}
    </div>
  )
}

/** Altura da faixa, em px — o valor que a `Navbar` recebe em `offsetTop`. */
export const ANNOUNCEMENT_HEIGHT = 36
