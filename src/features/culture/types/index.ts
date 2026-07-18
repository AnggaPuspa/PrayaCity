export interface CultureHeroData {
  backgroundPatternImage: string;
  highlightImage: string;
  highlightImageAlt: string;
}

export interface Tradition {
  tag: string;
  title: string;
  description: string;
  imageSrc: string;
  /** Blog article slug → /events/[slug] */
  href: string;
}

export interface CulinaryItem {
  id: string;
  title: string;
  imageSrc: string;
  aspectClass: string;
  /** Blog article slug → /events/[slug] */
  href: string;
}
