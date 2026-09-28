import { notFound } from "next/navigation"
import { Fragment, Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { OptionValueIds } from "@lib/util/product-option-filters"

export default function CategoryTemplate({
  category,
  countryCode,
  optionValueIds,
}: {
  category: HttpTypes.StoreProductCategory
  countryCode: string
  optionValueIds?: OptionValueIds
}) {
  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)

  return (
    <div className="py-6 content-container">
      <Suspense
        fallback={
          <SkeletonProductGrid
            numberOfProducts={category.products?.length ?? 8}
          />
        }
      >
        <PaginatedProducts
          categoryId={category.id}
          countryCode={countryCode}
          optionValueIds={optionValueIds}
          header={
            <Fragment key="category-catalog-header">
              <div className="flex flex-row mb-8 text-2xl-semi gap-4">
                {parents &&
                  parents.map((parent) => (
                    <span key={parent.id} className="text-ui-fg-subtle">
                      <LocalizedClientLink
                        className="mr-4 hover:text-black"
                        href={`/categories/${parent.handle}`}
                        data-testid="sort-by-link"
                      >
                        {parent.name}
                      </LocalizedClientLink>
                      /
                    </span>
                  ))}
                <h1 data-testid="category-page-title">{category.name}</h1>
              </div>
              {category.description && (
                <div className="mb-8 text-base-regular">
                  <p>{category.description}</p>
                </div>
              )}
              {category.category_children && (
                <div className="mb-8 text-base-large">
                  <ul className="grid grid-cols-1 gap-2">
                    {category.category_children?.map((c) => (
                      <li key={c.id}>
                        <InteractiveLink href={`/categories/${c.handle}`}>
                          {c.name}
                        </InteractiveLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Fragment>
          }
        />
      </Suspense>
    </div>
  )
}
