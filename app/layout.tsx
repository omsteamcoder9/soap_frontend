// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import FloatingContactButtons from '@/components/FloatingContactButtons'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'soap',
  description: 'Your one-stop shop for eco-friendly products',
  icons: {
    icon: "images/fea.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              {/* Add Floating Contact Buttons here */}
              <FloatingContactButtons />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}