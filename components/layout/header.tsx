"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, User, ShoppingBag, Menu, X, ChevronDown, Leaf } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { categories } from "@/lib/data"
import { cn } from "@/lib/utils"
import { AnnouncementBar } from "./announcement-bar"

export function Header() {
  const { itemCount, toggleCart } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <>
      <AnnouncementBar />
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-card/95 backdrop-blur-md shadow-sm"
            : "bg-card"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-foreground"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold leading-tight text-foreground tracking-tight">
                Ourson
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary">
                CBD Bio
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Navigation principale">
            <Link
              href="/"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Accueil
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <Link
                href="/produits"
                className="flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                Nos Produits
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", megaMenuOpen && "rotate-180")} />
              </Link>
              {/* Mega menu */}
              {megaMenuOpen && (
                <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2">
                  <div className="grid grid-cols-3 gap-1 rounded-xl border border-border bg-card p-4 shadow-xl min-w-[420px]">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/produits?category=${cat.slug}`}
                        className="flex flex-col items-center gap-2 rounded-lg p-3 transition-colors hover:bg-muted"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                          <Leaf className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-xs font-medium text-foreground">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/producteurs"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Nos Producteurs
            </Link>
            <Link
              href="/produits"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Promotions
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
              aria-label="Rechercher"
            >
              <Search className="h-4.5 w-4.5" />
            </button>
            <Link
              href="/compte"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
              aria-label="Mon compte"
            >
              <User className="h-4.5 w-4.5" />
            </Link>
            <button
              onClick={toggleCart}
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
              aria-label={`Panier (${itemCount} articles)`}
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search bar overlay */}
        {searchOpen && (
          <div className="border-t border-border bg-card px-4 py-3">
            <div className="mx-auto max-w-2xl">
              <div className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-2.5">
                <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                <input
                  type="search"
                  placeholder="Rechercher un produit, une fleur, une huile..."
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  autoFocus
                />
                <button onClick={() => setSearchOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-card lg:hidden">
            <nav className="flex flex-col p-4 gap-1" aria-label="Navigation mobile">
              <Link href="/" className="rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>
                Accueil
              </Link>
              <Link href="/produits" className="rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>
                Tous les Produits
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/produits?category=${cat.slug}`}
                  className="rounded-lg px-8 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
              <Link href="/producteurs" className="rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>
                Nos Producteurs
              </Link>
              <Link href="/compte" className="rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>
                Mon Compte
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
