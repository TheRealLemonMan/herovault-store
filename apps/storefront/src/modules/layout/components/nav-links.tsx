"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@modules/common/components/ui"
import { usePathname } from "next/navigation"

export type NavLinkItem = {
  href: string
  label: string
  match?: "exact" | "prefix"
}

const stripCountry = (pathname: string) => {
  const parts = pathname.split("/").filter(Boolean)
  if (!parts.length) {
    return "/"
  }
  if (parts[0].length === 2) {
    const rest = parts.slice(1).join("/")
    return rest ? `/${rest}` : "/"
  }
  return pathname.startsWith("/") ? pathname : `/${pathname}`
}

const isActive = (pathname: string, href: string, match: NavLinkItem["match"]) => {
  const current = stripCountry(pathname)
  const target = href.split("?")[0] || "/"
  if (match === "exact") {
    return current === target
  }
  if (target === "/") {
    return current === "/"
  }
  return current === target || current.startsWith(`${target}/`)
}

const NavLinks = ({ items }: { items: NavLinkItem[] }) => {
  const pathname = usePathname()

  return (
    <ul className="flex items-center gap-4 lg:gap-6 whitespace-nowrap">
      {items.map((item) => {
        const active = isActive(pathname, item.href, item.match || "prefix")
        return (
          <li key={`${item.href}-${item.label}`}>
            <LocalizedClientLink
              href={item.href}
              className={clx(
                "relative py-1 transition-colors duration-200",
                active
                  ? "text-vault-neon drop-shadow-[0_0_8px_rgba(0,210,255,0.55)]"
                  : "text-ui-fg-subtle hover:text-vault-neon"
              )}
              data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {item.label}
              {active && (
                <span className="absolute inset-x-0 -bottom-1 h-px bg-vault-neon shadow-[0_0_8px_rgba(0,210,255,0.8)]" />
              )}
            </LocalizedClientLink>
          </li>
        )
      })}
    </ul>
  )
}

export default NavLinks
