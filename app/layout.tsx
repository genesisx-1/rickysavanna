import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'

export const metadata: Metadata = {
  metadataBase: new URL('https://rickysavanna.me'),
  title: {
    default: 'Ricky Savanna — Operations, IT & Software',
    template: '%s',
  },
  description:
    'Ricky Savanna — operations, administrative, and IT support professional in Arlington, TX. Runs end-to-end operations for a seven-figure transportation company and builds the platforms it runs on.',
  keywords: [
    'Ricky Savanna', 'operations coordinator', 'IT support', 'full-stack developer',
    'agentic coding', 'n8n automation', 'CRM integrations', 'Next.js', 'Arlington TX',
  ],
  authors: [{ name: 'Ricky Savanna' }],
  openGraph: {
    title: 'Ricky Savanna — Operations, IT & Software',
    description:
      'Operations and IT professional who builds the software businesses actually run on. Four live platforms you can try in the browser.',
    url: 'https://rickysavanna.me',
    siteName: 'Ricky Savanna',
    images: ['/images/profile.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ricky Savanna — Operations, IT & Software',
    description: 'Operations and IT professional who builds the software businesses actually run on.',
    images: ['/images/profile.jpg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;450;500;550;600;650;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
