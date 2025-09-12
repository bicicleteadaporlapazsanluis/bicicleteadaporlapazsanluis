import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import { ToastProvider } from "@/components/ui/toast"
import "./globals.css"

export const metadata: Metadata = {
  title: "Bicicleteada por la Paz - San Luis, Argentina",
  description:
    "Sumate a la Bicicleteada por la Paz el domingo 5 de octubre en San Luis. Una iniciativa global que busca conectar pueblos a través de la paz y el ciclismo.",
  keywords: "bicicleteada, paz, San Luis, Argentina, ciclismo, evento, comunidad",
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg+xml" },
    apple: { url: "/favicon.svg", type: "image/svg+xml" }
  },
  openGraph: {
    title: "Bicicleteada por la Paz - San Luis",
    description: "Domingo 5 de octubre - 9:00 hs. Sumate a esta iniciativa de paz y comunidad.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 min-h-screen`}
      >
        <ToastProvider>
          <Suspense fallback={null}>
            {children}
            <Toaster />
          </Suspense>
        </ToastProvider>
        <Analytics />
      </body>
    </html>
  )
}
