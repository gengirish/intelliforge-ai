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
        <span className="mb-3 inline-block rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan">
          {label}
        </span>
      )}
      <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
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
