import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE_BRAND } from '@/lib/motion'
import { cn } from '@/lib/utils'

export type TabItem = { id: string; label: string; content: ReactNode }

export function Tabs({
  items,
  className,
  listClassName,
  variant = 'pill',
}: {
  items: TabItem[]
  className?: string
  listClassName?: string
  variant?: 'pill' | 'underline'
}) {
  const [active, setActive] = useState(items[0]?.id)
  const uid = useId()
  const current = items.find((i) => i.id === active) ?? items[0]

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Seções"
        className={cn(
          'no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:px-0',
          variant === 'pill' && 'sm:inline-flex sm:rounded-btn sm:border sm:border-line sm:bg-surface sm:p-1',
          variant === 'underline' && 'gap-6 border-b border-line sm:gap-9',
          listClassName,
        )}
      >
        {items.map((item) => {
          const isActive = item.id === active
          return (
            <button
              key={item.id}
              role="tab"
              id={`${uid}-tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`${uid}-panel-${item.id}`}
              onClick={() => setActive(item.id)}
              className={cn(
                'relative shrink-0 whitespace-nowrap text-[0.92rem] font-medium transition-colors duration-300',
                variant === 'pill' && 'rounded-btn px-4 py-2.5',
                variant === 'underline' && 'pb-4 pt-1',
                isActive ? 'text-ink' : 'text-ink-3 hover:text-ink-2',
              )}
            >
              {/* Sem z-index negativo aqui: `relative` no botão não cria contexto
                  de empilhamento, então a pílula iria para trás do fundo do
                  tablist e o rótulo ativo sumiria. O rótulo é que sobe. */}
              {isActive && (
                <motion.span
                  layoutId={`${uid}-indicator`}
                  transition={{ duration: 0.45, ease: EASE_BRAND }}
                  className={cn(
                    'absolute',
                    variant === 'pill' && 'inset-0 rounded-btn bg-raise',
                    variant === 'underline' && '-bottom-px left-0 right-0 h-0.5 bg-accent',
                  )}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          )
        })}
      </div>

      <div className="relative mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current?.id}
            role="tabpanel"
            id={`${uid}-panel-${current?.id}`}
            aria-labelledby={`${uid}-tab-${current?.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE_BRAND }}
          >
            {current?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
