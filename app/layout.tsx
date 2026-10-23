import type { Metadata, Viewport } from "next";
import { Gloock, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/nav/site-header";
import { SiteFooter } from "@/components/nav/site-footer";
import { TabBar } from "@/components/nav/tab-bar";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { AuthProvider } from "@/components/auth/auth-provider";
import { ToastProvider } from "@/components/ui/toast";
import { getLocale } from "@/lib/i18n/server";
import { common } from "@/lib/i18n/messages/common";
import { LOCALE_TAG } from "@/lib/i18n/config";
import "./globals.css";

const plex = IBM_Plex_Sans({ subsets: ["latin", "cyrillic", "cyrillic-ext"], weight: ["400", "500", "600", "700"], variable: "--font-plex-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin", "cyrillic", "cyrillic-ext"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });
const gloock = Gloock({ subsets: ["latin"], weight: "400", variable: "--font-gloock", display: "swap" });

export const metadata: Metadata = {
  title: { default: "ropros — hardware builds for engineers", template: "%s · ropros" },
  description: "Arduino, ESP32 and Raspberry Pi build guides with wiring diagrams, code and an AI build assistant.",
};

export const viewport: Viewport = { themeColor: "#07090c", colorScheme: "dark", viewportFit: "cover" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const t = common[locale];
  return (
    <html lang={LOCALE_TAG[locale]} className={`dark ${plex.variable} ${mono.variable} ${gloock.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <LocaleProvider initial={locale}>
          <ToastProvider>
            <AuthProvider>
              <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-ink-950">
                {t.skip}
              </a>
              <SiteHeader />
              <main id="main" className="flex-1">{children}</main>
              <SiteFooter />
              <TabBar />
            </AuthProvider>
          </ToastProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
