import { AnimateOnScroll } from "./animate-on-scroll";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  /**
   * Heading level to render. Every page needs exactly one `h1` for crawlers and
   * LLM extractors that use it as the document-title anchor — pass `as="h1"` on
   * the page's primary heading and leave the rest at the `h2` default.
   */
  as?: "h1" | "h2";
}

export function SectionHeading({
  label,
  title,
  description,
  centered = true,
  as: Heading = "h2",
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
          <span className="border-l-2 border-forge/50 pl-3 font-mono text-xs font-medium uppercase tracking-widest text-muted">
            {label}
          </span>
        </div>
      )}
      <Heading className="font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl lg:text-5xl">
        {title}
      </Heading>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          {description}
        </p>
      )}
    </AnimateOnScroll>
  );
}
