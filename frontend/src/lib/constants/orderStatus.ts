export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "delivering"
  | "completed"
  | "cancelled"

export const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  preparing: "bg-purple-100 text-purple-800",
  delivering: "bg-indigo-100 text-indigo-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

export const statusLabels: Record<OrderStatus, string> = {
  pending: "Menunggu",
  confirmed: "Dikonfirmasi",
  preparing: "Diproses",
  delivering: "Dikirim",
  completed: "Selesai",
  cancelled: "Dibatalkan",
}

export const getStatusLabel = (s: OrderStatus) => statusLabels[s]
export const getStatusColor = (s: OrderStatus) => statusColors[s]
