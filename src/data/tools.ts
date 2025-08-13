import {
  CaseSensitive,
  Rows,
  Image,
  FileText,
  Braces,
  Code,
  QrCode,
  Ruler,
  Lock,
  Fingerprint,
  Palette,
  Link2,
  ShieldCheck,
  Type,
  Hash,
  LucideIcon
} from 'lucide-react';

export interface Tool {
  name: string;
  description: string;
  category: 'Text' | 'File' | 'Coding' | 'Everyday' | 'Security';
  tags: string[];
  icon: LucideIcon;
  path: string;
  component: React.ComponentType;
}

export const categories = {
  Text: { color: 'bg-sky-500/10 text-sky-400 border-sky-500/20', icon: Type },
  File: { color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: FileText },
  Coding: { color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', icon: Code },
  Everyday: { color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', icon: Palette },
  Security: { color: 'bg-red-500/10 text-red-400 border-red-500/20', icon: ShieldCheck },
};

// Lazy load components for better performance
const TextCaseConverterPage = React.lazy(() => import('@/pages/tools/TextCaseConverterPage'));
const DuplicateLineRemoverPage = React.lazy(() => import('@/pages/tools/DuplicateLineRemoverPage'));
const ImageToBase64Page = React.lazy(() => import('@/pages/tools/ImageToBase64Page'));
const TextToPdfPage = React.lazy(() => import('@/pages/tools/TextToPdfPage'));
const JsonFormatterPage = React.lazy(() => import('@/pages/tools/JsonFormatterPage'));
const HtmlMinifierPage = React.lazy(() => import('@/pages/tools/HtmlMinifierPage'));
const QrCodeGeneratorPage = React.lazy(() => import('@/pages/tools/QrCodeGeneratorPage'));
const UnitConverterPage = React.lazy(() => import('@/pages/tools/UnitConverterPage'));
const PasswordGeneratorPage = React.lazy(() => import('@/pages/tools/PasswordGeneratorPage'));
const Base64EncoderPage = React.lazy(() => import('@/pages/tools/Base64EncoderPage'));

export const tools: Tool[] = [
  {
    name: 'Text Case Converter',
    description: 'Convert text to uppercase, lowercase, title case, or sentence case.',
    category: 'Text',
    tags: ['text', 'formatting', 'utility'],
    icon: CaseSensitive,
    path: '/tools/text-case-converter',
    component: TextCaseConverterPage,
  },
  {
    name: 'Duplicate Line Remover',
    description: 'Remove duplicate lines from pasted text instantly.',
    category: 'Text',
    tags: ['text', 'cleaner', 'productivity'],
    icon: Rows,
    path: '/tools/duplicate-line-remover',
    component: DuplicateLineRemoverPage,
  },
  {
    name: 'Image to Base64',
    description: 'Convert an uploaded image to a Base64 string.',
    category: 'File',
    tags: ['image', 'coding', 'conversion'],
    icon: Image,
    path: '/tools/image-to-base64',
    component: ImageToBase64Page,
  },
  {
    name: 'Text to PDF Generator',
    description: 'Create a downloadable PDF from typed or pasted text.',
    category: 'File',
    tags: ['pdf', 'document', 'export'],
    icon: FileText,
    path: '/tools/text-to-pdf',
    component: TextToPdfPage,
  },
  {
    name: 'JSON Formatter',
    description: 'Format and validate JSON with syntax highlighting.',
    category: 'Coding',
    tags: ['json', 'coding', 'dev'],
    icon: Braces,
    path: '/tools/json-formatter',
    component: JsonFormatterPage,
  },
  {
    name: 'HTML Minifier',
    description: 'Minify HTML code to reduce its size.',
    category: 'Coding',
    tags: ['html', 'coding', 'optimization'],
    icon: Code,
    path: '/tools/html-minifier',
    component: HtmlMinifierPage,
  },
  {
    name: 'QR Code Generator',
    description: 'Generate a QR code from text or a URL.',
    category: 'Everyday',
    tags: ['qr', 'sharing', 'generation'],
    icon: QrCode,
    path: '/tools/qr-code-generator',
    component: QrCodeGeneratorPage,
  },
  {
    name: 'Unit Converter',
    description: 'Convert between various units of measurement.',
    category: 'Everyday',
    tags: ['measurement', 'conversion', 'utility'],
    icon: Ruler,
    path: '/tools/unit-converter',
    component: UnitConverterPage,
  },
  {
    name: 'Password Generator',
    description: 'Generate secure passwords with customizable rules.',
    category: 'Security',
    tags: ['password', 'security', 'privacy'],
    icon: Lock,
    path: '/tools/password-generator',
    component: PasswordGeneratorPage,
  },
  {
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 strings instantly.',
    category: 'Security',
    tags: ['encoding', 'decoding', 'data'],
    icon: Fingerprint,
    path: '/tools/base64-encoder-decoder',
    component: Base64EncoderPage,
  },
];