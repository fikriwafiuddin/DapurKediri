import validation from "../validations/validation.js"
import orderValidation from "../validations/orderValidation.js"
import orderService from "../services/orderService.js"
import { SuccessResponse } from "../utils/response.js"

const create = async (req, res, next) => {
  try {
    const payload = req.body

    const input = validation(orderValidation.create, payload)

    const order = await orderService.create(input)
    return res
      .status(201)
      .json(new SuccessResponse("Pesanan berhasil dibuat", { order }))
  } catch (error) {
    next(error)
  }
}

const show = async (req, res, next) => {
  try {
    const orderNumber = req.params.orderNumber

    const order = await orderService.show(orderNumber)
    return res
      .status(200)
      .json(new SuccessResponse("Pesanan berhasil ditemukan", { order }))
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const payload = req.query

    const input = validation(orderValidation.getAll, payload)

    const { orders, pagination } = await orderService.getAll(input)

    return res
      .status(200)
      .json(
        new SuccessResponse(
          "Pesanan berhasil diambil",
          { orders },
          { pagination }
        )
      )
  } catch (error) {
    next(error)
  }
}

const updateStatus = async (req, res, next) => {
  try {
    const orderNumber = req.params.orderNumber
    const payload = req.body

    const input = validation(orderValidation.updateStatus, payload)

    const order = await orderService.updateStatus(orderNumber, input)
    return res
      .status(200)
      .json(
        new SuccessResponse("Status pesanan berhasil diperbarui", { order })
      )
  } catch (error) {
    next(error)
  }
}

const orderController = {
  create,
  show,
  getAll,
  updateStatus,
}
export default orderController
