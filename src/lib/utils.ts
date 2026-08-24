import { LOCAL_PHOTOS } from './photos-local'

/** Concatena classes, descartando qualquer coisa que não seja string útil. */
export function cn(...parts: unknown[]) {
  return parts.filter((p): p is string => typeof p === 'string' && p.length > 0).join(' ')
}

/**
 * Endereço da foto. Duas larguras: `sm` (560px) para miniaturas e avatares,
 * `lg` (1600px) para áreas grandes; o recorte fica por conta do CSS
 * (`object-fit: cover`).
 *
 * Se o arquivo já tiver sido baixado por `npm run photos`, servimos do próprio
 * projeto — mais rápido e sem depender de rede externa na apresentação.
 * Caso contrário, usamos o CDN de origem.
 * Fotografia: Unsplash — licença livre, uso demonstrativo.
 */
export function photo(id: string, w: number) {
  const size = w <= 700 ? 'sm' : 'lg'
  const key = `${id}-${size}`
  return LOCAL_PHOTOS.has(key) ? `/photos/${key}.webp` : photoRemote(id, w)
}

/** Origem remota, usada quando ainda não há cópia local. */
export function photoRemote(id: string, w: number) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&q=72&w=${w <= 700 ? 560 : 1600}`
}

export const brl = (v: number) =>
  v.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: v % 1 === 0 ? 0 : 2,
  })
