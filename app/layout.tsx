import type { Metadata, Viewport } from "next";
import { Gloock, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/nav/site-header";
import { SiteFooter } from "@/components/nav/site-footer";
import "./globals.css";

const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-plex-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });
const gloock = Gloock({ subsets: ["latin"], weight: "400", variable: "--font-gloock", display: "swap" });

export const metadata: Metadata = {
  title: { default: "ropros — hardware builds for engineers", template: "%s · ropros" },
  description: "166 Arduino, ESP32 and Raspberry Pi builds and 40 robotics guides with wiring, code and AI help.",
};

export const viewport: Viewport = { themeColor: "#07090c", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${plex.variable} ${mono.variable} ${gloock.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-ink-950">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
