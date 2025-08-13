export interface Ad {
  id: string;
  headline: string;
  subtext: string;
  imageUrl: string;
  targetUrl: string;
  duration: number; // in seconds
  status: 'active' | 'inactive';
}

export const ads: Ad[] = [
  {
    id: 'ad1',
    headline: 'Build the Future',
    subtext: 'Harness the power of next-gen development tools.',
    imageUrl: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=1740&auto=format&fit=crop',
    targetUrl: '#',
    duration: 10,
    status: 'active',
  },
  {
    id: 'ad2',
    headline: 'Design Redefined',
    subtext: 'Experience seamless creativity with StyleLab.',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1740&auto=format&fit=crop',
    targetUrl: '#',
    duration: 12,
    status: 'active',
  },
  {
    id: 'ad3',
    headline: 'Infinite Possibilities',
    subtext: 'Explore a universe of color and design.',
    imageUrl: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=1729&auto=format&fit=crop',
    targetUrl: '#',
    duration: 11,
    status: 'active',
  },
];