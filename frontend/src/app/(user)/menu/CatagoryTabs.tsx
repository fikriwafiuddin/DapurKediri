"use client"

import { Spinner } from "@/components/ui/spinner"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useState, useTransition } from "react"

type CategoryTabsProps = {
  categories: {
    id: string
    value: string
    label: string
  }[]
}

function CatagoryTabs({ categories }: CategoryTabsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)

  const setCategoryQuery = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set("category", category || "food")

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
    setCurrentCategory(category)
  }

  return (
    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
      {categories.map((category) => (
        <TabsTrigger
          key={category.id}
          value={category.value}
          className="text-sm"
          onClick={() => setCategoryQuery(category.value)}
          disabled={isPending}
        >
          {category.label}{" "}
          {isPending && category.value == currentCategory && <Spinner />}
        </TabsTrigger>
      ))}
    </TabsList>
  )
}

export default CatagoryTabs
