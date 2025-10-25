"use client"

import { useState } from "react"
import { ShoppingCart, Menu, X, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = usePathname()

  const navigationItems = [
    { name: "Beranda", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Promo", href: "/promo" },
    { name: "Tentang Kami", href: "/about" },
    { name: "Kontak", href: "/contact" },
  ]

  const isActivePath = (path: string) => {
    return location.includes(path)
  }

  const getTotalItems = () => 0

  return (
    <header className="sticky top-0 z-50 bg-background opacity-95 backdrop-blur supports-backdrop-filter:bg-background/60  border-b border-border">
      {/* Top info bar */}
      <div className="bg-(image:--gradient-warm) border-b border-border/50">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm text-foreground/80">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>(0354) 123-4567</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>Kediri, Jawa Timur</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Buka setiap hari 10:00 - 22:00 WIB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-hero text-primary-foreground px-3 py-1 rounded-lg font-bold text-lg">
              Rasa
            </div>
            <span className="text-xl font-bold text-foreground">Kediri</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActivePath(item.href)
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-foreground/70"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>

            {/* CTA Button */}
            <Link href="/menu" className="hidden md:block">
              <Button variant="hero">Pesan Sekarang</Button>
            </Link>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden border-t border-border py-4">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActivePath(item.href)
                      ? "text-primary"
                      : "text-foreground/70"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/menu" onClick={() => setIsMenuOpen(false)}>
                <Button variant="hero" className="w-full">
                  Pesan Sekarang
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
