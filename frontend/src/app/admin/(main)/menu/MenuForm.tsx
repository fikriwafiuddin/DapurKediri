import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import menuValidation from "@/lib/validations/menuValidation"
import { useCreateMenu, useEditMenu } from "@/services/hooks/menuHook"
import { FormDataMenuCreate, FormDataMenuUpdate, Menu } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"

type MenuFormProps = {
  onOpenChange: (open: boolean) => void
  menu?: Menu | null
  onSelectMenu: (menu: Menu | null) => void
}

const categories = [
  { id: "food", name: "Makanan" },
  { id: "drink", name: "Minuman" },
  { id: "snack", name: "Cemilan" },
  { id: "bundle", name: "Paket" },
]

function MenuForm({ onOpenChange, menu, onSelectMenu }: MenuFormProps) {
  const form = useForm({
    resolver: zodResolver(menu ? menuValidation.update : menuValidation.create),
    defaultValues: {
      name: menu?.name || "",
      description: menu?.description || "",
      price: menu?.price || 0,
      category: menu?.category || "food",
      image: undefined,
      available: menu?.available ?? true,
    },
  })
  const [prevImage, setPrevImage] = useState<string | null>(null)
  const { isPending: creating, mutate: create } = useCreateMenu()
  const { isPending: updating, mutate: update } = useEditMenu()

  const onSubmit = (data: FormDataMenuCreate | FormDataMenuUpdate) => {
    if (menu) {
      update(
        { id: menu.id, data },
        {
          onSuccess: () => {
            if (prevImage) {
              URL.revokeObjectURL(prevImage)
              setPrevImage(null)
            }
            onOpenChange(false)
            form.reset()
            onSelectMenu(null)
          },
        }
      )
    } else {
      const createData = data as FormDataMenuCreate
      create(createData, {
        onSuccess: () => {
          if (prevImage) {
            URL.revokeObjectURL(prevImage)
            setPrevImage(null)
          }
          onOpenChange(false)
          form.reset()
          onSelectMenu(null)
        },
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Menu</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Harga</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  value={
                    field.value === undefined || field.value === null
                      ? ""
                      : String(field.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Gambar</FormLabel>
              <FormControl>
                <Input
                  onChange={(value) => {
                    const file = value.target.files?.[0]
                    if (file) {
                      form.setValue("image", file)
                    }
                    setPrevImage(
                      value.target.files
                        ? URL.createObjectURL(value.target.files[0])
                        : null
                    )
                  }}
                  type="file"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {prevImage && (
          <Image
            className="rounded-sm"
            src={prevImage}
            alt="Preview"
            width={200}
            height={200}
          />
        )}

        {!prevImage && menu?.image && (
          <Image
            className="rounded-sm"
            src={menu.image}
            alt="Preview"
            width={200}
            height={200}
          />
        )}

        <FormField
          control={form.control}
          name="available"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Switch
                    id="available"
                    name="available"
                    defaultChecked={field.value ?? true}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Tersedia</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={creating || updating}
        >
          {creating || updating ? <Spinner /> : "Simpan"}
        </Button>
      </form>
    </Form>
  )
}

export default MenuForm
