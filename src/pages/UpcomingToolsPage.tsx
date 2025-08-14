import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { upcomingToolsData, UpcomingTool, ToolStatus, ToolPriority } from '@/data/upcoming-tools';
import { categories } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Flame, Star, Lightbulb, Search, Settings, ArrowDown } from 'lucide-react';
import Seo from '@/components/Seo';
import { AdminLoginModal } from '@/components/status/AdminLoginModal';
import { Label } from '@/components/ui/label';
import { BotCheck } from '@/components/BotCheck';

const statusConfig: Record<ToolStatus, { className: string }> = {
  'Planned': { className: 'bg-gray-500/20 text-gray-300 border-gray-500/30' },
  'In Development': { className: 'bg-blue-500/20 text-blue-300 border-blue-500/30 animate-pulse' },
  'Testing': { className: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
  'Finalizing': { className: 'bg-green-500/20 text-green-300 border-green-500/30' },
};

const priorityConfig: Record<ToolPriority, { icon: React.ReactNode; className: string }> = {
  'High': { icon: <Flame className="h-4 w-4" />, className: 'text-red-400' },
  'Medium': { icon: <Star className="h-4 w-4" />, className: 'text-yellow-400' },
  'Low': { icon: <Lightbulb className="h-4 w-4" />, className: 'text-blue-400' },
};

const UpcomingToolCard = ({ tool, size = 'large' }: { tool: UpcomingTool, size?: 'large' | 'small' }) => {
  const CategoryIcon = categories[tool.category].icon;
  const style = { '--accent-color': categories[tool.category].color } as React.CSSProperties;

  if (size === 'small') {
    return (
      <div className="flex-shrink-0 w-72 rounded-xl bg-black/20 backdrop-blur-lg border border-white/10 p-4" style={style}>
        <div className="flex items-center gap-3">
          <CategoryIcon className="h-8 w-8 text-[var(--accent-color)]" />
          <div>
            <h4 className="font-bold text-white">{tool.name}</h4>
            <Badge variant="secondary" className="mt-1">{tool.expectedVersion}</Badge>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="p-6 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:border-primary hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={style}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <CategoryIcon className="h-6 w-6 text-[var(--accent-color)]" />
          <span className="text-sm font-semibold text-[var(--accent-color)]">{tool.category}</span>
        </div>
        <Badge variant="secondary" className={statusConfig[tool.status].className}>{tool.status}</Badge>
      </div>
      <h3 className="text-2xl font-bold font-heading text-white">{tool.name}</h3>
      <p className="text-muted-foreground mt-2 mb-4 text-sm">{tool.description}</p>
      <Badge variant="outline">{tool.expectedVersion}</Badge>
    </motion.div>
  );
};

const UpcomingToolsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const nextUpdateTools = upcomingToolsData.filter(t => t.expectedVersion.startsWith('v2.1'));
  const midTermTools = upcomingToolsData.filter(t => t.expectedVersion.startsWith('Q'));
  
  const filteredRoadmap = useMemo(() => {
    return upcomingToolsData.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = categoryFilter === 'All' || tool.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  return (
    <>
      <Seo
        title="Upcoming Tools & Roadmap"
        description="Stay ahead of the curve. See what's next for Toollab, including upcoming tools, our full roadmap, and a way to request new features."
        keywords="toollab roadmap, upcoming tools, new features, tool requests"
        canonicalPath="/upcoming-tools"
      />
      <AdminLoginModal open={isLoginOpen} onOpenChange={setIsLoginOpen} />
      <div className="container mx-auto px-4 py-12">
        <motion.header 
          className="relative text-center py-20 md:py-32 rounded-3xl overflow-hidden border border-white/10 bg-black/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] opacity-30"></div>
            <div className="absolute top-0 -left-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-subtle-pulse"></div>
            <div className="absolute bottom-0 -right-1/4 w-96 h-96 bg-teal-500/20 rounded-full filter blur-3xl animate-subtle-pulse animation-delay-2000"></div>
          </div>
          <div className="absolute top-4 right-4">
            <Badge variant="secondary">Roadmap Updated: August 2025</Badge>
          </div>
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold font-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            The Future of Toollab
          </motion.h1>
          <motion.p 
            className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            Explore our roadmap, see what we're building next, and help shape the future of your favorite toolkit.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            className="mt-8"
          >
            <Button asChild size="lg">
              <a href="#full-roadmap">View Full Roadmap <ArrowDown className="ml-2 h-4 w-4" /></a>
            </Button>
          </motion.div>
        </motion.header>

        <section className="py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Next Minor Update ({nextUpdateTools[0]?.expectedVersion})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nextUpdateTools.map(tool => <UpcomingToolCard key={tool.id} tool={tool} />)}
          </div>
        </section>

        <section className="py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Mid-Term Releases</h2>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-6 p-4">
              {midTermTools.map(tool => <UpcomingToolCard key={tool.id} tool={tool} size="small" />)}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        <section id="full-roadmap" className="py-16 scroll-mt-24">
          <h2 className="text-4xl font-bold text-center mb-12">Full Toollab Roadmap</h2>
          <div className="p-6 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search roadmap..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[200px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  {Object.keys(categories).map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tool Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Expected Version</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoadmap.map(tool => (
                  <TableRow key={tool.id}>
                    <TableCell className="font-semibold text-white">{tool.name}</TableCell>
                    <TableCell><Badge variant="secondary" style={{ color: categories[tool.category].color }}>{tool.category}</Badge></TableCell>
                    <TableCell><Badge variant="outline">{tool.expectedVersion}</Badge></TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-2 ${priorityConfig[tool.priority].className}`}>
                        {priorityConfig[tool.priority].icon}
                        <span>{tool.priority}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <section className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">Have an idea?</h2>
            <p className="text-muted-foreground mb-8">We're always looking to add new and useful tools. If you have a suggestion, please let us know. We review every submission.</p>
          </div>
          <div className="p-8 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10">
            <form className="space-y-4">
              <div><Label htmlFor="tool-name">Tool Name</Label><Input id="tool-name" placeholder="e.g., Video Subtitle Extractor" /></div>
              <div><Label htmlFor="tool-category">Category</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                  <SelectContent>{Object.keys(categories).map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label htmlFor="tool-description">Description</Label><Textarea id="tool-description" placeholder="Briefly describe what the tool should do." /></div>
              <BotCheck />
              <Button type="submit" className="w-full">Submit Request</Button>
            </form>
          </div>
        </section>

        <div className="text-center py-8">
          <Button variant="outline" onClick={() => setIsLoginOpen(true)}>
            <Settings className="mr-2 h-4 w-4" /> Update Roadmap (Admin)
          </Button>
        </div>
      </div>
    </>
  );
};

export default UpcomingToolsPage;