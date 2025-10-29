import { z } from "zod"

const enumCategory = ["food", "drink", "snack", "bundle"]
const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"]

const create = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input == undefined
          ? "Nama menu wajib diisi"
          : "Nama menu harus berupa string",
    })
    .trim()
    .min(3, "Nama menu setidaknya harus 3 karakter")
    .max(30, "Nama menu tidak boleh lebih dari 10 karakter"),
  description: z
    .string("Deskripsi harus berupa string")
    .trim()
    .max(500, "Deskripsi tidak boleh lebih dari 500 karakter")
    .optional(),
  price: z.preprocess(
    (val) => Number(val),
    z
      .number({
        error: (issue) =>
          issue.input == undefined
            ? "Harga wajib diisi"
            : "Harga harus berupa angka",
      })
      .positive("Harga harus lebih dari 0")
  ),
  category: z.enum(enumCategory, {
    error: (issue) =>
      issue.input == undefined
        ? "Kategori wajib diisi"
        : "Kategori tidak sesuai",
  }),
  image: z
    .file({
      error: (issue) =>
        issue.input == undefined
          ? "Gambar wajib diisi"
          : "Gambar harus berupa file",
    })
    .min(1, "Gambar wajib diisi")
    .max(5 * 1024 * 1024, "Ukuran maksimal 5MB")
    .mime(allowedMimeTypes, {
      error: "Gambar harus berupa file dengan format JPEG, PNG, atau WEBP",
    }),
  available: z
    .boolean("Status ketersediaan harus berupa boolean")
    .optional()
    .default(true),
})

const update = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input == undefined
          ? "Nama menu wajib diisi"
          : "Nama menu harus berupa string",
    })
    .trim()
    .min(3, "Nama menu setidaknya harus 3 karakter")
    .max(30, "Nama menu tidak boleh lebih dari 10 karakter"),
  description: z
    .string("Deskripsi harus berupa string")
    .trim()
    .max(500, "Deskripsi tidak boleh lebih dari 500 karakter")
    .optional(),
  price: z.preprocess(
    (val) => Number(val),
    z
      .number({
        error: (issue) =>
          issue.input == undefined
            ? "Harga wajib diisi"
            : "Harga harus berupa angka",
      })
      .positive("Harga harus lebih dari 0")
  ),
  category: z.enum(enumCategory, {
    error: (issue) =>
      issue.input == undefined
        ? "Kategori wajib diisi"
        : "Kategori tidak sesuai",
  }),
  image: z
    .file({
      error: (issue) =>
        issue.input == undefined
          ? "Gambar wajib diisi"
          : "Gambar harus berupa file",
    })
    .min(1, "Gambar wajib diisi")
    .max(5 * 1024 * 1024, "Ukuran maksimal 5MB")
    .mime(allowedMimeTypes, {
      error: "Gambar harus berupa file dengan format JPEG, PNG, atau WEBP",
    })
    .optional(),
  available: z
    .boolean("Status ketersediaan harus berupa boolean")
    .optional()
    .default(true),
})

const menuValidation = {
  create,
  update,
}
export default menuValidation
