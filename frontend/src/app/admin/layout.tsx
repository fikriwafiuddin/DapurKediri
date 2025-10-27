import AdminProvider from "@/components/AdminProvider"
import AdminSidebar from "@/components/AdminSidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ReactNode } from "react"

function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <AdminProvider>
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset className="overflow-hidden">
          <header className="h-14 border-b flex items-center px-4 bg-background">
            <SidebarTrigger />
            <h1 className="ml-4 text-lg font-semibold">Rasa Kediri Admin</h1>
          </header>
          <main className="flex-1 px-4 pb-4 bg-muted/30">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </AdminProvider>
  )
}

export default AdminLayout
