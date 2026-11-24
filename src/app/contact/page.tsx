import type { Metadata } from "next";
import { Mail, Send } from "lucide-react";
import { getLocale } from "@/lib/locale";
import { getDictionary } from "@/content";
import { Card } from "@/components/Card";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon } from "@/components/Icon";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = getDictionary(await getLocale());
  return dictionary.meta.contact;
}

export default async function ContactPage() {
  const dictionary = getDictionary(await getLocale());
  const { contact } = dictionary;

  return (
    <section>
      <SectionHeading as="h1">{contact.title}</SectionHeading>
      <div className="grid gap-6 md:grid-cols-[minmax(240px,1fr)_minmax(280px,2fr)]">
        <Card>
          <h2>{contact.directChannelsHeading}</h2>
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
  );
}
