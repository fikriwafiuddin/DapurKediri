import reportService from "../services/reportService.js"
import { SuccessResponse } from "../utils/response.js"
import reportValidation from "../validations/reportValidation.js"
import validation from "../validations/validation.js"

const summary = async (req, res, next) => {
  try {
    const payload = req.query.period || "today"

    const period = validation(reportValidation.period, payload)

    const data = await reportService.summary(period)
    return res
      .status(200)
      .json(
        new SuccessResponse("Ringkasan laporan berhasil diambil", { ...data })
      )
  } catch (error) {
    next(error)
  }
}

const topMenus = async (req, res, next) => {
  try {
    const payload = req.query.period || "today"

    const period = validation(reportValidation.period, payload)

    const menus = await reportService.topMenus(period)
    return res
      .status(200)
      .json(new SuccessResponse("Menu terlaris berhasil diambil", { menus }))
  } catch (error) {
    next(error)
  }
}

const reportController = {
  summary,
  topMenus,
}
export default reportController
