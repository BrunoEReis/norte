import { useState } from 'react'
import type { ReactNode } from 'react'
import { photo, photoRemote, cn } from '@/lib/utils'

type ImgProps = {
  /** ID da foto no Unsplash (ex.: photo-1651761483492-7d2e26dd3455). */
  id: string
  alt: string
  /** Largura aproximada de exibição — escolhe entre o arquivo `sm` e o `lg`. */
  w?: number
  className?: string
  imgClassName?: string
  /** Tratamento de cor para unificar fotos de bancos diferentes. */
  tone?: 'none' | 'mute' | 'mono'
  priority?: boolean
  children?: ReactNode
}

const TONES = {
  none: '',
  mute: 'saturate-[0.82] contrast-[1.04]',
  mono: 'grayscale contrast-[1.06]',
}

/**
 * Imagem com placeholder próprio e rede de segurança:
 * - enquanto carrega, o bloco mantém um fundo do tema (nunca um buraco branco);
 * - se o arquivo local ainda não tiver sido baixado, cai para o CDN de origem.
 */
export function Img({
  id,
  alt,
  w = 1200,
  className,
  imgClassName,
  tone = 'mute',
  priority,
  children,
}: ImgProps) {
  const [loaded, setLoaded] = useState(false)
  const [src, setSrc] = useState(() => photo(id, w))

  return (
    <div
      className={cn('relative overflow-hidden bg-raise', className)}
      style={{
        backgroundImage:
          'linear-gradient(135deg, color-mix(in oklab, var(--c-ink) 5%, transparent), transparent 60%)',
      }}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        onError={() => {
          const remote = photoRemote(id, w)
          if (src !== remote) setSrc(remote)
          else setLoaded(true)
        }}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-700 ease-brand',
          TONES[tone],
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName,
        )}
      />
      {children}
    </div>
  )
}
