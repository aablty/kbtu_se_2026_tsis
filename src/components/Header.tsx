import type { Dictionary } from "@/content/types";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ dictionary }: { dictionary: Dictionary }) {
  const { nav, common } = dictionary;
  const links: Array<[string, string]> = [
    ["#home", nav.home],
    ["#about", nav.about],
    ["#interests", nav.interests],
    ["#projects", nav.projects],
    ["#future-plans", nav.future],
    ["#contact", nav.contact],
  ];

  return (
    <header className="site-header">
      <a href="#home" className="site-header__logo">
        N.N.
      </a>
      <nav className="site-header__nav" aria-label={nav.home}>
        <ul>
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="site-header__controls">
        <LanguageSwitcher ariaLabel={common.languageLabel} />
        <ThemeToggle lightLabel={common.themeToLight} darkLabel={common.themeToDark} />
        <MobileNav nav={{ ...nav, openMenu: common.openMenu, closeMenu: common.closeMenu }} />
      </div>
    </header>
  );
}
