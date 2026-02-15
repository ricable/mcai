import { HeroSlider } from "@/components/home/hero-slider"
import { CategoryNav } from "@/components/home/category-nav"
import { WelcomeBlock } from "@/components/home/welcome-block"
import { FeaturedProducts } from "@/components/home/featured-products"
import { GrowerSpotlight } from "@/components/home/grower-spotlight"
import { CommunityReviews } from "@/components/home/community-reviews"
import { TrustBadges } from "@/components/home/trust-badges"
import { Newsletter } from "@/components/home/newsletter"

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <CategoryNav />
      <WelcomeBlock />
      <FeaturedProducts />
      <GrowerSpotlight />
      <CommunityReviews />
      <TrustBadges />
      <Newsletter />
    </>
  )
}
