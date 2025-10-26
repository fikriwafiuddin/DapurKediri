import React from "react"
import { Card, CardContent } from "./ui/card"
import { Menu } from "@/types"
import { StarIcon } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import CounterMenuCard from "./client/CounterMenuCard"

type MenuCardProps = {
  menu: Menu
}

function MenuCard({ menu }: MenuCardProps) {
  return (
    <Card
      key={menu.id}
      className="overflow-hidden shadow-warm hover:shadow-elegant transition-all duration-300"
    >
      <div
        className="aspect-4/3 bg-cover bg-center"
        style={{ backgroundImage: `url(${menu.image})` }}
      />
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold mb-1">{menu.name}</h3>
            <div className="text-2xl font-bold text-primary">
              Rp {menu.price.toLocaleString("id-ID")}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-muted-foreground">4.8</span>
              </div>
              {menu.available ? (
                <Badge
                  variant="secondary"
                  className="bg-success/10 text-success"
                >
                  Tersedia
                </Badge>
              ) : (
                <Badge variant="destructive">Habis</Badge>
              )}
            </div>
          </div>
          <div className="text-right"></div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {menu.description}
        </p>

        {menu.available && <CounterMenuCard menu={menu} />}

        {!menu.available && (
          <Button variant="outline" className="w-full" disabled>
            Tidak Tersedia
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default MenuCard
