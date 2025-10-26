import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Users, Award, Clock } from "lucide-react"
import Link from "next/link"

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: "Kualitas Terbaik",
      description:
        "Kami berkomitmen menyajikan makanan dengan bahan-bahan berkualitas tinggi dan cita rasa autentik.",
    },
    {
      icon: Users,
      title: "Kepuasan Pelanggan",
      description:
        "Kepuasan Anda adalah prioritas utama kami. Kami selalu berusaha memberikan pelayanan terbaik.",
    },
    {
      icon: Award,
      title: "Resep Tradisional",
      description:
        "Setiap menu dibuat dengan resep tradisional yang telah diwariskan turun-temurun.",
    },
    {
      icon: Clock,
      title: "Pengiriman Cepat",
      description:
        "Kami menjamin pengiriman cepat dan tepat waktu agar makanan sampai dalam kondisi terbaik.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-hero py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-foreground">
            Tentang Rasa Kediri
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Menghadirkan Cita Rasa Autentik Makanan Kediri Sejak 2020
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">
                  Cerita Kami
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Rasa Kediri lahir dari kecintaan kami terhadap kuliner khas
                    Kediri yang kaya akan cita rasa dan tradisi. Dimulai pada
                    tahun 2020, kami berkomitmen untuk menghadirkan pengalaman
                    kuliner autentik yang memanjakan lidah setiap pelanggan.
                  </p>
                  <p>
                    Setiap hidangan yang kami sajikan dibuat dengan penuh
                    perhatian dan dedikasi, menggunakan bahan-bahan pilihan dan
                    resep tradisional yang telah teruji. Dari Nasi Pecel yang
                    segar hingga Tahu Campur yang gurih, setiap menu
                    mencerminkan warisan kuliner Kediri yang sesungguhnya.
                  </p>
                  <p>
                    Kami percaya bahwa makanan bukan hanya sekedar mengenyangkan
                    perut, tetapi juga membawa kebahagiaan dan kenangan indah.
                    Itulah mengapa kami terus berinovasi sambil tetap menjaga
                    keaslian rasa yang menjadi kebanggaan kami.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nilai-Nilai Kami
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="hover-scale">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5+</div>
              <div className="text-muted-foreground">Tahun Pengalaman</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">
                10,000+
              </div>
              <div className="text-muted-foreground">Pelanggan Puas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">20+</div>
              <div className="text-muted-foreground">Menu Pilihan</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">
            Siap Mencoba Kelezatan Kami?
          </h2>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Pesan sekarang dan rasakan pengalaman kuliner autentik Kediri yang
            tak terlupakan
          </p>
          <Link href="/menu">
            <Button variant="secondary" size="lg">
              Lihat Menu
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
