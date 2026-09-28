import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@modules/common/components/ui"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div>
      <Heading
        level="h2"
        className="mb-4 border-b border-zinc-800 pb-3 text-xl font-bold tracking-wide text-white"
      >
        Delivery
      </Heading>
      <div className="flex flex-col items-start gap-6 small:flex-row small:gap-x-8">
        <div
          className="flex w-full flex-col small:w-1/3"
          data-testid="shipping-address-summary"
        >
          <Text className="mb-1 font-medium text-zinc-100">Shipping Address</Text>
          <Text className="text-sm text-zinc-400">
            {order.shipping_address?.first_name}{" "}
            {order.shipping_address?.last_name}
          </Text>
          <Text className="text-sm text-zinc-400">
            {order.shipping_address?.address_1}{" "}
            {order.shipping_address?.address_2}
          </Text>
          <Text className="text-sm text-zinc-400">
            {order.shipping_address?.postal_code},{" "}
            {order.shipping_address?.city}
          </Text>
          <Text className="text-sm text-zinc-400">
            {order.shipping_address?.country_code?.toUpperCase()}
          </Text>
        </div>

        <div
          className="flex w-full flex-col small:w-1/3"
          data-testid="shipping-contact-summary"
        >
          <Text className="mb-1 font-medium text-zinc-100">Contact</Text>
          <Text className="text-sm text-zinc-400">
            {order.shipping_address?.phone}
          </Text>
          <Text className="text-sm text-zinc-400">{order.email}</Text>
        </div>

        <div
          className="flex w-full flex-col small:w-1/3"
          data-testid="shipping-method-summary"
        >
          <Text className="mb-1 font-medium text-zinc-100">Method</Text>
          <Text className="font-mono text-sm text-zinc-200">
            {(order.shipping_methods?.[0] as { name?: string })?.name} (
            {convertToLocale({
              amount: order.shipping_methods?.[0]?.total ?? 0,
              currency_code: order.currency_code,
            })}
            )
          </Text>
        </div>
      </div>
    </div>
  )
}

export default ShippingDetails
