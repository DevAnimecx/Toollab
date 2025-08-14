import { Link } from 'react-router-dom';
import { Post } from '@/data/posts';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <div className="p-6 rounded-2xl h-full bg-black/20 backdrop-blur-xl border border-white/10 transition-all duration-300 ease-out group-hover:border-primary group-hover:-translate-y-1">
        <h3 className="font-heading text-2xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
        <p className="text-muted-foreground text-sm font-body mb-4">{post.description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-3 w-3" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;