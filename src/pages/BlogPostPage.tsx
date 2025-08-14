import { useParams, Link, Navigate } from 'react-router-dom';
import { posts } from '@/data/posts';
import { tools } from '@/data/tools';
import StaticPageLayout from '@/components/StaticPageLayout';
import Seo from '@/components/Seo';
import { getBreadcrumbSchema } from '@/lib/schema';
import { marked } from 'marked';
import ToolCard from '@/components/ToolCard';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/404" />;
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);
  
  const relatedTools = tools.filter(tool => post.relatedToolPaths?.includes(tool.path));

  return (
    <>
      <Seo
        title={post.title}
        description={post.description}
        keywords={post.tags.join(', ')}
        canonicalPath={`/blog/${post.slug}`}
        ogType="article"
        schema={breadcrumbSchema}
      />
      <StaticPageLayout title={post.title}>
        <div className="text-sm text-muted-foreground mb-4">
          <span>By {post.author} on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }} />
      </StaticPageLayout>
      
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