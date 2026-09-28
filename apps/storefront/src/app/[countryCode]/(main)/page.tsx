import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import UniverseRail from "@modules/home/components/universe-rail"
import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Heading } from "@modules/common/components/ui"
import InteractiveLink from "@modules/common/components/interactive-link"

export const metadata: Metadata = {
  title: "Heroes & Legends Vault",
  description:
    "Premium collectible action figures from Marvel, DC, anime, and sci-fi universes.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)
  const [{ collections }, categories] = await Promise.all([
    listCollections({
      fields: "id, handle, title",
    }),
    listCategories(),
  ])

  const featuredFallback = region
    ? (
        await listProducts({
          countryCode,
          queryParams: { limit: 8 },
        })
      ).response
    : { products: [] }

  const hasCollections = Boolean(collections?.length)

  return (
    <>
      <Hero />
      <UniverseRail categories={categories || []} />
      <div className="py-12">
        {hasCollections && region ? (
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        ) : (
          <div className="content-container">
            <div className="mb-8 flex justify-between">
              <Heading level="h2" className="txt-xlarge">
                Featured figures
              </Heading>
              <InteractiveLink href="/store">View all</InteractiveLink>
            </div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-12 small:grid-cols-3 small:gap-y-16">
              {region &&
                featuredFallback.products.map((product) => (
                <li key={product.id || product.handle}>
                  <ProductPreview product={product} region={region} isFeatured />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
