import { AnimateOnScroll } from "./animate-on-scroll";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeading({
  label,
  title,
  description,
  centered = true,
}: SectionHeadingProps) {
  return (
    <AnimateOnScroll className={`mb-16 ${centered ? "text-center" : ""}`}>
      {label && (
        <div
          className={`mb-4 flex items-center gap-2 ${centered ? "justify-center" : ""}`}
        >
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-forge"
            aria-hidden="true"
          />
          <span className="border-l-2 border-forge/50 pl-3 font-mono text-xs font-medium uppercase tracking-widest text-gray-400">
            {label}
          </span>
        </div>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
          {description}
        </p>
      )}
    </AnimateOnScroll>
  );
}
