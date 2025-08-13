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
    headline: 'Unleash Your Creativity',
    subtext: 'Discover StyleLab - The AI-powered design partner.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=1740&auto=format&fit=crop',
    targetUrl: '#',
    duration: 10,
    status: 'active',
  },
  {
    id: 'ad2',
    headline: 'Powered by BlackVault',
    subtext: 'Secure, Fast, and Reliable Infrastructure.',
    imageUrl: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1674&auto=format&fit=crop',
    targetUrl: '#',
    duration: 12,
    status: 'active',
  },
];