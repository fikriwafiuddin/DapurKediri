import prisma from "../database/prisma.js"

const getDateRange = (period) => {
  const now = new Date()
  const start = new Date()

  switch (period) {
    case "today":
      start.setHours(0, 0, 0, 0)
      now.setHours(23, 59, 59, 999)
      break
    case "week":
      start.setDate(now.getDate() - 7)
      start.setHours(0, 0, 0, 0)
      now.setHours(23, 59, 59, 999)
      break
    case "month":
      start.setMonth(now.getMonth() - 1)
      start.setHours(0, 0, 0, 0)
      now.setHours(23, 59, 59, 999)
      break
    default:
      throw new Error("Periode tidak valid, gunakan: today, week, atau month")
  }

  return { start, end: now }
}

const summary = async (period) => {
  const { start, end } = getDateRange(period)

  // Get orders within period
  const orderStats = await prisma.order.aggregate({
    where: {
      createdAt: {
        gte: start,
        lte: end,
      },
      status: "completed", // Only count completed orders for revenue
    },
    _count: {
      id: true, // Total orders
    },
    _sum: {
      totalAmount: true, // Total revenue
    },
    _avg: {
      totalAmount: true, // Average order value
    },
  })

  const totalOrders = await prisma.order.count({
    where: {
      createdAt: {
        gte: start,
        lte: end,
      },
    },
  })

  return {
    totalRevenue: orderStats._sum.totalAmount || 0,
    totalOrders,
    averageOrderValue: Math.round(orderStats._avg.totalAmount) || 0,
  }
}

const topMenus = async (period) => {
  const { start, end } = getDateRange(period)

  const topMenus = await prisma.$queryRaw`
    SELECT 
      oi.menu_id AS "menuId",
      oi.menu_name AS "menuName",
      SUM(oi.quantity) AS "totalQuantity",
      SUM(oi.menu_price * oi.quantity) AS "revenue"
    FROM order_item oi
    JOIN "order" o ON o.id = oi.order_id
    WHERE o.status = 'completed'
      AND o.created_at BETWEEN ${start} AND ${end}
    GROUP BY oi.menu_id, oi.menu_name
    ORDER BY "totalQuantity" DESC
    LIMIT 5;
  `
  return topMenus.map((menu) => ({
    menuId: Number(menu.menuId),
    menuName: menu.menuName,
    totalQuantity: Number(menu.totalQuantity),
    revenue: Number(menu.revenue),
  }))
}

const reportService = {
  summary,
  topMenus,
}
export default reportService
