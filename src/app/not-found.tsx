import Link from "next/link";
import { getLocale } from "@/lib/locale";
import { getDictionary } from "@/content";

export default async function NotFound() {
  const dictionary = getDictionary(await getLocale());
  return (
    <section>
      <h1>404</h1>
      <p className="mt-4">
        <Link href="/">{dictionary.nav.home}</Link>
      </p>
    </section>
  );
}
