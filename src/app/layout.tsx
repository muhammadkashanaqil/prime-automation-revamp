import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.primeautomationpl.com"),

  // ADDED FAVICON CONFIGURATION HERE:
  icons: {
    icon: "/uploads/logo.svg",
    shortcut: "/uploads/logo.svg",
    apple: "/uploads/logo.svg",
  },

  title: {
    default: "Prime Automation | Enterprise AI & Operational Automation Systems",
    template: "%s | Prime Automation",
  },
  description:
    "Prime Automation builds enterprise-grade AI chatbots, automated workflows via n8n, real-time data pipelines, and custom AI integrations that scale your operations.",
  keywords: [
    "AI automation agency",
    "n8n workflow automation",
    "custom AI agents",
    "enterprise chatbot development",
    "data pipeline engineering",
    "operational AI optimization",
  ],
  authors: [{ name: "Prime Automation Pvt. Ltd." }],
  creator: "Prime Automation Pvt. Ltd.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.primeautomationpl.com",
    siteName: "Prime Automation Pvt. Ltd.",
    title: "Prime Automation | Custom AI & Operational Automation Systems",
    description:
      "Enterprise AI systems, autonomous workflows, and modern data engineering engineered for measurable ROI.",
    images: [
      {
        url: "/brand/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Prime Automation Pvt. Ltd. Enterprise AI Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Automation | Enterprise AI & Automation Systems",
    description:
      "Engineering production-grade AI agents, intelligent multi-step workflows, and real-time data pipelines.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Prime Automation Pvt. Ltd.",
    url: "https://www.primeautomationpl.com",
    logo: "https://www.primeautomationpl.com/brand/logo.svg",
    email: "info@primeautomationpl.com",
    telephone: "+18005552886",
    description:
      "Enterprise-grade AI chatbots, n8n workflow automation, real-time data engineering, and custom AI systems.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    sameAs: [
      "https://linkedin.com/company/prime-automation",
      "https://x.com/primeautomation",
      "https://github.com/prime-automation",
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-prime-navy text-white min-h-screen selection:bg-prime-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}