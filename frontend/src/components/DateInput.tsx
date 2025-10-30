import { useState } from "react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"

type DateInputProps = {
  value: Date
  onChange: (date: Date) => void
}

function DateInput({ value, onChange }: DateInputProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full pl-3 text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {value ? value.toLocaleDateString() : "Pilih Tanggal"}{" "}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            if (!date) return
            onChange(date)
            setIsOpen(false)
          }}
          defaultMonth={value}
          className="p-3 pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  )
}

export default DateInput
