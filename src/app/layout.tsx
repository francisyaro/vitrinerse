import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_INFO } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_INFO.domain),
  title: {
    default: "Vitrine RSE — 4e édition (2027) | Ouagadougou, Burkina Faso",
    template: "%s | Vitrine RSE",
  },
  description:
    "4e édition de Vitrine RSE les 3, 4 et 5 juin 2027 à la Salle des fêtes de Ouaga 2000 (Ouagadougou). Thème : RSE et Changements climatiques, cadre réglementaire pour les États et les entreprises. Initiative de l’INGRIDD.",
  keywords: [
    "Vitrine RSE",
    "RSE Burkina Faso",
    "INGRIDD",
    "Ouagadougou",
    "Changements climatiques",
    "Développement durable",
    "Économie circulaire",
    "FCPE",
    "Ouaga 2000",
  ],
  openGraph: {
    type: "website",
    locale: "fr_BF",
    url: SITE_INFO.domain,
    siteName: SITE_INFO.name,
    title: "Vitrine RSE — 4e édition (3, 4 et 5 juin 2027)",
    description:
      "RSE et Changements climatiques, cadre réglementaire pour les États et les entreprises. Panels, Communications & 1re édition de la FCPE à Ouaga 2000.",
    images: [
      {
        url: "/images/editions/2027/banniere-4e-edition.jpg",
        width: 1200,
        height: 450,
        alt: "Bannière officielle — 4e édition Vitrine RSE 2027",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-[#115338] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Aller au contenu principal
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
