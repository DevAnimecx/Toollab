import { Tool } from './tools';

export type UpdateCategory = 'New' | 'Improved' | 'Fixed' | 'Security';

export interface Update {
  category: UpdateCategory;
  title: string;
  description: string;
  keywords?: string[];
  toolPath?: string;
}

export interface ChangelogEntry {
  id: string;
  version: string;
  releaseDate: string;
  author: string;
  credits: string[];
  seoTitle: string;
  metaDescription: string;
  intro: string;
  updates: Update[];
  cta: {
    text: string;
    href: string;
  };
}

export const changelogData: ChangelogEntry[] = [
  {
    id: 'v2.0.0',
    version: 'Toollab v2.0.0',
    releaseDate: 'August 12, 2025',
    author: 'Animecx (Founder & CEO)',
    credits: [
      'Made by NexoBytes Development',
      'Powered by OpenBytes Technology',
      'In collaboration with BlackVault Inc.'
    ],
    seoTitle: 'Toollab v2.0.0 Release Notes | The Next Generation of Tools',
    metaDescription: 'Introducing Toollab 2: A major redesign with a new premium theme, 70+ tools, a new admin panel, and the privacy-first BlackVault Ads system.',
    intro: 'Welcome to the next chapter of Toollab. This major release introduces a complete redesign, focusing on a premium, elegant user experience. With a new glassmorphic dark theme, faster performance, and over 70 tools at launch, Toollab 2 is our most ambitious update yet.',
    updates: [
      { category: 'New', title: 'Complete Redesign', description: 'Introduced a new premium dark blue & light blue theme with glassmorphic backgrounds and blur effects for a modern, elegant feel.' },
      { category: 'New', title: 'Cinematic Logo', description: 'A new animated Toollab logo on the homepage and loader for a more professional branding.' },
      { category: 'New', title: 'Admin Panel', description: 'A secure, behind-the-scenes admin panel for managing site content and features.' },
      { category: 'New', title: 'BlackVault Ads System', description: 'Launched our custom, privacy-first advertising system. Features a cinematic sliding promotion block and a "Why this ad?" modal.' },
      { category: 'New', title: '70+ Tools at Launch', description: 'The platform now includes a comprehensive suite of over 70 tools, including Text Utilities, File Tools, Coding Tools, and more.' },
      { category: 'Improved', title: 'Enhanced Search', description: 'The search functionality now includes better recommendations and faster results.' },
      { category: 'Improved', title: 'Tool Popularity Badges', description: 'Tools are now highlighted with "New", "Hot", and "Popular" badges to guide users.' },
      { category: 'Improved', title: 'Multi-Theme Support', description: 'Users can now choose between multiple font themes for a personalized experience.' },
      { category: 'Improved', title: 'Performance Boost', description: 'Optimized asset loading and component rendering, resulting in significantly faster load times across the site.' },
      { category: 'Fixed', title: 'Mobile Responsiveness', description: 'Overhauled the mobile layout for a more consistent and user-friendly experience on all devices.' },
    ],
    cta: { text: 'Explore the latest version of Toollab now', href: '/tools' }
  },
  {
    id: 'v2.0.1',
    version: 'Toollab v2.0.1',
    releaseDate: 'August 14, 2025',
    author: 'Animecx (Founder & CEO)',
    credits: [
      'Made by NexoBytes Development',
      'Powered by OpenBytes Technology',
      'In collaboration with BlackVault Inc.'
    ],
    seoTitle: 'Toollab v2.0.1 | AI Resume Builder & Background Remover',
    metaDescription: 'Toollab v2.0.1 is here! Featuring the new AI Resume Builder, Image Background Remover, Video to GIF Converter, and major performance improvements.',
    intro: 'This update brings powerful new AI-driven tools to the Toollab suite, alongside significant performance optimizations and bug fixes to enhance your productivity.',
    updates: [
      { category: 'New', title: 'AI Resume Builder', description: 'Create professional, tailored resumes in minutes with our new AI-powered tool.', keywords: ['ai resume builder', 'cv maker', 'resume creator'] },
      { category: 'New', title: 'Image Background Remover', description: 'Instantly remove the background from any image with a single click.', keywords: ['background remover', 'remove bg', 'image editing'] },
      { category: 'New', title: 'Video to GIF Converter', description: 'Turn short video clips into high-quality animated GIFs.', keywords: ['video to gif', 'gif maker', 'convert video'] },
      { category: 'Improved', title: 'Tool Loading Speed', description: 'Optimized core tool loading logic, resulting in an average performance increase of 35%.' },
      { category: 'Improved', title: 'Cinematic Logo Animation', description: 'Refined the homepage logo animation for a smoother, more impressive effect.' },
      { category: 'Fixed', title: 'PDF Merge on Large Files', description: 'Resolved an issue where merging multiple large PDF files could fail.' },
      { category: 'Fixed', title: 'Font Rendering in Safari', description: 'Corrected a font rendering bug that affected users on the Safari browser.' },
      { category: 'Security', title: 'Admin Panel Authentication', description: 'Strengthened authentication protocols for the admin panel to enhance security.' },
    ],
    cta: { text: 'Try the new tools', href: '/tools' }
  },
];