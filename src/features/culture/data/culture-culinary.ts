import type { CulinaryItem } from '../types';

export const CULTURE_CULINARY_ITEMS: Omit<CulinaryItem, 'title'>[] = [
  {
    id: 'item1',
    // The file named 'ayam-taliwang.webp' actually contains the Nasi Balap Puyung image
    imageSrc: '/culture/ayam-taliwang.webp',
    aspectClass: 'aspect-auto', 
  },
  {
    id: 'item2',
    // The actual Sate Bulayak image is missing, using satabulayak.webp (Sup Iga) as placeholder
    imageSrc: '/culture/satabulayak.webp',
    aspectClass: 'aspect-auto', 
  },
  {
    id: 'item3',
    // The file named 'nasi-balap-kayung.webp' actually contains the Ayam Taliwang image
    imageSrc: '/culture/nasi-balap-kayung.webp',
    aspectClass: 'aspect-auto', 
  },
  {
    id: 'item4',
    // The file named 'satabulayak.webp' actually contains the Sup Iga Bebalung image
    imageSrc: '/culture/satabulayak.webp',
    aspectClass: 'aspect-auto', 
  },
];
