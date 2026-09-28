export const APPAREL_CATEGORY_HANDLES = [
  "shirts",
  "sweatshirts",
  "pants",
  "merch",
]

export const NAV_FRANCHISES = [
  { handle: "marvel", label: "Marvel" },
  { handle: "dc", label: "DC Comics" },
  { handle: "anime", label: "Anime" },
  { handle: "star-wars", label: "Star Wars" },
  { handle: "video-games", label: "Video Games" },
] as const

export const CATEGORY_NAV_LABELS: Record<string, string> = {
  marvel: "Marvel",
  dc: "DC Comics",
  "dc-comics": "DC Comics",
  anime: "Anime",
  "star-wars": "Star Wars",
  "video-games": "Video Games",
  "sci-fi": "Sci-Fi",
}

export const isApparelCategory = (handle?: string | null) =>
  APPAREL_CATEGORY_HANDLES.includes((handle || "").toLowerCase())

export const collectibleNavLabel = (handle?: string | null, fallback?: string) => {
  if (!handle) {
    return fallback || ""
  }
  return CATEGORY_NAV_LABELS[handle.toLowerCase()] || fallback || handle
}

export const franchiseNavItems = (
  categories?: { handle?: string | null; name?: string | null }[] | null
) =>
  NAV_FRANCHISES.map((franchise) => {
    const match = (categories || []).find(
      (category) => (category.handle || "").toLowerCase() === franchise.handle
    )
    return {
      href: `/categories/${match?.handle || franchise.handle}`,
      label: franchise.label,
      match: "prefix" as const,
    }
  })
