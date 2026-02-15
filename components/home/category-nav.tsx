import Link from "next/link"
import { Leaf, Flower2, Droplets, Coffee, Heart, Candy } from "lucide-react"
import { categories } from "@/lib/data"

const iconMap: Record<string, React.ElementType> = {
  resines: Leaf,
  fleurs: Flower2,
  "huiles-bio": Droplets,
  infusions: Coffee,
  baumes: Heart,
  bonbons: Candy,
}

export function CategoryNav() {
  return (
    <section className="py-12 lg:py-16" aria-label="Nos categories">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6 sm:gap-6">
          {categories.map((cat) => {
            const Icon = iconMap[cat.slug] || Leaf
            return (
              <Link
                key={cat.id}
                href={`/produits?category=${cat.slug}`}
                className="group flex flex-col items-center gap-3"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-border bg-card shadow-sm transition-all duration-300 group-hover:border-primary group-hover:shadow-md sm:h-24 sm:w-24">
                  <Icon className="h-7 w-7 text-primary transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-8" />
                </div>
                <span className="text-center text-xs font-semibold text-foreground sm:text-sm">
                  {cat.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
