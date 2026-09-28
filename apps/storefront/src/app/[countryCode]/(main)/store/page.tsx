import { Metadata } from "next"

import { parseOptionValueIds } from "@lib/util/product-option-filters"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Catalog | HeroVault",
  description: "Browse collectible action figures across Marvel, DC, anime, Star Wars, and video games.",
}

type Params = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params
  const searchParams = await props.searchParams
  const optionValueIds = parseOptionValueIds(searchParams)

  return (
    <StoreTemplate
      countryCode={params.countryCode}
      optionValueIds={optionValueIds}
    />
  )
}
