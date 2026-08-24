import { useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { EASE_BRAND } from '@/lib/motion'
import { useBodyLock, useScrolled } from '@/lib/hooks'
import { cn } from '@/lib/utils'

export type NavLink = { label: string; href: string }

type NavbarProps = {
  brand: ReactNode
  links: NavLink[]
  cta?: { label: string; href: string }
  /** Ação secundária à esquerda do CTA (ex.: telefone, entrar). */
  secondary?: { label: string; href: string }
  /** `floating` = pílula solta; `bar` = barra de largura total. */
  variant?: 'floating' | 'bar'
  /** Faz a navbar começar transparente sobre um hero de imagem. */
  overlay?: boolean
  /** Deslocamento do topo, em px — usado quando há uma barra de aviso fixa. */
  offsetTop?: number
  className?: string
}

export function Navbar({
  brand,
  links,
  cta,
  secondary,
  variant = 'bar',
  overlay = false,
  offsetTop = 0,
  className,
}: NavbarProps) {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(20)
  useBodyLock(open)
  const solid = scrolled || !overlay

  return (
    <>
      <header
        style={offsetTop ? { top: offsetTop } : undefined}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ease-brand',
          variant === 'floating' ? (scrolled ? 'pt-3' : 'pt-5') : '',
          className,
        )}
      >
        <Container
          size={variant === 'floating' ? 'xl' : 'full'}
          className={variant === 'floating' ? '' : 'px-0'}
        >
          <nav
            className={cn(
              'flex items-center justify-between transition-all duration-500 ease-brand',
              variant === 'floating' &&
                cn(
                  'rounded-btn px-4 py-2.5 sm:px-5',
                  scrolled
                    ? 'border border-line bg-bg/85 shadow-soft backdrop-blur-xl'
                    : 'border border-transparent',
                ),
              variant === 'bar' &&
                cn(
                  'px-5 py-4 sm:px-8',
                  solid && scrolled
                    ? 'border-b border-line bg-bg/88 backdrop-blur-xl'
                    : 'border-b border-transparent',
                ),
            )}
          >
            <a href="#top" className="relative z-10 flex items-center gap-2.5" aria-label="Início">
              {brand}
            </a>

            <div className="hidden items-center gap-8 lg:flex">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="group relative text-[0.9rem] text-ink-2 transition-colors duration-300 hover:text-ink"
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-400 ease-brand group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {secondary && (
                <a
                  href={secondary.href}
                  className="hidden text-[0.9rem] text-ink-2 transition-colors hover:text-ink md:block"
                >
                  {secondary.label}
                </a>
              )}
              {/* O wrapper controla a visibilidade: `hidden` no próprio botão
                  competiria com o `inline-flex` da classe base. */}
              {cta && (
                <span className="hidden sm:block">
                  <ButtonLink href={cta.href} size="sm">
                    {cta.label}
                  </ButtonLink>
                </span>
              )}
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Abrir menu"
                className="grid size-10 place-items-center rounded-btn border border-line text-ink transition-colors hover:border-ink-3 lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </nav>
        </Container>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-60 bg-bg lg:hidden"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between px-5 py-4 sm:px-8">
                <div className="flex items-center gap-2.5">{brand}</div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fechar menu"
                  className="grid size-10 place-items-center rounded-btn border border-line text-ink"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-center gap-1 px-5 sm:px-8">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.5, ease: EASE_BRAND }}
                    className="border-b border-line py-4 font-display text-[2rem] leading-tight text-ink"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </nav>

              <div className="flex flex-col gap-3 px-5 pb-10 sm:px-8">
                {secondary && (
                  <a href={secondary.href} onClick={() => setOpen(false)} className="text-center text-ink-2">
                    {secondary.label}
                  </a>
                )}
                {cta && (
                  <ButtonLink href={cta.href} size="lg" full arrow onClick={() => setOpen(false)}>
                    {cta.label}
                  </ButtonLink>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
