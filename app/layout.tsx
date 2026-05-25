import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Asset Finance Quiz | Spidi Finance',
  description: 'Find out which asset finance solution is right for you. Take our quick 2-minute quiz and get personalized recommendations from Spidi Finance.',
  generator: 'v0.app',
  metadataBase: new URL('https://quiz.spidifinance.com.au'),
  keywords: ['asset finance', 'equipment finance', 'business loans', 'finance quiz', 'Spidi Finance', 'Australia'],
  authors: [{ name: 'Spidi Finance' }],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://quiz.spidifinance.com.au',
    siteName: 'Spidi Finance',
    title: 'Asset Finance Quiz | Find Your Perfect Solution',
    description: 'Take our quick 2-minute quiz and discover which asset finance solution is right for your business. Get personalized recommendations from Spidi Finance.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Spidi Finance Asset Finance Quiz',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asset Finance Quiz | Spidi Finance',
    description: 'Find your perfect asset finance solution in just 2 minutes. Take our free quiz now!',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
