import type { Transition } from 'framer-motion'

/** Easing padrão do projeto (easeOutExpo). */
export const EASE_BRAND: Transition['ease'] = [0.16, 1, 0.3, 1]

/** Viewport usado por todas as entradas ao rolar. */
export const viewportOnce = { once: true, amount: 0.25 } as const
