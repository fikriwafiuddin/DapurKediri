import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { useUpdateStatusOrder } from "@/services/hooks/orderHook"
import { Order, OrderStatus } from "@/types"

type UpdateStatusOrderProps = {
  order: Order
  handleOnSuccess?: () => void
}

function UpdateStatusOrder({ order, handleOnSuccess }: UpdateStatusOrderProps) {
  const { isPending, mutate } = useUpdateStatusOrder()

  const handleChangeStatus = (value: OrderStatus) => {
    mutate(
      { orderNumber: order.orderNumber, status: value },
      {
        onSuccess: () => handleOnSuccess && handleOnSuccess(),
      }
    )
  }

  return (
    <>
      <Select
        value={order.status}
        onValueChange={handleChangeStatus}
        disabled={isPending}
      >
        <SelectTrigger>
          <SelectValue placeholder="Ubah Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Menunggu</SelectItem>
          <SelectItem value="confirmed">Dikonfirmasi</SelectItem>
          <SelectItem value="preparing">Diproses</SelectItem>
          <SelectItem value="delivering">Dikirim</SelectItem>
          <SelectItem value="completed">Selesai</SelectItem>
          <SelectItem value="cancelled">Dibatalkan</SelectItem>
        </SelectContent>
      </Select>
      {isPending && <Spinner />}
    </>
  )
}

export default UpdateStatusOrder
