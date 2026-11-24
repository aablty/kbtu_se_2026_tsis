import Link from "next/link";
import { getDictionary } from "@/content";
import { getLocale } from "@/lib/locale";

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
