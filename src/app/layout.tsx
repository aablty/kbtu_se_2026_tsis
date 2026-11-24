import type { Metadata } from "next";
import { Exo_2, Oxanium } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getDictionary } from "@/content";
import { LanguageProvider } from "@/context/LanguageProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { getLocale, getTheme } from "@/lib/locale";
import "./globals.css";

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  return {
    title: dictionary.meta.home.title,
    description: dictionary.meta.home.description,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  const theme = await getTheme();
  const dictionary = getDictionary(locale);

  return (
    <html lang={locale} data-theme={theme} className={`${oxanium.variable} ${exo2.variable}`}>
      <body className="flex min-h-full flex-col">
        <LanguageProvider initialLocale={locale}>
          <ThemeProvider initialTheme={theme}>
            <a href="#main-content" className="skip-link">
              {dictionary.common.skipToContent}
            </a>
            <Header dictionary={dictionary} />
            <main id="main-content" className="site-main">
              {children}
            </main>
            <Footer dictionary={dictionary} />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
