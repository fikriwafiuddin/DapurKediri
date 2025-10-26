export interface Menu {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  available: boolean
}

export interface Category {
  id: string
  name: string
  description: string
}
