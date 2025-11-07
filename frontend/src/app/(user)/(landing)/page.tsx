import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  StarIcon,
  TruckIcon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { getFavoriteMenu } from "@/services/api/server/menuApi"
import { getSpecialPromotion } from "@/services/api/server/promotionApi"

export default async function Home() {
  const { menus } = await getFavoriteMenu()
  const { promotions } = await getSpecialPromotion()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[600px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("/hero-food.jpg")` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Cita Rasa <span className="text-yellow-400">Otentik Kediri</span>
            </h1>
            <p className="text-xl mb-8">
              Langsung ke Meja Anda. Nikmati kelezatan makanan tradisional
              Kediri dengan layanan antar yang cepat dan terpercaya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/menu">
                <Button variant="hero" size="xl">
                  Lihat Menu
                </Button>
              </Link>
              <Button variant="warm" size="xl">
                Hubungi Kami
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pengiriman Cepat</h3>
              <p className="text-muted-foreground">
                Pesanan Anda akan sampai dalam waktu 30-45 menit
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Kualitas Terjamin</h3>
              <p className="text-muted-foreground">
                Menggunakan bahan-bahan segar dan resep turun-temurun
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TruckIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">COD Tersedia</h3>
              <p className="text-muted-foreground">
                Bayar langsung saat pesanan tiba di tempat Anda
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Menu Terfavorit
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hidangan pilihan yang paling disukai pelanggan kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menus.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden shadow-warm hover:shadow-elegant transition-all duration-300"
              >
                <div
                  className="aspect-4/3 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <div className="flex items-center gap-1">
                      <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-muted-foreground">4.8</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      Rp {item.price.toLocaleString("id-ID")}
                    </span>
                    <Link href="/menu">
                      <Button variant="spice">Pesan</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/menu">
              <Button variant="hero" size="lg">
                Lihat Semua Menu
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Promotions */}
      {promotions.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Promo Spesial
              </h2>
              <p className="text-xl text-muted-foreground">
                Jangan lewatkan penawaran menarik hari ini!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {promotions.map((promotion) => (
                <Card
                  key={promotion.id}
                  className="bg-spice text-white overflow-hidden"
                >
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-3">
                      {promotion.title}
                    </h3>

                    <p className="text-white/90 mb-4">
                      {promotion.description}
                    </p>

                    {/* Kode Promo */}
                    {promotion.code && (
                      <div className="mb-6">
                        <p className="text-sm text-white/70 mb-1">
                          Kode Promo:
                        </p>
                        <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-md">
                          <code className="font-mono tracking-wide text-lg">
                            {promotion.code}
                          </code>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold">
                        {promotion.discountType === "percentage"
                          ? `${promotion.discountValue}% OFF`
                          : `Rp ${promotion.discountValue.toLocaleString(
                              "id-ID"
                            )} OFF`}
                      </div>

                      <Link href="/menu">
                        <Button variant="warm">Gunakan Promo</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Kata Pelanggan
            </h2>
            <p className="text-xl text-muted-foreground">
              Pengalaman mereka bersama Rasa Kediri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sari Wulandari",
                review:
                  "Nasi pecelnya enak banget! Rasanya autentik seperti buatan nenek. Pengirimannya juga cepat.",
                rating: 5,
              },
              {
                name: "Ahmad Rizki",
                review:
                  "Tahu campurnya juara! Kuahnya gurih dan tofu-nya fresh. Pasti pesan lagi.",
                rating: 5,
              },
              {
                name: "Dewi Sartika",
                review:
                  "Pelayanannya ramah dan makanannya selalu hangat sampai rumah. Recommended!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="shadow-warm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    &quot;{testimonial.review}&quot;
                  </p>
                  <p className="font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
