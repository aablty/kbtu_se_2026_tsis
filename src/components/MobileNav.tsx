"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { Dictionary } from "@/content/types";
import { getNavLinks } from "@/lib/nav";

export function MobileNav({
  nav,
}: {
  nav: Dictionary["nav"] & { openMenu: string; closeMenu: string; mainNav: string };
}) {
  const [open, setOpen] = useState(false);
  const links = getNavLinks(nav);

  return (
    <div className="mobile-nav">
      <button
        type="button"
        className="mobile-nav__trigger"
        aria-expanded={open}
        aria-controls="mobile-nav-menu"
        aria-label={open ? nav.closeMenu : nav.openMenu}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <X size={20} strokeWidth={1.5} aria-hidden="true" />
        ) : (
          <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
        )}
      </button>
      {open && (
        <nav id="mobile-nav-menu" className="mobile-nav__menu" aria-label={nav.mainNav}>
          <ul>
            {links.map(([href, label]) => (
              <li key={href}>
                <a href={href} onClick={() => setOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
