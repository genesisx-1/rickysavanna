import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'
import ParticleBackground from '@/components/ParticleBackground'

export const metadata: Metadata = {
  metadataBase: new URL('https://rickysavanna.me'),
  title: {
    default: 'Ricky Savanna | Operations, IT & Full-Stack Builder',
    template: '%s',
  },
  description:
    'Ricky Savanna — operations, administrative, and IT support professional in Arlington, TX. Runs end-to-end operations for a seven-figure transportation company and builds the production platforms it runs on with agentic coding.',
  keywords: [
    'Ricky Savanna', 'operations coordinator', 'IT support', 'full-stack developer',
    'agentic coding', 'Claude Code', 'n8n automation', 'CRM integrations',
    'Next.js', 'React Native', 'Arlington TX',
  ],
  authors: [{ name: 'Ricky Savanna' }],
  openGraph: {
    title: 'Ricky Savanna | Operations, IT & Full-Stack Builder',
    description:
      'Operations and IT professional who builds the software businesses actually run on. Four live platforms you can try in the browser.',
    url: 'https://rickysavanna.me',
    siteName: 'Ricky Savanna',
    images: ['/images/profile.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ricky Savanna | Operations, IT & Full-Stack Builder',
    description: 'Operations and IT professional who builds the software businesses actually run on.',
    images: ['/images/profile.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <ParticleBackground />
          <div className="min-h-screen flex flex-col relative z-10">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
