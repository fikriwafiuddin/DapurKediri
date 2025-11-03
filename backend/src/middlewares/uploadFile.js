import multer from "multer"
import { ErrorResponse } from "../utils/response.js"
import cloudinary from "../utils/cloudinary.js"

const memoryStorage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/
  const extname = allowedTypes.test(
    file.originalname.toLowerCase().split(".").pop()
  )
  const mimetype = allowedTypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb(new Error("Hanya file gambar yang diizinkan (jpeg, jpg, png, webp)"))
  }
}

const upload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: fileFilter,
})

const uploadOptions = (webpFilename) => {
  return {
    folder: "DapurKediri/menu",
    format: "webp",
    public_id: webpFilename,
    allowed_formats: [
      "jpg",
      "png",
      "jpeg",
      "gif",
      "bmp",
      "tiff",
      "svg",
      "webp",
    ],
    transformation: [
      {
        quality: "auto:best",
        fetch_format: "webp",
        flags: "progressive",
      },
      {
        width: 1200,
        height: 1200,
        crop: "limit",
      },
    ],
    webp_options: {
      quality: 85,
      method: 6,
      lossless: false,
    },
  }
}

const uploadFile = (req, res, next) => {
  upload.single("image")(req, res, async (error) => {
    if (error) {
      if (error instanceof multer.MulterError) {
        switch (error.code) {
          case "LIMIT_FILE_SIZE":
            return res.status(400).json(
              new ErrorResponse("Ukuran file melebihi batas 2MB", 400, {
                image: ["Ukuran file melebihi batas 2MB"],
              })
            )
        }
      }

      return res.status(500).json(new ErrorResponse("Gagal mengunggah bambar"))
    }

    if (!req.file) {
      return next()
    }

    try {
      const timestamp = Date.now()
      const originalName = req.file.originalname.split(".")[0]
      const webpFilename = `${originalName}_${timestamp}`

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          uploadOptions(webpFilename),
          (error, result) => {
            if (error) {
              logger.error("Cloudinary upload error:", error)
              reject(new Error(`Upload gagal: ${error.message}`))
            } else {
              resolve(result)
            }
          }
        )

        uploadStream.end(req.file.buffer)
      })

      req.file = {
        secure_url: result.secure_url,
        public_id: result.public_id,
      }

      next()
    } catch (error) {
      next(error)
    }
  })
}

export default uploadFile
