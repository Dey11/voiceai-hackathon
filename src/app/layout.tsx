import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";

import Header from "@/components/header";
import Providers from "@/components/providers";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Write.",
  description: "Just another blog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${geistSans.className} tracking-wide antialiased`}>
          <Header />
          <main className="mx-auto max-w-screen-lg">
            <Suspense>{children}</Suspense>
          </main>
        </body>
      </html>
    </Providers>
  );
}
