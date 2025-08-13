import React from 'react';
import {
  CaseSensitive, Rows, Image, FileText, Braces, Code, QrCode, Ruler, Lock, Fingerprint,
  Palette, Link2, ShieldCheck, Type, Hash, LucideIcon, GitCompareArrows, Shuffle, FileImage,
  FilePlus2, FileJson2, FileCode2, Pipette, CalendarDays, KeyRound, FileLock2
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
const TextDiffCheckerPage = React.lazy(() => import('@/pages/tools/TextDiffCheckerPage'));
const TextScramblerPage = React.lazy(() => import('@/pages/tools/TextScramblerPage'));
const PdfToImagesPage = React.lazy(() => import('@/pages/tools/PdfToImagesPage'));
const ImageToPdfPage = React.lazy(() => import('@/pages/tools/ImageToPdfPage'));
const JsBeautifierPage = React.lazy(() => import('@/pages/tools/JsBeautifierPage'));
const MarkdownToHtmlPage = React.lazy(() => import('@/pages/tools/MarkdownToHtmlPage'));
const ImageColorPickerPage = React.lazy(() => import('@/pages/tools/ImageColorPickerPage'));
const DateDifferencePage = React.lazy(() => import('@/pages/tools/DateDifferencePage'));
const CaesarCipherPage = React.lazy(() => import('@/pages/tools/CaesarCipherPage'));
const FileEncryptionPage = React.lazy(() => import('@/pages/tools/FileEncryptionPage'));


export const tools: Tool[] = [
  // Batch 1
  { name: 'Text Case Converter', description: 'Convert text to uppercase, lowercase, title case, or sentence case.', category: 'Text', tags: ['text', 'formatting', 'utility'], icon: CaseSensitive, path: '/tools/text-case-converter', component: TextCaseConverterPage },
  { name: 'Duplicate Line Remover', description: 'Remove duplicate lines from pasted text instantly.', category: 'Text', tags: ['text', 'cleaner', 'productivity'], icon: Rows, path: '/tools/duplicate-line-remover', component: DuplicateLineRemoverPage },
  { name: 'Image to Base64', description: 'Convert an uploaded image to a Base64 string.', category: 'File', tags: ['image', 'coding', 'conversion'], icon: Image, path: '/tools/image-to-base64', component: ImageToBase64Page },
  { name: 'Text to PDF Generator', description: 'Create a downloadable PDF from typed or pasted text.', category: 'File', tags: ['pdf', 'document', 'export'], icon: FileText, path: '/tools/text-to-pdf', component: TextToPdfPage },
  { name: 'JSON Formatter', description: 'Format and validate JSON with syntax highlighting.', category: 'Coding', tags: ['json', 'coding', 'dev'], icon: Braces, path: '/tools/json-formatter', component: JsonFormatterPage },
  { name: 'HTML Minifier', description: 'Minify HTML code to reduce its size.', category: 'Coding', tags: ['html', 'coding', 'optimization'], icon: Code, path: '/tools/html-minifier', component: HtmlMinifierPage },
  { name: 'QR Code Generator', description: 'Generate a QR code from text or a URL.', category: 'Everyday', tags: ['qr', 'sharing', 'generation'], icon: QrCode, path: '/tools/qr-code-generator', component: QrCodeGeneratorPage },
  { name: 'Unit Converter', description: 'Convert between various units of measurement.', category: 'Everyday', tags: ['measurement', 'conversion', 'utility'], icon: Ruler, path: '/tools/unit-converter', component: UnitConverterPage },
  { name: 'Password Generator', description: 'Generate secure passwords with customizable rules.', category: 'Security', tags: ['password', 'security', 'privacy'], icon: Lock, path: '/tools/password-generator', component: PasswordGeneratorPage },
  { name: 'Base64 Encoder/Decoder', description: 'Encode and decode Base64 strings instantly.', category: 'Security', tags: ['encoding', 'decoding', 'data'], icon: Fingerprint, path: '/tools/base64-encoder-decoder', component: Base64EncoderPage },
  
  // Batch 2
  { name: 'Text Difference Checker', description: 'Compare two text blocks and highlight differences.', category: 'Text', tags: ['text', 'comparison', 'utility', 'diff'], icon: GitCompareArrows, path: '/tools/text-diff-checker', component: TextDiffCheckerPage },
  { name: 'Text Scrambler', description: 'Scramble the order of letters or words in your text.', category: 'Text', tags: ['text', 'fun', 'random', 'shuffle'], icon: Shuffle, path: '/tools/text-scrambler', component: TextScramblerPage },
  { name: 'PDF to Images Converter', description: 'Convert each page of a PDF into PNG or JPEG images.', category: 'File', tags: ['pdf', 'image', 'conversion', 'export'], icon: FileImage, path: '/tools/pdf-to-images', component: PdfToImagesPage },
  { name: 'Image to PDF Converter', description: 'Merge multiple images into a single, downloadable PDF file.', category: 'File', tags: ['image', 'pdf', 'export', 'merge'], icon: FilePlus2, path: '/tools/image-to-pdf', component: ImageToPdfPage },
  { name: 'JavaScript Beautifier', description: 'Format and beautify your JavaScript code for readability.', category: 'Coding', tags: ['js', 'coding', 'formatting', 'beautify'], icon: FileJson2, path: '/tools/js-beautifier', component: JsBeautifierPage },
  { name: 'Markdown to HTML Converter', description: 'Convert Markdown text into clean, semantic HTML.', category: 'Coding', tags: ['markdown', 'html', 'conversion', 'dev'], icon: FileCode2, path: '/tools/markdown-to-html', component: MarkdownToHtmlPage },
  { name: 'Image Color Picker', description: 'Upload an image and pick any color to get its code.', category: 'Everyday', tags: ['image', 'color', 'utility', 'picker'], icon: Pipette, path: '/tools/image-color-picker', component: ImageColorPickerPage },
  { name: 'Date Difference Calculator', description: 'Calculate the duration between two dates.', category: 'Everyday', tags: ['date', 'time', 'calculation', 'duration'], icon: CalendarDays, path: '/tools/date-difference-calculator', component: DateDifferencePage },
  { name: 'Caesar Cipher', description: 'Encode and decode text using the Caesar cipher.', category: 'Security', tags: ['cipher', 'encryption', 'text', 'security'], icon: KeyRound, path: '/tools/caesar-cipher', component: CaesarCipherPage },
  { name: 'File Encryption (AES)', description: 'Encrypt and decrypt files securely in your browser.', category: 'Security', tags: ['file', 'security', 'encryption', 'aes'], icon: FileLock2, path: '/tools/file-encryption', component: FileEncryptionPage },
];