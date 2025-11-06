import menuService from "../services/menuService.js"
import { SuccessResponse } from "../utils/response.js"
import validation from "../validations/validation.js"
import menuValidation from "../validations/menuValidation.js"

const create = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      image: { ...req.file },
    }

    const input = validation(menuValidation.create, payload)

    const menu = await menuService.create(input)

    return res
      .status(201)
      .json(new SuccessResponse("Menu berhasil ditambahkan", { menu }))
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      ...req.params,
      image: req.file,
    }

    const input = validation(menuValidation.update, payload)

    const menu = await menuService.update(input)

    return res
      .status(200)
      .json(new SuccessResponse("Menu berhasil diperbarui", { menu }))
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const payload = req.params

    const { id } = validation(menuValidation.remove, payload)

    const menu = await menuService.remove(id)

    return res
      .status(200)
      .json(new SuccessResponse("Menu berhasil dihapus", { menu }))
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const payload = req.query

    const input = validation(menuValidation.getAll, payload)

    const menus = await menuService.getAll(input)

    return res
      .status(200)
      .json(new SuccessResponse("Menu berhasil diambil", { menus }))
  } catch (error) {
    next(error)
  }
}

const favorite = async (req, res, next) => {
  try {
    const menus = await menuService.favorite()
    return res
      .status(200)
      .json(new SuccessResponse("Menu favorit berhasil diambil", { menus }))
  } catch (error) {
    next(error)
  }
}

const menuController = {
  create,
  update,
  remove,
  getAll,
  favorite,
}
export default menuController
