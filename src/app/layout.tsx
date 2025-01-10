import type { Metadata } from "next";
import { Afacad } from "next/font/google";
import { Suspense } from "react";

import Header from "@/components/header";
import Providers from "@/components/providers";

import "./globals.css";

const font = Afacad({
  subsets: ["latin"],
  variable: "--font-afacad",
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
        <body
          className={`${font.className} text-brand-foreground bg-brand-bg tracking-wide antialiased`}
        >
          <Header />
          <main className="mx-auto max-w-screen-lg">
            <Suspense>{children}</Suspense>
          </main>
        </body>
      </html>
    </Providers>
  );
}
