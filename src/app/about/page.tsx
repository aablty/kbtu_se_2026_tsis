import type { Metadata } from "next";
import { GraduationCap, Medal, School } from "lucide-react";
import { getLocale } from "@/lib/locale";
import { getDictionary } from "@/content";
import { Card } from "@/components/Card";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon } from "@/components/Icon";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = getDictionary(await getLocale());
  return dictionary.meta.about;
}

export default async function AboutPage() {
  const dictionary = getDictionary(await getLocale());
  const { about } = dictionary;

  return (
    <section>
      <SectionHeading as="h1">{about.title}</SectionHeading>
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
  );
}
