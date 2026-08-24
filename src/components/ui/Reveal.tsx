import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE_BRAND, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  duration?: number
  className?: string
}

/** Entrada suave ao entrar na viewport. Respeita prefers-reduced-motion. */
export function Reveal({ children, delay = 0, y = 22, duration = 0.7, className }: RevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: reduce ? 0.3 : duration, delay, ease: EASE_BRAND }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Revelação por máscara: o conteúdo sobe de dentro de um contêiner com
 * overflow escondido. Use uma instância por linha do título.
 *
 * O gatilho de viewport fica no contêiner externo de propósito: o conteúdo
 * interno começa deslocado para fora da área visível da máscara, então um
 * IntersectionObserver colocado nele nunca dispararia (o recorte do ancestral
 * zera a interseção).
 */
export function MaskReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) return <span className={cn('block', className)}>{children}</span>
  return (
    <motion.span
      className={cn('block overflow-hidden pb-[0.12em]', className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: '112%' }, show: { y: '0%' } }}
        transition={{ duration: 0.95, delay, ease: EASE_BRAND }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}
