import MenuCard from "@/components/MenuCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const categories = [
  {
    _id: "672ca1b1f101a001",
    name: "Makanan",
    description:
      "Berbagai hidangan utama khas Kediri dan Nusantara yang mengenyangkan dan lezat.",
  },
  {
    _id: "672ca1b1f101a006",
    name: "Minuman",
    description:
      "Minuman segar seperti es teh, es jeruk, dan minuman tradisional khas Kediri.",
  },
  {
    _id: "672ca1b1f101a007",
    name: "Camilan",
    description:
      "Cemilan ringan seperti pisang goreng, tahu crispy, dan jajanan pasar.",
  },
  {
    _id: "672ca1b1f101a008",
    name: "Paket Hemat",
    description:
      "Paket makan lengkap berisi nasi, lauk, sayur, dan minuman dengan harga terjangkau.",
  },
]

const menuData = [
  {
    id: "1",
    name: "Nasi Pecel Spesial",
    description:
      "Nasi pecel dengan bumbu kacang khas Kediri, dilengkapi sayuran segar dan kerupuk.",
    price: 15000,
    image: "/src/assets/nasi-pecel.jpg",
    category: "1",
    available: true,
  },
  {
    id: "2",
    name: "Nasi Rawon Kediri",
    description:
      "Rawon khas Kediri dengan kuah hitam pekat dan daging sapi empuk.",
    price: 20000,
    image: "/src/assets/nasi-rawon.jpg",
    category: "1",
    available: true,
  },
  {
    id: "3",
    name: "Ayam Goreng Bumbu Kuning",
    description:
      "Ayam goreng dengan bumbu kuning khas Jawa Timur yang gurih dan harum.",
    price: 18000,
    image: "/src/assets/ayam-goreng.jpg",
    category: "2",
    available: false,
  },
  {
    id: "4",
    name: "Ikan Lele Goreng",
    description:
      "Lele goreng renyah disajikan dengan sambal terasi dan lalapan segar.",
    price: 17000,
    image: "/src/assets/lele-goreng.jpg",
    category: "2",
    available: true,
  },
  {
    id: "5",
    name: "Sayur Lodeh Tewel",
    description: "Sayur nangka muda dengan santan gurih khas Kediri.",
    price: 10000,
    image: "/src/assets/sayur-lodeh.jpg",
    category: "3",
    available: true,
  },
  {
    id: "6",
    name: "Sop Ayam Kampung",
    description: "Sop ayam kampung dengan sayuran segar dan kaldu yang gurih.",
    price: 16000,
    image: "/src/assets/sop-ayam.jpg",
    category: "3",
    available: true,
  },
  {
    id: "7",
    name: "Sambal Terasi Pedas",
    description: "Sambal terasi khas Dapur Kediri, cocok untuk semua lauk.",
    price: 5000,
    image: "/src/assets/sambal-terasi.jpg",
    category: "4",
    available: true,
  },
  {
    id: "8",
    name: "Nasi Putih",
    description: "Nasi putih hangat dari beras pilihan.",
    price: 5000,
    image: "/src/assets/nasi-putih.jpg",
    category: "5",
    available: true,
  },
  {
    id: "9",
    name: "Es Teh Manis",
    description: "Teh manis dingin penyegar dahaga.",
    price: 6000,
    image: "/src/assets/es-teh.jpg",
    category: "6",
    available: true,
  },
  {
    id: "10",
    name: "Es Jeruk Segar",
    description: "Es jeruk peras asli yang segar dan manis alami.",
    price: 7000,
    image: "/src/assets/es-jeruk.jpg",
    category: "6",
    available: true,
  },
  {
    id: "11",
    name: "Tahu Crispy",
    description:
      "Tahu goreng renyah di luar, lembut di dalam, cocok untuk camilan.",
    price: 8000,
    image: "/src/assets/tahu-crispy.jpg",
    category: "7",
    available: true,
  },
  {
    id: "12",
    name: "Paket Hemat Ayam Goreng",
    description: "Nasi, ayam goreng bumbu kuning, sambal, dan es teh manis.",
    price: 25000,
    image: "/src/assets/paket-ayam-goreng.jpg",
    category: "8",
    available: true,
  },
  {
    id: "13",
    name: "Paket Spesial Rawon",
    description: "Nasi rawon, sambal, kerupuk, dan es jeruk segar.",
    price: 28000,
    image: "/src/assets/paket-rawon.jpg",
    category: "9",
    available: true,
  },
  {
    id: "14",
    name: "Kolak Pisang",
    description: "Hidangan penutup manis dari pisang dan santan yang lembut.",
    price: 10000,
    image: "/src/assets/kolak-pisang.jpg",
    category: "10",
    available: true,
  },
  {
    id: "15",
    name: "Es Campur Kediri",
    description:
      "Es campur khas Kediri dengan campuran buah, cincau, dan sirup manis.",
    price: 12000,
    image: "/src/assets/es-campur.jpg",
    category: "10",
    available: true,
  },
]

function MenuPage() {
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
        <Tabs defaultValue={categories[0]?._id} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            {categories.map((category) => (
              <TabsTrigger
                key={category._id}
                value={category._id}
                className="text-sm"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category._id} value={category._id}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuData.map((item) => (
                  <MenuCard key={item.id} menu={item} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

export default MenuPage
