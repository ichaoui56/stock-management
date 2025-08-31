import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
  title: "StockPro - Gestion de Stock",
  description: "Application complète de gestion de stock et inventaire",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
        <SessionProvider>{children}</SessionProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
