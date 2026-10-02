import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

export const metadata: Metadata = {
  title: "LaLu | Radošā darbnīca",
  description: "Roku darbi, meistarklases un ekskursijas LaLu radošajā darbnīcā.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="lv"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
