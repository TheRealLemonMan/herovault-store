import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import {
  createCollectionsWorkflow,
  createProductCategoriesWorkflow,
  deleteProductCategoriesWorkflow,
  deleteProductsWorkflow,
} from "@medusajs/medusa/core-flows"
import {
  APPAREL_CATEGORY_HANDLES,
  APPAREL_PRODUCT_HANDLES,
  COLLECTIBLES,
  LEGACY_COLLECTIBLE_HANDLES,
} from "../utils/collectibles-catalog"
import { ensureEcuadorUsdRegion } from "../utils/ensure-ecuador-region"
import { seedCollectibleProducts } from "../utils/seed-collectibles"

const REQUIRED_CATEGORIES = [
  { name: "Marvel", handle: "marvel" },
  { name: "DC", handle: "dc" },
  { name: "Anime", handle: "anime" },
  { name: "Sci-Fi", handle: "sci-fi" },
  { name: "Star Wars", handle: "star-wars" },
  { name: "Video Games", handle: "video-games" },
]

export default async function seedCollectibles({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const { data: salesChannels } = await query.graph({
    entity: "sales_channel",
    fields: ["id", "name"],
  })
  const defaultSalesChannel = salesChannels?.[0]
  if (!defaultSalesChannel) {
    throw new Error("No sales channel found. Run the initial seed first.")
  }

  const { data: shippingProfiles } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  })
  const shippingProfile = shippingProfiles?.[0]
  if (!shippingProfile) {
    throw new Error("No shipping profile found. Run the initial seed first.")
  }

  const { data: stockLocations } = await query.graph({
    entity: "stock_location",
    fields: ["id", "name"],
  })
  const stockLocation = stockLocations?.[0]
  if (!stockLocation) {
    throw new Error("No stock location found. Run the initial seed first.")
  }

  const { data: apparelProducts } = await query.graph({
    entity: "product",
    fields: ["id", "handle"],
    filters: {
      handle: { $in: APPAREL_PRODUCT_HANDLES },
    },
  })
  const apparelIds = (apparelProducts || []).map((product) => product.id)
  if (apparelIds.length) {
    await deleteProductsWorkflow(container).run({
      input: { ids: apparelIds },
    })
    logger.info(`Deleted ${apparelIds.length} apparel demo products.`)
  }

  const keepHandles = new Set(COLLECTIBLES.map((item) => item.handle))
  const { data: catalogProducts } = await query.graph({
    entity: "product",
    fields: ["id", "handle"],
  })
  const obsoleteIds = (catalogProducts || [])
    .filter((product) => product.handle && !keepHandles.has(product.handle))
    .map((product) => product.id)

  if (obsoleteIds.length) {
    await deleteProductsWorkflow(container).run({
      input: { ids: obsoleteIds },
    })
    logger.info(
      `Deleted ${obsoleteIds.length} obsolete catalog products (${LEGACY_COLLECTIBLE_HANDLES.length} legacy handles targeted).`
    )
  }

  const { data: categories } = await query.graph({
    entity: "product_category",
    fields: ["id", "name", "handle", "parent_category_id"],
  })

  const apparelCategories = (categories || []).filter((category) =>
    APPAREL_CATEGORY_HANDLES.includes((category.handle || "").toLowerCase())
  )
  const childApparelIds = apparelCategories
    .filter((category) => category.parent_category_id)
    .map((category) => category.id)
  const parentApparelIds = apparelCategories
    .filter((category) => !category.parent_category_id)
    .map((category) => category.id)

  for (const ids of [childApparelIds, parentApparelIds]) {
    if (ids.length) {
      await deleteProductCategoriesWorkflow(container).run({
        input: ids,
      })
    }
  }
  if (apparelCategories.length) {
    logger.info(`Deleted ${apparelCategories.length} apparel categories.`)
  }

  await ensureEcuadorUsdRegion(container)

  const remainingCategories = (categories || []).filter(
    (category) =>
      !APPAREL_CATEGORY_HANDLES.includes((category.handle || "").toLowerCase())
  )

  const categoryIdByName: Record<string, string> = {}
  for (const category of remainingCategories) {
    if (category.name) {
      categoryIdByName[category.name] = category.id
    }
    if (category.handle) {
      categoryIdByName[category.handle] = category.id
    }
  }

  const missingCategories = REQUIRED_CATEGORIES.filter(
    (category) =>
      !categoryIdByName[category.name] && !categoryIdByName[category.handle]
  )
  if (missingCategories.length) {
    const { result } = await createProductCategoriesWorkflow(container).run({
      input: {
        product_categories: missingCategories.map((category) => ({
          name: category.name,
          handle: category.handle,
          is_active: true,
        })),
      },
    })
    for (const category of result) {
      categoryIdByName[category.name] = category.id
      if (category.handle) {
        categoryIdByName[category.handle] = category.id
      }
    }
  }

  const { data: collections } = await query.graph({
    entity: "product_collection",
    fields: ["id", "handle", "title"],
  })
  let featuredCollection = (collections || []).find(
    (collection) => collection.handle === "featured-vault"
  )

  if (!featuredCollection) {
    const { result } = await createCollectionsWorkflow(container).run({
      input: {
        collections: [
          {
            title: "Featured Vault",
            handle: "featured-vault",
          },
        ],
      },
    })
    featuredCollection = result[0]
  }

  logger.info("Seeding HeroVault collectibles...")
  await seedCollectibleProducts({
    container,
    defaultSalesChannelId: defaultSalesChannel.id,
    shippingProfileId: shippingProfile.id,
    stockLocationId: stockLocation.id,
    featuredCollectionId: featuredCollection.id,
    categoryIdByName,
  })
  logger.info("Finished seeding HeroVault collectibles.")
}
