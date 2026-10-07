import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { CartProvider } from "@/components/cart/cart-provider";
import { ScrollToTop } from "@/components/navigation/scroll-to-top";
import { CookieConsent } from "@/components/CookieConsent";
import "@/components/cookie-consent.css";
import "./globals.css";
import "./styles/brand.css";
import "./styles/header.css";
import "./styles/home.css";
import "./styles/pre-footer-cta.css";
import "./styles/footer.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const editorial = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "LaLu | Radošā darbnīca",
  description: "Roku darbi, meistarklases un ekskursijas LaLu radošajā darbnīcā.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="lv"
      className={`${inter.variable} ${editorial.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          {children}
          <ScrollToTop />
          <CookieConsent />
        </CartProvider>
      </body>
    </html>
  );
}
