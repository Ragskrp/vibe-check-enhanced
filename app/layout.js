import SiteLayout from "./components/SiteLayout";
import Script from "next/script";
import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  title: {
    default: "VIBEMENOW — Free Daily Games, Quizzes & Viral Content",
    template: "%s | VIBEMENOW"
  },
  description: "Play addictive daily games, take vibe quizzes, vote on hot takes, and challenge friends. 12 free games updated daily — no login required!",
  keywords: ["daily games", "online quiz", "would you rather", "word games", "emoji quiz", "personality quiz", "hot takes", "viral games", "free games", "browser games"],
  authors: [{ name: "VIBEMENOW" }],
  creator: "VIBEMENOW",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vibemenow.uk",
    siteName: "VIBEMENOW",
    title: "VIBEMENOW — Free Daily Games & Viral Content",
    description: "A collection of fast, addictive, and bite-sized daily games designed to brighten your mood and challenge your brain.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VIBEMENOW - Play Daily Games"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "VIBEMENOW — Free Daily Games & Viral Content",
    description: "Play 12 addictive daily games. No login. Just vibes. ⚡",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  manifest: "/manifest.json"
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "VIBEMENOW",
    url: "https://vibemenow.uk",
    description: "A collection of fast, addictive, and bite-sized daily games designed to brighten your mood and challenge your brain.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://vibemenow.uk" />
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#0a0a0f" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="VIBEMENOW" />
        {/* Google AdSense - Injected Pub ID: ca-pub-7832965089021505 */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7832965089021505"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="grid-bg" suppressHydrationWarning>
        <SiteLayout>
          {children}
        </SiteLayout>
        <CookieConsent />
      </body>
    </html>
  );
}

import CookieConsent from "./components/CookieConsent";
