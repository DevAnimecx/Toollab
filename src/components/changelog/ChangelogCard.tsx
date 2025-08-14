import { ChangelogEntry, UpdateCategory } from '@/data/changelog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Bug, Wrench, Sparkles, ShieldCheck } from 'lucide-react';

const categoryConfig: Record<UpdateCategory, { icon: React.ReactNode; className: string }> = {
  New: { icon: <Sparkles className="h-4 w-4" />, className: 'bg-blue-400/10 text-blue-300 border-blue-400/20' },
  Improved: { icon: <Wrench className="h-4 w-4" />, className: 'bg-yellow-400/10 text-yellow-300 border-yellow-400/20' },
  Fixed: { icon: <Bug className="h-4 w-4" />, className: 'bg-red-500/10 text-red-400 border-red-500/20' },
  Security: { icon: <ShieldCheck className="h-4 w-4" />, className: 'bg-green-500/10 text-green-400 border-green-500/20' },
};

const ChangelogCard = ({ entry }: { entry: ChangelogEntry }) => {
  return (
    <motion.div
      id={entry.id}
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-8 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10">
        <div className="border-b border-white/10 pb-4 mb-4">
          <h2 className="text-3xl font-bold font-heading">{entry.version}</h2>
          <p className="text-sm text-muted-foreground mt-1">{entry.releaseDate}</p>
        </div>
        <div className="text-xs text-muted-foreground mb-6 space-y-1">
          <p><strong>By:</strong> {entry.author}</p>
          <p><strong>Credits:</strong> {entry.credits.join(' | ')}</p>
        </div>
        <p className="mb-6 text-foreground/90">{entry.intro}</p>
        
        <div className="space-y-6">
          {entry.updates.map((update, index) => (
            <div key={index} className="flex items-start gap-4">
              <Badge variant="secondary" className={categoryConfig[update.category].className}>
                {categoryConfig[update.category].icon}
                <span className="ml-2">{update.category}</span>
              </Badge>
              <div>
                <h3 className="font-semibold text-white">{update.title}</h3>
                <p className="text-sm text-muted-foreground">{update.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button asChild>
            <Link to={entry.cta.href}>
              {entry.cta.text} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChangelogCard;