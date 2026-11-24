import type { Metadata } from "next";
import { Code, Dumbbell, Folder, Gamepad2, GitBranch, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getLocale } from "@/lib/locale";
import { getDictionary } from "@/content";
import { Card } from "@/components/Card";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon } from "@/components/Icon";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = getDictionary(await getLocale());
  return dictionary.meta.interests;
}

const INTEREST_ICONS: LucideIcon[] = [Gamepad2, Code, GitBranch, Smartphone];
const ACTIVITY_ICONS: LucideIcon[] = [Code, Dumbbell, Gamepad2, Folder];

export default async function InterestsPage() {
  const dictionary = getDictionary(await getLocale());
  const { interests } = dictionary;

  return (
    <section className="stack">
      <SectionHeading as="h1">{interests.title}</SectionHeading>

      <div>
        <h2>{interests.interestsHeading}</h2>
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
        <h2>{interests.activitiesHeading}</h2>
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
        <h2>{interests.subjectsHeading}</h2>
        <div className="card-grid mt-4">
          {interests.subjects.map((label) => (
            <Card key={label}>
              <p>{label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
