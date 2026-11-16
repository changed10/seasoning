export type RegionId = 'jeju' | 'gyeongbuk' | 'gyeongnam' | 'jeonnam'

export interface Product {
  id: string
  name: string
  origin: string
  regionId: RegionId
  weight: string
  price: number
  description: string
  image: string
  featuredOnHome?: boolean
}

export interface CartItem {
  productId: string
  quantity: number
}

export interface RecipeIngredient {
  name: string
  amount: string
}

export interface Recipe {
  id: string
  title: string
  subtitle: string
  image: string
  time: string
  servings: string
  ingredients: RecipeIngredient[]
  steps: string[]
  tip?: string
}

export interface RegionStamp {
  id: RegionId
  name: string
  collected: boolean
}
