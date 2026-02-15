"use client"

import { X, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { categories } from "@/lib/data"

export interface FilterState {
  category: string | null
  effects: string[]
  priceRange: [number, number]
  sort: string
}

const allEffects = ["Relaxation", "Sommeil", "Douleur", "Bien-etre", "Concentration"]
const sortOptions = [
  { value: "popular", label: "Popularite" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix decroissant" },
  { value: "newest", label: "Nouveautes" },
  { value: "rating", label: "Meilleures notes" },
]

interface ProductFiltersProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  isOpen: boolean
  onClose: () => void
  resultCount: number
}

export function ProductFilters({ filters, onChange, isOpen, onClose, resultCount }: ProductFiltersProps) {
  const update = (partial: Partial<FilterState>) => onChange({ ...filters, ...partial })

  const toggleEffect = (effect: string) => {
    const effects = filters.effects.includes(effect)
      ? filters.effects.filter((e) => e !== effect)
      : [...filters.effects, effect]
    update({ effects })
  }

  const activeCount = (filters.category ? 1 : 0) + filters.effects.length + (filters.priceRange[0] > 0 || filters.priceRange[1] < 200 ? 1 : 0)

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={cn(
          "shrink-0 lg:w-64",
          /* Mobile: slide from left */
          "fixed left-0 top-0 z-50 h-full w-80 overflow-y-auto bg-card p-5 shadow-xl transition-transform duration-300 lg:static lg:z-auto lg:h-auto lg:w-64 lg:translate-x-0 lg:bg-transparent lg:p-0 lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Filtres produits"
      >
        {/* Mobile header */}
        <div className="mb-5 flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4.5 w-4.5 text-primary" />
            <h2 className="text-base font-semibold text-foreground">Filtres</h2>
            {activeCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                {activeCount}
              </span>
            )}
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Fermer">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Categories
          </h3>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => update({ category: null })}
              className={cn(
                "rounded-lg px-3 py-2 text-left text-sm transition-colors",
                !filters.category ? "bg-primary text-primary-foreground font-medium" : "text-foreground hover:bg-muted"
              )}
            >
              Tous les produits
              <span className="ml-1 text-xs opacity-70">({resultCount})</span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => update({ category: cat.slug === filters.category ? null : cat.slug })}
                className={cn(
                  "rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  filters.category === cat.slug
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Effects */}
        <div className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Effets
          </h3>
          <div className="flex flex-wrap gap-2">
            {allEffects.map((effect) => (
              <button
                key={effect}
                onClick={() => toggleEffect(effect)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  filters.effects.includes(effect)
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-foreground hover:bg-muted"
                )}
              >
                {effect}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Trier par
          </h3>
          <select
            value={filters.sort}
            onChange={(e) => update({ sort: e.target.value })}
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear all */}
        {activeCount > 0 && (
          <button
            onClick={() =>
              onChange({ category: null, effects: [], priceRange: [0, 200], sort: "popular" })
            }
            className="w-full rounded-lg border border-border py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Effacer les filtres
          </button>
        )}
      </aside>
    </>
  )
}
