export function SectionHeading({
  as: Tag = "h2",
  children,
  className = "",
}: {
  as?: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
}) {
  return <Tag className={`section-heading ${className}`.trim()}>{children}</Tag>;
}
