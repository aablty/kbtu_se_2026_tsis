export const SUPPORTED_LOCALES = ["en", "ru", "kk"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export type CallbackMethod = "whatsapp" | "telegram" | "email";

export interface Dictionary {
  nav: {
    home: string;
    about: string;
    interests: string;
    projects: string;
    future: string;
    contact: string;
  };
  common: {
    skipToContent: string;
    mainNav: string;
    languageLabel: string;
    themeToLight: string;
    themeToDark: string;
    openMenu: string;
    closeMenu: string;
  };
  home: {
    title: string;
    name: string;
    tagline: string;
    summaryLabel: string;
    summary: string;
    ctaAbout: string;
    ctaContact: string;
    scrollCue: string;
    portraitAlt: string;
  };
  about: {
    title: string;
    university: { heading: string; name: string; major: string; years: string };
    school: { heading: string; text: string };
    achievement: { heading: string; name: string; year: string };
  };
  interests: {
    title: string;
    interestsHeading: string;
    interests: string[];
    activitiesHeading: string;
    activities: string[];
    subjectsHeading: string;
    subjects: string[];
  };
  projects: {
    title: string;
    items: Array<{ title: string; description: string }>;
  };
  futurePlans: {
    title: string;
    text: string;
  };
  contact: {
    title: string;
    directChannelsHeading: string;
    emailLabel: string;
    email: string;
    telegramLabel: string;
    telegram: string;
    formHeading: string;
    nameLabel: string;
    namePlaceholder: string;
    methodLabel: string;
    methodOptions: Record<CallbackMethod, string>;
    valueLabel: Record<CallbackMethod, string>;
    valuePlaceholder: Record<CallbackMethod, string>;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    successMessage: string;
    errorMessage: string;
    validationError: string;
    helperNote: string;
  };
  footer: {
    iconsCredit: string;
    rights: string;
    privacy: string;
  };
  meta: {
    home: { title: string; description: string };
  };
}
