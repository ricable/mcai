import Link from "next/link"
import { MapPin, Check, ArrowRight, Leaf } from "lucide-react"
import { growers } from "@/lib/data"

export function GrowerSpotlight() {
  const featured = growers.slice(0, 3)

  return (
    <section className="py-12 lg:py-16" aria-labelledby="growers-heading">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Nos Terroirs
            </p>
            <h2
              id="growers-heading"
              className="mt-1 font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance"
            >
              Nos Producteurs
            </h2>
            <p className="mt-2 text-muted-foreground">
              Rencontrez les artisans qui cultivent votre bien-etre
            </p>
          </div>
          <Link
            href="/producteurs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Tous les producteurs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((grower) => (
            <Link
              key={grower.id}
              href={`/producteurs/${grower.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow duration-300 hover:shadow-lg"
            >
              {/* Farm photo placeholder */}
              <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                <div className="flex h-full items-center justify-center">
                  <Leaf className="h-12 w-12 text-muted-foreground/30" />
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-semibold text-foreground backdrop-blur-sm">
                    <MapPin className="h-3 w-3 text-primary" />
                    {grower.region}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div className="h-11 w-11 shrink-0 rounded-full bg-muted border-2 border-card shadow-sm" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-semibold text-foreground">
                        {grower.name}
                      </h3>
                      {grower.verified && (
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-verified">
                          <Check className="h-2.5 w-2.5 text-card" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{grower.farmName}</p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {grower.bio}
                </p>

                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex gap-1.5">
                    {grower.certifications.slice(0, 3).map((cert) => (
                      <span
                        key={cert}
                        className="rounded border border-primary/20 px-1.5 py-0.5 text-[9px] font-bold text-primary"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {grower.productCount} produits
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
