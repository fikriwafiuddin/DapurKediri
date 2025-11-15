import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useRemovePromotion } from "@/services/hooks/promotionHook"
import { Promotion } from "@/types"
import { Trash2Icon } from "lucide-react"
import { useState } from "react"

type DeletePromotionProps = {
  promotion: Promotion
}

function DeletePromotion({ promotion }: DeletePromotionProps) {
  const [openConfirm, setOpenConfirm] = useState<boolean>(false)
  const { isPending, mutate } = useRemovePromotion()

  const handleDelete = () => {
    mutate(promotion.id, {
      onSuccess: () => setOpenConfirm(false),
    })
  }

  return (
    <>
      <Button onClick={() => setOpenConfirm(true)} variant="ghost" size="sm">
        <Trash2Icon className="h-4 w-4" />
      </Button>

      <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Promo &quot;{promotion.title}&quot; akan dihapus secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? <Spinner /> : "Hapus"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeletePromotion
