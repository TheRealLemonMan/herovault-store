import { Container, Heading, Text } from "@modules/common/components/ui"

import { isStripeLike, paymentInfoMap } from "@lib/constants"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0].payments?.[0]

  return (
    <div>
      <Heading
        level="h2"
        className="mb-4 border-b border-zinc-800 pb-3 text-xl font-bold tracking-wide text-white"
      >
        Payment
      </Heading>
      <div>
        {payment && (
          <div className="flex w-full flex-col items-start gap-6 small:flex-row small:gap-x-8">
            <div className="flex w-full flex-col small:w-1/3">
              <Text className="mb-1 font-medium text-zinc-100">
                Payment method
              </Text>
              <Text
                className="text-sm text-zinc-400"
                data-testid="payment-method"
              >
                {paymentInfoMap[payment.provider_id].title}
              </Text>
            </div>
            <div className="flex w-full flex-col small:w-2/3">
              <Text className="mb-1 font-medium text-zinc-100">
                Payment details
              </Text>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Container className="flex h-7 w-fit items-center rounded-md border border-zinc-700/60 bg-zinc-900 p-2">
                  {paymentInfoMap[payment.provider_id].icon}
                </Container>
                <Text className="font-mono text-zinc-200" data-testid="payment-amount">
                  {isStripeLike(payment.provider_id) && payment.data?.card_last4
                    ? `**** **** **** ${payment.data.card_last4}`
                    : `${convertToLocale({
                        amount: payment.amount,
                        currency_code: order.currency_code,
                      })} paid at ${new Date(
                        payment.created_at ?? ""
                      ).toLocaleString()}`}
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentDetails
