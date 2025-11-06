import prisma from "../database/prisma.js"

const summary = async () => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const endOfToday = new Date()
    endOfToday.setHours(23, 59, 59, 999)

    // Get today's orders
    const todayOrders = await prisma.order.count({
      where: {
        createdAt: {
          gte: today,
          lte: endOfToday,
        },
      },
    })

    // Get pending orders
    const pendingOrders = await prisma.order.count({
      where: {
        status: "pending",
      },
    })

    // Get today's revenue from completed orders
    const todayRevenue = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        status: "completed",
        createdAt: {
          gte: today,
          lte: endOfToday,
        },
      },
    })

    // Get total orders (all time)
    const totalOrders = await prisma.order.count()

    // Get total menus
    const totalMenus = await prisma.menu.count()

    return {
      todayOrders,
      pendingOrders,
      todayRevenue: todayRevenue._sum.totalAmount || 0,
      totalOrders,
      totalMenus,
    }
  } catch (error) {
    throw new Error("Failed to get dashboard summary: " + error.message)
  }
}

const recentOrders = async () => {
  try {
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        orderItems: {
          include: {
            menu: true,
          },
        },
      },
    })

    return recentOrders
  } catch (error) {
    throw new Error("Failed to get recent orders: " + error.message)
  }
}

const dashboardService = {
  summary,
  recentOrders,
}
export default dashboardService
