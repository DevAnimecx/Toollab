export interface Ad {
  id: string;
  headline: string;
  subtext: string;
  background: string;
  targetUrl: string;
  duration: number; // in seconds
  status: 'active' | 'inactive';
}

export const ads: Ad[] = [
  {
    id: 'ad1',
    headline: 'Build the Future',
    subtext: 'Harness the power of next-gen development tools.',
    background: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
    targetUrl: '#',
    duration: 10,
    status: 'active',
  },
  {
    id: 'ad2',
    headline: 'Design Redefined',
    subtext: 'Experience seamless creativity with StyleLab.',
    background: 'bg-gradient-to-br from-green-400 to-blue-500',
    targetUrl: '#',
    duration: 12,
    status: 'active',
  },
  {
    id: 'ad3',
    headline: 'Infinite Possibilities',
    subtext: 'Explore a universe of color and design.',
    background: 'bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500',
    targetUrl: '#',
    duration: 11,
    status: 'active',
  },
];