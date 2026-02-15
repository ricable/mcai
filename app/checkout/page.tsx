"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ShoppingBag,
  User,
  MapPin,
  Truck,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Tag,
  Lock,
  Leaf,
  Check,
} from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { formatPrice, cn } from "@/lib/utils"
import { FREE_SHIPPING_THRESHOLD } from "@/lib/data"
import type { CheckoutStep } from "@/lib/types"

const steps: { id: CheckoutStep; label: string; icon: React.ElementType }[] = [
  { id: "cart", label: "Panier", icon: ShoppingBag },
  { id: "personal", label: "Identite", icon: User },
  { id: "address", label: "Adresse", icon: MapPin },
  { id: "delivery", label: "Livraison", icon: Truck },
  { id: "payment", label: "Paiement", icon: CreditCard },
  { id: "confirmation", label: "Confirmation", icon: CheckCircle2 },
]

const deliveryMethods = [
  { id: "colissimo", name: "Colissimo", desc: "2-3 jours ouvrables", price: 4.9, free: true },
  { id: "chronopost", name: "Chronopost Express", desc: "Livraison demain avant 13h", price: 9.9, free: false },
  { id: "relay", name: "Mondial Relay", desc: "3-5 jours en point relais", price: 3.9, free: false },
  { id: "retrait", name: "Retrait en boutique", desc: "Disponible sous 2h a Avignon", price: 0, free: false },
]

const paymentMethods = [
  { id: "card", name: "Carte bancaire", desc: "Visa, Mastercard, CB", icon: "CB" },
  { id: "paypal", name: "PayPal", desc: "Paiement securise PayPal", icon: "PP" },
  { id: "apple", name: "Apple Pay", desc: "Paiement rapide Apple", icon: "AP" },
  { id: "google", name: "Google Pay", desc: "Paiement rapide Google", icon: "GP" },
  { id: "virement", name: "Virement bancaire", desc: "Virement SEPA sous 2-3 jours", icon: "VB" },
  { id: "3x", name: "3x sans frais", desc: "Paiement en 3 fois a partir de 100\u20AC", icon: "3x" },
  { id: "crypto", name: "Crypto", desc: "Bitcoin, Ethereum, USDC", icon: "BT" },
]

