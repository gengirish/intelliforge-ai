import { AnimateOnScroll } from "./animate-on-scroll";
import { statBarItems } from "@/lib/constants";
import { portfolioProjectCount } from "@/lib/portfolio";

export function StatBar() {
  const items = statBarItems.map((stat) =>
    stat.label === "AI Products Shipped"
      ? { ...stat, value: `${portfolioProjectCount}+` }
      : stat,
  );

  return (
    <AnimateOnScroll>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
        {items.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold text-white sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500 sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </AnimateOnScroll>
  );
}
