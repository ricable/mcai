"use client"

import { use, useState } from "react"
import Link from "next/link"
import {
  ChevronRight,
  Star,
  Minus,
  Plus,
  ShoppingBag,
  Heart,
  Check,
  MapPin,
  Clock,
  FlaskConical,
  Truck,
  Shield,
  ArrowRight,
} from "lucide-react"
import { products, growers, reviews } from "@/lib/data"
import { useCart } from "@/lib/cart-context"
import { formatPrice, daysSince, cn } from "@/lib/utils"
import { ProductCard } from "@/components/products/product-card"

const tabs = ["Description", "Informations", "Avis", "Livraison"]

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const product = products.find((p) => p.slug === slug)
  const { addItem } = useCart()
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("Description")
  const [selectedImage, setSelectedImage] = useState(0)

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-foreground">Produit non trouve</h1>
          <Link href="/produits" className="mt-4 inline-block text-sm text-primary underline">
            Retour aux produits
          </Link>
        </div>
      </div>
    )
  }

  const grower = growers.find((g) => g.id === product.grower.id)
  const days = daysSince(product.harvestDate)
  const productReviews = reviews.filter((r) => r.productName === product.name)
  const related = products.filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug).slice(0, 4)
  const variant = product.variants[selectedVariant]

  const handleAddToCart = () => {
    addItem(product, variant, quantity)
    setQuantity(1)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6 lg:py-8">
      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground">Accueil</Link></li>
          <li><ChevronRight className="h-3.5 w-3.5" /></li>
          <li><Link href="/produits" className="hover:text-foreground">Produits</Link></li>
          <li><ChevronRight className="h-3.5 w-3.5" /></li>
          <li><Link href={`/produits?category=${product.categorySlug}`} className="hover:text-foreground">{product.category}</Link></li>
          <li><ChevronRight className="h-3.5 w-3.5" /></li>
          <li className="font-medium text-foreground truncate max-w-48">{product.name}</li>
        </ol>
      </nav>

      {/* Main product section */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <div className="flex flex-col gap-3">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
            <div className="flex h-full items-center justify-center">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-accent/60">
                <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
              </div>
            </div>
            {/* Badges */}
            {product.badges.length > 0 && (
              <div className="absolute left-4 top-4 flex flex-col gap-1.5">
                {product.badges.map((badge) => (
                  <span
                    key={badge}
                    className={cn(
                      "rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wider",
                      badge === "promo" ? "bg-destructive text-destructive-foreground" :
                      badge === "nouveau" ? "bg-primary text-primary-foreground" :
                      "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {badge === "best-seller" ? "Best-seller" : badge === "promo" ? "Promo" : "Nouveau"}
                  </span>
                ))}
              </div>
            )}
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  "h-16 w-16 overflow-hidden rounded-lg border-2 bg-muted transition-colors",
                  selectedImage === i ? "border-primary" : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex h-full items-center justify-center">
                  <ShoppingBag className="h-4 w-4 text-muted-foreground/40" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="flex flex-col gap-5">
          {/* Grower + Terroir */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-terroir px-2.5 py-1 text-xs font-semibold text-terroir-foreground">
              <MapPin className="h-3 w-3" />
              {product.terroir}
            </span>
            {days <= 60 && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-harvest-fresh">
                <Clock className="h-3 w-3" />
                {"Recolte il y a"} {days} {"jours"}
              </span>
            )}
            <div className="flex items-center gap-1">
              {product.organicCertifications.map((cert) => (
                <span key={cert} className="rounded border border-primary/20 px-1.5 py-0.5 text-[9px] font-bold text-primary">
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Name + Rating */}
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
              {product.name}
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={cn(
                      "h-4 w-4",
                      s <= Math.round(product.rating) ? "fill-secondary text-secondary" : "fill-muted text-muted"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} avis)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">{formatPrice(variant.price)}</span>
            {product.regularPrice && selectedVariant === 0 && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.regularPrice)}
              </span>
            )}
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>

          {/* Variants */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Poids / Contenance</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v, i) => (
                <button
                  key={v.weight}
                  onClick={() => setSelectedVariant(i)}
                  className={cn(
                    "rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors",
                    i === selectedVariant
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/50"
                  )}
                >
                  <span>{v.weight}</span>
                  <span className="ml-2 text-xs opacity-80">{formatPrice(v.price)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground"
                aria-label="Diminuer"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="flex h-11 w-12 items-center justify-center text-sm font-semibold text-foreground">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground"
                aria-label="Augmenter"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              Ajouter au panier
            </button>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Ajouter aux favoris"
            >
              <Heart className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Mini trust bar */}
          <div className="grid grid-cols-3 gap-3 rounded-xl border border-border p-3">
            {[
              { icon: Truck, text: "Livraison 24-48h" },
              { icon: Shield, text: "Paiement securise" },
              { icon: FlaskConical, text: "Teste en labo" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <item.icon className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-[11px] font-medium text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Grower section (V5) */}
          {grower && (
            <div className="rounded-xl border border-border bg-muted/50 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                A propos du producteur
              </p>
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 shrink-0 rounded-full bg-card border-2 border-card shadow" />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-foreground">{grower.name}</span>
                    {grower.verified && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-verified">
                        <Check className="h-2.5 w-2.5 text-card" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{grower.farmName} - {grower.region}</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground line-clamp-3">
                    {grower.bio}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {grower.certifications.slice(0, 3).map((cert) => (
                        <span key={cert} className="rounded border border-primary/20 px-1.5 py-0.5 text-[9px] font-bold text-primary">
                          {cert}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/producteurs/${grower.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80"
                    >
                      Voir le profil
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex gap-0 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative px-5 py-3 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === "Description" && (
            <div className="prose prose-sm max-w-3xl text-foreground">
              <p className="text-base leading-relaxed">{product.description}</p>
            </div>
          )}

          {activeTab === "Informations" && (
            <div className="max-w-md">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-border">
                  {[
                    ["Taux de CBD", product.features.cbdPercent],
                    ["Taux de THC", product.features.thcLevel],
                    ["Origine", product.features.origin],
                    ["Extraction", product.features.extraction],
                    ["Terroir", product.terroir],
                    ["Producteur", product.grower.name],
                    ["Certifications", product.organicCertifications.join(", ")],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td className="py-3 pr-4 font-medium text-muted-foreground">{label}</td>
                      <td className="py-3 text-foreground">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link href="#" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                <FlaskConical className="h-4 w-4" />
                Voir le certificat d&apos;analyse
              </Link>
            </div>
          )}

          {activeTab === "Avis" && (
            <div className="max-w-2xl space-y-6">
              {productReviews.length > 0 ? (
                productReviews.map((review) => (
                  <div key={review.id} className="border-b border-border pb-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">{review.author}</span>
                        {review.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-verified">
                            <Check className="h-2.5 w-2.5" /> Achat verifie
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.date).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    <div className="mt-1 flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={cn(
                            "h-3.5 w-3.5",
                            s <= review.rating ? "fill-secondary text-secondary" : "fill-muted text-muted"
                          )}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">{review.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Aucun avis pour ce produit. Soyez le premier a donner votre avis !
                </p>
              )}
            </div>
          )}

          {activeTab === "Livraison" && (
            <div className="max-w-2xl space-y-4 text-sm text-foreground">
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold">Colissimo</h4>
                <p className="mt-1 text-muted-foreground">Livraison en 2-3 jours ouvrables - 4,90 (gratuit des 49)</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold">Chronopost</h4>
                <p className="mt-1 text-muted-foreground">Livraison express le lendemain - 9,90</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold">Mondial Relay</h4>
                <p className="mt-1 text-muted-foreground">Point relais en 3-5 jours - 3,90</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold">Retrait en magasin</h4>
                <p className="mt-1 text-muted-foreground">Gratuit - Disponible sous 2h</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-8 border-t border-border pt-8" aria-label="Produits similaires">
          <h2 className="font-serif text-2xl font-bold text-foreground">Vous aimerez aussi</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
