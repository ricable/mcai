export interface Grower {
  id: string
  slug: string
  name: string
  avatar: string
  farmName: string
  region: string
  bio: string
  story: string
  certifications: string[]
  verified: boolean
  productCount: number
  joinedYear: number
  farmPhoto: string
}

export interface ProductVariant {
  weight: string
  price: number
  stock: number
}

export interface Product {
  id: string
  slug: string
  name: string
  price: number
  regularPrice?: number
  images: string[]
  category: string
  categorySlug: string
  description: string
  shortDescription: string
  features: {
    cbdPercent: string
    thcLevel: string
    origin: string
    extraction: string
  }
  variants: ProductVariant[]
  rating: number
  reviewCount: number
  badges: ("nouveau" | "promo" | "best-seller")[]
  stock: number
  grower: {
    id: string
    name: string
    avatar: string
    region: string
    verified: boolean
  }
  terroir: string
  harvestDate: string
  labCertificateUrl: string
  organicCertifications: string[]
  effects: string[]
}

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  productCount: number
  image: string
}

export interface Review {
  id: string
  author: string
  rating: number
  date: string
  text: string
  productName: string
  verified: boolean
}

export interface CartItem {
  product: Product
  quantity: number
  selectedVariant: ProductVariant
}

export interface Order {
  id: string
  reference: string
  date: string
  status: "confirmed" | "preparing" | "shipped" | "delivered"
  items: { name: string; quantity: number; price: number }[]
  subtotal: number
  shipping: number
  total: number
  trackingNumber?: string
  carrier?: string
}

export type CheckoutStep =
  | "cart"
  | "personal"
  | "address"
  | "delivery"
  | "payment"
  | "confirmation"
