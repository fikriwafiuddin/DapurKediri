import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tag, Calendar, Percent } from "lucide-react"

const promotions = [
  {
    id: "1",
    title: "Promo Beli 2 Gratis 1",
    description: "Beli 2 Nasi Pecel gratis 1 Tahu Campur",
    discountType: "percentage",
    discountValue: 33,
    validFrom: new Date(),
    validTo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    active: true,
  },
]

function PromoPage() {
  const isLoading = false

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-hero py-16 text-center">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <Tag className="h-12 w-12 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-foreground">
            Promo Spesial
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Nikmati berbagai penawaran menarik dan hemat lebih banyak saat
            memesan makanan favorit Anda
          </p>
        </div>
      </section>

      {/* Promotions List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-20 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : promotions && promotions.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promotions.map((promo) => (
                <Card
                  key={promo.id}
                  className="hover-scale border-2 hover:border-primary transition-all"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge
                        variant="default"
                        className="bg-accent text-accent-foreground"
                      >
                        <Percent className="h-3 w-3 mr-1" />
                        {promo.discountType === "percentage"
                          ? `${promo.discountValue}% OFF`
                          : `Rp ${promo.discountValue?.toLocaleString(
                              "id-ID"
                            )}`}
                      </Badge>
                      {promo.active && (
                        <Badge
                          variant="outline"
                          className="bg-green-500/10 text-green-700 border-green-500/20"
                        >
                          Aktif
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{promo.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {promo.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Berlaku:{" "}
                        {promo.validFrom &&
                          promo.validFrom.toLocaleDateString()}{" "}
                        - {promo.validTo && promo.validTo.toLocaleDateString()}
                      </span>
                    </div>
                    <Button variant="hero" className="w-full">
                      Gunakan Promo
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Tag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Belum Ada Promo</h3>
                <p className="text-muted-foreground">
                  Saat ini belum ada promo yang tersedia. Silakan cek kembali
                  nanti!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-subtle py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Jangan Lewatkan Promo Menarik!
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Ikuti media sosial kami untuk mendapatkan informasi promo terbaru
            dan penawaran eksklusif
          </p>
          <Button variant="hero" size="lg">
            Lihat Menu
          </Button>
        </div>
      </section>
    </div>
  )
}

export default PromoPage
