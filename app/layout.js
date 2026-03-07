import "./globals.css";

export const metadata = {
  title: {
    default: "VIBECHECK — Free Daily Games, Quizzes & Viral Content",
    template: "%s | VIBECHECK"
  },
  description: "Play addictive daily games, take vibe quizzes, vote on hot takes, and challenge friends. 7 free games updated daily — no login required!",
  keywords: ["daily games", "online quiz", "would you rather", "word games", "emoji quiz", "personality quiz", "hot takes", "viral games", "free games", "browser games"],
  authors: [{ name: "VIBECHECK" }],
  creator: "VIBECHECK",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vibecheck-play.vercel.app",
    siteName: "VIBECHECK",
    title: "VIBECHECK — Free Daily Games & Viral Content",
    description: "A collection of fast, addictive, and bite-sized daily games designed to brighten your mood and challenge your brain.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VIBECHECK - Play Daily Games"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "VIBECHECK — Free Daily Games & Viral Content",
    description: "Play 7 addictive daily games. No login. Just vibes. ⚡",
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
    name: "VIBECHECK",
    url: "https://vibecheck-play.vercel.app",
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
        <link rel="canonical" href="https://vibecheck-play.vercel.app" />
        <meta name="theme-color" content="#0a0a0f" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="VIBECHECK" />
        {/* Google AdSense - Injected Pub ID: ca-pub-7832965089021505 */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          data-ad-client="ca-pub-7832965089021505"
          crossOrigin="anonymous"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="grid-bg" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
