import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Deepfake | Create Deepfakes',
  description: 'Generate deepfake videos with AI.',
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    userScalable: 0,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content="Deepfake"/>
        <meta name="twitter:title" content="Deepfake | Create Deepfakes"/>
        <meta name="twitter:description" content="Generate deepfake videos with AI."/>
        <script src="https://assets.lemonsqueezy.com/lemon.js" defer></script>
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@600&display=swap" rel="stylesheet"/>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@10..48,200;10..48,300;10..48,400;10..48,500;10..48,600;10..48,700;10..48,800&display=swap" rel="stylesheet"></link>
      </head>
      <body className={`${inter.className} bg-white`}>
        {children}
      </body>
    </html>
  )
}
