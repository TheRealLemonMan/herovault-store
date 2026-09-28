import { MedusaContainer } from "@medusajs/framework"
import { ContainerRegistrationKeys, ProductStatus } from "@medusajs/framework/utils"
import {
  createInventoryLevelsWorkflow,
  createProductsWorkflow,
  updateProductsWorkflow,
} from "@medusajs/medusa/core-flows"
import {
  COLLECTIBLES,
  STOCK_BY_SKU,
  getFigureImageUrl,
} from "./collectibles-catalog"
import { parseWeightGrams } from "./collectible-specs"

type SeedCollectiblesInput = {
  container: MedusaContainer
  defaultSalesChannelId: string
  shippingProfileId: string
  stockLocationId: string
  featuredCollectionId: string
  categoryIdByName: Record<string, string>
}

export async function seedCollectibleProducts({
  container,
  defaultSalesChannelId,
  shippingProfileId,
  stockLocationId,
  featuredCollectionId,
  categoryIdByName,
}: SeedCollectiblesInput) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const { data: existingProducts } = await query.graph({
    entity: "product",
    fields: ["id", "handle"],
    filters: {
      handle: {
        $in: COLLECTIBLES.map((item) => item.handle),
      },
    },
  })

  const existingHandles = new Set(
    (existingProducts || []).map((product) => product.handle)
  )

  const productsToCreate = COLLECTIBLES.filter(
    (item) => !existingHandles.has(item.handle)
  )

  if (productsToCreate.length) {
    const chunkSize = 7
    for (let index = 0; index < productsToCreate.length; index += chunkSize) {
      const chunk = productsToCreate.slice(index, index + chunkSize)
      await createProductsWorkflow(container).run({
        input: {
          products: chunk.map((item) => {
            const categoryId = categoryIdByName[item.categoryName]
            if (!categoryId) {
              throw new Error(`Missing category ${item.categoryName}`)
            }

            return {
              title: item.title,
              handle: item.handle,
              description: item.description,
              status: ProductStatus.PUBLISHED,
              weight: 800,
              shipping_profile_id: shippingProfileId,
              collection_id: featuredCollectionId,
              category_ids: [categoryId],
              metadata: {
                universe: item.universe,
                scale: item.scale,
                condition: item.condition,
                badgeType: item.badgeType,
                material: item.specifications.material,
                weight: item.specifications.weight,
                origin: item.specifications.origin,
                dimensions: item.specifications.dimensions,
              },
              material: item.specifications.material,
              origin_country: item.specifications.origin,
              weight: parseWeightGrams(item.specifications.weight),
              images: [{ url: getFigureImageUrl(item.image) }],
              thumbnail: getFigureImageUrl(item.image),
              options: [{ title: "Edition", values: ["Standard"] }],
              variants: [
                {
                  title: "Standard",
                  sku: item.sku,
                  manage_inventory: true,
                  options: {
                    Edition: "Standard",
                  },
                  prices: [{ amount: item.usd, currency_code: "usd" }],
                },
              ],
              sales_channels: [{ id: defaultSalesChannelId }],
            }
          }),
        },
      })
    }
    logger.info(`Created ${productsToCreate.length} collectible products.`)
  }

  const productsToUpdate = (existingProducts || []).filter((product) =>
    COLLECTIBLES.some((item) => item.handle === product.handle)
  )

  for (const product of productsToUpdate) {
    const item = COLLECTIBLES.find((entry) => entry.handle === product.handle)
    if (!item) {
      continue
    }
    const categoryId = categoryIdByName[item.categoryName]
    await updateProductsWorkflow(container).run({
      input: {
        selector: { id: product.id },
        update: {
          title: item.title,
          description: item.description,
          thumbnail: getFigureImageUrl(item.image),
          collection_id: featuredCollectionId,
          category_ids: categoryId ? [categoryId] : undefined,
          metadata: {
            universe: item.universe,
            scale: item.scale,
            condition: item.condition,
            badgeType: item.badgeType,
            material: item.specifications.material,
            weight: item.specifications.weight,
            origin: item.specifications.origin,
            dimensions: item.specifications.dimensions,
          },
          material: item.specifications.material,
          origin_country: item.specifications.origin,
          weight: parseWeightGrams(item.specifications.weight),
        },
      },
    })
  }
  if (productsToUpdate.length) {
    logger.info(`Updated ${productsToUpdate.length} collectible products.`)
  }

  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id", "sku"],
  })

  const { data: existingLevels } = await query.graph({
    entity: "inventory_level",
    fields: ["id", "inventory_item_id", "location_id"],
    filters: {
      location_id: stockLocationId,
    },
  })

  const existingLevelItemIds = new Set(
    (existingLevels || []).map((level) => level.inventory_item_id)
  )

  const inventoryLevels = (inventoryItems || [])
    .filter((item) => item.sku && STOCK_BY_SKU[item.sku] != null)
    .filter((item) => !existingLevelItemIds.has(item.id))
    .map((item) => ({
      location_id: stockLocationId,
      inventory_item_id: item.id,
      stocked_quantity: STOCK_BY_SKU[item.sku as string],
    }))

  if (inventoryLevels.length) {
    await createInventoryLevelsWorkflow(container).run({
      input: { inventory_levels: inventoryLevels },
    })
    logger.info(`Created ${inventoryLevels.length} inventory levels.`)
  } else {
    logger.info("Inventory levels already exist for collectibles.")
  }
}
