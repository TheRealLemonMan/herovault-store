import { Suspense } from "react"

import { listCategories } from "@lib/data/categories"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import {
  franchiseNavItems,
  isApparelCategory,
} from "@lib/util/collectible-nav"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import NavLinks from "@modules/layout/components/nav-links"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale, categories] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
    listCategories(),
  ])

  const universeCategories = (categories || []).filter(
    (category) => !category.parent_category && !isApparelCategory(category.handle)
  )

  const franchiseItems = franchiseNavItems(universeCategories)

  const navItems = [
    { href: "/store", label: "All Figures", match: "prefix" as const },
    ...franchiseItems,
    {
      href: "/collections/featured-vault",
      label: "Limited Drops",
      match: "prefix" as const,
    },
  ]

  return (
    <div className="sticky top-0 inset-x-0 z-[60] group">
      <header className="relative mx-auto duration-200 bg-vault-bg/90 backdrop-blur-md border-b border-vault-neon/15">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle grid grid-cols-[1fr_auto_1fr] items-center w-full h-16 text-small-regular">
          <div className="flex items-center h-full">
            <div className="h-full md:hidden">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
                categories={universeCategories}
              />
            </div>
          </div>

          <div className="flex items-center justify-center h-full px-3">
            <LocalizedClientLink
              href="/"
              className="font-display txt-compact-xlarge-plus hover:text-vault-neon uppercase tracking-[0.18em] whitespace-nowrap"
              data-testid="nav-store-link"
            >
              HeroVault
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-3 md:gap-x-6 h-full justify-end min-w-0 whitespace-nowrap">
            <LocalizedClientLink
              href="/account"
              className="hover:text-vault-neon"
              data-testid="nav-account-link"
            >
              Account
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-vault-neon flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
        <div className="hidden md:flex items-center justify-center space-x-4 lg:space-x-6 h-11 content-container text-small-regular text-ui-fg-subtle border-t border-vault-neon/10">
          <NavLinks items={navItems} />
        </div>
      </header>
    </div>
  )
}
