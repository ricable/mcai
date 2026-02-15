"use client"

import { useState } from "react"
import { Mail, ArrowRight, Check } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section className="relative overflow-hidden bg-primary py-16 lg:py-20" aria-label="Newsletter">
      {/* Decorative bg */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-[-10%] top-[-20%] h-[140%] w-[60%]">
          <svg viewBox="0 0 400 600" fill="currentColor" className="h-full w-full text-card">
            <path d="M200 0C200 0 400 150 400 300S200 600 200 600S0 450 0 300S200 0 200 0Z" />
          </svg>
        </div>
      </div>

      <div className="relative mx-auto max-w-2xl px-4 text-center lg:px-6">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-card/20">
          <Mail className="h-5 w-5 text-card" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-card sm:text-4xl text-balance">
          Restez Informe
        </h2>
        <p className="mt-3 text-base text-card/80">
          Recevez nos offres exclusives, les arrivages de saison et les actualites de nos producteurs.
        </p>

        {submitted ? (
          <div className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-card/10 py-4 backdrop-blur-sm">
            <Check className="h-5 w-5 text-card" />
            <p className="text-sm font-medium text-card">
              Merci ! Vous recevrez bientot nos actualites.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-2">
            <input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 rounded-lg border border-card/20 bg-card/10 px-5 py-3 text-sm text-card placeholder:text-card/50 outline-none backdrop-blur-sm focus:border-card/40"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
            >
              {"S'inscrire"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-card/50">
          En vous inscrivant, vous acceptez notre politique de confidentialite. Desabonnement possible a tout moment.
        </p>
      </div>
    </section>
  )
}
