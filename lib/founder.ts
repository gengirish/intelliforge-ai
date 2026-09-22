/**
 * Founder is cited by name and "Founder" title only — credentials, career
 * history, stats, and colleague recommendations are intentionally not
 * surfaced on the site for now.
 */
import { siteConfig } from "./constants";

export const founder = {
  name: "Girish Hiremath",
  title: "Founder",
  email: siteConfig.founderEmail,
  originStory: {
    title: "Why IntelliForge Started",
    paragraphs: [
      "IntelliForge AI started from a pattern we kept seeing: businesses had real problems AI could solve, but adoption stalled for lack of practitioners who could bridge existing systems and modern AI.",
      "IntelliForge AI was founded to be that bridge — democratizing AI for Indian businesses of every size, from solo founders in Tier II cities to enterprise teams in metros. Aligned with the Bharat AI Mission, we ship production AI in weeks, not months.",
    ],
  },
  socialLinks: {
    linkedin: "https://linkedin.com/company/intelliforge-ai",
    github: "https://github.com/gengirish",
    email: `mailto:${siteConfig.founderEmail}`,
  },
};
