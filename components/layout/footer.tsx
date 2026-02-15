import Link from "next/link"
import { Leaf, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                <Leaf className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold leading-tight text-card">Ourson</span>
                <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-secondary">CBD Bio</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-card/70">
              CBD biologique cultive en France par des producteurs certifies. Qualite, transparence et bien-etre au naturel.
            </p>
            <div className="flex flex-col gap-2 text-xs text-card/60">
              <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 shrink-0" /> 12 Rue des Lavandes, 84000 Avignon</span>
              <span className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 shrink-0" /> 04 90 12 34 56</span>
              <span className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 shrink-0" /> contact@ourson-cbd.fr</span>
            </div>
          </div>

          {/* Produits */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-card">Nos Produits</h3>
            <ul className="flex flex-col gap-2.5">
              {["Fleurs CBD", "Resines CBD", "Huiles Bio", "Infusions", "Baumes", "Bonbons"].map((item) => (
                <li key={item}>
                  <Link href="/produits" className="text-sm text-card/70 transition-colors hover:text-secondary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-card">Informations</h3>
            <ul className="flex flex-col gap-2.5">
              {[
                "A propos",
                "Nos Producteurs",
                "Certificats labo",
                "Blog",
                "FAQ",
                "Programme fidelite",
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-card/70 transition-colors hover:text-secondary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-card">Newsletter</h3>
            <p className="mb-4 text-sm text-card/70">
              Recevez nos offres exclusives et les dernieres nouveautes CBD.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Votre email"
                className="rounded-lg border border-card/20 bg-card/10 px-4 py-2.5 text-sm text-card placeholder:text-card/40 outline-none focus:border-secondary"
              />
              <button
                type="submit"
                className="rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
              >
                {"S'inscrire"}
              </button>
            </form>
            <div className="mt-4 flex items-center gap-3">
              {["AB", "EU Bio"].map((cert) => (
                <span
                  key={cert}
                  className="rounded-md border border-card/20 px-2 py-1 text-[10px] font-semibold text-card/70"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-card/10 pt-6 sm:flex-row">
          <p className="text-xs text-card/50">
            2026 Ourson CBD. Tous droits reserves.
          </p>
          <div className="flex gap-6">
            {["Mentions legales", "CGV", "Politique de confidentialite", "Cookies"].map((item) => (
              <Link key={item} href="#" className="text-xs text-card/50 transition-colors hover:text-card/80">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
