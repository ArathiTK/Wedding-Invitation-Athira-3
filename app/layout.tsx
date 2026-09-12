import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const siteTitle =
  process.env.NEXT_PUBLIC_SITE_TITLE ||
  "Abhiram TK & Athira K — Wedding Invitation";

const siteDescription =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
  "Join us to celebrate the wedding of Abhiram TK & Athira K";

export async function generateMetadata(): Promise<Metadata> {
  // Derive the real request domain instead of trusting a hardcoded/env
  // default — a mismatch there sends OG crawlers to the wrong deployment
  // URL and the link preview silently fails to load.
  const host = (await headers()).get("host") || "";
  const protocol = host.startsWith("localhost") || host.startsWith("127.")
    ? "http"
    : "https";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;

  const isAthiraFirst = siteUrl.includes("wedding-invitation-athira-abhiram");

  const ogImagePath = isAthiraFirst
    ? "/assets/og-image-athira.jpg"
    : "/assets/og-image-abhiram.jpg";

  const ogImage = {
    url: ogImagePath,
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt: "Athira K & Abhiram TK — Wedding Invitation",
  };

  return {
    metadataBase: new URL(siteUrl),
    title: siteTitle,
    description: siteDescription,
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: [ogImagePath],
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} h-full`}>
      <body className="min-h-full antialiased" style={{ backgroundColor: "#1f2519" }}>
        {/* Mobile-width container — centred on desktop, full-width on mobile */}
        <div
          className="relative mx-auto overflow-x-hidden w-full md:max-w-[430px]"
          style={{ minHeight: "100svh", backgroundColor: "#1f2519" }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
