import { ErrorResponse } from "../utils/response.js"

/**
 * Evaluate promotion for given order items.
 * - tx: prisma transaction client
 * - promotionId: id of promotion to apply
 * - input: original order input
 * - menuMap: Map<menuId, menu>
 * - totalAmount: total order amount (sum of all items)
 * - orderItems: array of prepared order items with menuPrice and quantity
 *
 * Returns: { appliedPromotion, discountValue }
 */
export async function validateAndCalculatePromotion(
  tx,
  promotionId,
  input,
  menuMap,
  totalAmount,
  orderItems
) {
  let appliedPromotion = null
  let discountValue = 0

  if (!promotionId) return { appliedPromotion: null, discountValue: 0 }

  const promo = await tx.promotion.findUnique({ where: { id: promotionId } })
  if (!promo) {
    throw new ErrorResponse("Promosi tidak ditemukan", 404)
  }

  if (!promo.active) {
    throw new ErrorResponse("Promosi tidak aktif", 400)
  }

  const now = new Date()
  if (now < promo.validFrom || now > promo.validTo) {
    throw new ErrorResponse("Promosi tidak dalam rentang berlaku", 400)
  }

  if (promo.usageLimit && promo.usedCount >= promo.usageLimit) {
    throw new ErrorResponse("Limit penggunaan promosi telah tercapai", 400)
  }

  // minOrderAmount check (using totalAmount - keep behavior consistent)
  if (totalAmount < promo.minOrderAmount) {
    throw new ErrorResponse(
      "Total pesanan belum memenuhi minimum untuk promosi",
      400
    )
  }

  // Determine eligible items according to promotion category
  // If promo.category === 'all' then all items eligible
  const eligibleItems = orderItems.filter((it) => {
    if (promo.category === "all") return true
    const m = menuMap.get(it.menuId)
    return m && m.category === promo.category
  })

  if (eligibleItems.length === 0) {
    throw new ErrorResponse(
      "Tidak ada item pada pesanan yang memenuhi syarat promosi",
      400
    )
  }

  const eligibleSubtotal = eligibleItems.reduce(
    (s, it) => s + it.menuPrice * it.quantity,
    0
  )

  // Calculate discount based on eligibleSubtotal
  if (promo.discountType === "percentage") {
    discountValue = Math.floor((eligibleSubtotal * promo.discountValue) / 100)
    if (promo.maxDiscount)
      discountValue = Math.min(discountValue, promo.maxDiscount)
  } else if (promo.discountType === "fixed_amount") {
    // Fixed amount cannot exceed eligible subtotal
    discountValue = Math.min(promo.discountValue, eligibleSubtotal)
  }

  if (discountValue > totalAmount) discountValue = totalAmount

  appliedPromotion = promo

  return { appliedPromotion, discountValue }
}
