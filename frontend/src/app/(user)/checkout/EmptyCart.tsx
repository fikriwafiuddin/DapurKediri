import { Button } from "@/components/ui/button"
import Link from "next/link"

function EmptyCart() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-4">Keranjang Kosong</h1>
          <p className="text-muted-foreground mb-8">
            Tidak ada item untuk dibayar. Silakan kembali ke menu.
          </p>
          <Link href="/menu">
            <Button variant="hero">Kembali ke Menu</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EmptyCart
