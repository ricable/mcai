"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const slides = [
  {
    title: "CBD Bio Francais",
    subtitle: "Du producteur a votre bien-etre",
    description:
      "Decouvrez nos produits CBD biologiques cultives avec passion par des producteurs francais certifies.",
    cta: "Decouvrir nos produits",
    href: "/produits",
    gradient: "from-primary/90 to-primary/70",
  },
  {
    title: "Nos Producteurs",
    subtitle: "Rencontrez ceux qui cultivent votre bien-etre",
    description:
      "Chaque produit est trace jusqu'a son terroir d'origine. Provence, Bretagne, Alsace, Occitanie.",
    cta: "Voir les producteurs",
    href: "/producteurs",
    gradient: "from-secondary/80 to-secondary/60",
  },
  {
    title: "Nouveautes Printemps",
    subtitle: "Recolte fraiche 2026",
    description:
      "Nos dernieres fleurs et resines de saison, recoltees a la main et sechees naturellement.",
    cta: "Voir les nouveautes",
    href: "/produits",
    gradient: "from-[#5B7A3A]/85 to-primary/70",
  },
]

export function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return
      setIsAnimating(true)
      setCurrent(index)
      setTimeout(() => setIsAnimating(false), 700)
    },
    [isAnimating]
  )

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo])
  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo]
  )

  useEffect(() => {
    const interval = setInterval(next, 6000)
    return () => clearInterval(interval)
  }, [next])

  return (
    <section className="relative overflow-hidden" aria-label="Promotions et nouveautes">
      <div className="relative h-[460px] sm:h-[520px] lg:h-[600px]">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={cn(
              "absolute inset-0 transition-all duration-700 ease-out",
              i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
            )}
            aria-hidden={i !== current}
          >
            {/* Background */}
            <div className={cn("absolute inset-0 bg-gradient-to-br", slide.gradient)} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_70%)]" />

            {/* Decorative leaf patterns */}
            <div className="absolute right-[-5%] top-[-10%] h-[120%] w-[50%] opacity-10">
              <svg viewBox="0 0 400 600" fill="currentColor" className="h-full w-full text-card">
                <path d="M200 0C200 0 400 150 400 300S200 600 200 600S0 450 0 300S200 0 200 0Z" />
              </svg>
            </div>

            {/* Content */}
            <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 lg:px-6">
              <div className="max-w-xl">
                <p
                  className={cn(
                    "text-sm font-medium uppercase tracking-[0.2em] text-card/80 transition-all duration-700 delay-100",
                    i === current ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  )}
                >
                  {slide.subtitle}
                </p>
                <h2
                  className={cn(
                    "mt-3 font-serif text-4xl font-bold leading-tight text-card sm:text-5xl lg:text-6xl text-balance transition-all duration-700 delay-200",
                    i === current ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  )}
                >
                  {slide.title}
                </h2>
                <p
                  className={cn(
                    "mt-4 max-w-md text-base leading-relaxed text-card/85 sm:text-lg transition-all duration-700 delay-300",
                    i === current ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  )}
                >
                  {slide.description}
                </p>
                <Link
                  href={slide.href}
                  className={cn(
                    "mt-6 inline-flex items-center gap-2 rounded-lg bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-lg transition-all duration-700 delay-[400ms] hover:bg-card/90 hover:gap-3",
                    i === current ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  )}
                >
                  {slide.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/20 text-card backdrop-blur-sm transition-colors hover:bg-card/30"
        aria-label="Diapositive precedente"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/20 text-card backdrop-blur-sm transition-colors hover:bg-card/30"
        aria-label="Diapositive suivante"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === current ? "w-8 bg-card" : "w-2 bg-card/40"
            )}
            aria-label={`Diapositive ${i + 1}`}
            aria-current={i === current ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  )
}
