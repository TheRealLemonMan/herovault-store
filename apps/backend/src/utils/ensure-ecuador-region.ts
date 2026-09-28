import { MedusaContainer } from "@medusajs/framework"
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
} from "@medusajs/framework/utils"
import {
  createRegionsWorkflow,
  createTaxRegionsWorkflow,
  updateRegionsWorkflow,
} from "@medusajs/medusa/core-flows"

const ECUADOR = "ec"

export async function ensureEcuadorUsdRegion(container: MedusaContainer) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const fulfillmentModuleService = container.resolve(
    ModuleRegistrationName.FULFILLMENT
  )

  const { data: regions } = await query.graph({
    entity: "region",
    fields: ["id", "name", "currency_code", "countries.iso_2"],
  })

  const regionWithEc = (regions || []).find((region) =>
    region.countries?.some((country) => country.iso_2 === ECUADOR)
  )

  if (!regionWithEc) {
    const usdRegion =
      (regions || []).find((region) => region.currency_code === "usd") ||
      regions?.[0]

    if (usdRegion) {
      const countries = Array.from(
        new Set(
          [
            ...(usdRegion.countries || []).map((country) => country.iso_2),
            ECUADOR,
          ].filter(Boolean) as string[]
        )
      )

      await updateRegionsWorkflow(container).run({
        input: {
          selector: { id: usdRegion.id },
          update: {
            currency_code: "usd",
            countries,
            payment_providers: ["pp_system_default"],
          },
        },
      })
      logger.info("Added Ecuador (ec) to the USD region.")
    } else {
      await createRegionsWorkflow(container).run({
        input: {
          regions: [
            {
              name: "Ecuador",
              currency_code: "usd",
              countries: [ECUADOR],
              payment_providers: ["pp_system_default"],
            },
          ],
        },
      })
      logger.info("Created Ecuador USD region.")
    }
  }

  const { data: taxRegions } = await query.graph({
    entity: "tax_region",
    fields: ["id", "country_code"],
  })
  const hasEcTax = (taxRegions || []).some(
    (taxRegion) => taxRegion.country_code === ECUADOR
  )
  if (!hasEcTax) {
    await createTaxRegionsWorkflow(container).run({
      input: [
        {
          country_code: ECUADOR,
          provider_id: "tp_system",
        },
      ],
    })
    logger.info("Created Ecuador tax region.")
  }

  const { data: serviceZones } = await query.graph({
    entity: "service_zone",
    fields: ["id", "geo_zones.country_code"],
  })
  const zone = serviceZones?.[0]
  const hasEcZone = zone?.geo_zones?.some(
    (geoZone) => geoZone.country_code === ECUADOR
  )
  if (zone && !hasEcZone) {
    await fulfillmentModuleService.createGeoZones({
      service_zone_id: zone.id,
      type: "country",
      country_code: ECUADOR,
    })
    logger.info("Added Ecuador to the shipping service zone.")
  }

  for (const region of regions || []) {
    if (region.currency_code !== "usd") {
      await updateRegionsWorkflow(container).run({
        input: {
          selector: { id: region.id },
          update: { currency_code: "usd" },
        },
      })
    }
  }
}
