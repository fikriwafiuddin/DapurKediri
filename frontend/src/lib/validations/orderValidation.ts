import { z } from "zod"

const create = z.object({
  customerName: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Nama cutomer wajib diisi"
          : "Nama cutomer harus berupa string",
    })
    .trim()
    .min(2, "Nama customer setidaknya harus 2 karakter")
    .max(50, "Nama customer tidak boleh lebih dari 50 karakter"),
  phoneNumber: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Nomor HP wajib diisi"
          : "Nomor HP harus berupa string",
    })
    .min(10, "Nomor HP setidaknya harus 10 karakter")
    .max(13, "Nomor HP terlalu panjang")
    .regex(/^[0-9+]+$/, "Format nomor HP tidak valid"),
  address: z.object({
    street: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Alamat wajib diis"
            : "Alamat harus berupa string",
      })
      .trim()
      .min(5, "Alamat setidaknya harus 5 karakter")
      .max(100, "Alamat tidak boleh lebih dari 100 karakter"),
    district: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Kecamatan haru diisi"
            : "Kecamatan harus berupa string",
      })
      .trim()
      .toLowerCase()
      .min(3, "Kecamatan setidaknya harus 3 karakter")
      .max(20, "Kecamatan tidak boleh lebih dari 20 karakter"),
    city: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Kota wajib diisi"
            : "Kota harus berupa string",
      })
      .trim()
      .toLowerCase()
      .min(2, "Kota setidaknya harus 2 karakter")
      .max(20, "Kota tidak boleh lebih dari 20 karakter"),
    postalCode: z
      .string("Kode pos harus berupa string")
      .trim()
      .regex(/^\d{5}$/, "Kode pos harus terdiri dari 5 digit angka.")
      .optional()
      .or(z.literal(""))
      .transform((e) => (e === "" ? undefined : e)),
    notes: z
      .string("Catatan harus berupa string")
      .trim()
      .max(500, "Catatan tidak boleh lebih dari 500 karakter")
      .optional(),
  }),
  notes: z
    .string("Catatan harus berupa string")
    .trim()
    .max(500, "Catatan tidak boleh lebih dari 500 karakter")
    .optional(),
})

const orderValidation = {
  create,
}
export default orderValidation
