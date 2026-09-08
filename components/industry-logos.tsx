import {
  Landmark,
  HeartPulse,
  Radio,
  Monitor,
  Cpu,
  ShoppingCart,
} from "lucide-react";
import { AnimateOnScroll } from "./animate-on-scroll";

const industries = [
  { name: "Banking & Finance", icon: Landmark },
  { name: "Pharma & Healthcare", icon: HeartPulse },
  { name: "Telecom", icon: Radio },
  { name: "Enterprise SaaS", icon: Monitor },
  { name: "IoT", icon: Cpu },
  { name: "E-commerce", icon: ShoppingCart },
];

export function IndustryLogos() {
  return (
    <AnimateOnScroll>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-subtle">
          Trusted Across Industries
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.name}
                className="flex items-center gap-2 text-subtle transition-colors hover:text-body"
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{industry.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </AnimateOnScroll>
  );
}
