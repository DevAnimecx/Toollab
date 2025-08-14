import { LucideIcon } from 'lucide-react';
import { categories } from './tools';

export type ToolStatus = 'Planned' | 'In Development' | 'Testing' | 'Finalizing';
export type ToolPriority = 'High' | 'Medium' | 'Low';

export interface UpcomingTool {
  id: string;
  name: string;
  description: string;
  category: keyof typeof categories;
  tags: string[];
  status: ToolStatus;
  expectedVersion: string; // e.g., "v2.1.0" or "Q4 2025"
  priority: ToolPriority;
}

export const upcomingToolsData: UpcomingTool[] = [
  // Next Minor Update
  { id: 'ut001', name: 'AI Resume Builder', description: 'Create professional resumes with AI-powered suggestions and templates.', category: 'Everyday Tools', tags: ['ai', 'resume', 'cv'], status: 'Finalizing', expectedVersion: 'v2.1.0', priority: 'High' },
  { id: 'ut002', name: 'Image Background Remover', description: 'Instantly remove the background from any image with a single click.', category: 'File Tools', tags: ['image', 'ai', 'remove bg'], status: 'Testing', expectedVersion: 'v2.1.0', priority: 'High' },
  { id: 'ut003', name: 'Video to GIF Converter', description: 'Turn short video clips into high-quality animated GIFs.', category: 'File Tools', tags: ['video', 'gif', 'converter'], status: 'In Development', expectedVersion: 'v2.1.0', priority: 'Medium' },
  { id: 'ut004', name: 'Image Compressor', description: 'Reduce image file sizes without significant quality loss.', category: 'File Tools', tags: ['image', 'compress', 'optimize'], status: 'In Development', expectedVersion: 'v2.1.1', priority: 'High' },

  // Mid-Term
  { id: 'ut005', name: 'PDF Merger', description: 'Combine multiple PDF files into a single document.', category: 'File Tools', tags: ['pdf', 'merge', 'combine'], status: 'Planned', expectedVersion: 'Q4 2025', priority: 'High' },
  { id: 'ut006', name: 'Online Whiteboard', description: 'A collaborative whiteboard for brainstorming and diagrams.', category: 'Everyday Tools', tags: ['collaboration', 'whiteboard'], status: 'Planned', expectedVersion: 'Q4 2025', priority: 'Medium' },
  { id: 'ut007', name: 'SQL Formatter', description: 'Beautify and format your SQL queries for readability.', category: 'Coding Tools', tags: ['sql', 'database', 'formatter'], status: 'Planned', expectedVersion: 'Q1 2026', priority: 'Medium' },

  // Long-Term
  { id: 'ut008', name: 'Audio Editor', description: 'A basic audio editor to trim, merge, and apply effects to audio files.', category: 'File Tools', tags: ['audio', 'editor', 'sound'], status: 'Planned', expectedVersion: 'v2.2.0', priority: 'Low' },
  { id: 'ut009', name: 'Live Markdown Editor', description: 'A split-screen editor to write Markdown and see the live preview.', category: 'Coding Tools', tags: ['markdown', 'editor', 'writing'], status: 'Planned', expectedVersion: 'v2.2.0', priority: 'Medium' },
  { id: 'ut010', name: 'Screen Recorder', description: 'Record your screen, with options for including microphone and system audio.', category: 'Everyday Tools', tags: ['screen record', 'video'], status: 'Planned', expectedVersion: 'v2.3.0', priority: 'High' },
];