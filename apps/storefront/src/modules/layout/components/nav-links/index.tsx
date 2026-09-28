"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@modules/common/components/ui"
import { usePathname } from "next/navigation"

type NavItem = {
  href: string
  label: string
  match?: "exact" | "prefix"
}

const NavLinks = ({ items, className }: { items: NavItem[]; className?: string }) => {
  const pathname = usePathname()
  const path = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/"

  return (
    <ul className={clx("flex items-center gap-x-5 h-full", className)}>
      {items.map((item) => {
        const href = item.href
        const active =
          item.match === "exact"
            ? path === href
            : path === href || path.startsWith(`${href}/`)
        return (
          <li key={href} className="h-full flex items-center">
            <LocalizedClientLink
              href={href}
              data-testid="nav-category-link"
              className={clx(
                "relative py-2 transition-colors duration-200 hover:text-vault-neon",
                active
                  ? "text-vault-neon drop-shadow-[0_0_8px_rgba(0,210,255,0.55)]"
                  : "text-ui-fg-subtle"
              )}
            >
              {item.label}
              {active && (
                <span className="absolute left-0 right-0 -bottom-1 h-px bg-vault-neon shadow-[0_0_8px_#00D2FF]" />
              )}
            </LocalizedClientLink>
          </li>
        )
      })}
    </ul>
  )
}

export default NavLinks
