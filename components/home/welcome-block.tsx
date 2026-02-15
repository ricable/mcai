import { Leaf, Award, FlaskConical } from "lucide-react"

export function WelcomeBlock() {
  return (
    <section className="py-12 lg:py-16" aria-labelledby="welcome-heading">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Leaf className="h-5 w-5 text-primary" />
            </div>
          </div>
          <h2
            id="welcome-heading"
            className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance"
          >
            Le CBD Bio Francais, du Champ a Votre Porte
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Chez Ourson CBD, nous croyons en une approche transparente et responsable du bien-etre naturel. Chaque produit est cultive par des producteurs francais certifies biologiques, trace de la graine a la livraison, et teste en laboratoire independant.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Leaf, label: "100% Bio", desc: "Culture biologique certifiee" },
              { icon: Award, label: "Producteurs Certifies", desc: "Terroirs francais d'exception" },
              { icon: FlaskConical, label: "Teste en Labo", desc: "Analyses independantes" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5"
              >
                <item.icon className="h-6 w-6 text-secondary" />
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
