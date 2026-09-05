import type { Metadata } from "next";
import { EB_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import { GlobalModalContainer } from "@/components/modals/GlobalModalContainer";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const ebGaramond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GROVIX — Digital Agency & Product Studio | Warm Minimalism",
  description:
    "GROVIX is a modern digital agency and product studio combining engineering excellence, data-driven digital growth, and internal SaaS tools under the Sahara warm minimalism aesthetic.",
  keywords: [
    "GROVIX",
    "Grovix",
    "Product Studio",
    "Digital Agency",
    "Software Engineering",
    "Digital Growth",
    "ServeQ",
    "Minimalism",
  ],
  authors: [{ name: "GROVIX Studio" }],
  openGraph: {
    title: "GROVIX — Digital Agency & Product Studio",
    description:
      "Crafting high-performance digital products, resilient engineering architectures, and scalable growth engines.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${manrope.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#faf5ee] text-[#3a302a] font-sans">
        <ModalProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <GlobalModalContainer />
        </ModalProvider>
      </body>
    </html>
  );
}
