import prisma from "../database/prisma.js"
import { ErrorResponse } from "../utils/response.js"

const create = async (input) => {
  const { code, ...data } = input

  const existingPromotionByCode = await prisma.promotion.findFirst({
    where: {
      code,
    },
  })
  if (existingPromotionByCode) {
    throw new ErrorResponse("Kode promo sudah digunakan", 400, {
      code: ["Kode promo sudah digunakan"],
    })
  }

  const newPromotion = await prisma.promotion.create({
    data: { code, ...data },
  })
  return newPromotion
}

const update = async (input) => {
  const { id, code, ...data } = input

  const existingPromotion = await prisma.promotion.findUnique({
    where: { id },
  })
  if (!existingPromotion) {
    throw new ErrorResponse("Promo tidak ditemukan", 404)
  }

  const existingPromotionByCode = await prisma.promotion.findFirst({
    where: {
      code,
      NOT: { id },
    },
  })
  if (existingPromotionByCode) {
    throw new ErrorResponse("Kode promo sudah digunakan", 400, {
      code: ["Kode promo sudah digunakan"],
    })
  }

  const updatedPromotion = await prisma.promotion.update({
    where: { id },
    data: { code, ...data },
  })

  return updatedPromotion
}

const remove = async (id) => {
  const existingPromotion = await prisma.promotion.findUnique({
    where: { id },
  })
  if (!existingPromotion) {
    throw new ErrorResponse("Promo tidak ditemukan", 404)
  }

  const removedPromotion = await prisma.promotion.delete({
    where: { id },
  })
  return removedPromotion
}

const show = async (code) => {
  const promotion = await prisma.promotion.findFirst({
    where: { code },
  })
  if (!promotion) {
    throw new ErrorResponse("Promo tidak ditemukan", 404)
  }

  return promotion
}

const getAll = async () => {
  const promotions = await prisma.promotion.findMany()
  return promotions
}

const promotionService = {
  create,
  update,
  remove,
  show,
  getAll,
}
export default promotionService
