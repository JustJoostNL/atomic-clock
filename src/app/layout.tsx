import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import Head from "next/head";
import type { ReactNode } from "react";
import { Providers } from "./providers";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Atomic Clock",
  description: "A simple atomic clock app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <AppRouterCacheProvider>
      <Head>
        <title>Atomic Clock</title>
        <meta name="application-name" content="Atomic Clock" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Atomic Clock" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icon.png" />

        <link rel="icon" type="image/png" sizes="512x512" href="/icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <html lang="en" className={`${roboto.variable} ${robotoMono.variable}`}>
        <body style={{ margin: 0 }}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </AppRouterCacheProvider>
  );
}
