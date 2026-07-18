/** Static media + real blog article slugs (seeded into Event table). */
export const CULTURE_TRADITIONS = [
  {
    imageSrc: '/culture/warisan-nusa-culture-1.webp',
    slug: 'bau-nyale-when-the-sea-comes-alive',
  },
  {
    imageSrc: '/culture/warisan-nusa-culture-2.webp',
    slug: 'peresean-where-courage-is-tested',
  },
  {
    imageSrc: '/culture/warisan-nusa-culture-3.webp',
    slug: 'gendang-beleq-the-pulse-of-the-island',
  },
  {
    imageSrc: '/culture/warisan-nusa-culture-4.webp',
    slug: 'sade-village-weaving-threads-of-time',
  },
  {
    imageSrc: '/culture/warisan-nusa-culture-5.webp',
    slug: 'alang-alang-the-sacred-granary',
  },
  {
    imageSrc: '/culture/warisan-nusa-culture-6.webp',
    slug: 'waktu-telu-the-ancient-syncretism',
  },
] as const;

/** @deprecated use CULTURE_TRADITIONS */
export const CULTURE_TRADITIONS_IMAGES = CULTURE_TRADITIONS.map((t) => t.imageSrc);
