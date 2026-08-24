/**
 * Primeiro item do foco na página: pula a navegação e vai para o conteúdo.
 * Invisível até receber foco pelo teclado.
 */
export function SkipLink({ href = '#conteudo' }: { href?: string }) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-btn focus:bg-accent focus:px-4 focus:py-2.5 focus:text-[0.9rem] focus:font-medium focus:text-on-accent"
    >
      Pular para o conteúdo
    </a>
  )
}
