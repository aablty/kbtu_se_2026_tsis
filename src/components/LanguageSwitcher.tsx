"use client";

import { type Locale, SUPPORTED_LOCALES } from "@/content/types";
import { useLanguage } from "@/context/LanguageProvider";

const LABELS: Record<Locale, string> = { kk: "KK", ru: "RU", en: "EN" };

export function LanguageSwitcher({ ariaLabel }: { ariaLabel: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <fieldset className="lang-switcher" aria-label={ariaLabel}>
      <legend className="sr-only">{ariaLabel}</legend>
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
    </fieldset>
  );
}
