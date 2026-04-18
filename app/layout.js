import Script from "next/script";
import CookieConsent from "./components/CookieConsent";
import SiteLayout from "./components/SiteLayout";
import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  title: {
    default: "VIBEMENOW | Free Browser Games and Quick Quizzes",
    template: "%s | VIBEMENOW",
  },
  metadataBase: new URL("https://vibemenow.uk"),
  alternates: {
    canonical: "/",
  },
  description:
    "Play original browser games, quick quizzes, and lightweight party modes on VIBEMENOW. No account required.",
  keywords: [
    "browser games",
    "daily games",
    "word game",
    "emoji quiz",
    "would you rather",
    "reaction game",
    "free games",
  ],
  authors: [{ name: "VIBEMENOW" }],
  creator: "VIBEMENOW",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "VIBEMENOW",
    title: "VIBEMENOW | Free Browser Games and Quick Quizzes",
    description:
      "A collection of original browser games you can open in seconds, from daily puzzles to party-room challenges.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VIBEMENOW - Play browser games",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VIBEMENOW | Free Browser Games and Quick Quizzes",
    description:
      "Play original browser games and quick quizzes with no account required.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "VIBEMENOW",
      url: "https://vibemenow.uk",
      description:
        "A collection of original browser games, quizzes, and quick party experiences that run without registration.",
      applicationCategory: "GameApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "VIBEMENOW",
      url: "https://vibemenow.uk",
      logo: "https://vibemenow.uk/icon.png",
    },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#0a0a0f" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="VIBEMENOW" />
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7832965089021505"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="grid-bg" suppressHydrationWarning>
        <SiteLayout>{children}</SiteLayout>
        <CookieConsent />
        <noscript>
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#ded895', color: '#000', padding: '10px', textAlign: 'center', zIndex: 9999, fontSize: '13px', fontWeight: '700' }}>
            This site uses cookies for analytics and ads. By continuing to browse, you agree to our use of cookies.
          </div>
        </noscript>
      </body>
    </html>
  );
}
