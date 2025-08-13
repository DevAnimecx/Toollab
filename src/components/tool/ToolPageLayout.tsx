import React from 'react';
import { Tool, tools } from '@/data/tools';
import ToolCard from '@/components/ToolCard';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface ToolPageLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

const ToolPageLayout = ({ tool, children }: ToolPageLayoutProps) => {
  const relatedTools = tools
    .filter((t) => t.category === tool.category && t.name !== tool.name)
    .slice(0, 4);

  const style = {
    '--accent-color': tool.accentColor,
  } as React.CSSProperties;

  return (
    <div className="container mx-auto px-4 py-12" style={style}>
      <header className="relative text-center mb-12 p-8 rounded-2xl overflow-hidden border border-white/10 bg-secondary/40">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)] to-transparent opacity-10"></div>
        <tool.icon className="absolute -top-4 -right-4 h-32 w-32 text-[var(--accent-color)] opacity-5" />
        <div className="relative z-10">
          <Badge variant="secondary" style={{ color: tool.accentColor, borderColor: `${tool.accentColor}40`, background: `${tool.accentColor}15` }}>
            {tool.category}
          </Badge>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold font-heading text-glow">{tool.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {tool.description}
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto mb-20">
        {children}
      </main>

      {relatedTools.length > 0 && (
        <footer className="border-t border-white/10 pt-12">
          <h2 className="text-3xl font-bold text-center mb-8">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedTools.map((relatedTool) => (
              <ToolCard
                key={relatedTool.name}
                name={relatedTool.name}
                description={relatedTool.description}
                href={relatedTool.path}
                icon={<relatedTool.icon className="h-8 w-8" />}
                accentColor={relatedTool.accentColor}
                category={relatedTool.category}
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