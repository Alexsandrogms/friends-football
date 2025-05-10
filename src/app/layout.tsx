import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})
export const metadata: Metadata = {
  title: 'Futebol dos Amigos',
  description:
    'Organize partidas de futebol com sorteios rápidos e justos. Crie e sorteie times equilibrados entre amigos com apenas alguns cliques.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased dark`}>{children}</body>
    </html>
  )
}
