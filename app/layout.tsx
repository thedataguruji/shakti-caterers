import type { Metadata } from "next";
import { Sacramento } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const scriptFont = Sacramento({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Shakti Caterers — Experience Bliss in Every Bite",
  description:
    "Authentic Indian mithai from Vadodara. Order Pure Ghee Mohanthal, Kaju Katli, Khajur Bites and Anjeer Dry Fruit Balls online from Shakti Caterers — Experience bliss in every bite.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={scriptFont.variable}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
