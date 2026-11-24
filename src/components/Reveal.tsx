"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades + slides a section in once it enters the viewport. The "reduce motion" case is handled
 * globally in globals.css (every transition duration collapses to ~0), not here — so this effect
 * never needs to short-circuit, only ever set state from the observer callback.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? "reveal--visible" : ""} ${className}`.trim()}>
      {children}
    </div>
  );
}
