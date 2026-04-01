export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: '/gallery/hero-1.jpeg',
    alt: 'Wagholi Highstreet Hero View 1',
    title: 'Prime Location',
    description: 'Strategic positioning on Wagholi Link Road with maximum visibility',
  },
  {
    id: 2,
    src: '/gallery/hero-2.jpeg',
    alt: 'Wagholi Highstreet Hero View 2',
    title: 'Modern Architecture',
    description: 'Future-ready commercial infrastructure designed for growth',
  },
  {
    id: 3,
    src: '/gallery/hero-3.jpeg',
    alt: 'Wagholi Highstreet Hero View 3',
    title: 'Premium Amenities',
    description: 'World-class facilities for businesses and visitors',
  },
  {
    id: 4,
    src: '/gallery/hero-4.jpeg',
    alt: 'Wagholi Highstreet Hero View 4',
    title: 'Connectivity Hub',
    description: 'Seamless access to IT parks, airport, and metro corridors',
  },
  {
    id: 5,
    src: '/gallery/hero-5.jpeg',
    alt: 'Wagholi Highstreet Hero View 5',
    title: 'Investment Opportunity',
    description: 'High ROI potential in Pune\'s fastest-growing commercial corridor',
  },
];
