import { z } from "zod"

const enumOrderStatus = [
  "pending",
  "confirmed",
  "preparing",
  "delivering",
  "completed",
  "cancelled",
]

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
  address: z.object(
    {
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
              ? "Kecamatan harus diisi"
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
    },
    {
      error: "Alamat harus berupa object",
    }
  ),
  notes: z
    .string("Catatan harus berupa string")
    .trim()
    .max(500, "Catatan tidak boleh lebih dari 500 karakter")
    .optional(),
  items: z
    .array(
      z.object({
        id: z.number("ID menu tidak valid"),
        quantity: z
          .number({
            error: (issue) =>
              issue.input == undefined
                ? "Jumlah harus diisi"
                : "Jumlah harus berupa angka",
          })
          .positive("Jumlah harus lebih dari 0"),
      }),
      {
        error: "Menu yang dibeli harus berupa array",
      }
    )
    .min(1, "Menu yang dibeli minimal 1"),
  promotionId: z
    .preprocess((val) => Number(val), z.number("ID diskon tidak valid"))
    .optional(),
})

const getAll = z
  .object({
    page: z
      .preprocess(
        (val) => Number(val),
        z
          .number("Halaman harus berupa angka")
          .positive("Halaman harus lebih dari 0")
      )
      .default(1),
    status: z
      .enum([...enumOrderStatus, "all"], "Status tidak valid")
      .default("all"),
    direction: z.enum(["asc", "desc"], "Urutan tidak valid").default("asc"),
    startDate: z
      .preprocess(
        (val) => new Date(val),
        z.date("Tanggal awal harus berupa tanggal valid")
      )
      .default(
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        ).toISOString()
      ),
    endDate: z
      .preprocess(
        (val) => new Date(val),
        z.date("Tanggal akhir harus berupa tanggal valid")
      )
      .default(
        new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0
        ).toISOString()
      ),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    error: "Tanggal awal harus sebelum tanggal akhir",
    path: ["endDate"],
  })

const updateStatus = z.object({
  status: z.enum(enumOrderStatus, {
    error: (issue) =>
      issue.input == undefined ? "Status wajib diisi" : "Status tidak valid",
  }),
})

const orderValidation = {
  create,
  getAll,
  updateStatus,
}
export default orderValidation
