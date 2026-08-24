import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { EASE_BRAND } from '@/lib/motion'
import { useBodyLock, useEscape } from '@/lib/hooks'
import { cn } from '@/lib/utils'

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
}) {
  const panel = useRef<HTMLDivElement>(null)
  useBodyLock(open)
  useEscape(open, onClose)

  useEffect(() => {
    if (!open) return
    const anterior = document.activeElement as HTMLElement | null
    panel.current?.focus()

    // Prende o Tab dentro do diálogo. Sem isto o foco escapa para a página
    // atrás — que continua visível e clicável para quem navega por teclado.
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !panel.current) return
      const foco = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!foco.length) return
      const primeiro = foco[0]
      const ultimo = foco[foco.length - 1]
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault()
        ultimo.focus()
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault()
        primeiro.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      anterior?.focus?.()
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-100 flex items-end justify-center p-0 sm:items-center sm:p-6">
          <motion.button
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-[3px]"
          />
          <motion.div
            ref={panel}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 28, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.99 }}
            transition={{ duration: 0.4, ease: EASE_BRAND }}
            className={cn(
              'relative w-full max-w-lg rounded-t-xl2 border border-line bg-surface p-6 shadow-lift outline-none sm:rounded-card sm:p-8',
              className,
            )}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-line text-ink-2 transition-colors hover:border-ink hover:text-ink"
            >
              <X className="size-4" />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
