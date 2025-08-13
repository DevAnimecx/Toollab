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
    headline: 'Design Beyond Imagination.',
    subtext: 'StyleLab AI: Your creative co-pilot for stunning visuals.',
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1740&auto=format&fit=crop',
    targetUrl: '#',
    duration: 10,
    status: 'active',
  },
  {
    id: 'ad2',
    headline: 'The Unseen Power.',
    subtext: 'Built on BlackVault. Experience unparalleled speed and security.',
    imageUrl: 'https://images.unsplash.com/photo-1605648916319-48745b549a1b?q=80&w=1674&auto=format&fit=crop',
    targetUrl: '#',
    duration: 12,
    status: 'active',
  },
];