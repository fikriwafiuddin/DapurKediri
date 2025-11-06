import authValidation from "@/lib/validations/authValidation"
import menuValidation from "@/lib/validations/menuValidation"
import orderValidation from "@/lib/validations/orderValidation"
import promotionValidation from "@/lib/validations/promoValidation"
import { z } from "zod"

export interface Menu {
  id: string
  name: string
  description?: string
  price: number
  image?: string
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

export interface Promotion {
  id: string
  title: string
  description: string
  promo_code: string
  category: "all" | "food" | "drink" | "snack" | "bundle"
  discount_type: "percentage" | "fixed_amount"
  discount_value: number
  max_discount_value: number | null
  min_order_amount: number
  usage_limit: number
  used_count: number
  valid_from: Date
  valid_to: Date
  active: boolean
  created_at: Date
  updated_at?: Date
}

export type FormDataOrder = z.infer<typeof orderValidation.create>
export type FormDataMenuCreate = z.infer<typeof menuValidation.create>
export type FormDataMenuUpdate = z.infer<typeof menuValidation.update>
export type FormDataPromotionCreate = z.infer<typeof promotionValidation.create>
export type FormDataLogin = z.infer<typeof authValidation.login>
