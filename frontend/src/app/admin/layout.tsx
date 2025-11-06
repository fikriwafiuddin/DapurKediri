import { ReactNode } from "react"

function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return <div>{children}</div>
}

export default AdminLayout
