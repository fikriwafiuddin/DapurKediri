import authValidation from "@/lib/validations/authValidation"
import menuValidation from "@/lib/validations/menuValidation"
import orderValidation from "@/lib/validations/orderValidation"
import promotionValidation from "@/lib/validations/promoValidation"
import { z } from "zod"

export interface Admin {
  id: number
  email: string
}

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
  orderNumber: string
  customerName: string
  phoneNumber: string
  addressStreet: string
  addressDistrict: string
  addressCity: string
  addressPostalCode: string
  addressNotes: string
  totalAmount: number
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "delivering"
    | "completed"
    | "cancelled"
  notes: string
  orderItems?: OrderItems[]
  createdAt: Date
}

export interface OrderItems {
  id: string
  orderId: string
  menuId: string
  menuName: string
  menuPrice: number
  quantity: number
  notes: string
  created_at: Date
}

export interface Promotion {
  id: string
  title: string
  description: string
  code: string
  category: "all" | "food" | "drink" | "snack" | "bundle"
  discountType: "percentage" | "fixed_amount"
  discountValue: number
  maxDiscount: number | null
  minOrderAmount: number
  usageLimit: number
  usedCount: number
  validFrom: Date
  validTo: Date
  active: boolean
  createdAt: Date
  updatedAt?: Date
}

export interface CartItem {
  id: string
  quantity: number
}

export interface SuccessResponse<TData> {
  success: true
  message: string
  data: TData
  mete: {
    timestamp: string
  }
}

export interface ErrorResponse<TErrors = Record<string, unknown>> {
  success: false
  message: string
  errors: TErrors | Record<string, unknown>
  data: object
  meta: { timestamp: string }
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "delivering"
  | "completed"
  | "cancelled"

export type FormDataOrder = z.infer<typeof orderValidation.create>
export type FormDataMenuCreate = z.infer<typeof menuValidation.create>
export type FormDataMenuUpdate = z.infer<typeof menuValidation.update>
export type FormDataPromotionCreate = z.infer<typeof promotionValidation.create>
export type FormDataLogin = z.infer<typeof authValidation.login>
