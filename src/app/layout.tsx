// src/app/layout.tsx
import type { Metadata } from 'next'
import { cn } from '@/lib/utils' // Import cn
// Import specific weights if needed, or rely on variable font capabilities
import { Cairo } from 'next/font/google'
import './globals.css'

// Configure Cairo font
const cairo = Cairo({
  subsets: ['latin'],
  display: 'swap', // Improve font loading performance
  variable: '--font-cairo-sans', // Use the variable name defined in globals/tailwind
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Jeviz', // Update title if needed
  description: 'Your smart learning partner for BEPC and BAC exams in Ivory Coast',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      {/* Apply font variable to the body */}
      <body className={cn('antialiased font-sans', cairo.variable)}>
        {children}
      </body>
    </html>
  )
}
