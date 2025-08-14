export interface Post {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  content: string; // Markdown content
  relatedToolPaths?: string[];
}

export const posts: Post[] = [
  {
    slug: 'mastering-regular-expressions',
    title: 'A Developer\'s Guide to Mastering Regular Expressions',
    description: 'Unlock the power of regex with practical examples and tips. Learn how to use our Regex Tester to build and debug patterns like a pro.',
    author: 'Jane Doe',
    date: '2023-10-26',
    tags: ['Regex', 'Development', 'Coding Tools'],
    relatedToolPaths: ['/tools/regex-tester'],
    content: `
Regular expressions (regex) are a powerful tool for pattern matching and text manipulation. While they can seem cryptic at first, understanding the fundamentals can dramatically boost your productivity.

### Basic Building Blocks

- **\`.\` (Dot):** Matches any single character except a newline.
- **\`*\` (Asterisk):** Matches the preceding character zero or more times.
- **\`+\` (Plus):** Matches the preceding character one or more times.
- **\`? \` (Question Mark):** Matches the preceding character zero or one time.
- **\`\\d\`:** Matches any digit (0-9).
- **\`\\w\`:** Matches any word character (letters, numbers, underscore).
- **\`[]\`:** Matches any character within the brackets. e.g., \`[aeiou]\` matches any vowel.

### Using Our Regex Tester

Our [Regex Tester](/tools/regex-tester) is the perfect playground. Let's try a simple example. To match an email address, you could use a pattern like:

\`\`\`
[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}
\`\`\`

Paste this into the tester to see it highlight email addresses in real-time. Experiment with different flags like \`g\` (global) and \`i\` (case-insensitive) to see how they affect the match.
    `,
  },
  {
    slug: 'why-clientside-tools-matter',
    title: 'Privacy and Speed: Why Client-Side Tools Are the Future',
    description: 'Discover the benefits of using tools that run entirely in your browser. No uploads, no waiting, and your data stays with you.',
    author: 'John Smith',
    date: '2023-10-20',
    tags: ['Privacy', 'Security', 'Web Development'],
    relatedToolPaths: ['/tools/image-to-base64'],
    content: `
In a world of data breaches and privacy concerns, how your data is handled matters more than ever. That's the core philosophy behind Toollab.

### What are Client-Side Tools?

Client-side means all the processing happens on your computer (the "client"), inside your web browser. When you use a tool like our [Image to Base64 converter](/tools/image-to-base64), your image is never uploaded to our servers. The conversion happens locally.

**Benefits:**

1.  **Unmatched Privacy:** Your data never leaves your machine.
2.  **Incredible Speed:** No time is wasted uploading large files or waiting for a server to respond.
3.  **Offline Access:** Many tools can function even without an internet connection once the page is loaded.

This approach empowers you, the user, with full control over your information while providing a faster, more efficient experience.
    `,
  },
];