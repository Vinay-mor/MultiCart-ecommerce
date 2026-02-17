"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  /** Animation variant */
  animation?: "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-in";
  /** Delay in ms */
  delay?: number;
  /** Duration in ms */
  duration?: number;
  /** IntersectionObserver threshold (0-1) */
  threshold?: number;
  /** Whether to animate only once */
  once?: boolean;
  /** HTML tag to render */
  as?: React.ElementType;
}

export const AnimateIn = ({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.15,
  once = true,
  as: Tag = "div",
}: AnimateInProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          el.classList.add("animate-in-visible");
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.classList.remove("animate-in-visible");
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return (
    <Tag
      ref={ref}
      className={cn("animate-in-base", `animate-in-${animation}`, className)}
      style={{
        "--animate-delay": `${delay}ms`,
        "--animate-duration": `${duration}ms`,
      } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
};
