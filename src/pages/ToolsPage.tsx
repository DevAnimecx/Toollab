import ToolCard from "@/components/ToolCard";
import { tools, categories } from "@/data/tools";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search } from "lucide-react";

const ToolsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold font-heading">
          All Tools
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our full suite of client-side tools. Fast, free, and secure.
        </p>
      </section>

      <div className="sticky top-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40 py-4 mb-8">
        <div className="relative max-w-xl mx-auto mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search for a tool by name or tag..." 
            className="pl-10 h-12 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex justify-center flex-wrap gap-2">
          <button onClick={() => setSelectedCategory('All')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === 'All' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>All</button>
          {Object.entries(categories).map(([name, {color}]) => (
            <button key={name} onClick={() => setSelectedCategory(name)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === name ? color.replace('bg-opacity-10', '') : 'bg-secondary text-secondary-foreground'}`}>
              {name}
            </button>
          ))}
        </div>
      </div>

      <section>
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredTools.map((tool) => (
              <ToolCard 
                key={tool.path} 
                tool={tool}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No tools found. Try a different search.</p>
        )}
      </section>
    </div>
  );
};

export default ToolsPage;