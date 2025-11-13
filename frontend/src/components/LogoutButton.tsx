import { useState } from "react"
import { SidebarMenuButton } from "./ui/sidebar"
import { Loader2Icon, LogOutIcon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"
import { Button } from "./ui/button"
import { useAuthLogout } from "@/services/hooks/authHook"

function LogoutButton() {
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false)
  const { isPending, mutate: logout } = useAuthLogout()

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => setOpenConfirmLogout(false),
    })
  }

  return (
    <>
      <AlertDialog open={openConfirmLogout} onOpenChange={setOpenConfirmLogout}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah anda yakin untuk logout?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleLogout}
              disabled={isPending}
            >
              {isPending ? <Loader2Icon /> : "Logout"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <SidebarMenuButton onClick={() => setOpenConfirmLogout(true)}>
        <LogOutIcon className="h-4 w-4" /> <span>Logout</span>
      </SidebarMenuButton>
    </>
  )
}

export default LogoutButton
