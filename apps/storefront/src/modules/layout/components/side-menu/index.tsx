"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import useToggleState from "@lib/hooks/use-toggle-state"
import { franchiseNavItems } from "@lib/util/collectible-nav"
import { XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text, clx } from "@modules/common/components/ui"
import { Fragment } from "react"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
  categories?: HttpTypes.StoreProductCategory[] | null
}

const accountLinks = [
  { name: "Account", href: "/account" },
  { name: "Cart", href: "/cart" },
  { name: "Catalog", href: "/store" },
]

const scales = [
  { name: "1/6", href: "/store?scale=1%2F6" },
  { name: "1/7", href: "/store?scale=1%2F7" },
  { name: "1/8", href: "/store?scale=1%2F8" },
  { name: "1/12", href: "/store?scale=1%2F12" },
]

const SideMenu = ({
  regions,
  locales,
  currentLocale,
  categories,
}: SideMenuProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-vault-neon"
                >
                  Menu
                </Popover.Button>
              </div>

              {open && (
                <div
                  className="fixed inset-0 z-[90] bg-black/70"
                  onClick={close}
                  data-testid="side-menu-backdrop"
                />
              )}

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-[cubic-bezier(0.22,1,0.36,1)] duration-300"
                enterFrom="-translate-x-full opacity-0"
                enterTo="translate-x-0 opacity-100"
                leave="transition ease-[cubic-bezier(0.22,1,0.36,1)] duration-250"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="-translate-x-full opacity-0"
              >
                <PopoverPanel className="flex flex-col fixed top-0 left-0 w-[min(100%,22rem)] h-[100dvh] z-[100] text-sm text-ui-fg-on-color">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full justify-between p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] overflow-y-auto"
                    style={{
                      background: "rgba(11, 17, 30, 0.95)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "4px 0 24px rgba(0,0,0,0.8)",
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-8">
                        <span className="font-display uppercase tracking-[0.2em] text-vault-neon">
                          HeroVault
                        </span>
                        <button
                          data-testid="close-menu-button"
                          onClick={close}
                          className="min-h-11 min-w-11 flex items-center justify-center rounded-full border border-white/10 hover:border-vault-neon hover:text-vault-neon"
                          aria-label="Close menu"
                        >
                          <XMark />
                        </button>
                      </div>

                      <section className="mb-8">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-3">
                          Sagas / Universes
                        </p>
                        <ul className="flex flex-col gap-2">
                          <li>
                            <LocalizedClientLink
                              href="/store"
                              className="text-base hover:text-vault-neon"
                              onClick={close}
                            >
                              All Figures
                            </LocalizedClientLink>
                          </li>
                          {franchiseNavItems(categories).map((item) => (
                            <li key={item.href}>
                              <LocalizedClientLink
                                href={item.href}
                                className="text-base hover:text-vault-neon"
                                onClick={close}
                              >
                                {item.label}
                              </LocalizedClientLink>
                            </li>
                          ))}
                          <li>
                            <LocalizedClientLink
                              href="/collections/featured-vault"
                              className="text-base hover:text-vault-neon"
                              onClick={close}
                            >
                              Limited Drops
                            </LocalizedClientLink>
                          </li>
                        </ul>
                      </section>

                      <section className="mb-8">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-3">
                          Scales
                        </p>
                        <ul className="flex flex-col gap-2">
                          {scales.map((item) => (
                            <li key={item.name}>
                              <LocalizedClientLink
                                href={item.href}
                                className="text-base text-slate-200 hover:text-vault-neon"
                                onClick={close}
                              >
                                {item.name}
                              </LocalizedClientLink>
                            </li>
                          ))}
                        </ul>
                      </section>

                      <section>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-3">
                          Account & shipping
                        </p>
                        <ul className="flex flex-col gap-2">
                          {accountLinks.map((item) => (
                            <li key={item.href}>
                              <LocalizedClientLink
                                href={item.href}
                                className="text-base text-slate-200 hover:text-vault-neon"
                                onClick={close}
                              >
                                {item.name}
                              </LocalizedClientLink>
                            </li>
                          ))}
                        </ul>
                      </section>
                    </div>

                    <div className="flex flex-col gap-y-4 pt-6 border-t border-white/10 mt-8">
                      {!!locales?.length && (
                        <LanguageSelect
                          toggleState={languageToggleState}
                          locales={locales}
                          currentLocale={currentLocale}
                        />
                      )}
                      {regions && (
                        <CountrySelect
                          toggleState={countryToggleState}
                          regions={regions}
                        />
                      )}
                      <Text className="txt-compact-small text-slate-500">
                        © {new Date().getFullYear()} Heroes & Legends Vault
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
