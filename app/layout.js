import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Deepfake | Create Deepfakes of Anyone",
  description:
    "Create realistic deepfake videos using cutting-edge AI. Upload a photo or video of someone and have them say what you type, all in a matter of minutes.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    userScalable: 0,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="Deepfake" />
        <meta
          name="twitter:title"
          content="Deepfake | Create Deepfakes of Anyone"
        />
        <meta
          name="twitter:description"
          content="Create realistic deepfake videos using cutting-edge AI. Upload a photo or video of someone and have them say what you type, all in a matter of minutes."
        />
        <script src="https://assets.lemonsqueezy.com/lemon.js" defer></script>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100;0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;0,9..40,1000;1,9..40,100;1,9..40,200;1,9..40,300;1,9..40,400;1,9..40,500;1,9..40,600;1,9..40,700;1,9..40,800;1,9..40,900;1,9..40,1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`font-dm bg-gradient-to-br from-emerald-100 via-blue-50 to-rose-100`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
