import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import promotionValidation from "@/lib/validations/promoValidation"
import { FormDataPromotionCreate, Promotion } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import DateInput from "@/components/DateInput"
import {
  useCreatePromotion,
  useUpdatePromotion,
} from "@/services/hooks/promotionHook"
import { Spinner } from "@/components/ui/spinner"

type PromotionFormProps = {
  promotion?: Promotion | null
  onOpenChange: (open: boolean) => void
  onSelectMenu: (promotion: Promotion | null) => void
}

function PromotionForm({
  promotion,
  onOpenChange,
  onSelectMenu,
}: PromotionFormProps) {
  const form = useForm({
    resolver: zodResolver(promotionValidation.create),
    defaultValues: {
      title: promotion?.title || "",
      description: promotion?.description || "",
      code: promotion?.code || "",
      category: promotion?.category || "all",
      discountValue: promotion?.discountValue || 0,
      discountType: promotion?.discountType || "percentage",
      maxDiscount: promotion?.maxDiscount || 0,
      minOrderAmount: promotion?.minOrderAmount || 0,
      usageLimit: promotion?.usageLimit || 0,
      validFrom: new Date(promotion?.validFrom || new Date()),
      validTo: new Date(
        promotion?.validTo || new Date().setMonth(new Date().getMonth() + 1)
      ),
      active: promotion?.active ?? true,
    },
  })
  const currentType = useWatch({
    control: form.control,
    name: "discountType",
    defaultValue: "percentage",
  })
  const { isPending: creating, mutate: create } = useCreatePromotion()
  const { isPending: updating, mutate: update } = useUpdatePromotion()

  const onSubmit = (data: FormDataPromotionCreate) => {
    if (promotion) {
      update(
        { id: promotion.id, data },
        {
          onSuccess: () => {
            onOpenChange(false)
            onSelectMenu(null)
          },
        }
      )
    } else {
      create(data, {
        onSuccess: () => onOpenChange(false),
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul Promo</FormLabel>
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
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kode Promo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
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
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="food">Makanan</SelectItem>
                  <SelectItem value="drink">Minuman</SelectItem>
                  <SelectItem value="snack">Cemilan</SelectItem>
                  <SelectItem value="bundle">Paket</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discountType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipe Diskon</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="percentage">Persentase</SelectItem>
                  <SelectItem value="fixed_amount">Nominal</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discountValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nilai Diskon</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
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

        {currentType == "percentage" && (
          <FormField
            control={form.control}
            name="maxDiscount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nilai Maksimal</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
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
        )}

        <FormField
          control={form.control}
          name="minOrderAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nilai Minimal</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
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
          name="usageLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Limit Penggunaan</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
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
          name="validFrom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Berlaku Dari</FormLabel>
              <FormControl>
                <DateInput value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="validTo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Berlaku Sampai</FormLabel>
              <FormControl>
                <DateInput value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Switch
                    defaultChecked={field.value ?? true}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Aktif</FormLabel>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={creating || creating}
        >
          {creating || updating ? <Spinner /> : "Simpan"}
        </Button>
      </form>
    </Form>
  )
}

export default PromotionForm
