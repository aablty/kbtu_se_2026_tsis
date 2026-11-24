"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import type { Locale } from "@/content/types";
import { LOCALE_COOKIE } from "@/lib/cookie-names";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();
  const [isRefreshing, startRefresh] = useTransition();
  const savedScrollY = useRef<number | null>(null);

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API lacks Safari support (NFR-08); value is a fixed enum token, not user input
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; SameSite=Lax`;
      window.localStorage.setItem(LOCALE_COOKIE, next);
      // router.refresh() re-fetches the Server Component tree and otherwise resets scroll to the
      // top (AC-02 regression, found during manual testing) — save/restore it across the
      // transition instead of a timer, since isPending tells us exactly when the refresh commits.
      savedScrollY.current = window.scrollY;
      startRefresh(() => {
        router.refresh();
      });
    },
    [router],
  );

  useEffect(() => {
    if (!isRefreshing && savedScrollY.current !== null) {
      window.scrollTo({ top: savedScrollY.current });
      savedScrollY.current = null;
    }
  }, [isRefreshing]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
