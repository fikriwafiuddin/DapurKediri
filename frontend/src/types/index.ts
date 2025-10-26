import orderValidation from "@/lib/validations/orderValidation"
import { z } from "zod"

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

export type FormDataOrder = z.infer<typeof orderValidation.create>
