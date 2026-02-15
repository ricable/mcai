import { Star, Check, Quote } from "lucide-react"
import { reviews } from "@/lib/data"
import { cn } from "@/lib/utils"

export function CommunityReviews() {
  return (
    <section className="bg-muted/50 py-12 lg:py-16" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Avis Verifies
          </p>
          <h2
            id="reviews-heading"
            className="mt-1 font-serif text-3xl font-bold text-foreground sm:text-4xl"
          >
            La Communaute Ourson
          </h2>
          <p className="mt-2 text-muted-foreground">
            Ce que nos clients disent de nos produits
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 6).map((review) => (
            <div
              key={review.id}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5"
            >
              <Quote className="h-5 w-5 text-secondary/40" />
              <p className="flex-1 text-sm leading-relaxed text-foreground line-clamp-4">
                {review.text}
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={cn(
                      "h-3.5 w-3.5",
                      s <= review.rating ? "fill-secondary text-secondary" : "fill-muted text-muted"
                    )}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-foreground">{review.author}</span>
                    {review.verified && (
                      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-verified">
                        <Check className="h-2 w-2 text-card" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{review.productName}</p>
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {new Date(review.date).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
