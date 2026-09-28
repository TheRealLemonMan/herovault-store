import { cookies as nextCookies } from "next/headers"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#0B0F17] py-10">
      <div className="content-container flex h-full w-full max-w-4xl flex-col items-center justify-center gap-y-10">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        <div
          className="flex h-full w-full max-w-4xl flex-col gap-6 rounded-xl border border-zinc-800/80 bg-[#111827]/70 p-8 backdrop-blur-sm small:p-10"
          data-testid="order-complete-container"
        >
          <h1 className="mb-2 flex flex-col gap-y-2 text-3xl font-extrabold tracking-tight text-white small:text-4xl">
            <span>Thank you!</span>
            <span>
              Your order was placed{" "}
              <span className="text-cyan-400">successfully.</span>
            </span>
          </h1>
          <OrderDetails order={order} />
          <h2 className="border-b border-zinc-800 pb-3 text-xl font-bold tracking-wide text-white">
            Summary
          </h2>
          <Items order={order} />
          <CartTotals totals={order} emphasizeTotal />
          <ShippingDetails order={order} />
          <PaymentDetails order={order} />
          <Help />
        </div>
      </div>
    </div>
  )
}
