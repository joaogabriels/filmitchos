import './globals.css'
import { Inter } from 'next/font/google'

import Header from '@/components/Header'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Filmitchos',
  description: 'Gerencie seus filmes favoritos',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <body className={inter.className}>
          <Header />

          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
