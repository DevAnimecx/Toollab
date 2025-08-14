import PostCard from '@/components/blog/PostCard';
import { posts } from '@/data/posts';
import Seo from '@/components/Seo';
import { getBreadcrumbSchema } from '@/lib/schema';

const BlogIndexPage = () => {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
  ]);

  return (
    <>
      <Seo
        title="Blog - Insights & Tutorials"
        description="Explore articles, tutorials, and insights from the Toollab team. Learn how to make the most of our tools and stay updated on the latest in web development and privacy."
        keywords="toollab blog, tutorials, web development, privacy, security, tool guides"
        canonicalPath="/blog"
        schema={breadcrumbSchema}
      />
      <div className="container mx-auto px-4 py-12">
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold font-heading">Toollab Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and updates from the Toollab team.
          </p>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogIndexPage;