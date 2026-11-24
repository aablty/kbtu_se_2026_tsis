import { Mail, Send } from "lucide-react";
import type { Dictionary } from "@/content/types";

export function Footer({ dictionary }: { dictionary: Dictionary }) {
  const { footer, contact } = dictionary;
  return (
    <footer className="site-footer">
      <div className="site-footer__contacts">
        <span>
          <Mail size={16} strokeWidth={1.5} aria-hidden="true" /> {contact.email}
        </span>
        <span>
          <Send size={16} strokeWidth={1.5} aria-hidden="true" /> {contact.telegram}
        </span>
      </div>
      <p className="site-footer__meta">
        {footer.iconsCredit} · © {new Date().getFullYear()} Nursultan Nurgali. {footer.rights}
      </p>
    </footer>
  );
}
