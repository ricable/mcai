"use client"

import { useState, useEffect } from "react"
import { X, Truck, Shield, Leaf } from "lucide-react"

const announcements = [
  { icon: Truck, text: "Livraison offerte des 49\u20AC d'achat" },
  { icon: Shield, text: "Tous nos produits sont testes en laboratoire" },
  { icon: Leaf, text: "-15% sur votre 1ere commande avec le code BIENVENUE" },
]

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % announcements.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  if (!visible) return null

  const { icon: Icon, text } = announcements[currentIndex]

  return (
    <div className="relative bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2">
        <Icon className="h-3.5 w-3.5 shrink-0" />
        <p className="text-xs font-medium text-center">{text}</p>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/70 hover:text-primary-foreground"
        aria-label="Fermer"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
