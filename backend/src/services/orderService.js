import prisma from "../database/prisma.js"
import { ErrorResponse } from "../utils/response.js"
import { validateAndCalculatePromotion } from "./promoService.js"

// Helper function to generate order number
function generateOrderNumber() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const hour = String(date.getHours()).padStart(2, "0")
  const minute = String(date.getMinutes()).padStart(2, "0")
  const second = String(date.getSeconds()).padStart(2, "0")
  const ms = String(date.getMilliseconds()).padStart(3, "0")
  const random = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, "0")

  return `INV-${year}${month}${day}${hour}${minute}${second}${ms}-${random}`
}

const create = async (input) => {
  // Validate and get all menu items first
  const menuIds = input.items.map((item) => item.id)
  const menus = await prisma.menu.findMany({
    where: {
      id: {
        in: menuIds,
      },
    },
  })

  // Check if all menu items exist and are available
  const menuMap = new Map(menus.map((menu) => [menu.id, menu]))
  const unavailableMenus = input.items.filter((item) => !menuMap.has(item.id))
  if (unavailableMenus.length > 0) {
    throw new ErrorResponse("Beberapa menu tidak ditemukan", 404, {
      menuIds: unavailableMenus.map((item) => item.id),
    })
  }

  // Check if all menus are available (not disabled)
  const unavailableItems = menus.filter((menu) => !menu.available)
  if (unavailableItems.length > 0) {
    throw new ErrorResponse("Beberapa menu tidak tersedia", 400, {
      menuNames: unavailableItems.map((menu) => menu.name),
    })
  }

  // Calculate total amount and prepare order items
  const orderItems = input.items.map((item) => {
    const menu = menuMap.get(item.id)
    return {
      menuId: item.id,
      quantity: item.quantity,
      menuName: menu.name,
      menuPrice: menu.price,
    }
  })

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.menuPrice * item.quantity,
    0
  )

  // Create order and order items in a transaction
  return await prisma.$transaction(async (tx) => {
    // Promotion handling (evaluate separately)
    const { appliedPromotion, discountValue } =
      await validateAndCalculatePromotion(
        tx,
        input.promotionId,
        input,
        menuMap,
        totalAmount,
        orderItems
      )

    const finalTotal = Math.max(0, totalAmount - discountValue)

    const order = await tx.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerName: input.customerName,
        phoneNumber: input.phoneNumber,
        addressStreet: input.address.street,
        addressDistrict: input.address.district,
        addressCity: input.address.city,
        addressPostalCode: input.address.postalCode || undefined,
        addressNotes: input.address.notes,
        notes: input.notes,
        totalAmount: finalTotal,
        discountValue: discountValue || 0,
        promotionId: appliedPromotion ? appliedPromotion.id : undefined,
        status: "pending",
      },
    })

    // Create order items
    await tx.orderItem.createMany({
      data: orderItems.map((item) => ({
        orderId: order.id,
        menuId: item.menuId,
        quantity: item.quantity,
        menuPrice: item.menuPrice,
        menuName: item.menuName,
      })),
    })

    // increment promotion usedCount if applied
    if (appliedPromotion) {
      await tx.promotion.update({
        where: { id: appliedPromotion.id },
        data: { usedCount: appliedPromotion.usedCount + 1 },
      })
    }
    // Return order with items
    return await tx.order.findUnique({
      where: { id: order.id },
      include: {
        orderItems: {
          include: {
            menu: {
              select: {
                name: true,
                category: true,
                image: true,
              },
            },
          },
        },
      },
    })
  })
}

const show = async (orderNumber) => {
  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      orderItems: true,
    },
  })
  if (!order) {
    throw new ErrorResponse("Pesanan tidak ditemukan", 404)
  }

  return order
}

const getAll = async (input) => {
  const { page, status, direction, startDate, endDate } = input

  const take = 10
  const skip = (page - 1) * take

  const where = {
    ...(status !== "all" && { status }),
    createdAt: {
      gte: startDate,
      lte: endDate,
    },
  }

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: direction },
    skip,
    take,
  })

  const totalOrders = await prisma.order.count({ where })

  return {
    orders,
    pagination: {
      page,
      totalPages: Math.ceil(totalOrders / take),
      totalOrders,
    },
  }
}

const updateStatus = async (orderNumber, input) => {
  const { status } = input

  const existingOrder = await prisma.order.findUnique({
    where: {
      orderNumber,
    },
  })
  if (!existingOrder) {
    throw new ErrorResponse("Pesanan tidak ditemukan", 404)
  }

  const updatedOrder = await prisma.order.update({
    where: { orderNumber },
    data: {
      status,
    },
  })

  return updatedOrder
}

const orderService = {
  create,
  show,
  getAll,
  updateStatus,
}
export default orderService
