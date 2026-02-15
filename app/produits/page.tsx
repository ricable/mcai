"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { SlidersHorizontal, ChevronRight } from "lucide-react"
import Link from "next/link"
import { products } from "@/lib/data"
import { ProductCard } from "@/components/products/product-card"
import { ProductFilters, type FilterState } from "@/components/products/product-filters"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category")

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    effects: [],
    priceRange: [0, 200],
    sort: "popular",
  })
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(8)

  const filtered = useMemo(() => {
    let result = [...products]

    if (filters.category) {
      result = result.filter((p) => p.categorySlug === filters.category)
    }
    if (filters.effects.length > 0) {
      result = result.filter((p) => filters.effects.some((e) => p.effects.includes(e)))
    }

    switch (filters.sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "newest":
        result.sort((a, b) => new Date(b.harvestDate).getTime() - new Date(a.harvestDate).getTime())
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount)
    }

    return result
  }, [filters])

  const visibleProducts = filtered.slice(0, visibleCount)

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6 lg:py-8">
      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="transition-colors hover:text-foreground">Accueil</Link>
          </li>
          <li><ChevronRight className="h-3.5 w-3.5" /></li>
          <li className="font-medium text-foreground">
            {filters.category
              ? products.find((p) => p.categorySlug === filters.category)?.category || "Produits"
              : "Tous les produits"}
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            {filters.category
              ? products.find((p) => p.categorySlug === filters.category)?.category || "Produits"
              : "Nos Produits CBD"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {filtered.length} produit{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setFiltersOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtres
        </button>
      </div>

      {/* Active filter chips */}
      {(filters.category || filters.effects.length > 0) && (
        <div className="mb-4 flex flex-wrap gap-2">
          {filters.category && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {products.find((p) => p.categorySlug === filters.category)?.category}
              <button onClick={() => setFilters({ ...filters, category: null })} className="ml-1 hover:text-destructive" aria-label="Retirer">
                &times;
              </button>
            </span>
          )}
          {filters.effects.map((e) => (
            <span key={e} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {e}
              <button onClick={() => setFilters({ ...filters, effects: filters.effects.filter((x) => x !== e) })} className="ml-1 hover:text-destructive" aria-label="Retirer">
                &times;
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Content: filters + grid */}
      <div className="flex gap-8">
        <ProductFilters
          filters={filters}
          onChange={setFilters}
          isOpen={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          resultCount={products.length}
        />

        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <p className="font-serif text-xl font-semibold text-foreground">Aucun produit trouve</p>
              <p className="text-sm text-muted-foreground">
                Essayez de modifier vos filtres pour voir plus de resultats
              </p>
              <button
                onClick={() => setFilters({ category: null, effects: [], priceRange: [0, 200], sort: "popular" })}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Effacer les filtres
              </button>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {visibleCount < filtered.length && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => setVisibleCount((c) => c + 8)}
                    className="rounded-lg border border-primary bg-transparent px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    Voir plus de produits ({filtered.length - visibleCount} restants)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
