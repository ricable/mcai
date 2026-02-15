"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Product, ProductVariant, CartItem } from "./types"

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void
  removeItem: (productId: string, weight: string) => void
  updateQuantity: (productId: string, weight: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
  promoCode: string
  setPromoCode: (code: string) => void
  promoDiscount: number
  applyPromo: () => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const VALID_PROMOS: Record<string, number> = {
  OURSON10: 0.1,
  CBD20: 0.2,
  BIENVENUE: 0.15,
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [promoDiscount, setPromoDiscount] = useState(0)

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])
  const toggleCart = useCallback(() => setIsOpen((p) => !p), [])

  const addItem = useCallback(
    (product: Product, variant: ProductVariant, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.product.id === product.id && i.selectedVariant.weight === variant.weight
        )
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id && i.selectedVariant.weight === variant.weight
              ? { ...i, quantity: i.quantity + quantity }
              : i
          )
        }
        return [...prev, { product, quantity, selectedVariant: variant }]
      })
      setIsOpen(true)
    },
    []
  )

  const removeItem = useCallback((productId: string, weight: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.selectedVariant.weight === weight))
    )
  }, [])

  const updateQuantity = useCallback((productId: string, weight: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) =>
        prev.filter((i) => !(i.product.id === productId && i.selectedVariant.weight === weight))
      )
      return
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.selectedVariant.weight === weight
          ? { ...i, quantity }
          : i
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    setPromoCode("")
    setPromoDiscount(0)
  }, [])

  const subtotal = items.reduce((sum, i) => sum + i.selectedVariant.price * i.quantity, 0)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  const applyPromo = useCallback(() => {
    const discount = VALID_PROMOS[promoCode.toUpperCase()]
    if (discount) {
      setPromoDiscount(discount)
      return true
    }
    setPromoDiscount(0)
    return false
  }, [promoCode])

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        promoCode,
        setPromoCode,
        promoDiscount,
        applyPromo,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}
