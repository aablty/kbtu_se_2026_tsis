import type { Dictionary } from "@/content/types";

/**
 * Single source of truth for the site's hash-anchor nav links, so Header and MobileNav can't
 * silently drift out of sync with each other when a section is added or removed.
 */
export function getNavLinks(nav: Dictionary["nav"]): Array<[string, string]> {
  return [
    ["#home", nav.home],
    ["#about", nav.about],
    ["#interests", nav.interests],
    ["#projects", nav.projects],
    ["#future-plans", nav.future],
    ["#contact", nav.contact],
  ];
}
