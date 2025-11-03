import cloudinary from "../utils/cloudinary.js"
import logger from "../utils/logger.js"
import { ErrorResponse } from "../utils/response.js"

const errorMiddleware = async (err, req, res, next) => {
  if (err instanceof ErrorResponse) {
    return res.status(err.status).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      data: err.data,
      meta: err.meta,
    })
  }

  const image = req.file
  if (image) {
    await cloudinary.uploader
      .destroy(image.public_id)
      .catch((error) =>
        logger.error(`Failed to delete image from Cloudinary: ${error.message}`)
      )
  }

  logger.error(`[ERROR] ${err.message} - ${req.method} ${req.originalUrl}`)
  return res.status(500).json(new ErrorResponse("Internal Server Error"))
}

export default errorMiddleware
