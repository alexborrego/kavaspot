import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'KavaSpot - Your Weekly Guide to Kava in St. Pete',
  description: 'Events, deals, and vibes — all in one place.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
