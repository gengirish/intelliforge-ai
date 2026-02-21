import { ExternalLink } from "lucide-react";
import { AnimateOnScroll } from "./animate-on-scroll";

interface MissionBadgeProps {
  size?: "sm" | "lg";
}

export function MissionBadge({ size = "sm" }: MissionBadgeProps) {
  if (size === "lg") {
    return (
      <AnimateOnScroll>
        <div className="mx-auto max-w-3xl rounded-2xl border border-cyan/20 bg-gradient-to-r from-cyan/10 via-indigo/5 to-violet/10 p-8 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-cyan">
            Our Commitment
          </p>
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            Aligned with the Bharat AI Mission
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-400">
            Democratizing AI for India — building an inclusive AI ecosystem that empowers
            communities, safeguards societal interests, and makes AI accessible to all. Part
            of India&apos;s &#8377;10,372 crore IndiaAI Mission initiative.
          </p>
          <a
            href="https://bharataimission.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cyan transition-colors hover:text-cyan-light"
          >
            Learn more about Bharat AI Mission
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </AnimateOnScroll>
    );
  }

  return (
    <a
      href="https://bharataimission.org/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 text-xs font-medium text-cyan transition-colors hover:bg-cyan/20"
    >
      Aligned with Bharat AI Mission
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}
