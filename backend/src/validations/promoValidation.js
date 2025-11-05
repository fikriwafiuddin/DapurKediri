import { z } from "zod"

const enumDiscountTypes = ["percentage", "fixed_amount"]
const enumCategories = ["all", "food", "drink", "snack", "bundle"]

const create = z
  .object({
    title: z
      .string({
        error: (issue) =>
          issue.input == undefined
            ? "Nama promo wajib diisi"
            : "Nama promo harus berupa string",
      })
      .trim()
      .min(5, "Nama promo setidaknya harus 5 karakter")
      .max(15, "Nama Promo maksimal 15 karakter"),
    description: z
      .string("Deskripsi promo harus berupa string")
      .trim()
      .max(100, "Deskripsi promo maksimal 100 karakter"),
    code: z
      .string({
        error: (issue) =>
          issue.input == undefined
            ? "Kode promo wajib diisi"
            : "Kode promo harus berupa string",
      })
      .trim()
      .toUpperCase()
      .min(3, "Kode promo setidaknya harus 3 karakter")
      .max(10, "Kode promo maksimal 10 karakter"),
    category: z.enum(enumCategories, {
      error: (issue) =>
        issue.input == undefined
          ? "Kategori wajib diisi"
          : "Kategori tidak sesuai",
    }),
    discountType: z.enum(enumDiscountTypes, {
      error: (issue) =>
        issue.input == undefined
          ? "Tipe diskon wajib diisi"
          : "Tipe diskon tidak sesuai",
    }),
    discountValue: z.preprocess(
      (val) => Number(val),
      z
        .number({
          error: (issue) =>
            issue.input == undefined
              ? "Nilai diskon wajib diisi"
              : "Nilai diskon harus berupa angka",
        })
        .positive("Nilai diskon harus lebih dari 0")
        .default(0)
    ),
    maxDiscount: z
      .preprocess(
        (val) => (val === "" ? null : Number(val)),
        z.number("Nilai maksimal diskon harus berupa angka").default(0)
      )
      .nullable()
      .optional(),
    minOrderAmount: z.preprocess(
      (val) => Number(val),
      z
        .number("Minimal jumlah order harus berupa angka")
        .min(0, "Minimal jumlah order tidak boleh kurang dari 0")
        .default(0)
    ),
    usageLimit: z.preprocess(
      (val) => Number(val),
      z
        .number("Batas penggunaan harus berupa angka")
        .positive("Batas penggunaan harus lebih dari 0")
    ),
    validFrom: z.preprocess(
      (val) => new Date(val),
      z.date({
        error: (issue) =>
          issue.input == undefined
            ? "Tanggal mulai wajib diisi"
            : "Tanggal mulai harus berupa tanggal",
      })
    ),
    validTo: z.preprocess(
      (val) => new Date(val),
      z.date({
        error: (issue) =>
          issue.input == undefined
            ? "Tanggal berakhir wajib diisi"
            : "Tanggal berakhir harus berupa tanggal",
      })
    ),
    active: z
      .boolean({
        error: (issue) =>
          issue.input == undefined
            ? "Status aktif wajib diisi"
            : "Status aktif harus berupa boolean",
      })
      .default(true),
  })
  .refine((data) => new Date(data.validTo) > new Date(data.validFrom), {
    message: "Tanggal akhir harus setelahnya tanggal mulai",
    path: ["valid_to"],
  })
  .refine(
    (data) => {
      if (data.discountType === "percentage") {
        return data.discountValue <= 100
      }
      return true
    },
    {
      message: "Nilai diskon persentase maksimal 100",
      path: ["value"],
    }
  )

const update = z
  .object({
    id: z.preprocess((val) => Number(val), z.number("ID tidak valid")),
    title: z
      .string({
        error: (issue) =>
          issue.input == undefined
            ? "Nama promo wajib diisi"
            : "Nama promo harus berupa string",
      })
      .trim()
      .min(5, "Nama promo setidaknya harus 5 karakter")
      .max(15, "Nama Promo maksimal 15 karakter"),
    description: z
      .string("Deskripsi promo harus berupa string")
      .trim()
      .max(100, "Deskripsi promo maksimal 100 karakter"),
    code: z
      .string({
        error: (issue) =>
          issue.input == undefined
            ? "Kode promo wajib diisi"
            : "Kode promo harus berupa string",
      })
      .trim()
      .toUpperCase()
      .min(3, "Kode promo setidaknya harus 3 karakter")
      .max(10, "Kode promo maksimal 10 karakter"),
    category: z.enum(enumCategories, {
      error: (issue) =>
        issue.input == undefined
          ? "Kategori wajib diisi"
          : "Kategori tidak sesuai",
    }),
    discountType: z.enum(enumDiscountTypes, {
      error: (issue) =>
        issue.input == undefined
          ? "Tipe diskon wajib diisi"
          : "Tipe diskon tidak sesuai",
    }),
    discountValue: z.preprocess(
      (val) => Number(val),
      z
        .number({
          error: (issue) =>
            issue.input == undefined
              ? "Nilai diskon wajib diisi"
              : "Nilai diskon harus berupa angka",
        })
        .positive("Nilai diskon harus lebih dari 0")
        .default(0)
    ),
    maxDiscount: z
      .preprocess(
        (val) => (val === "" ? null : Number(val)),
        z.number("Nilai maksimal diskon harus berupa angka").default(0)
      )
      .nullable()
      .optional(),
    minOrderAmount: z.preprocess(
      (val) => Number(val),
      z
        .number("Minimal jumlah order harus berupa angka")
        .min(0, "Minimal jumlah order tidak boleh kurang dari 0")
        .default(0)
    ),
    usageLimit: z.preprocess(
      (val) => Number(val),
      z
        .number("Batas penggunaan harus berupa angka")
        .positive("Batas penggunaan harus lebih dari 0")
    ),
    validFrom: z.preprocess(
      (val) => new Date(val),
      z.date({
        error: (issue) =>
          issue.input == undefined
            ? "Tanggal mulai wajib diisi"
            : "Tanggal mulai harus berupa tanggal",
      })
    ),
    validTo: z.preprocess(
      (val) => new Date(val),
      z.date({
        error: (issue) =>
          issue.input == undefined
            ? "Tanggal berakhir wajib diisi"
            : "Tanggal berakhir harus berupa tanggal",
      })
    ),
    active: z
      .boolean({
        error: (issue) =>
          issue.input == undefined
            ? "Status aktif wajib diisi"
            : "Status aktif harus berupa boolean",
      })
      .default(true),
  })
  .refine((data) => new Date(data.validTo) > new Date(data.validFrom), {
    message: "Tanggal akhir harus setelahnya tanggal mulai",
    path: ["valid_to"],
  })
  .refine(
    (data) => {
      if (data.discountType === "percentage") {
        return data.discountValue <= 100
      }
      return true
    },
    {
      message: "Nilai diskon persentase maksimal 100",
      path: ["value"],
    }
  )

const remove = z.object({
  id: z.preprocess((val) => Number(val), z.number("ID tidak valid")),
})

const promotionValidation = {
  create,
  update,
  remove,
}
export default promotionValidation
