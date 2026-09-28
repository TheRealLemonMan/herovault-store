import { getCollectibleMetadata } from "@lib/util/product-metadata"
import { sortProducts } from "@lib/util/sort-products"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

export const PRICE_CEILING = 250

export const toSortOption = (sortBy: string): SortOptions => {
  if (sortBy === "price_asc" || sortBy === "price_desc") {
    return sortBy
  }
  return "created_at"
}

const productPrice = (product: HttpTypes.StoreProduct) => {
  const amounts = (product.variants || [])
    .map((variant) => variant.calculated_price?.calculated_amount)
    .filter((amount): amount is number => typeof amount === "number")
  return amounts.length ? Math.min(...amounts) : 0
}

const matchesUniverse = (metaUniverse: string | undefined, selected: string[]) => {
  if (!selected.length) {
    return true
  }
  const value = (metaUniverse || "").toLowerCase()
  return selected.some((universe) => {
    const needle = universe.toLowerCase()
    return value.includes(needle) || needle.includes(value)
  })
}

export const filterCatalogProducts = (
  products: HttpTypes.StoreProduct[],
  filters: {
    selectedScale: string | null
    selectedUniverses: string[]
    selectedCondition: string | null
    maxPrice: number
    sortBy: string
  }
) => {
  const filtered = products.filter((product) => {
    const meta = getCollectibleMetadata(product)
    if (filters.selectedScale && meta.scale !== filters.selectedScale) {
      return false
    }
    if (!matchesUniverse(meta.universe, filters.selectedUniverses)) {
      return false
    }
    if (
      filters.selectedCondition &&
      meta.condition !== filters.selectedCondition
    ) {
      return false
    }
    if (productPrice(product) > filters.maxPrice) {
      return false
    }
    return true
  })

  return sortProducts([...filtered], toSortOption(filters.sortBy))
}
