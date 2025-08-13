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
    headline: 'Forge the Future.',
    subtext: 'StyleLab: Where AI meets artistry. Your next masterpiece awaits.',
    imageUrl: 'https://images.unsplash.com/photo-1634495587994-34935a4a8953?q=80&w=1740&auto=format&fit=crop',
    targetUrl: '#',
    duration: 10,
    status: 'active',
  },
  {
    id: 'ad2',
    headline: 'Engineered for Excellence.',
    subtext: 'BlackVault provides the bedrock for Toollab\'s performance.',
    imageUrl: 'https://images.unsplash.com/photo-1591453089816-0fbb97184582?q=80&w=1740&auto=format&fit=crop',
    targetUrl: '#',
    duration: 12,
    status: 'active',
  },
];