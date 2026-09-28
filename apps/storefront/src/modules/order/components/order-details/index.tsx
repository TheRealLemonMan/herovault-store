import { HttpTypes } from "@medusajs/types"
import { Text } from "@modules/common/components/ui"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div className="flex flex-col gap-2">
      <Text className="text-zinc-400">
        We have sent the order confirmation details to{" "}
        <span
          className="font-semibold text-zinc-200"
          data-testid="order-email"
        >
          {order.email}
        </span>
        .
      </Text>
      <Text className="mt-1 text-zinc-400">
        Order date:{" "}
        <span className="text-zinc-200" data-testid="order-date">
          {new Date(order.created_at).toDateString()}
        </span>
      </Text>
      <Text className="mt-2 text-zinc-400">
        Order number:{" "}
        <span
          className="inline-block rounded-md border border-cyan-800/50 bg-cyan-950/40 px-2.5 py-1 font-mono text-cyan-400"
          data-testid="order-id"
        >
          {order.display_id}
        </span>
      </Text>

      <div className="mt-4 flex items-center gap-x-4 text-compact-small">
        {showStatus && (
          <>
            <Text className="text-zinc-400">
              Order status:{" "}
              <span className="text-zinc-200" data-testid="order-status">
                {formatStatus(order.fulfillment_status)}
              </span>
            </Text>
            <Text className="text-zinc-400">
              Payment status:{" "}
              <span
                className="text-zinc-200"
                data-testid="order-payment-status"
              >
                {formatStatus(order.payment_status)}
              </span>
            </Text>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
