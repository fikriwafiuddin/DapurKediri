import MenuCard from "@/components/MenuCard"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { getMenus } from "@/services/api/server/menuApi"
import CatagoryTabs from "./CatagoryTabs"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { CircleQuestionMarkIcon } from "lucide-react"

const categories = [
  {
    id: "672ca1b1f101a001",
    label: "Makanan",
    value: "food",
    description:
      "Berbagai hidangan utama khas Kediri dan Nusantara yang mengenyangkan dan lezat.",
  },
  {
    id: "672ca1b1f101a006",
    label: "Minuman",
    value: "drink",
    description:
      "Minuman segar seperti es teh, es jeruk, dan minuman tradisional khas Kediri.",
  },
  {
    id: "672ca1b1f101a007",
    label: "Camilan",
    value: "snack",
    description:
      "Cemilan ringan seperti pisang goreng, tahu crispy, dan jajanan pasar.",
  },
  {
    id: "672ca1b1f101a008",
    label: "Paket Hemat",
    value: "bundle",
    description:
      "Paket makan lengkap berisi nasi, lauk, sayur, dan minuman dengan harga terjangkau.",
  },
]

async function MenuPage({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  const { category } = await searchParams

  const { menus } = await getMenus(category || "food")

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Menu Rasa Kediri
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pilih dari berbagai hidangan autentik Kediri yang telah diwariskan
            turun-temurun
          </p>
        </div>

        {/* Menu Categories */}
        <Tabs defaultValue={category || "food"} className="w-full">
          <CatagoryTabs categories={categories} />

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.value}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">{category.label}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menus.length < 1 ? (
                  <Empty className="col-span-3 border">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <CircleQuestionMarkIcon />
                      </EmptyMedia>
                      <EmptyTitle>Menu Tidak ditemukan</EmptyTitle>
                      <EmptyDescription>
                        {" "}
                        Coba pilih kategori lain atau periksa kembali filter
                        pencarianmu.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                ) : (
                  menus.map((item) => <MenuCard key={item.id} menu={item} />)
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

export default MenuPage
