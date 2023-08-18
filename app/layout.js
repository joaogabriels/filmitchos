import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import Header from '@/components/Header'
import { ThemeProvider } from "@/components/ThemeProvider"

import '@/styles/globals.css'

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
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <div className="container pt-4 pb-4">
              <Header />

              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
