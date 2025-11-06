import dashboardService from "../services/dashboardService.js"
import { SuccessResponse } from "../utils/response.js"

const summary = async (req, res, next) => {
  try {
    const data = await dashboardService.summary()
    return res
      .status(200)
      .json(
        new SuccessResponse("Ringkasan dashboard berhasil diambil", { ...data })
      )
  } catch (error) {
    next(error)
  }
}

const recentOrders = async (req, res, next) => {
  try {
    const orders = await dashboardService.recentOrders()
    return res
      .status(200)
      .json(new SuccessResponse("Pesanan terbaru berhasil diambil", { orders }))
  } catch (error) {
    next(error)
  }
}

const dashboardController = {
  summary,
  recentOrders,
}
export default dashboardController
