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
import { useDeleteMenu } from "@/services/hooks/menuHook"
import { Menu } from "@/types"
import { Trash2Icon } from "lucide-react"
import { useState } from "react"

type DeleteMenuProps = {
  menu: Menu
}

function DeleteMenu({ menu }: DeleteMenuProps) {
  const [openConfirm, setOpenConfirm] = useState<boolean>(false)
  const { isPending, mutate } = useDeleteMenu()

  const handleDelete = () => {
    mutate(menu.id, {
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
              Menu &quot;{menu.name}&quot; akan dihapus secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <Button
              onClick={handleDelete}
              disabled={isPending}
              variant="destructive"
            >
              {isPending ? <Spinner /> : "Hapus"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteMenu
