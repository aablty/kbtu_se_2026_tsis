"use client";

import { SUPPORTED_LOCALES, type Locale } from "@/content/types";
import { useLanguage } from "@/context/LanguageProvider";

const LABELS: Record<Locale, string> = { kk: "KK", ru: "RU", en: "EN" };

export function LanguageSwitcher({ ariaLabel }: { ariaLabel: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="lang-switcher" role="group" aria-label={ariaLabel}>
      {SUPPORTED_LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          className="lang-switcher__option"
          aria-pressed={locale === code}
          onClick={() => setLocale(code)}
        >
          {LABELS[code]}
        </button>
      ))}
    </div>
  );
}
