import { Suspense } from "react"

import { OptionValueIds } from "@lib/util/product-option-filters"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  countryCode,
  optionValueIds,
}: {
  countryCode: string
  optionValueIds?: OptionValueIds
}) => {
  return (
    <div className="py-6 content-container">
      <Suspense fallback={<SkeletonProductGrid />}>
        <PaginatedProducts
          countryCode={countryCode}
          optionValueIds={optionValueIds}
          header={
            <div key="store-catalog-header" className="mb-8 text-2xl-semi">
              <h1 data-testid="store-page-title" className="font-display">
                All figures
              </h1>
            </div>
          }
        />
      </Suspense>
    </div>
  )
}

export default StoreTemplate
