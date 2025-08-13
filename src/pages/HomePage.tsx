import ToolCard from "@/components/ToolCard";
import { tools, categories } from "@/data/tools";
import Stats from "@/components/Stats";
import { SearchBar } from "@/components/SearchBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

const Hero = () => (
  <section className="text-center py-20 md:py-32">
    <h1 className="text-5xl md:text-7xl font-extrabold font-heading bg-clip-text text-transparent bg-gradient-to-b from-white to-muted-foreground/80">
      All Your Tools. One Elegant Hub.
    </h1>
    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
      Toollab offers fast, secure, and free client-side tools. No uploads, no waiting. Just instant results.
    </p>
    <div className="mt-8 flex justify-center">
      <div className="w-full max-w-lg">
        <SearchBar />
      </div>
    </div>
  </section>
);

const CategoryCarousel = () => (
  <section className="py-16">
    <h2 className="text-4xl font-bold text-center mb-12">Explore by Category</h2>
    <ScrollArea className="w-full whitespace-nowrap rounded-md">
      <div className="flex w-max space-x-4 p-4">
        {Object.entries(categories).map(([name, { icon: Icon, color }]) => (
          <Link to="/tools" key={name} className="group">
            <div className="flex-shrink-0 w-48 h-48 p-6 rounded-2xl flex flex-col items-center justify-center text-center bg-secondary/40 border border-white/10 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-black/30 group-hover:border-white/20" style={{ '--accent-color': color } as React.CSSProperties}>
              <Icon className="h-10 w-10 text-[var(--accent-color)] transition-transform duration-300 group-hover:scale-110" />
              <h3 className="mt-4 font-bold text-white">{name}</h3>
            </div>
          </Link>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </section>
);

const DynamicToolShowcase = () => {
  const popularTools = tools.filter(t => t.popularity === 'popular').slice(0, 8);
  const hotTools = tools.filter(t => t.popularity === 'hot').slice(0, 8);
  const newTools = tools.filter(t => t.popularity === 'new').slice(0, 8);

  const renderTools = (toolList: typeof tools) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
      {toolList.map((tool, index) => (
        <ToolCard 
          key={tool.name} 
          name={tool.name}
          description={tool.description}
          href={tool.path}
          icon={<tool.icon className="h-8 w-8" />}
          accentColor={tool.accentColor}
          category={tool.category}
          popularity={tool.popularity}
          animationDelay={`${index * 100}ms`}
        />
      ))}
    </div>
  );

  return (
    <section id="tool-showcase" className="py-16">
      <h2 className="text-4xl font-bold text-center mb-12">Discover Our Tools</h2>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="hot">Hot</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
        </TabsList>
        <TabsContent value="all">{renderTools(tools.slice(0, 8))}</TabsContent>
        <TabsContent value="popular">{renderTools(popularTools)}</TabsContent>
        <TabsContent value="hot">{renderTools(hotTools)}</TabsContent>
        <TabsContent value="new">{renderTools(newTools)}</TabsContent>
      </Tabs>
    </section>
  );
};

const HomePage = () => {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <CategoryCarousel />
      <DynamicToolShowcase />
      <Stats />
    </div>
  );
};

export default HomePage;