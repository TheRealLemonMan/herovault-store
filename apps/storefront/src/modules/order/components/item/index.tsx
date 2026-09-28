import { HttpTypes } from "@medusajs/types"
import { Text } from "@modules/common/components/ui"

import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import Thumbnail from "@modules/products/components/thumbnail"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  currencyCode: string
}

const Item = ({ item, currencyCode }: ItemProps) => {
  return (
    <div
      className="flex w-full items-center gap-4 py-4"
      data-testid="product-row"
    >
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-zinc-700/60 bg-zinc-900">
        <Thumbnail thumbnail={item.thumbnail} size="square" />
      </div>

      <div className="min-w-0 flex-1 text-left">
        <Text
          className="font-medium text-zinc-100"
          data-testid="product-name"
        >
          {item.product_title}
        </Text>
        <div className="text-sm text-zinc-400">
          <LineItemOptions variant={item.variant} data-testid="product-variant" />
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end justify-center font-mono font-medium text-zinc-200">
        <span className="flex items-center gap-x-1">
          <span className="text-zinc-400" data-testid="product-quantity">
            {item.quantity}x
          </span>
          <LineItemUnitPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </span>
        <LineItemPrice
          item={item}
          style="tight"
          currencyCode={currencyCode}
        />
      </div>
    </div>
  )
}

export default Item
