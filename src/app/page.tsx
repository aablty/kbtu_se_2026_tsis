import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { getLocale } from "@/lib/locale";
import { getDictionary } from "@/content";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = getDictionary(await getLocale());
  return dictionary.meta.home;
}

export default async function HomePage() {
  const dictionary = getDictionary(await getLocale());
  const { home } = dictionary;

  return (
    <section className="hero">
      {/* shortcut: portrait file not yet supplied by the author (content-inventory.md §2), path is a placeholder */}
      <Image
        src="/portrait.jpg"
        alt={home.portraitAlt}
        width={240}
        height={288}
        priority
        className="hero__portrait"
      />
      <div>
        <h1>{home.name}</h1>
        <p className="text-small text-[var(--text-secondary)]">{home.tagline}</p>
        <p className="mt-4">
          <strong>{home.summaryLabel}:</strong> {home.summary}
        </p>
        <div className="hero__actions">
          <Link href="/about" className="btn btn--primary">
            {home.ctaAbout}
          </Link>
          <Link href="/contact" className="btn btn--secondary">
            {home.ctaContact}
          </Link>
        </div>
        <p className="text-small text-[var(--text-muted)] mt-8 flex items-center gap-2">
          <ChevronDown size={16} strokeWidth={1.5} aria-hidden="true" /> {home.scrollCue}
        </p>
      </div>
    </section>
  );
}
