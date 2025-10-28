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

export interface Order {
  id: string
  order_number: string
  customer_name: string
  phone_number: string
  address_street: string
  address_district: string
  address_city: string
  address_postal_code: string
  address_notes: string
  total_amount: number
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "delivering"
    | "completed"
    | "cancelled"
  notes: string
  created_at: Date
}

export interface OrderItems {
  id: string
  order_id: string
  menu_item_id: string
  menu_item_name: string
  menu_item_price: number
  quantity: number
  notes: string
  created_at: Date
}

export type FormDataOrder = z.infer<typeof orderValidation.create>
