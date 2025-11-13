"use client"

import {
  FileTextIcon,
  LayoutDashboardIcon,
  ShoppingCartIcon,
  TagIcon,
  UtensilsCrossedIcon,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import LogoutButton from "./LogoutButton"

const menuItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboardIcon },
  { title: "Laporan", url: "/admin/reports", icon: FileTextIcon },
  { title: "Kelola Menu", url: "/admin/menu", icon: UtensilsCrossedIcon },
  { title: "Kelola Pesanan", url: "/admin/orders", icon: ShoppingCartIcon },
  { title: "Kelola Promo", url: "/admin/promotions", icon: TagIcon },
]

function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.includes(item.url)}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <LogoutButton />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AdminSidebar
