import { Twitter, Linkedin, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocialShareButtonsProps {
  url: string;
  title: string;
}

export const SocialShareButtons = ({ url, title }: SocialShareButtonsProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      name: 'Twitter',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <Twitter className="h-4 w-4" />,
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      icon: <Linkedin className="h-4 w-4" />,
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <Facebook className="h-4 w-4" />,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-muted-foreground mr-2">Share:</span>
      {links.map((link) => (
        <Button key={link.name} variant="outline" size="icon" asChild>
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.icon}
            <span className="sr-only">Share on {link.name}</span>
          </a>
        </Button>
      ))}
    </div>
  );
};