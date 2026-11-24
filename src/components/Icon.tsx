import type { LucideIcon } from "lucide-react";

export function Icon({
  icon: LucideComponent,
  size = 20,
}: {
  icon: LucideIcon;
  size?: 16 | 20 | 24;
}) {
  return <LucideComponent size={size} strokeWidth={1.5} aria-hidden="true" className="icon" />;
}
