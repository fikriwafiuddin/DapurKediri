import { z } from "zod"

const enumCategory = ["food", "drink", "snack", "bundle"]

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
  image: z.object({
    secure_url: z.string({
      error: (issue) =>
        issue.input == undefined ? "Gambar harus diisi" : "Gambar tidak sesuai",
    }),
    public_id: z.string("Gambar yang diuggah tidak memiliki public_id"),
  }),
  available: z
    .boolean("Status ketersediaan harus berupa boolean")
    .optional()
    .default(true),
})

const update = z.object({
  id: z.preprocess((val) => Number(val), z.number("ID menu tidak valid")),
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
    .object({
      secure_url: z.string({
        error: (issue) =>
          issue.input == undefined
            ? "Gambar harus diisi"
            : "Gambar tidak sesuai",
      }),
      public_id: z.string("Gambar yang diuggah tidak memiliki public_id"),
    })
    .optional(),
  available: z
    .boolean("Status ketersediaan harus berupa boolean")
    .optional()
    .default(true),
})

const remove = z.object({
  id: z.preprocess((val) => Number(val), z.number("ID menu tidak valid")),
})

const menuValidation = {
  create,
  update,
  remove,
}
export default menuValidation
