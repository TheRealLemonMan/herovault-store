import { Heading } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = () => {
  return (
    <div className="mt-2 border-t border-zinc-800 pt-6">
      <Heading className="text-base font-semibold text-white">Need help?</Heading>
      <div className="my-2 text-sm">
        <ul className="flex flex-col gap-y-2">
          <li>
            <LocalizedClientLink
              href="/contact"
              className="text-cyan-400 hover:text-cyan-300"
            >
              Contact
            </LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink
              href="/contact"
              className="text-cyan-400 hover:text-cyan-300"
            >
              Returns & Exchanges
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
