import Script from "next/script";
import AnalyticsAndAds from "./components/AnalyticsAndAds";
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
    default: 'VIBEMENOW | Free Browser Games, Quizzes & Word Puzzles (No Login)',
    template: '%s | VIBEMENOW',
  },
  metadataBase: new URL('https://vibemenow.uk'),
  description:
    'Play original browser games, daily word puzzles, and quick quizzes on VIBEMENOW. No accounts, no downloads—just instant, free fun.',
  keywords: [
    'free browser games no login',
    'wordle alternatives uk',
    'brain training games free',
    'daily puzzles online',
    'reaction speed test',
    'party games no sign up',
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
      "name": "VIBEMENOW",
      "url": "https://vibemenow.uk",
      "description": "A collection of original browser games, quizzes, and quick party experiences that run without registration.",
      "applicationCategory": "GameApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
      },
      "author": {
        "@type": "Organization",
        "name": "VIBEMENOW"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "VIBEMENOW",
      "url": "https://vibemenow.uk",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://vibemenow.uk/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "VIBEMENOW",
      "url": "https://vibemenow.uk",
      "logo": "https://vibemenow.uk/icon.png",
      "sameAs": [
        "https://twitter.com/vibemenow",
        "https://facebook.com/vibemenow"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Raghavendra Reddy",
      "jobTitle": "Lead Developer & Designer",
      "url": "https://vibemenow.uk/about",
      "worksFor": {
        "@type": "Organization",
        "name": "VIBEMENOW"
      }
    }

  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="google-adsense-account" content="ca-pub-7832965089021505" />
        <meta name="theme-color" content="#0a0a0f" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="VIBEMENOW" />
        <AnalyticsAndAds />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="grid-bg" suppressHydrationWarning>
          <SiteLayout>{children}</SiteLayout>
        <CookieConsent />
      </body>
    </html>
  );
}
