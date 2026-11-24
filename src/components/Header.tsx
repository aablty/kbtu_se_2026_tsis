import Link from "next/link";
import type { Dictionary } from "@/content/types";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";

export function Header({ dictionary }: { dictionary: Dictionary }) {
  const { nav, common } = dictionary;
  const links: Array<[string, string]> = [
    ["/", nav.home],
    ["/about", nav.about],
    ["/interests", nav.interests],
    ["/future-plans", nav.future],
    ["/contact", nav.contact],
  ];

  return (
    <header className="site-header">
      <Link href="/" className="site-header__logo">
        N.N.
      </Link>
      <nav className="site-header__nav" aria-label={nav.home}>
        <ul>
          {links.map(([href, label]) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
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
