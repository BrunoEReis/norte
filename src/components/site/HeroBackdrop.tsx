import { Img } from '@/components/ui/Img'

/**
 * Fotografia em tela cheia atrás de um hero, com o véu que garante a leitura
 * do texto por cima.
 *
 * O véu é montado com `color-mix` sobre `--c-bg` em vez de rgba fixo: cada tema
 * ganha o próprio tom automaticamente, e um ajuste de paleta (o de contraste
 * desta auditoria, por exemplo) não deixa três gradientes desatualizados
 * espalhados pelas demos.
 */
export function HeroBackdrop({
  id,
  alt,
  /** Quanto o véu escurece o topo, o meio e a base. */
  vertical = [78, 22, 94],
  /** Reforço lateral, para hero com texto alinhado à esquerda. */
  lateral = [70, 12],
  zoom = true,
}: {
  id: string
  alt: string
  vertical?: [number, number, number]
  lateral?: [number, number] | null
  zoom?: boolean
}) {
  const veu = (p: number) => `color-mix(in srgb, var(--c-bg) ${p}%, transparent)`
  const camadas = [
    `linear-gradient(180deg, ${veu(vertical[0])} 0%, ${veu(vertical[1])} 38%, ${veu(vertical[2])} 100%)`,
  ]
  if (lateral) {
    camadas.push(`linear-gradient(90deg, ${veu(lateral[0])} 0%, ${veu(lateral[1])} 55%, transparent 78%)`)
  }

  return (
    <>
      <div className="absolute inset-0">
        <Img
          id={id}
          alt={alt}
          w={2400}
          tone="none"
          priority
          className="h-full w-full"
          imgClassName={zoom ? 'slow-zoom' : undefined}
        />
      </div>
      <div className="absolute inset-0" style={{ background: camadas.join(',') }} aria-hidden="true" />
    </>
  )
}
