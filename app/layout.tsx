import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLdLocalBusiness } from "@/components/seo/JsonLdLocalBusiness";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = { width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  metadataBase: new URL("https://pinnakatted.ee"),
  title: {
    default: "Pinnakatted.ee – PUR soojustus (pihustamine ja injekteerimine)",
    template: "%s | Pinnakatted.ee",
  },
  description:
    "PUR soojustus Eestis – pihustamine ja injekteerimine. Soojem kodu, madalamad küttekulud. Polükarbamiid hüdroisolatsioon. Küsi pakkumist.",
  keywords: ["PUR soojustus", "pihustamine", "injekteerimine", "polükarbamiid", "hüdroisolatsioon", "katus", "Eesti"],
  openGraph: {
    type: "website",
    locale: "et_EE",
    url: "https://pinnakatted.ee",
    siteName: "Pinnakatted.ee",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="et" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col antialiased font-sans">
        <JsonLdLocalBusiness />
        <Header />
        <main className="min-w-0 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
