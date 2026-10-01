import { ArrowRight, ChevronLeft, Flame } from 'lucide-react'
import { Link } from 'react-router-dom'

export function BrandMark() {
  return (
    <Link className="flex items-center gap-3" to="/" aria-label="Clube do Pao - inicio">
      <span className="grid size-10 place-items-center rounded-2xl bg-[#f26a3d] text-white shadow-[0_8px_20px_-10px_#b53e1b]">
        <Flame size={21} strokeWidth={2.5} />
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-[#30231d]">Clube do Pao</span>
    </Link>
  )
}

export function PageShell({ children, backTo = '/', backLabel = 'Inicio' }) {
  return (
    <div className="min-h-screen bg-[#fffaf2] text-[#30231d]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <BrandMark />
        {backTo === null ? (
          <nav aria-label="Navegação principal">
            <Link className="button-secondary !rounded-xl !px-4 !py-2 text-sm" to="/sobre">
              Sobre o projeto <ArrowRight size={16} />
            </Link>
          </nav>
        ) : (
          <Link className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#866e60] transition hover:text-[#d45128]" to={backTo}>
            <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            {backLabel}
          </Link>
        )}
      </header>
      {children}
    </div>
  )
}
