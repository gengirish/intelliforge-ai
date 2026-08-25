"use client";

import { useEffect, useRef, type CSSProperties } from "react";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const directionMap = {
  up: { x: "0", y: "40px" },
  down: { x: "0", y: "-40px" },
  left: { x: "40px", y: "0" },
  right: { x: "-40px", y: "0" },
};

export function AnimateOnScroll({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Anything already in view has been painted — hiding it now would cause a
    // flash and, for the LCP element, a needless delay. Leave it alone.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.classList.add("reveal-pending");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.remove("reveal-pending");
        el.classList.add("reveal-play");
        observer.disconnect();
      },
      { rootMargin: "-50px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const offset = directionMap[direction];

  return (
    <div
      ref={ref}
      className={className}
      style={
        {
          "--reveal-x": offset.x,
          "--reveal-y": offset.y,
          ...(delay ? { "--reveal-delay": `${delay}s` } : {}),
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
