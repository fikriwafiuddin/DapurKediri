import prisma from "../database/prisma.js"
import cloudinary from "../utils/cloudinary.js"
import { ErrorResponse } from "../utils/response.js"

const create = async (input) => {
  const { name, description, price, category, available, image } = input

  const existingMenuByName = await prisma.menu.findUnique({
    where: { name },
  })
  if (existingMenuByName) {
    throw new ErrorResponse("Nama menu sudah digunakan", 400, {
      name: ["Nama menu sudah digunakan"],
    })
  }

  const newMenu = await prisma.menu.create({
    data: {
      name,
      description,
      price,
      category,
      image: image.secure_url,
      imageId: image.public_id,
      available,
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      category: true,
      image: true,
      available: true,
      createdAt: true,
    },
  })

  return newMenu
}

const update = async (input) => {
  const { id, name, description, price, category, image, available } = input

  const existingMenu = await prisma.menu.findUnique({
    where: { id },
  })
  if (!existingMenu) {
    throw new ErrorResponse("Menu tidak ditemukan", 404)
  }

  // Check if updated name already exists (excluding current menu)
  if (name !== existingMenu.name) {
    const existingMenuByName = await prisma.menu.findFirst({
      where: {
        name,
        NOT: {
          id: existingMenu.id,
        },
      },
    })
    if (existingMenuByName) {
      throw new ErrorResponse("Nama menu sudah digunakan", 400, {
        name: ["Nama menu sudah digunakan"],
      })
    }
  }

  const updateData = {
    name,
    description,
    price,
    category,
    available,
  }

  if (image) {
    updateData.image = image.secure_url
    updateData.imageId = image.public_id

    if (existingMenu.imageId) {
      await cloudinary.uploader.destroy(existingMenu.imageId)
    }
  }

  const updatedMenu = await prisma.menu.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      category: true,
      image: true,
      available: true,
      createdAt: true,
    },
  })

  return updatedMenu
}

const remove = async (id) => {
  const existingMenu = await prisma.menu.findUnique({
    where: { id },
  })

  if (!existingMenu) {
    throw new ErrorResponse("Menu tidak ditemukan", 404)
  }

  const removedMenu = await prisma.menu.delete({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      category: true,
      image: true,
      available: true,
      createdAt: true,
    },
  })

  await cloudinary.uploader.destroy(existingMenu.imageId)

  return removedMenu
}

const getAll = async (input) => {
  const { category } = input

  const menus = await prisma.menu.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      category: true,
      image: true,
      available: true,
      createdAt: true,
    },
    where: {
      ...(category !== "all" && { category }),
    },
  })

  return menus
}

const menuService = {
  create,
  update,
  remove,
  getAll,
}
export default menuService
