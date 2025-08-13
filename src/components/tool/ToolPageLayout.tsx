import React from 'react';
import { Tool, categories, tools } from '@/data/tools';
import { Badge } from '@/components/ui/badge';
import ToolCard from '@/components/ToolCard';
import { Link } from 'react-router-dom';

interface ToolPageLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

const ToolPageLayout = ({ tool, children }: ToolPageLayoutProps) => {
  const relatedTools = tools
    .filter((t) => t.category === tool.category && t.name !== tool.name)
    .slice(0, 4);

  const categoryInfo = categories[tool.category];

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="flex justify-center items-center gap-4 mb-4">
          <div className={`p-3 rounded-lg ${categoryInfo.color}`}>
            <tool.icon className="h-6 w-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading">{tool.name}</h1>
        </div>
        <Badge variant="outline" className={`py-1 px-3 rounded-full text-sm border ${categoryInfo.color}`}>
          {tool.category}
        </Badge>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {tool.description}
        </p>
      </header>

      <main className="max-w-4xl mx-auto mb-20">
        {children}
      </main>

      {relatedTools.length > 0 && (
        <footer className="border-t pt-12">
          <h2 className="text-2xl font-bold text-center mb-8">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedTools.map((relatedTool) => (
              <ToolCard
                key={relatedTool.name}
                name={relatedTool.name}
                description={relatedTool.description}
                href={relatedTool.path}
                icon={<relatedTool.icon className="h-8 w-8" />}
              />
            ))}
          </div>
          <div className="text-center mt-8">
             <Link to="/tools" className="text-sm text-primary hover:underline">
                View all tools &rarr;
             </Link>
          </div>
        </footer>
      )}
    </div>
  );
};

export default ToolPageLayout;