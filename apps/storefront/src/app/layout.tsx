import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="dark" className="dark">
      <body className="bg-vault-bg text-ui-fg-base antialiased">
        <main className="relative min-h-screen bg-vault-bg">{props.children}</main>
      </body>
    </html>
  )
}
