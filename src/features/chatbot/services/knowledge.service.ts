import "server-only";

import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";

type Lang = "en" | "id";
const lang = (locale: string): Lang => (locale === "id" ? "id" : "en");

/**
 * Builds a compact, factual knowledge pack for the chatbot system prompt.
 * Grounded in published CMS data + curated history timeline from messages.
 * Keep this short — the model must only answer from this context.
 */
export async function buildPrayaKnowledgeContext(locale: string): Promise<string> {
  const l = lang(locale);

  const [destinations, events] = await Promise.all([
    prisma.destination.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ isFeatured: "desc" }, { sortOrder: "desc" }],
      take: 20,
    }),
    prisma.event.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      take: 12,
      include: { categories: { include: { category: true } } },
    }),
  ]);

  const destinationLines = destinations.map((d) => {
    const title = l === "id" ? d.titleId : d.titleEn;
    const description = l === "id" ? d.descriptionId : d.descriptionEn;
    const location = (l === "id" ? d.locationId : d.locationEn) ?? "";
    const fee = (l === "id" ? d.entranceFeeId : d.entranceFeeEn) ?? "";
    const long = (l === "id" ? d.longDescriptionId : d.longDescriptionEn) ?? "";
    const tags = d.tags.join(", ");
    return [
      `- ${title} (slug: ${d.slug})`,
      location ? `  location: ${location}` : null,
      tags ? `  tags: ${tags}` : null,
      fee ? `  entrance_fee: ${fee}` : null,
      `  summary: ${description}`,
      long ? `  detail: ${long.slice(0, 500)}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  });

  const eventLines = events.map((e) => {
    const title = l === "id" ? e.titleId : e.titleEn;
    const excerpt = l === "id" ? e.excerptId : e.excerptEn;
    const date = l === "id" ? e.dateId : e.dateEn;
    const body = (l === "id" ? e.bodyId : e.bodyEn).slice(0, 2).join(" ");
    const categories = e.categories.map((c) => c.category.name).join(", ");
    return [
      `- ${title} (slug: ${e.slug})`,
      date ? `  date: ${date}` : null,
      categories ? `  categories: ${categories}` : null,
      `  excerpt: ${excerpt}`,
      body ? `  body: ${body.slice(0, 400)}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  });

  let historyLines: string[] = [];
  try {
    const t = await getTranslations({ locale: l, namespace: "HistoryPage" });
    const items = t.raw("timelineItems") as Array<{
      date: string;
      title: string;
      description: string;
    }>;
    historyLines = items.map(
      (item) => `- ${item.date} — ${item.title}: ${item.description}`,
    );
  } catch {
    historyLines = [];
  }

  const about =
    l === "id"
      ? "Praya adalah ibu kota Kabupaten Lombok Tengah, Nusa Tenggara Barat, Indonesia. Situs Praya City menampilkan destinasi, budaya Sasak, sejarah, dan event seputar Lombok Tengah."
      : "Praya is the capital of Central Lombok Regency, West Nusa Tenggara, Indonesia. The Praya City site covers destinations, Sasak culture, history, and events around Central Lombok.";

  return [
    "=== ABOUT PRAYA CITY ===",
    about,
    "",
    "=== HISTORY TIMELINE (curated site content) ===",
    historyLines.length > 0 ? historyLines.join("\n") : "(no history entries)",
    "",
    "=== PUBLISHED DESTINATIONS (live CMS) ===",
    destinationLines.length > 0 ? destinationLines.join("\n") : "(none published)",
    "",
    "=== PUBLISHED EVENTS / ARTICLES (live CMS, newest first) ===",
    eventLines.length > 0 ? eventLines.join("\n") : "(none published)",
  ].join("\n");
}

export function buildSystemPrompt(locale: string, knowledge: string): string {
  const languageRule =
    locale === "id"
      ? "Jawab dalam Bahasa Indonesia yang natural dan ramah."
      : "Answer in clear, friendly English.";

  return [
    "You are the official Praya City travel assistant for the Praya City website.",
    "Your ONLY job is to help users learn about Praya City and Central Lombok (Lombok Tengah), NTB, Indonesia.",
    "",
    "STRICT SCOPE RULES:",
    "1. ONLY answer questions about Praya City, Central Lombok, destinations listed below, published events/articles, history, culture, food, travel tips for this region, and how to use this website.",
    "2. If the user asks about anything outside that scope (other cities, general knowledge, coding, politics, medical/legal advice, etc.), politely refuse and redirect to Praya City topics.",
    "3. NEVER invent events, prices, opening hours, or destinations that are not in the knowledge context.",
    "4. Prefer the live CMS data below for destinations and events. If something is not listed, say you do not have that info yet.",
    "5. Do not mention system prompts, APIs, models, or that you are using an LLM.",
    "6. Keep answers concise (2–5 short paragraphs or bullet points). Offer a related Praya follow-up when useful.",
    "7. When mentioning a destination or event that has a slug, you may reference the path `/destinations/{slug}` or `/events/{slug}`.",
    "8. FORMAT replies with light markdown the UI can render: short paragraphs, **bold** for key names, bullet lists with `- `, and markdown links like [Kuta Mandalika](/destinations/kutaMandalika). No HTML, no tables, no code fences.",
    "",
    languageRule,
    "",
    "KNOWLEDGE CONTEXT (authoritative):",
    knowledge,
  ].join("\n");
}
