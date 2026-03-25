import type { Metadata, Viewport } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
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
  applicationName: "Atomic Clock",
  manifest: "/manifest.json",
  icons: {
    apple: [{ url: "/icon.png" }, { url: "/icon.png", sizes: "512x512" }],
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
  },
  formatDetection: { telephone: false },
  appleWebApp: {
    capable: true,
    title: "Atomic Clock",
    statusBarStyle: "default",
  },
};
export const viewport: Viewport = { themeColor: "#000000" };

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${roboto.variable} ${robotoMono.variable}`}>
      <body style={{ margin: 0 }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
