"use client"

import Link from "next/link"
import { Star, ShoppingBag, Check, MapPin, Clock } from "lucide-react"
import type { Product } from "@/lib/types"
import { formatPrice, daysSince, cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"

const badgeStyles = {
  nouveau: "bg-primary text-primary-foreground",
  promo: "bg-destructive text-destructive-foreground",
  "best-seller": "bg-secondary text-secondary-foreground",
}

const badgeLabels = {
  nouveau: "Nouveau",
  promo: "Promo",
  "best-seller": "Best-seller",
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const days = daysSince(product.harvestDate)

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow duration-300 hover:shadow-lg">
      {/* Badges */}
      {product.badges.length > 0 && (
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
          {product.badges.map((badge) => (
            <span
              key={badge}
              className={cn("rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", badgeStyles[badge])}
            >
              {badgeLabels[badge]}
            </span>
          ))}
        </div>
      )}

      {/* Image placeholder */}
      <Link href={`/produits/${product.slug}`} className="relative block aspect-square overflow-hidden bg-muted">
        <div className="flex h-full items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/60">
            <ShoppingBag className="h-8 w-8 text-muted-foreground/50" />
          </div>
        </div>
        {/* Quick add overlay */}
        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-foreground/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.preventDefault()
              addItem(product, product.variants[0])
            }}
            className="mb-4 flex items-center gap-2 rounded-lg bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-lg transition-transform hover:scale-105"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Ajouter au panier
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Terroir + Grower row */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-terroir px-2 py-0.5 text-[10px] font-semibold text-terroir-foreground">
            <MapPin className="h-2.5 w-2.5" />
            {product.terroir}
          </span>
          {days <= 30 && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-harvest-fresh">
              <Clock className="h-2.5 w-2.5" />
              {days === 0 ? "Aujourd'hui" : `il y a ${days}j`}
            </span>
          )}
        </div>

        {/* Grower */}
        <div className="flex items-center gap-1.5">
          <div className="h-5 w-5 rounded-full bg-muted shrink-0" />
          <span className="text-[11px] text-muted-foreground truncate">
            {product.grower.name}
          </span>
          {product.grower.verified && (
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-verified shrink-0">
              <Check className="h-2 w-2 text-card" />
            </span>
          )}
        </div>

        {/* Name */}
        <Link href={`/produits/${product.slug}`}>
          <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={cn(
                  "h-3 w-3",
                  s <= Math.round(product.rating) ? "fill-secondary text-secondary" : "fill-muted text-muted"
                )}
              />
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Certifications */}
        <div className="flex gap-1">
          {product.organicCertifications.map((cert) => (
            <span
              key={cert}
              className="rounded border border-primary/20 px-1.5 py-0.5 text-[9px] font-bold text-primary"
            >
              {cert}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="mt-auto flex items-center gap-2 pt-1">
          <span className="text-base font-bold text-primary">{formatPrice(product.price)}</span>
          {product.regularPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.regularPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
