"use client"

import { usePathname } from "next/navigation"
import { ReactNode } from "react"

const PageTransition = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()

  return (
    <div key={pathname} className="vault-page-enter">
      {children}
    </div>
  )
}

export default PageTransition
