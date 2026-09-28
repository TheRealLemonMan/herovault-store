import { HttpTypes } from "@medusajs/types"

export type CollectibleMetadata = {
  universe?: string
  scale?: string
  condition?: string
  badgeType?: "info" | "exclusive" | "limited"
  material?: string
  weight?: string
  origin?: string
  dimensions?: string
}

export const getCollectibleMetadata = (
  product: HttpTypes.StoreProduct
): CollectibleMetadata => {
  const metadata = (product.metadata || {}) as Record<string, unknown>

  const read = (key: string) => {
    const value = metadata[key]
    return typeof value === "string" && value.trim() ? value : undefined
  }

  const badgeType = read("badgeType")
  const allowed =
    badgeType === "info" ||
    badgeType === "exclusive" ||
    badgeType === "limited"
      ? badgeType
      : undefined

  return {
    universe: read("universe"),
    scale: read("scale"),
    condition: read("condition"),
    badgeType: allowed,
    material: read("material"),
    weight: read("weight"),
    origin: read("origin"),
    dimensions: read("dimensions"),
  }
}

