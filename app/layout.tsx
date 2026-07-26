import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://wedding-invitation-abhiram-athira.vercel.app"
  ),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

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
