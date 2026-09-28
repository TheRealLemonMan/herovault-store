import { listCategories } from "@lib/data/categories"
import { franchiseNavItems } from "@lib/util/collectible-nav"
import { Text } from "@modules/common/components/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SCALE_LINKS = [
  { href: "/store?scale=1%2F6", label: "1/6" },
  { href: "/store?scale=1%2F7", label: "1/7" },
  { href: "/store?scale=1%2F8", label: "1/8" },
  { href: "/store?scale=1%2F12", label: "1/12" },
]

const SERVICE_LINKS = [
  { href: "/store", label: "Catalog" },
  { href: "/account", label: "Collector account" },
  { href: "/cart", label: "Cart & checkout" },
  { href: "/collections/featured-vault", label: "Limited drops" },
]

export default async function Footer() {
  const productCategories = await listCategories()
  const universeLinks = franchiseNavItems(productCategories).map((item) => ({
    href: item.href,
    label: item.label,
  }))

  return (
    <footer className="border-t border-vault-neon/15 w-full bg-vault-bg pb-28">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-10 xsmall:flex-row items-start justify-between py-16 small:py-24">
          <div className="max-w-sm">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-ui-fg-base hover:text-vault-neon uppercase tracking-[0.18em] font-display"
            >
              HeroVault
            </LocalizedClientLink>
            <Text className="mt-4 text-ui-fg-subtle">
              Heroes & Legends Vault. Curated collectible figures, exclusive
              editions, and cinematic displays.
            </Text>
            <Text className="mt-3 text-small-regular text-ui-fg-muted">
              Checkout uses Manual Payment / wire transfer for workshop
              simulations. Prices in USD.
            </Text>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fg-base">Universes</span>
              <ul className="grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small">
                {universeLinks.map((link) => (
                  <li key={link.href}>
                    <LocalizedClientLink
                      className="hover:text-vault-neon"
                      href={link.href}
                    >
                      {link.label}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fg-base">Scales</span>
              <ul className="grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small">
                {SCALE_LINKS.map((link) => (
                  <li key={link.href}>
                    <LocalizedClientLink
                      className="hover:text-vault-neon"
                      href={link.href}
                    >
                      {link.label}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fg-base">
                Vault Services
              </span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                {SERVICE_LINKS.map((link) => (
                  <li key={link.href}>
                    <LocalizedClientLink
                      href={link.href}
                      className="hover:text-vault-neon"
                    >
                      {link.label}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-8 justify-between text-ui-fg-muted">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} Heroes & Legends Vault. All rights
            reserved.
          </Text>
        </div>
      </div>
    </footer>
  )
}
