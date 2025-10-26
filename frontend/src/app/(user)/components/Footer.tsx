import { MapPin, Phone, Clock, Facebook, Instagram, Mail } from "lucide-react"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-hero text-primary-foreground px-3 py-1 rounded-lg font-bold text-lg">
                Dapur
              </div>
              <span className="text-xl font-bold">Kediri</span>
            </div>
            <p className="text-accent-foreground/80 text-sm">
              Cita rasa otentik Kediri yang menghadirkan kelezatan tradisional
              langsung ke meja Anda.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Menu Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/menu"
                  className="hover:text-primary transition-colors"
                >
                  Lihat Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/promo"
                  className="hover:text-primary transition-colors"
                >
                  Promo Terbaru
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Kontak</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>(0354) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>
                  Jl. Dhoho No. 123
                  <br />
                  Kediri, Jawa Timur 64112
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>10:00 - 22:00 WIB</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Ikuti Kami</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-accent-foreground/80 hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-accent-foreground/80 hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-accent-foreground/80 hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-accent-foreground/60">
              Dapatkan info promo dan menu terbaru langsung dari media sosial
              kami!
            </p>
          </div>
        </div>

        <div className="border-t border-border/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-accent-foreground/60">
            <p>&copy; 2024 Dapur Kediri. Semua hak dilindungi.</p>
            <p>Dibuat dengan ❤️ untuk cita rasa Indonesia</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
