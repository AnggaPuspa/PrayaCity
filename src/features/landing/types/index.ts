// Domain types for the landing page content.

export interface EventItem {
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  /** Grid placement classes for the masonry layout. */
  className: string;
}

export interface Destination {
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface DiscoverItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface DiscoverHeader {
  title: string;
  intro: string;
}
