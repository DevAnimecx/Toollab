import { useParams, Link, Navigate } from 'react-router-dom';
import { posts } from '@/data/posts';
import { tools } from '@/data/tools';
import StaticPageLayout from '@/components/StaticPageLayout';
import Seo from '@/components/Seo';
import { getBreadcrumbSchema } from '@/lib/schema';
import { marked } from 'marked';
import ToolCard from '@/components/tools/ToolCard';
import { SocialShareButtons } from '@/components/blog/SocialShareButtons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect } from 'react';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    if (post) {
      const parseMarkdown = async () => {
        const content = await marked.parse(post.content);
        setHtmlContent(content);
      };
      parseMarkdown();
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/404" />;
  }

  const fullUrl = `https://toollab.dev/blog/${post.slug}`;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': post.title,
    'author': {
      '@type': 'Organization',
      'name': 'Toollab',
      'url': 'https://toollab.dev'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Toollab',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://toollab.dev/placeholder.svg'
      }
    },
    'datePublished': post.date,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': fullUrl
    },
    'description': post.metaDescription,
  };
  
  const relatedTools = tools.filter(tool => post.relatedToolPaths?.includes(tool.path));

  return (
    <>
      <Seo
        title={post.metaTitle}
        description={post.metaDescription}
        keywords={post.tags.join(', ')}
        canonicalPath={`/blog/${post.slug}`}
        ogType="article"
        schema={{ ...breadcrumbSchema, ...articleSchema }}
      />
      <StaticPageLayout title={post.title}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="text-sm text-muted-foreground">
            <span>By {post.author} on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <SocialShareButtons url={fullUrl} title={post.title} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </StaticPageLayout>
      
      {post.faq && post.faq.length > 0 && (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {post.faq.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {relatedTools.length > 0 && (
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-8">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {relatedTools.map(tool => (
              <ToolCard key={tool.path} tool={tool} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPostPage;