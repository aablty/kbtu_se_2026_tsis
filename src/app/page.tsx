import type { LucideIcon } from "lucide-react";
import {
  ChevronDown,
  Code,
  Compass,
  Dumbbell,
  Folder,
  Gamepad2,
  GitBranch,
  GraduationCap,
  Mail,
  Medal,
  School,
  Send,
  Smartphone,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Card } from "@/components/Card";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { getDictionary } from "@/content";
import { getLocale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = getDictionary(await getLocale());
  return dictionary.meta.home;
}

const INTEREST_ICONS: LucideIcon[] = [Gamepad2, Code, GitBranch, Smartphone];
const ACTIVITY_ICONS: LucideIcon[] = [Code, Dumbbell, Gamepad2, Folder];

export default async function HomePage() {
  const dictionary = getDictionary(await getLocale());
  const { home, about, interests, futurePlans, contact } = dictionary;

  return (
    <>
      {/* Home — no Reveal: this is the first thing on screen, it must not depend on JS/scroll. */}
      <section id="home" className="hero">
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
            <a href="#about" className="btn btn--primary">
              {home.ctaAbout}
            </a>
            <a href="#contact" className="btn btn--secondary">
              {home.ctaContact}
            </a>
          </div>
          <p className="text-small mt-8 flex items-center gap-2 text-[var(--text-muted)]">
            <ChevronDown size={16} strokeWidth={1.5} aria-hidden="true" /> {home.scrollCue}
          </p>
        </div>
      </section>

      <Reveal>
        <section id="about" className="page-section">
          <SectionHeading as="h2">{about.title}</SectionHeading>
          <div className="card-grid">
            <Card>
              <Icon icon={GraduationCap} />
              <h3 className="mt-3">{about.university.heading}</h3>
              <p className="text-small text-[var(--text-secondary)]">{about.university.name}</p>
              <p className="text-small text-[var(--text-secondary)]">{about.university.major}</p>
              <p className="text-small text-[var(--text-secondary)]">{about.university.years}</p>
            </Card>
            <Card>
              <Icon icon={School} />
              <h3 className="mt-3">{about.school.heading}</h3>
              <p className="text-small text-[var(--text-secondary)]">{about.school.text}</p>
            </Card>
            <Card>
              <Icon icon={Medal} />
              <h3 className="mt-3">{about.achievement.heading}</h3>
              <p className="text-small text-[var(--text-secondary)]">{about.achievement.name}</p>
              <p className="text-small text-[var(--text-secondary)]">{about.achievement.year}</p>
            </Card>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="interests" className="page-section stack">
          <SectionHeading as="h2">{interests.title}</SectionHeading>

          <div>
            <h3>{interests.interestsHeading}</h3>
            <div className="card-grid mt-4">
              {interests.interests.map((label, i) => (
                <Card key={label}>
                  <Icon icon={INTEREST_ICONS[i] ?? Gamepad2} />
                  <p className="mt-3">{label}</p>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3>{interests.activitiesHeading}</h3>
            <div className="card-grid mt-4">
              {interests.activities.map((label, i) => (
                <Card key={label}>
                  <Icon icon={ACTIVITY_ICONS[i] ?? Code} />
                  <p className="mt-3">{label}</p>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3>{interests.subjectsHeading}</h3>
            <div className="card-grid mt-4">
              {interests.subjects.map((label) => (
                <Card key={label}>
                  <p>{label}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="future-plans" className="page-section">
          <SectionHeading as="h2">{futurePlans.title}</SectionHeading>
          <Card>
            <Icon icon={Compass} />
            <p className="mt-3">{futurePlans.text}</p>
          </Card>
        </section>
      </Reveal>

      <Reveal>
        <section id="contact" className="page-section">
          <SectionHeading as="h2">{contact.title}</SectionHeading>
          <div className="grid gap-6 md:grid-cols-[minmax(240px,1fr)_minmax(280px,2fr)]">
            <Card>
              <h3>{contact.directChannelsHeading}</h3>
              <p className="mt-4 flex items-center gap-2">
                <Icon icon={Mail} /> {contact.email}
              </p>
              <p className="mt-2 flex items-center gap-2">
                <Icon icon={Send} /> {contact.telegram}
              </p>
            </Card>
            <Card>
              <ContactForm dictionary={contact} />
            </Card>
          </div>
        </section>
      </Reveal>
    </>
  );
}
