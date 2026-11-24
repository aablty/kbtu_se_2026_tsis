import type { Dictionary } from "./types";

const en: Dictionary = {
  nav: {
    home: "Home",
    about: "About",
    interests: "Interests",
    projects: "Projects",
    future: "Future",
    contact: "Contact",
  },
  common: {
    skipToContent: "Skip to content",
    mainNav: "Main navigation",
    languageLabel: "Language",
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  home: {
    title: "Nursultan Nurgali — Personal site",
    name: "Nursultan Nurgali",
    tagline: "KBTU — B.Sc. Information Systems",
    summaryLabel: "Interests",
    summary: "Computer games, software engineering, system design, building small everyday apps.",
    ctaAbout: "About Me",
    ctaContact: "Contact",
    scrollCue: "Scroll down",
    portraitAlt: "Portrait photo of Nursultan Nurgali",
  },
  about: {
    title: "About / Education",
    university: {
      heading: "KBTU",
      name: "Kazakh-British Technical University",
      major: "B.Sc. Information Systems",
      years: "2024 – 2028",
    },
    school: {
      heading: "Previous school",
      text: "Graduated regular secondary school in 2024 with the 'Altyn Belgi' gold medal.",
    },
    achievement: {
      heading: "Achievement",
      name: "'Altyn Belgi' gold medal",
      year: "2024",
    },
  },
  interests: {
    title: "Interests & Activities",
    interestsHeading: "Interests",
    interests: [
      "Computer games",
      "Software engineering",
      "System design",
      "Building small everyday apps",
    ],
    activitiesHeading: "Activities",
    activities: ["Software development", "Gym", "Gaming", "Personal projects"],
    subjectsHeading: "Completed subjects",
    subjects: [
      "Algorithms & Data Structures",
      "Computer Architecture",
      "Databases",
      "IT Infrastructure & Computer Networks",
      "OOP & Design",
      "System Design",
      "Web Development",
    ],
  },
  projects: {
    title: "Projects & Skills",
    items: [
      {
        title: "Telegram automation bots",
        description:
          "Designed Telegram automation bots for business lead-generation and CRM workflows, plus Web3 mini-app integrations.",
      },
      {
        title: "Event-driven backend services",
        description:
          "Built event-driven microservice backends processing large-scale analytics and reporting pipelines for a SaaS platform.",
      },
      {
        title: "Discord community bots",
        description:
          "Developed Discord community bots with a virtual economy, moderation, and mini-game systems for large server communities.",
      },
    ],
  },
  futurePlans: {
    title: "Future Plans",
    text: "Already has professional software engineering experience; currently interviewing for full-time roles.",
  },
  contact: {
    title: "Contact",
    directChannelsHeading: "Direct channels",
    emailLabel: "Email",
    email: "contact@aablty.one",
    telegramLabel: "Telegram",
    telegram: "@aablty",
    formHeading: "Contact form",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    methodLabel: "How should I call you back?",
    methodOptions: {
      whatsapp: "WhatsApp",
      telegram: "Telegram",
      email: "Email",
    },
    valueLabel: {
      whatsapp: "WhatsApp number",
      telegram: "Telegram handle",
      email: "Email address",
    },
    valuePlaceholder: {
      whatsapp: "+1 234 567 8900",
      telegram: "@yourhandle",
      email: "you@example.com",
    },
    messageLabel: "Message",
    messagePlaceholder: "What would you like to say?",
    submit: "Send",
    sending: "Sending…",
    successMessage: "Message sent — thank you, I'll get back to you soon.",
    errorMessage:
      "Something went wrong sending your message. Please try again later, or use the email/Telegram above.",
    validationError: "Please fill in all fields with a value matching your chosen callback method.",
    helperNote:
      "Submitted server-side via Telegram; your chosen callback method and value are only seen by the author.",
  },
  footer: {
    iconsCredit: "Icons by Lucide",
    rights: "All rights reserved.",
    privacy:
      "Privacy: this site only stores your language/theme choice (locally, in your browser). The contact form is sent privately to the author via Telegram and is not stored on this site, logged, or shared with anyone else.",
  },
  meta: {
    home: {
      title: "Nursultan Nurgali — Personal site",
      description:
        "Personal site of Nursultan Nurgali, B.Sc. Information Systems student at KBTU — about, interests & activities, projects, future plans, and contact, all on one page.",
    },
  },
};

export default en;
