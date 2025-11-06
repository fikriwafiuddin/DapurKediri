import validation from "../validations/validation.js"
import promotionValidation from "../validations/promoValidation.js"
import promotionService from "../services/promotionService.js"
import { SuccessResponse } from "../utils/response.js"

const create = async (req, res, next) => {
  try {
    const payload = req.body

    const input = validation(promotionValidation.create, payload)

    const promotion = await promotionService.create(input)
    return res
      .status(201)
      .json(new SuccessResponse("Promo berhasil dibuat", { promotion }))
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const payload = { ...req.body, ...req.params }

    const input = validation(promotionValidation.update, payload)

    const promotion = await promotionService.update(input)
    return res
      .status(200)
      .json(new SuccessResponse("Promo berhasil diperbarui", { promotion }))
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const payload = req.params

    const { id } = validation(promotionValidation.remove, payload)

    const promotion = await promotionService.remove(id)
    return res
      .status(200)
      .json(new SuccessResponse("Promo berhasil dihapus", { promotion }))
  } catch (error) {
    next(error)
  }
}

const show = async (req, res, next) => {
  try {
    const code = req.params.code

    const promotion = await promotionService.show(code)
    return res
      .status(200)
      .json(new SuccessResponse("Promo berhasil ditemukan", { promotion }))
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const promotions = await promotionService.getAll()
    return res
      .status(200)
      .json(new SuccessResponse("Promo berhasil diambil", { promotions }))
  } catch (error) {
    next(error)
  }
}

const special = async (req, res, next) => {
  try {
    const promotions = await promotionService.special()
    return res
      .status(200)
      .json(
        new SuccessResponse("Promo spesial berhasil diambil", { promotions })
      )
  } catch (error) {
    next(error)
  }
}

const promotionController = {
  create,
  update,
  remove,
  show,
  getAll,
  special,
}
export default promotionController
