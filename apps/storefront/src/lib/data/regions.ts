"use server"

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listRegions = async () => {
  const next = {
    ...(await getCacheOptions("regions")),
  }

  return await sdk.client
    .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
      method: "GET",
      query: {
        fields: "*countries",
        limit: 100,
      },
      next,
      cache: "no-store",
    })
    .then(({ regions }) => regions)
    .catch(() => [])
}

export const retrieveRegion = async (id: string) => {
  const next = {
    ...(await getCacheOptions(["regions", id].join("-"))),
  }

  return await sdk.client
    .fetch<{ region: HttpTypes.StoreRegion }>(`/store/regions/${id}`, {
      method: "GET",
      query: { fields: "*countries" },
      next,
      cache: "no-store",
    })
    .then(({ region }) => region)
}

export const getRegion = async (countryCode: string) => {
  const regions = await listRegions()

  if (!regions?.length) {
    return null
  }

  const regionMap = new Map<string, HttpTypes.StoreRegion>()
  regions.forEach((region) => {
    region.countries?.forEach((country) => {
      if (country?.iso_2) {
        regionMap.set(country.iso_2.toLowerCase(), region)
      }
    })
  })

  const code = (countryCode || "ec").toLowerCase()
  return regionMap.get(code) || regionMap.get("ec") || regions[0]
}
