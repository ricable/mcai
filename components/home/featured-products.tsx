"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { products } from "@/lib/data"
import { ProductCard } from "@/components/products/product-card"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "populaires", label: "Populaires", filter: (p: typeof products) => p.filter((x) => x.badges.includes("best-seller") || x.reviewCount > 80) },
  { id: "nouveautes", label: "Nouveautes", filter: (p: typeof products) => p.filter((x) => x.badges.includes("nouveau") || !x.badges.length).slice(0, 8) },
]

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("populaires")
  const currentTab = tabs.find((t) => t.id === activeTab)!
  const filtered = currentTab.filter(products).slice(0, 8)

  return (
    <section className="bg-muted/50 py-12 lg:py-16" aria-labelledby="featured-heading">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="featured-heading"
              className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance"
            >
              Nos Produits
            </h2>
            <p className="mt-2 text-muted-foreground">
              Selection de nos meilleurs produits CBD biologiques
            </p>
          </div>
          <div className="flex rounded-lg border border-border bg-card p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/produits"
            className="inline-flex items-center gap-2 rounded-lg border border-primary bg-transparent px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Voir tous les produits
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
