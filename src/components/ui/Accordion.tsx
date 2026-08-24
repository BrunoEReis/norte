import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { EASE_BRAND } from '@/lib/motion'
import { cn } from '@/lib/utils'

export type QA = { q: string; a: string }

export function Accordion({
  items,
  className,
  defaultOpen = 0,
}: {
  items: QA[]
  className?: string
  defaultOpen?: number | null
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen)
  const uid = useId()

  return (
    <div className={cn('divide-y divide-line border-y border-line', className)}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                id={`${uid}-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left sm:py-6"
              >
                <span
                  className={cn(
                    't-h3 font-display transition-colors duration-300',
                    isOpen ? 'text-ink' : 'text-ink group-hover:text-accent',
                  )}
                >
                  {item.q}
                </span>
                <span
                  className={cn(
                    'mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-line-2 transition-all duration-400 ease-brand',
                    isOpen ? 'rotate-45 border-accent bg-accent text-on-accent' : 'group-hover:border-ink',
                  )}
                  aria-hidden="true"
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${uid}-panel-${i}`}
                  role="region"
                  aria-labelledby={`${uid}-btn-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.42, ease: EASE_BRAND }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 pr-10 text-ink-2 sm:pb-7">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
