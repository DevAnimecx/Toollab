import ToolCard from "@/components/ToolCard";
import { tools, categories } from "@/data/tools";
import { Link } from "react-router-dom";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const featuredToolPaths = [
  "/tools/json-formatter",
  "/tools/image-to-base64",
  "/tools/password-generator",
  "/tools/qr-code-generator",
];

const featuredTools = tools.filter(tool => featuredToolPaths.includes(tool.path));

const Hero = () => (
  <section className="text-center py-20 md:py-32">
    <h1 className="text-5xl md:text-7xl font-extrabold font-heading bg-clip-text text-transparent bg-gradient-to-b from-white to-muted-foreground/80">
      Your 70+ Daily Internet Tools,
      <br />
      One Premium Hub
    </h1>
    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
      Toollab offers fast, secure, and free tools that work entirely in your browser. No uploads, no waiting. Just instant results.
    </p>
    <div className="mt-8 flex justify-center">
      <div className="relative w-full max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input type="search" placeholder="Find a tool..." className="w-full h-14 pl-12 pr-4 rounded-full bg-secondary/50 border-white/10" />
      </div>
    </div>
  </section>
);

const CategoriesOverview = () => (
  <section className="py-16">
    <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
      {Object.entries(categories).map(([name, { icon: Icon, color }]) => (
        <div key={name} className="flex-shrink-0 w-48 h-48 p-6 rounded-2xl flex flex-col items-center justify-center text-center bg-secondary/40 border border-white/10" style={{ '--accent-color': color } as React.CSSProperties}>
          <Icon className="h-10 w-10 text-[var(--accent-color)]" />
          <h3 className="mt-4 font-bold text-white">{name}</h3>
        </div>
      ))}
    </div>
  </section>
);

const FeaturedTools = () => (
  <section id="featured-tools" className="py-16">
    <h2 className="text-4xl font-bold text-center mb-12">Most Popular Tools</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {featuredTools.map((tool, index) => (
        <ToolCard 
          key={tool.name} 
          name={tool.name}
          description={tool.description}
          href={tool.path}
          icon={<tool.icon className="h-8 w-8" />}
          accentColor={tool.accentColor}
          category={tool.category}
          animationDelay={`${index * 100}ms`}
        />
      ))}
    </div>
  </section>
);

const HomePage = () => {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <CategoriesOverview />
      <FeaturedTools />
      <Stats />
    </div>
  );
};

export default HomePage;