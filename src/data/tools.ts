import React from 'react';
import {
  CaseSensitive, Rows, Image, FileText, Braces, Code, QrCode, Ruler, Lock, Fingerprint,
  Palette, LucideIcon, GitCompareArrows, Shuffle, FileImage,
  FilePlus2, FileJson2, FileCode2, Pipette, CalendarDays, KeyRound, FileLock2,
  Combine, BarChart, Scissors, Table2, Users, Globe, RotateCcw, FileSearch2,
  Columns, Key, Highlighter, Scale, Eraser, Stamp, ShieldOff, ArrowLeftRight, Calculator,
  Regex, Table, Landmark, Banknote, FileX2, Hash
} from 'lucide-react';

export interface Tool {
  name: string;
  description: string;
  category: 'Text Utilities' | 'File Tools' | 'Coding Tools' | 'Everyday Tools' | 'Security Tools';
  tags: string[];
  icon: LucideIcon;
  path: string;
  component: React.ComponentType;
  accentColor: string;
  gradient: readonly [string, string];
  popularity?: 'new' | 'hot' | 'popular';
}

export const categories = {
  'Text Utilities': { color: '#4DA8DA', icon: CaseSensitive },
  'File Tools': { color: '#48E6B0', icon: FileText },
  'Coding Tools': { color: '#FFB84D', icon: Code },
  'Everyday Tools': { color: '#FF7F7F', icon: Palette },
  'Security Tools': { color: '#C77DFF', icon: Lock },
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

const textAccent = { accentColor: '#4DA8DA', gradient: ['#4DA8DA', '#1B365D'] } as const;
const fileAccent = { accentColor: '#48E6B0', gradient: ['#48E6B0', '#1B365D'] } as const;
const codingAccent = { accentColor: '#FFB84D', gradient: ['#FFB84D', '#1B365D'] } as const;
const everydayAccent = { accentColor: '#FF7F7F', gradient: ['#FF7F7F', '#1B365D'] } as const;
const securityAccent = { accentColor: '#C77DFF', gradient: ['#C77DFF', '#1B365D'] } as const;

export const tools: Tool[] = [
  { name: 'Text Case Converter', description: 'Convert text to uppercase, lowercase, title case, or sentence case.', category: 'Text Utilities', tags: ['text', 'formatting', 'utility'], icon: CaseSensitive, path: '/tools/text-case-converter', component: TextCaseConverterPage, ...textAccent, popularity: 'new' },
  { name: 'Duplicate Line Remover', description: 'Remove duplicate lines from pasted text instantly.', category: 'Text Utilities', tags: ['text', 'cleaner', 'productivity'], icon: Rows, path: '/tools/duplicate-line-remover', component: DuplicateLineRemoverPage, ...textAccent },
  { name: 'Image to Base64', description: 'Convert an uploaded image to a Base64 string.', category: 'File Tools', tags: ['image', 'coding', 'conversion'], icon: Image, path: '/tools/image-to-base64', component: ImageToBase64Page, ...fileAccent, popularity: 'popular' },
  { name: 'Text to PDF Generator', description: 'Create a downloadable PDF from typed or pasted text.', category: 'File Tools', tags: ['pdf', 'document', 'export'], icon: FileText, path: '/tools/text-to-pdf', component: TextToPdfPage, ...fileAccent },
  { name: 'JSON Formatter', description: 'Format and validate JSON with syntax highlighting.', category: 'Coding Tools', tags: ['json', 'coding', 'dev'], icon: Braces, path: '/tools/json-formatter', component: JsonFormatterPage, ...codingAccent, popularity: 'popular' },
  { name: 'HTML Minifier', description: 'Minify HTML code to reduce its size.', category: 'Coding Tools', tags: ['html', 'coding', 'optimization'], icon: Code, path: '/tools/html-minifier', component: HtmlMinifierPage, ...codingAccent },
  { name: 'QR Code Generator', description: 'Generate a QR code from text or a URL.', category: 'Everyday Tools', tags: ['qr', 'sharing', 'generation'], icon: QrCode, path: '/tools/qr-code-generator', component: QrCodeGeneratorPage, ...everydayAccent, popularity: 'new' },
  { name: 'Unit Converter', description: 'Convert between various units of measurement.', category: 'Everyday Tools', tags: ['measurement', 'conversion', 'utility'], icon: Ruler, path: '/tools/unit-converter', component: UnitConverterPage, ...everydayAccent },
  { name: 'Secure Password Generator', description: 'Generate strong, secure passwords with customizable rules.', category: 'Security Tools', tags: ['password', 'security', 'privacy'], icon: Lock, path: '/tools/password-generator', component: PasswordGeneratorPage, ...securityAccent, popularity: 'hot' },
  { name: 'Base64 Encoder/Decoder', description: 'Encode and decode Base64 strings instantly.', category: 'Security Tools', tags: ['encoding', 'decoding', 'data'], icon: Fingerprint, path: '/tools/base64-encoder-decoder', component: Base64EncoderPage, ...securityAccent, popularity: 'popular' },
  { name: 'Text Difference Checker', description: 'Compare two text blocks and highlight differences.', category: 'Text Utilities', tags: ['text', 'comparison', 'utility', 'diff'], icon: GitCompareArrows, path: '/tools/text-diff-checker', component: TextDiffCheckerPage, ...textAccent },
  { name: 'Text Scrambler', description: 'Scramble the order of letters or words in your text.', category: 'Text Utilities', tags: ['text', 'fun', 'random', 'shuffle'], icon: Shuffle, path: '/tools/text-scrambler', component: TextScramblerPage, ...textAccent },
  { name: 'PDF to Images Converter', description: 'Convert each page of a PDF into PNG or JPEG images.', category: 'File Tools', tags: ['pdf', 'image', 'conversion', 'export'], icon: FileImage, path: '/tools/pdf-to-images', component: PdfToImagesPage, ...fileAccent, popularity: 'hot' },
  { name: 'Image to PDF Converter', description: 'Merge multiple images into a single, downloadable PDF file.', category: 'File Tools', tags: ['image', 'pdf', 'export', 'merge'], icon: FilePlus2, path: '/tools/image-to-pdf', component: ImageToPdfPage, ...fileAccent },
  { name: 'JavaScript Beautifier', description: 'Format and beautify your JavaScript code for readability.', category: 'Coding Tools', tags: ['js', 'coding', 'formatting', 'beautify'], icon: FileJson2, path: '/tools/js-beautifier', component: JsBeautifierPage, ...codingAccent },
  { name: 'Markdown to HTML Converter', description: 'Convert Markdown text into clean, semantic HTML.', category: 'Coding Tools', tags: ['markdown', 'html', 'conversion', 'dev'], icon: FileCode2, path: '/tools/markdown-to-html', component: MarkdownToHtmlPage, ...codingAccent },
  { name: 'Image Color Picker', description: 'Upload an image and pick any color to get its code.', category: 'Everyday Tools', tags: ['image', 'color', 'utility', 'picker'], icon: Pipette, path: '/tools/image-color-picker', component: ImageColorPickerPage, ...everydayAccent, popularity: 'new' },
  { name: 'Date Difference Calculator', description: 'Calculate the duration between two dates.', category: 'Everyday Tools', tags: ['date', 'time', 'calculation', 'duration'], icon: CalendarDays, path: '/tools/date-difference-calculator', component: DateDifferencePage, ...everydayAccent },
  { name: 'Caesar Cipher', description: 'Encode and decode text using the Caesar cipher.', category: 'Security Tools', tags: ['cipher', 'encryption', 'text', 'security'], icon: KeyRound, path: '/tools/caesar-cipher', component: CaesarCipherPage, ...securityAccent },
  { name: 'File Encryption (AES)', description: 'Encrypt and decrypt files securely in your browser.', category: 'Security Tools', tags: ['file', 'security', 'encryption', 'aes'], icon: FileLock2, path: '/tools/file-encryption', component: FileEncryptionPage, ...securityAccent },
  { name: 'Text Merge Tool', description: 'Merge multiple text blocks into one with custom separators.', category: 'Text Utilities', tags: ['text', 'merge', 'utility', 'join'], icon: Combine, path: '/tools/text-merge', component: TextMergePage, ...textAccent },
  { name: 'Text Statistics Analyzer', description: 'Show detailed stats like word count, reading time, and more.', category: 'Text Utilities', tags: ['text', 'analysis', 'productivity', 'stats'], icon: BarChart, path: '/tools/text-statistics', component: TextStatisticsPage, ...textAccent },
  { name: 'PDF Splitter', description: 'Split a PDF into separate files by page range.', category: 'File Tools', tags: ['pdf', 'split', 'utility', 'organize'], icon: Scissors, path: '/tools/pdf-splitter', component: PdfSplitterPage, ...fileAccent },
  { name: 'XML Formatter & Validator', description: 'Format, beautify, and validate XML code.', category: 'Coding Tools', tags: ['xml', 'coding', 'dev', 'formatter'], icon: FileCode2, path: '/tools/xml-formatter', component: XmlFormatterPage, ...codingAccent },
  { name: 'CSV to JSON Converter', description: 'Convert CSV data to JSON format with multiple options.', category: 'Coding Tools', tags: ['csv', 'json', 'conversion', 'data'], icon: Table2, path: '/tools/csv-to-json', component: CsvToJsonPage, ...codingAccent },
  { name: 'Random Name Generator', description: 'Generate random names for various purposes.', category: 'Everyday Tools', tags: ['random', 'name', 'utility', 'generator'], icon: Users, path: '/tools/random-name-generator', component: RandomNameGeneratorPage, ...everydayAccent },
  { name: 'Time Zone Converter', description: 'Convert time between different time zones.', category: 'Everyday Tools', tags: ['time', 'date', 'conversion', 'timezone'], icon: Globe, path: '/tools/time-zone-converter', component: TimeZoneConverterPage, ...everydayAccent },
  { name: 'ROT13 Encoder/Decoder', description: 'Encode or decode text using the ROT13 substitution cipher.', category: 'Security Tools', tags: ['cipher', 'encoding', 'text', 'rot13'], icon: RotateCcw, path: '/tools/rot13-encoder', component: Rot13Page, ...securityAccent },
  { name: 'Image Metadata Viewer', description: 'Extract and view EXIF metadata from images.', category: 'Security Tools', tags: ['image', 'metadata', 'privacy', 'exif'], icon: FileSearch2, path: '/tools/image-metadata-viewer', component: ImageMetadataViewerPage, ...securityAccent },
  { name: 'Text Column Splitter', description: 'Split text into multiple columns based on a delimiter.', category: 'Text Utilities', tags: ['text', 'formatting', 'utility', 'columns'], icon: Columns, path: '/tools/text-column-splitter', component: TextColumnSplitterPage, ...textAccent },
  { name: 'Keyword Extractor', description: 'Extract the most common keywords from text.', category: 'Text Utilities', tags: ['text', 'seo', 'analysis', 'keywords'], icon: Key, path: '/tools/keyword-extractor', component: KeywordExtractorPage, ...textAccent },
  { name: 'Code Syntax Highlighter', description: 'Apply syntax highlighting to code snippets.', category: 'Coding Tools', tags: ['coding', 'syntax', 'formatting', 'dev'], icon: Highlighter, path: '/tools/code-syntax-highlighter', component: CodeSyntaxHighlighterPage, ...codingAccent },
  { name: 'Random Number Generator', description: 'Generate random numbers within a specified range.', category: 'Everyday Tools', tags: ['random', 'utility', 'math', 'number'], icon: Hash, path: '/tools/random-number-generator', component: RandomNumberGeneratorPage, ...everydayAccent },
  { name: 'BMI Calculator', description: 'Calculate Body Mass Index (BMI) using metric or imperial units.', category: 'Everyday Tools', tags: ['health', 'fitness', 'calculation', 'bmi'], icon: Scale, path: '/tools/bmi-calculator', component: BmiCalculatorPage, ...everydayAccent },
  { name: 'Text Redactor', description: 'Black out or blur sensitive words and phrases in text.', category: 'Security Tools', tags: ['privacy', 'text', 'editing', 'redact'], icon: Eraser, path: '/tools/text-redactor', component: TextRedactorPage, ...securityAccent },
  { name: 'PDF Watermark Adder', description: 'Add a text or image watermark to your PDF files.', category: 'File Tools', tags: ['pdf', 'document', 'branding', 'watermark'], icon: Stamp, path: '/tools/pdf-watermark-adder', component: PdfWatermarkAdderPage, ...fileAccent },
  { name: 'File Shredder (Simulation)', description: 'Securely overwrite a file\'s data in-memory before discarding.', category: 'Security Tools', tags: ['file', 'security', 'privacy', 'delete'], icon: ShieldOff, path: '/tools/file-shredder', component: FileShredderPage, ...securityAccent },
  { name: 'Palindrome Checker', description: 'Check if a word or sentence is a palindrome.', category: 'Text Utilities', tags: ['text', 'fun', 'utility', 'palindrome'], icon: ArrowLeftRight, path: '/tools/palindrome-checker', component: PalindromeCheckerPage, ...textAccent },
  { name: 'Advanced Word Counter', description: 'Get detailed statistics about your text, live.', category: 'Text Utilities', tags: ['text', 'writing', 'stats', 'counter'], icon: Calculator, path: '/tools/advanced-word-counter', component: AdvancedWordCounterPage, ...textAccent, popularity: 'popular' },
  { name: 'Regex Tester', description: 'Build and test Regular Expressions in real-time.', category: 'Coding Tools', tags: ['regex', 'coding', 'search', 'dev'], icon: Regex, path: '/tools/regex-tester', component: RegexTesterPage, ...codingAccent, popularity: 'hot' },
  { name: 'HTML Table Generator', description: 'Generate HTML tables from structured data or settings.', category: 'Coding Tools', tags: ['html', 'table', 'web', 'generator'], icon: Table, path: '/tools/html-table-generator', component: HtmlTableGeneratorPage, ...codingAccent },
  { name: 'Currency Converter', description: 'Convert between currencies using static rates.', category: 'Everyday Tools', tags: ['finance', 'currency', 'calculator', 'money'], icon: Landmark, path: '/tools/currency-converter', component: CurrencyConverterPage, ...everydayAccent },
  { name: 'Loan Calculator', description: 'Calculate loan payments and total interest.', category: 'Everyday Tools', tags: ['finance', 'loan', 'calculator', 'interest'], icon: Banknote, path: '/tools/loan-calculator', component: LoanCalculatorPage, ...everydayAccent },
  { name: 'EXIF Metadata Remover', description: 'Remove EXIF metadata from images to protect your privacy.', category: 'Security Tools', tags: ['image', 'privacy', 'security', 'exif'], icon: FileX2, path: '/tools/exif-remover', component: ExifRemoverPage, ...securityAccent, popularity: 'hot' },
];