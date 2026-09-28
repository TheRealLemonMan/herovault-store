import { ReactNode } from "react"

import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { OptionValueIds } from "@lib/util/product-option-filters"
import CatalogBrowser from "@modules/store/templates/catalog-browser"

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
}

export default async function PaginatedProducts({
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  optionValueIds,
  header,
}: {
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  optionValueIds?: OptionValueIds
  header?: ReactNode
}) {
  const queryParams: PaginatedProductsParams = {
    limit: 100,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const {
    response: { products },
  } = await listProductsWithSort({
    page: 1,
    queryParams,
    sortBy: "created_at",
    countryCode,
    optionValueIds,
  })

  return (
    <CatalogBrowser products={products} region={region} header={header} />
  )
}
