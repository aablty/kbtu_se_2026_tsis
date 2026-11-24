import type { Metadata } from "next";
import { Compass } from "lucide-react";
import { getLocale } from "@/lib/locale";
import { getDictionary } from "@/content";
import { Card } from "@/components/Card";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon } from "@/components/Icon";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = getDictionary(await getLocale());
  return dictionary.meta.futurePlans;
}

export default async function FuturePlansPage() {
  const dictionary = getDictionary(await getLocale());
  const { futurePlans } = dictionary;

  return (
    <section>
      <SectionHeading as="h1">{futurePlans.title}</SectionHeading>
      <Card>
        <Icon icon={Compass} />
        <p className="mt-3">{futurePlans.text}</p>
      </Card>
    </section>
  );
}
