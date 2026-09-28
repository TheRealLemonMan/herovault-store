"use client"

import { addToCart } from "@lib/data/cart"
import { getCollectibleMetadata } from "@lib/util/product-metadata"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text } from "@modules/common/components/ui"
import ProductBadges from "@modules/products/components/product-badges"
import { useParams } from "next/navigation"
import { useState } from "react"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default function ProductPreview({
  product,
  isFeatured,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({ product })
  const collectible = getCollectibleMetadata(product)
  const { countryCode } = useParams()
  const [pending, setPending] = useState(false)
  const [quickView, setQuickView] = useState(false)
  const variantId = product.variants?.[0]?.id

  const handleAdd = async (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if (!variantId || !countryCode) {
      return
    }
    setPending(true)
    try {
      await addToCart({
        variantId,
        quantity: 1,
        countryCode: String(countryCode),
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="h-full">
      <LocalizedClientLink href={`/products/${product.handle}`} className="group block h-full">
        <div
          data-testid="product-wrapper"
          className="vault-shine vault-card-enter flex h-full min-h-[420px] flex-col overflow-hidden rounded-[12px] border border-vault-neon/15 bg-vault-panel/70 p-3 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-vault-neon/50 group-hover:shadow-vault-glow"
        >
          <div className="relative">
            <Thumbnail
              thumbnail={product.thumbnail}
              images={product.images}
              size="full"
              isFeatured={isFeatured}
            />
            <div className="absolute inset-x-3 bottom-3 hidden gap-2 small:flex opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  setQuickView(true)
                }}
                className="flex-1 min-h-11 rounded-md bg-black/70 text-xs uppercase tracking-wide text-white border border-white/20 hover:border-vault-neon"
              >
                Quick View
              </button>
              <button
                type="button"
                onClick={handleAdd}
                disabled={pending || !variantId}
                className="flex-1 min-h-11 rounded-md bg-vault-accent text-xs uppercase tracking-wide text-white hover:bg-vault-accent/90 disabled:opacity-60"
              >
                {pending ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
          <div className="mt-4 flex flex-1 flex-col gap-2">
            <ProductBadges meta={collectible} />
            <div className="mt-auto flex justify-between gap-3">
              <Text className="text-ui-fg-base" data-testid="product-title">
                {product.title}
              </Text>
              <div className="shrink-0">{cheapestPrice && <PreviewPrice price={cheapestPrice} />}</div>
            </div>
          </div>
        </div>
      </LocalizedClientLink>
      {quickView && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setQuickView(false)}
        >
          <div
            className="w-full max-w-md rounded-[12px] border border-vault-neon/30 bg-[#0b111e] p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <Thumbnail thumbnail={product.thumbnail} images={product.images} size="full" />
            <h3 className="font-display mt-4 text-xl">{product.title}</h3>
            <div className="mt-2">
              <ProductBadges meta={collectible} />
            </div>
            <p className="mt-3 text-vault-neon">{cheapestPrice?.calculated_price}</p>
            <div className="mt-4 flex gap-2">
              <LocalizedClientLink
                href={`/products/${product.handle}`}
                className="flex-1 min-h-11 rounded-md border border-vault-neon/40 text-center text-sm leading-[44px] hover:bg-vault-neon/10"
              >
                View figure
              </LocalizedClientLink>
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 min-h-11 rounded-md bg-vault-accent text-sm text-white"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
