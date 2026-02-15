import Link from "next/link"
import { ChevronRight, MapPin, Check, Leaf, ArrowRight } from "lucide-react"
import { growers } from "@/lib/data"

export default function GrowerListPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6 lg:py-8">
      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground">Accueil</Link></li>
          <li><ChevronRight className="h-3.5 w-3.5" /></li>
          <li className="font-medium text-foreground">Nos Producteurs</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
          Du Champ a Votre Porte
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-5xl text-balance">
          Nos Producteurs
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Decouvrez les artisans passionnes qui cultivent votre CBD biologique. Chaque producteur est certifie et audite regulierement pour garantir la plus haute qualite.
        </p>
      </div>

      {/* Stats bar */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { value: "4", label: "Producteurs certifies" },
          { value: "4", label: "Terroirs francais" },
          { value: "29", label: "Produits artisanaux" },
          { value: "100%", label: "Bio et trace" },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center rounded-xl border border-border bg-card p-5 text-center">
            <span className="font-serif text-2xl font-bold text-primary">{stat.value}</span>
            <span className="mt-1 text-xs text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Grower grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {growers.map((grower) => (
          <Link
            key={grower.id}
            href={`/producteurs/${grower.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg sm:flex-row"
          >
            {/* Farm photo placeholder */}
            <div className="relative aspect-[4/3] overflow-hidden bg-muted sm:aspect-auto sm:w-56 shrink-0">
              <div className="flex h-full items-center justify-center">
                <Leaf className="h-12 w-12 text-muted-foreground/20" />
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
                <div className="h-12 w-12 shrink-0 rounded-full bg-muted border-2 border-card shadow" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{grower.name}</h2>
                    {grower.verified && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-verified">
                        <Check className="h-2.5 w-2.5 text-card" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{grower.farmName}</p>
                </div>
              </div>

              <p className="flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                {grower.bio}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {grower.certifications.map((cert) => (
                    <span key={cert} className="rounded border border-primary/20 px-1.5 py-0.5 text-[9px] font-bold text-primary">
                      {cert}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Voir le profil
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>

              <div className="flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
                <span>{grower.productCount} produits</span>
                <span>Depuis {grower.joinedYear}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
