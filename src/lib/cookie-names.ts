// Shared cookie name constants — kept free of server-only imports (next/headers) so client
// components (LanguageProvider, ThemeProvider) can import them without pulling server code
// into the browser bundle.
export const LOCALE_COOKIE = "locale";
export const THEME_COOKIE = "theme";
export type Theme = "light" | "dark";
