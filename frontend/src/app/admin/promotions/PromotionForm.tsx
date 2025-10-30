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

type PromotionFormProps = {
  promotion?: Promotion | null
  onOpenChange: (open: boolean) => void
}

function PromotionForm({ promotion, onOpenChange }: PromotionFormProps) {
  const form = useForm({
    resolver: zodResolver(promotionValidation.create),
    defaultValues: {
      title: promotion?.title || "",
      description: promotion?.description || "",
      code: promotion?.promo_code || "",
      category: promotion?.category || "all",
      discount_value: promotion?.discount_value || 0,
      discount_type: promotion?.discount_type || "percentage",
      max_discount_value: promotion?.max_discount_value || 0,
      min_order_amount: promotion?.min_order_amount || 0,
      usage_limit: promotion?.usage_limit || 0,
      valid_from: new Date(promotion?.valid_from || new Date()),
      valid_to: new Date(
        promotion?.valid_to || new Date().setMonth(new Date().getMonth() + 1)
      ),
      active: promotion?.active ?? true,
    },
  })
  const currentType = useWatch({
    control: form.control,
    name: "discount_type",
    defaultValue: "percentage",
  })

  const onSubmit = (data: FormDataPromotionCreate) => {
    console.log(data)
    onOpenChange(false)
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
          name="discount_type"
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
          name="discount_value"
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
            name="max_discount_value"
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
          name="min_order_amount"
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
          name="usage_limit"
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
          name="valid_from"
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
          name="valid_to"
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

        <Button type="submit" className="w-full">
          Simpan
        </Button>
      </form>
    </Form>
  )
}

export default PromotionForm
