import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"
import { OptionValueIds } from "@lib/util/product-option-filters"

export default function CollectionTemplate({
  collection,
  countryCode,
  optionValueIds,
}: {
  collection: HttpTypes.StoreCollection
  countryCode: string
  optionValueIds?: OptionValueIds
}) {
  return (
    <div className="py-6 content-container">
      <Suspense
        fallback={
          <SkeletonProductGrid numberOfProducts={collection.products?.length} />
        }
      >
        <PaginatedProducts
          collectionId={collection.id}
          countryCode={countryCode}
          optionValueIds={optionValueIds}
          header={
            <div key="collection-catalog-header" className="mb-8 text-2xl-semi">
              <h1>{collection.title}</h1>
            </div>
          }
        />
      </Suspense>
    </div>
  )
}
