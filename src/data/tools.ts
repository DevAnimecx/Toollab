import React from 'react';
import {
  CaseSensitive, Rows, Image, FileText, Braces, Code, QrCode, Ruler, Lock, Fingerprint,
  Palette, Link2, ShieldCheck, Type, Hash, LucideIcon, GitCompareArrows, Shuffle, FileImage,
  FilePlus2, FileJson2, FileCode2, Pipette, CalendarDays, KeyRound, FileLock2,
  Combine, BarChart, FileScissor, FileXml, Table2, Users, Globe, RotateCcw, FileSearch2,
  Columns, Key, Highlighter, Scale, Eraser, Stamp, ShieldOff, ArrowLeftRight, Calculator,
  Regex, Table, Landmark, Banknote, FileX2
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
const TextMergePage = React.lazy(() => import('@/pages/tools/TextMergePage'));
const TextStatisticsPage = React.lazy(() => import('@/pages/tools/TextStatisticsPage'));
const PdfSplitterPage = React.lazy(() => import('@/pages/tools/PdfSplitterPage'));
const XmlFormatterPage = React.lazy(() => import('@/pages/tools/XmlFormatterPage'));
const CsvToJsonPage = React.lazy(() => import('@/pages/tools/CsvToJsonPage'));
const RandomNameGeneratorPage = React.lazy(() => import('@/pages/tools/RandomNameGeneratorPage'));
const TimeZoneConverterPage = React.lazy(() => import('@/pages/tools/TimeZoneConverterPage'));
const Rot13Page = React.lazy(() => import('@/pages/tools/Rot13Page'));
const ImageMetadataViewerPage = React.lazy(() => import('@/pages/tools/ImageMetadataViewerPage'));
const TextColumnSplitterPage = React.lazy(() => import('@/pages/tools/TextColumnSplitterPage'));
const KeywordExtractorPage = React.lazy(() => import('@/pages/tools/KeywordExtractorPage'));
const CodeSyntaxHighlighterPage = React.lazy(() => import('@/pages/tools/CodeSyntaxHighlighterPage'));
const RandomNumberGeneratorPage = React.lazy(() => import('@/pages/tools/RandomNumberGeneratorPage'));
const BmiCalculatorPage = React.lazy(() => import('@/pages/tools/BmiCalculatorPage'));
const TextRedactorPage = React.lazy(() => import('@/pages/tools/TextRedactorPage'));
const PdfWatermarkAdderPage = React.lazy(() => import('@/pages/tools/PdfWatermarkAdderPage'));
const FileShredderPage = React.lazy(() => import('@/pages/tools/FileShredderPage'));
const PalindromeCheckerPage = React.lazy(() => import('@/pages/tools/PalindromeCheckerPage'));
const AdvancedWordCounterPage = React.lazy(() => import('@/pages/tools/AdvancedWordCounterPage'));
const RegexTesterPage = React.lazy(() => import('@/pages/tools/RegexTesterPage'));
const HtmlTableGeneratorPage = React.lazy(() => import('@/pages/tools/HtmlTableGeneratorPage'));
const CurrencyConverterPage = React.lazy(() => import('@/pages/tools/CurrencyConverterPage'));
const LoanCalculatorPage = React.lazy(() => import('@/pages/tools/LoanCalculatorPage'));
const ExifRemoverPage = React.lazy(() => import('@/pages/tools/ExifRemoverPage'));


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
  { name: 'Secure Password Generator', description: 'Generate strong, secure passwords with customizable rules.', category: 'Security', tags: ['password', 'security', 'privacy'], icon: Lock, path: '/tools/password-generator', component: PasswordGeneratorPage },
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

  // Batch 3
  { name: 'Text Merge Tool', description: 'Merge multiple text blocks into one with custom separators.', category: 'Text', tags: ['text', 'merge', 'utility', 'join'], icon: Combine, path: '/tools/text-merge', component: TextMergePage },
  { name: 'Text Statistics Analyzer', description: 'Show detailed stats like word count, reading time, and more.', category: 'Text', tags: ['text', 'analysis', 'productivity', 'stats'], icon: BarChart, path: '/tools/text-statistics', component: TextStatisticsPage },
  { name: 'PDF Splitter', description: 'Split a PDF into separate files by page range.', category: 'File', tags: ['pdf', 'split', 'utility', 'organize'], icon: FileScissor, path: '/tools/pdf-splitter', component: PdfSplitterPage },
  { name: 'XML Formatter & Validator', description: 'Format, beautify, and validate XML code.', category: 'Coding', tags: ['xml', 'coding', 'dev', 'formatter'], icon: FileXml, path: '/tools/xml-formatter', component: XmlFormatterPage },
  { name: 'CSV to JSON Converter', description: 'Convert CSV data to JSON format with multiple options.', category: 'Coding', tags: ['csv', 'json', 'conversion', 'data'], icon: Table2, path: '/tools/csv-to-json', component: CsvToJsonPage },
  { name: 'Random Name Generator', description: 'Generate random names for various purposes.', category: 'Everyday', tags: ['random', 'name', 'utility', 'generator'], icon: Users, path: '/tools/random-name-generator', component: RandomNameGeneratorPage },
  { name: 'Time Zone Converter', description: 'Convert time between different time zones.', category: 'Everyday', tags: ['time', 'date', 'conversion', 'timezone'], icon: Globe, path: '/tools/time-zone-converter', component: TimeZoneConverterPage },
  { name: 'ROT13 Encoder/Decoder', description: 'Encode or decode text using the ROT13 substitution cipher.', category: 'Security', tags: ['cipher', 'encoding', 'text', 'rot13'], icon: RotateCcw, path: '/tools/rot13-encoder', component: Rot13Page },
  { name: 'Image Metadata Viewer', description: 'Extract and view EXIF metadata from images.', category: 'Security', tags: ['image', 'metadata', 'privacy', 'exif'], icon: FileSearch2, path: '/tools/image-metadata-viewer', component: ImageMetadataViewerPage },

  // Batch 4
  { name: 'Text Column Splitter', description: 'Split text into multiple columns based on a delimiter.', category: 'Text', tags: ['text', 'formatting', 'utility', 'columns'], icon: Columns, path: '/tools/text-column-splitter', component: TextColumnSplitterPage },
  { name: 'Keyword Extractor', description: 'Extract the most common keywords from text.', category: 'Text', tags: ['text', 'seo', 'analysis', 'keywords'], icon: Key, path: '/tools/keyword-extractor', component: KeywordExtractorPage },
  { name: 'Code Syntax Highlighter', description: 'Apply syntax highlighting to code snippets.', category: 'Coding', tags: ['coding', 'syntax', 'formatting', 'dev'], icon: Highlighter, path: '/tools/code-syntax-highlighter', component: CodeSyntaxHighlighterPage },
  { name: 'Random Number Generator', description: 'Generate random numbers within a specified range.', category: 'Everyday', tags: ['random', 'utility', 'math', 'number'], icon: Hash, path: '/tools/random-number-generator', component: RandomNumberGeneratorPage },
  { name: 'BMI Calculator', description: 'Calculate Body Mass Index (BMI) using metric or imperial units.', category: 'Everyday', tags: ['health', 'fitness', 'calculation', 'bmi'], icon: Scale, path: '/tools/bmi-calculator', component: BmiCalculatorPage },
  { name: 'Text Redactor', description: 'Black out or blur sensitive words and phrases in text.', category: 'Security', tags: ['privacy', 'text', 'editing', 'redact'], icon: Eraser, path: '/tools/text-redactor', component: TextRedactorPage },
  { name: 'PDF Watermark Adder', description: 'Add a text or image watermark to your PDF files.', category: 'File', tags: ['pdf', 'document', 'branding', 'watermark'], icon: Stamp, path: '/tools/pdf-watermark-adder', component: PdfWatermarkAdderPage },
  { name: 'File Shredder (Simulation)', description: 'Securely overwrite a file\'s data in-memory before discarding.', category: 'Security', tags: ['file', 'security', 'privacy', 'delete'], icon: ShieldOff, path: '/tools/file-shredder', component: FileShredderPage },

  // Batch 5
  { name: 'Palindrome Checker', description: 'Check if a word or sentence is a palindrome.', category: 'Text', tags: ['text', 'fun', 'utility', 'palindrome'], icon: ArrowLeftRight, path: '/tools/palindrome-checker', component: PalindromeCheckerPage },
  { name: 'Advanced Word Counter', description: 'Get detailed statistics about your text, live.', category: 'Text', tags: ['text', 'writing', 'stats', 'counter'], icon: Calculator, path: '/tools/advanced-word-counter', component: AdvancedWordCounterPage },
  { name: 'Regex Tester', description: 'Build and test Regular Expressions in real-time.', category: 'Coding', tags: ['regex', 'coding', 'search', 'dev'], icon: Regex, path: '/tools/regex-tester', component: RegexTesterPage },
  { name: 'HTML Table Generator', description: 'Generate HTML tables from structured data or settings.', category: 'Coding', tags: ['html', 'table', 'web', 'generator'], icon: Table, path: '/tools/html-table-generator', component: HtmlTableGeneratorPage },
  { name: 'Currency Converter', description: 'Convert between currencies using static rates.', category: 'Everyday', tags: ['finance', 'currency', 'calculator', 'money'], icon: Landmark, path: '/tools/currency-converter', component: CurrencyConverterPage },
  { name: 'Loan Calculator', description: 'Calculate loan payments and total interest.', category: 'Everyday', tags: ['finance', 'loan', 'calculator', 'interest'], icon: Banknote, path: '/tools/loan-calculator', component: LoanCalculatorPage },
  { name: 'EXIF Metadata Remover', description: 'Remove EXIF metadata from images to protect your privacy.', category: 'Security', tags: ['image', 'privacy', 'security', 'exif'], icon: FileX2, path: '/tools/exif-remover', component: ExifRemoverPage },
];