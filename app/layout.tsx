import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ParticleBackground from '@/components/ParticleBackground'
import CursorTrail from '@/components/CursorTrail'

export const metadata: Metadata = {
  title: 'Ricky Savanna - Portfolio',
  description: 'Portfolio website of Ricky Savanna',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ParticleBackground />
        <CursorTrail />
        <div className="min-h-screen flex flex-col relative z-10">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

