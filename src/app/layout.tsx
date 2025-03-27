import type { Metadata } from 'next'
import { Cairo, Cairo_Play } from 'next/font/google'
import './globals.css'

const cairoSans = Cairo({
  variable: '--font-cairo-sans',
  subsets: ['latin'],
})

const cairoPlay = Cairo_Play({
  variable: '--font-cairo-play',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Jeviz',
  description: 'Your smart learning partner for BEPC and BAC exams in Ivory Coast',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body
        className={`${cairoSans.variable} ${cairoPlay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
