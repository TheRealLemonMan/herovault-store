"use client"

import { ReactNode, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

import { filterCatalogProducts, PRICE_CEILING } from "@lib/util/filter-catalog-products"
import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"
import CollectibleFilters from "@modules/store/components/refinement-list"

type CatalogBrowserProps = {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
  header?: ReactNode
}

const CatalogBrowser = ({ products, region, header }: CatalogBrowserProps) => {
  const searchParams = useSearchParams()

  const [selectedScale, setSelectedScale] = useState<string | null>(
    searchParams.get("scale")
  )
  const [selectedUniverses, setSelectedUniverses] = useState<string[]>(() => {
    const universe = searchParams.get("universe")
    return universe ? [universe] : []
  })
  const [selectedCondition, setSelectedCondition] = useState<string | null>(
    searchParams.get("condition")
  )
  const [maxPrice, setMaxPrice] = useState<number>(() => {
    const max = Number(searchParams.get("max"))
    return Number.isFinite(max) && max > 0 ? Math.min(max, PRICE_CEILING) : PRICE_CEILING
  })
  const [sortBy, setSortBy] = useState<string>(
    searchParams.get("sortBy") === "created_at"
      ? "latest"
      : searchParams.get("sortBy") || "latest"
  )

  const visibleProducts = useMemo(() => {
    const filtered = filterCatalogProducts(products, {
      selectedScale,
      selectedUniverses,
      selectedCondition,
      maxPrice,
      sortBy,
    })
    const seen = new Set<string>()
    return filtered.filter((product) => {
      const identity = product.id || product.handle
      if (!identity) {
        return true
      }
      if (seen.has(identity)) {
        return false
      }
      seen.add(identity)
      return true
    })
  }, [
    products,
    selectedScale,
    selectedUniverses,
    selectedCondition,
    maxPrice,
    sortBy,
  ])

  return (
    <div
      className="flex flex-col small:flex-row small:items-start w-full gap-8"
      data-testid="category-container"
    >
      <CollectibleFilters
        selectedScale={selectedScale}
        onScaleChange={setSelectedScale}
        selectedUniverses={selectedUniverses}
        onUniversesChange={setSelectedUniverses}
        selectedCondition={selectedCondition}
        onConditionChange={setSelectedCondition}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <div className="w-full min-h-[480px]">
        {header ? (
          <div key="catalog-browser-header" className="contents">
            {header}
          </div>
        ) : null}
        {visibleProducts.length ? (
          <ul
            key="catalog-product-grid"
            className="grid w-full gap-6"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
            data-testid="products-list"
          >
            {visibleProducts.map((product, index) => {
              const productKey =
                product.id || product.handle || `figure-${index}`
              return (
                <li
                  key={productKey}
                  className="vault-card-enter"
                  style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
                >
                  <ProductPreview product={product} region={region} />
                </li>
              )
            })}
          </ul>
        ) : (
          <div
            key="catalog-empty-state"
            className="min-h-[320px] rounded-[12px] border border-white/10 bg-vault-panel/40 p-10 text-slate-300"
          >
            No figures match these vault filters. Clear a filter to see the collection.
          </div>
        )}
      </div>
    </div>
  )
}

export default CatalogBrowser
