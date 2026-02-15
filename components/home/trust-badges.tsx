import { Truck, Shield, FlaskConical, Headphones } from "lucide-react"

const badges = [
  { icon: Truck, label: "Livraison Rapide", desc: "Expediee sous 24h" },
  { icon: Shield, label: "Paiement Securise", desc: "SSL & 3D Secure" },
  { icon: FlaskConical, label: "Teste en Labo", desc: "Analyses certifiees" },
  { icon: Headphones, label: "Support Reactif", desc: "Reponse sous 2h" },
]

export function TrustBadges() {
  return (
    <section className="border-y border-border py-10" aria-label="Nos engagements">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {badges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <badge.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{badge.label}</p>
                <p className="text-xs text-muted-foreground">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
