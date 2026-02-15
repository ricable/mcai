"use client"

import { use } from "react"
import Link from "next/link"
import { ChevronRight, MapPin, Check, Leaf, Calendar, Package } from "lucide-react"
import { growers, products } from "@/lib/data"
import { ProductCard } from "@/components/products/product-card"

export default function GrowerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const grower = growers.find((g) => g.slug === slug)

  if (!grower) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-foreground">Producteur non trouve</h1>
          <Link href="/producteurs" className="mt-4 inline-block text-sm text-primary underline">
            Retour aux producteurs
          </Link>
        </div>
      </div>
    )
  }

  const growerProducts = products.filter((p) => p.grower.id === grower.id)

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6 lg:py-8">
      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground">Accueil</Link></li>
          <li><ChevronRight className="h-3.5 w-3.5" /></li>
          <li><Link href="/producteurs" className="hover:text-foreground">Producteurs</Link></li>
          <li><ChevronRight className="h-3.5 w-3.5" /></li>
          <li className="font-medium text-foreground">{grower.name}</li>
        </ol>
      </nav>

      {/* Hero */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {/* Farm photo */}
        <div className="relative h-48 bg-primary/10 sm:h-64 lg:h-80">
          <div className="flex h-full items-center justify-center">
            <Leaf className="h-16 w-16 text-primary/20" />
          </div>
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-sm font-semibold text-foreground backdrop-blur-sm shadow">
              <MapPin className="h-4 w-4 text-primary" />
              {grower.region}, France
            </span>
          </div>
        </div>

        {/* Profile info */}
        <div className="relative px-6 pb-6 pt-0 sm:px-8">
          {/* Avatar */}
          <div className="-mt-10 mb-4 flex items-end gap-4">
            <div className="h-20 w-20 shrink-0 rounded-full border-4 border-card bg-muted shadow-lg" />
            <div className="mb-1">
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                  {grower.name}
                </h1>
                {grower.verified && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-verified">
                    <Check className="h-3.5 w-3.5 text-card" />
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{grower.farmName}</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="mb-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Package className="h-4 w-4 text-primary" />
              <span>{grower.productCount} produits</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Membre depuis {grower.joinedYear}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{grower.region}</span>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Biographie
            </h2>
            <p className="text-base leading-relaxed text-foreground">{grower.bio}</p>
          </div>

          {/* Story */}
          <div className="mb-6">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Notre Histoire
            </h2>
            <p className="text-base leading-relaxed text-foreground">{grower.story}</p>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Certifications
            </h2>
            <div className="flex flex-wrap gap-2">
              {grower.certifications.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-sm font-medium text-primary"
                >
                  <Check className="h-3.5 w-3.5" />
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products by this grower */}
      {growerProducts.length > 0 && (
        <section className="mt-10" aria-label={`Produits de ${grower.name}`}>
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Produits de {grower.name}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {growerProducts.length} produit{growerProducts.length !== 1 ? "s" : ""} disponible{growerProducts.length !== 1 ? "s" : ""}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {growerProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
