"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import MenuForm from "./MenuForm"
import { PlusIcon, XIcon } from "lucide-react"
import MenuList from "./MenuList"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Menu } from "@/types"

function MenuPage() {
  const [openMenuForm, setOpenMenuForm] = useState<boolean>(false)
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null)
  const mode = selectedMenu ? "Edit Menu" : "Tambah Menu"

  const handleMenuForm = (open: boolean, menu?: Menu) => {
    setOpenMenuForm(open)
    if (!open) {
      setSelectedMenu(null)
    } else if (menu) {
      setSelectedMenu(menu)
    }
  }

  const handleSelectMenu = (menu: Menu | null) => {
    setSelectedMenu(menu)
    setOpenMenuForm(!!menu)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Kelola Menu</h2>
          <p className="text-muted-foreground">Tambah dan edit menu restoran</p>
        </div>
        <Button onClick={() => handleMenuForm(!openMenuForm)}>
          {openMenuForm ? (
            <>
              <XIcon className="mr-2 size-4" />
              Tutup Form
            </>
          ) : (
            <>
              <PlusIcon className="mr-2 size-4" />
              Tambah Menu
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{openMenuForm ? mode : "Daftar Menu"}</CardTitle>
        </CardHeader>
        <CardContent>
          {openMenuForm ? (
            <MenuForm
              onOpenChange={setOpenMenuForm}
              menu={selectedMenu}
              onSelectMenu={setSelectedMenu}
            />
          ) : (
            <MenuList onSelectMenu={handleSelectMenu} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default MenuPage
