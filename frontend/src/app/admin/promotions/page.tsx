"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon, XIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PromotionList from "./PromotionList"
import PromotionForm from "./PromotionForm"
import { useState } from "react"
import { Promotion } from "@/types"

function PromotionsPage() {
  const [openPromotionForm, setOpenPromotionForm] = useState<boolean>(false)
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  )
  const mode = selectedPromotion ? "Edit Promo" : "Tambah Promo"

  const handleMenuForm = () => {
    if (openPromotionForm) {
      setSelectedPromotion(null)
      setOpenPromotionForm(false)
    } else {
      setOpenPromotionForm(true)
    }
  }

  const handleSelectPromotion = (promotion: Promotion) => {
    setSelectedPromotion(promotion)
    setOpenPromotionForm(!!promotion)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Kelola Promo</h2>
          <p className="text-muted-foreground">
            Buat dan kelola promosi restoran
          </p>
        </div>
        <Button onClick={handleMenuForm}>
          {openPromotionForm ? (
            <>
              <XIcon className="mr-2 h-4 w-4" />
              Tutup Form
            </>
          ) : (
            <>
              <PlusIcon className="mr-2 h-4 w-4" />
              Tambah Promo
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{openPromotionForm ? mode : "Daftar Promo"}</CardTitle>
        </CardHeader>
        <CardContent>
          {openPromotionForm ? (
            <PromotionForm
              onOpenChange={setOpenPromotionForm}
              promotion={selectedPromotion}
            />
          ) : (
            <PromotionList onSelectPromotion={handleSelectPromotion} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default PromotionsPage