export default function CheckoutPage() {
  const { items, updateQuantity, removeItem, subtotal, promoCode, setPromoCode, promoDiscount, applyPromo, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart")
  const [guestMode, setGuestMode] = useState(true)
  const [selectedDelivery, setSelectedDelivery] = useState("colissimo")
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [orderRef, setOrderRef] = useState("")

  const [personal, setPersonal] = useState({ firstName: "", lastName: "", email: "", phone: "" })
  const [address, setAddress] = useState({ street: "", complement: "", city: "", zip: "", country: "France" })

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep)
  const delivery = deliveryMethods.find((d) => d.id === selectedDelivery)!
  const shippingCost = delivery.free && subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : delivery.price
  const discount = subtotal * promoDiscount
  const total = subtotal - discount + shippingCost

  const goNext = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      if (steps[nextIndex].id === "confirmation") {
        setOrderRef(`OURS-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`)
        clearCart()
      }
      setCurrentStep(steps[nextIndex].id)
    }
  }

  const goBack = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) setCurrentStep(steps[prevIndex].id)
  }

  if (items.length === 0 && currentStep !== "confirmation") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center gap-4 px-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-7 w-7 text-muted-foreground" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-foreground">Votre panier est vide</h1>
        <p className="text-sm text-muted-foreground">Ajoutez des produits pour passer commande</p>
        <Link href="/produits" className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          Voir nos produits
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 lg:px-6 lg:py-8">
      {/* Step indicator */}
      <nav aria-label="Etapes de commande" className="mb-8">
        <ol className="flex items-center justify-between">
          {steps.map((step, i) => {
            const isActive = i === currentStepIndex
            const isDone = i < currentStepIndex
            return (
              <li key={step.id} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors",
                      isDone
                        ? "bg-primary text-primary-foreground"
                        : isActive
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {isDone ? <Check className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-medium hidden sm:block",
                      isActive || isDone ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={cn("mx-2 h-0.5 flex-1 rounded-full", isDone ? "bg-primary" : "bg-border")} />
                )}
              </li>
            )
          })}
        </ol>
      </nav>

      {/* Step 1: Cart Summary */}
      {currentStep === "cart" && (
        <div>
          <h1 className="mb-6 font-serif text-2xl font-bold text-foreground">Recapitulatif du panier</h1>
          <div className="divide-y divide-border rounded-xl border border-border bg-card">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.selectedVariant.weight}`} className="flex gap-4 p-4">
                <div className="h-20 w-20 shrink-0 rounded-lg bg-muted flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-primary/20" />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">{item.selectedVariant.weight} - {item.product.grower.name}</p>
                    </div>
                    <button onClick={() => removeItem(item.product.id, item.selectedVariant.weight)} className="text-muted-foreground hover:text-destructive" aria-label="Supprimer">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center rounded-lg border border-border">
                      <button onClick={() => updateQuantity(item.product.id, item.selectedVariant.weight, item.quantity - 1)} className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground" aria-label="Diminuer">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="flex h-8 w-8 items-center justify-center text-xs font-semibold text-foreground">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.selectedVariant.weight, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground" aria-label="Augmenter">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-sm font-bold text-foreground">{formatPrice(item.selectedVariant.price * item.quantity)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Promo code */}
          <div className="mt-4 flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5">
              <Tag className="h-4 w-4 text-muted-foreground shrink-0" />
              <input type="text" placeholder="Code promo" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
            </div>
            <button onClick={applyPromo} className="rounded-lg bg-muted px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors">
              Appliquer
            </button>
          </div>

          {/* Totals */}
          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Sous-total</span><span>{formatPrice(subtotal)}</span></div>
              {promoDiscount > 0 && <div className="flex justify-between text-primary"><span>Reduction ({Math.round(promoDiscount * 100)}%)</span><span>-{formatPrice(discount)}</span></div>}
              <div className="flex justify-between text-muted-foreground"><span>Livraison estimee</span><span>{subtotal >= FREE_SHIPPING_THRESHOLD ? "Gratuite" : formatPrice(4.9)}</span></div>
              <div className="flex justify-between border-t border-border pt-2 text-lg font-bold text-foreground"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Personal Info */}
      {currentStep === "personal" && (
        <div>
          <h1 className="mb-6 font-serif text-2xl font-bold text-foreground">Vos informations</h1>

          {/* Guest/Login toggle */}
          <div className="mb-6 flex rounded-lg border border-border bg-card p-1">
            <button onClick={() => setGuestMode(true)} className={cn("flex-1 rounded-md py-2.5 text-sm font-medium transition-colors", guestMode ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
              Commander en invite
            </button>
            <button onClick={() => setGuestMode(false)} className={cn("flex-1 rounded-md py-2.5 text-sm font-medium transition-colors", !guestMode ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
              Se connecter
            </button>
          </div>

          {guestMode ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">Prenom *</label>
                <input type="text" value={personal.firstName} onChange={(e) => setPersonal({ ...personal, firstName: e.target.value })} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Jean" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">Nom *</label>
                <input type="text" value={personal.lastName} onChange={(e) => setPersonal({ ...personal, lastName: e.target.value })} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Dupont" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">Email *</label>
                <input type="email" value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="jean@example.com" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">Telephone</label>
                <input type="tel" value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="06 12 34 56 78" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">Email</label>
                <input type="email" className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="votre@email.com" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">Mot de passe</label>
                <input type="password" className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Votre mot de passe" />
              </div>
              <button className="rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                Se connecter
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Address */}
      {currentStep === "address" && (
        <div>
          <h1 className="mb-6 font-serif text-2xl font-bold text-foreground">Adresse de livraison</h1>
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">Adresse *</label>
              <input type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="12 Rue des Lavandes" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">Complement</label>
              <input type="text" value={address.complement} onChange={(e) => setAddress({ ...address, complement: e.target.value })} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Batiment, etage, etc." />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">Code postal *</label>
                <input type="text" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="75001" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">Ville *</label>
                <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Paris" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">Pays</label>
              <select value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                <option>France</option>
                <option>Belgique</option>
                <option>Suisse</option>
                <option>Luxembourg</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Delivery */}
      {currentStep === "delivery" && (
        <div>
          <h1 className="mb-6 font-serif text-2xl font-bold text-foreground">Mode de livraison</h1>
          <div className="flex flex-col gap-3">
            {deliveryMethods.map((method) => {
              const isFree = method.free && subtotal >= FREE_SHIPPING_THRESHOLD
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedDelivery(method.id)}
                  className={cn(
                    "flex items-center gap-4 rounded-xl border p-4 text-left transition-colors",
                    selectedDelivery === method.id ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted"
                  )}
                >
                  <div className={cn("flex h-5 w-5 items-center justify-center rounded-full border-2", selectedDelivery === method.id ? "border-primary bg-primary" : "border-border")}>
                    {selectedDelivery === method.id && <div className="h-2 w-2 rounded-full bg-primary-foreground" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{method.name}</p>
                      {isFree && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">GRATUIT</span>}
                    </div>
                    <p className="text-xs text-muted-foreground">{method.desc}</p>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {method.price === 0 ? "Gratuit" : isFree ? "Gratuit" : formatPrice(method.price)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Step 5: Payment */}
      {currentStep === "payment" && (
        <div>
          <h1 className="mb-6 font-serif text-2xl font-bold text-foreground">Paiement</h1>

          {/* Order summary */}
          <div className="mb-6 rounded-xl border border-border bg-card p-4">
            <div className="flex flex-col gap-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Sous-total</span><span>{formatPrice(subtotal)}</span></div>
              {promoDiscount > 0 && <div className="flex justify-between text-primary"><span>Reduction</span><span>-{formatPrice(discount)}</span></div>}
              <div className="flex justify-between text-muted-foreground"><span>Livraison ({delivery.name})</span><span>{shippingCost === 0 ? "Gratuit" : formatPrice(shippingCost)}</span></div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-bold text-foreground"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
          </div>

          {/* Payment methods */}
          <div className="grid gap-3 sm:grid-cols-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-4 text-left transition-colors",
                  selectedPayment === method.id ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted"
                )}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground">
                  {method.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{method.name}</p>
                  <p className="text-[11px] text-muted-foreground">{method.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            Paiement 100% securise par chiffrement SSL 256-bit
          </div>
        </div>
      )}

      {/* Step 6: Confirmation */}
      {currentStep === "confirmation" && (
        <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">Merci pour votre commande !</h1>
            <p className="mt-2 text-base text-muted-foreground">
              Votre commande a ete confirmee avec succes.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card px-6 py-4">
            <p className="text-xs text-muted-foreground">Numero de commande</p>
            <p className="mt-1 font-serif text-xl font-bold text-primary">{orderRef}</p>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Un email de confirmation a ete envoye. Vous pouvez suivre votre commande depuis votre espace client.
          </p>
          <div className="flex gap-3">
            <Link href="/compte/commandes" className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              Suivre ma commande
            </Link>
            <Link href="/produits" className="rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors">
              Continuer mes achats
            </Link>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      {currentStep !== "confirmation" && (
        <div className="mt-8 flex items-center justify-between">
          {currentStepIndex > 0 ? (
            <button onClick={goBack} className="flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Retour
            </button>
          ) : (
            <Link href="/produits" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Continuer mes achats
            </Link>
          )}
          <button onClick={goNext} className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            {currentStep === "payment" ? "Confirmer la commande" : "Continuer"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
