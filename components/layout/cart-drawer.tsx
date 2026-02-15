"use client"

import { useEffect } from "react"
import Link from "next/link"
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { formatPrice, cn } from "@/lib/utils"
import { FREE_SHIPPING_THRESHOLD, products } from "@/lib/data"

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    itemCount,
    subtotal,
    promoCode,
    setPromoCode,
    promoDiscount,
    applyPromo,
  } = useCart()

  // Prevent body scroll when drawer open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0)
  const discount = subtotal * promoDiscount
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 4.9
  const total = subtotal - discount + shipping

  // Cross-sell: pick 2 products not in cart
  const cartProductIds = new Set(items.map((i) => i.product.id))
  const crossSell = products.filter((p) => !cartProductIds.has(p.id)).slice(0, 2)

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm transition-opacity"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col bg-card shadow-2xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-lg font-semibold text-foreground">
              Mon Panier
            </h2>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
              {itemCount}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Fermer le panier"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Free shipping progress */}
        {items.length > 0 && (
          <div className="border-b border-border px-5 py-3">
            <div className="flex items-center justify-between text-xs">
              {remainingForFreeShipping > 0 ? (
                <span className="text-muted-foreground">
                  Plus que <strong className="text-foreground">{formatPrice(remainingForFreeShipping)}</strong> pour la livraison gratuite
                </span>
              ) : (
                <span className="font-medium text-primary">Livraison gratuite !</span>
              )}
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 px-5 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="h-7 w-7 text-muted-foreground" />
              </div>
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">Votre panier est vide</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Decouvrez nos produits CBD biologiques
                </p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Voir nos produits
              </button>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedVariant.weight}`}
                  className="flex gap-4 px-5 py-4"
                >
                  {/* Product image placeholder */}
                  <div className="h-20 w-20 shrink-0 rounded-lg bg-muted flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-muted-foreground/50" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-foreground leading-tight">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.selectedVariant.weight}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedVariant.weight)}
                        className="shrink-0 text-muted-foreground hover:text-destructive"
                        aria-label={`Supprimer ${item.product.name}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-border">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedVariant.weight, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center text-muted-foreground hover:text-foreground"
                          aria-label="Diminuer"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="flex h-7 w-7 items-center justify-center text-xs font-medium text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedVariant.weight, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center text-muted-foreground hover:text-foreground"
                          aria-label="Augmenter"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        {formatPrice(item.selectedVariant.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Cross-sell */}
          {items.length > 0 && crossSell.length > 0 && (
            <div className="border-t border-border px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Vous aimerez aussi
              </p>
              <div className="mt-3 flex gap-3">
                {crossSell.map((p) => (
                  <Link
                    key={p.id}
                    href={`/produits/${p.slug}`}
                    onClick={closeCart}
                    className="flex flex-1 items-center gap-2.5 rounded-lg border border-border p-2.5 transition-colors hover:bg-muted"
                  >
                    <div className="h-10 w-10 shrink-0 rounded-md bg-muted" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{p.name}</p>
                      <p className="text-xs text-primary font-semibold">{formatPrice(p.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-5 py-4">
            {/* Promo code */}
            <div className="mb-4 flex items-center gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
                <Tag className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Code promo"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none"
                />
              </div>
              <button
                onClick={applyPromo}
                className="rounded-lg bg-muted px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent"
              >
                Appliquer
              </button>
            </div>

            {/* Totals */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Sous-total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-primary">
                  <span>Reduction ({Math.round(promoDiscount * 100)}%)</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Livraison</span>
                <span>{shipping === 0 ? "Gratuite" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-bold text-foreground">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Commander
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={closeCart}
                className="rounded-lg bg-muted px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Continuer mes achats
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
