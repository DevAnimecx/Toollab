import ToolCard from "@/components/ToolCard";
import { tools, categories } from "@/data/tools";
import Stats from "@/components/Stats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { useFavorites } from "@/context/FavoritesContext";
import BlackVaultAdBlock from "@/components/BlackVaultAdBlock";
import Seo from "@/components/Seo";
import { getWebsiteSchema, getOrganizationSchema } from "@/lib/schema";
import Hero from "@/components/Hero";

const CategoryCarousel = () => (
  <section id="categories" className="py-16">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Explore by Category</h2>
    <ScrollArea className="w-full whitespace-nowrap rounded-md">
      <div className="flex w-max space-x-4 p-4">
        {Object.entries(categories).map(([name, { icon: Icon, color }]) => (
          <Link to="/tools" key={name} className="group">
            <div className="flex-shrink-0 w-48 h-48 p-6 rounded-2xl flex flex-col items-center justify-center text-center bg-secondary border border-border transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-black/30 group-hover:border-white/20" style={{ '--accent-color': color } as React.CSSProperties}>
              <Icon className="h-10 w-10 text-[var(--accent-color)] transition-transform duration-300 group-hover:scale-110" />
              <h3 className="mt-4 font-bold text-foreground">{name}</h3>
            </div>
          </Link>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </section>
);

const DynamicToolShowcase = () => {
  const { favorites } = useFavorites();
  const popularTools = tools.filter(t => t.popularity === 'popular').slice(0, 8);
  const hotTools = tools.filter(t => t.popularity === 'hot').slice(0, 8);
  const newTools = tools.filter(t => t.popularity === 'new').slice(0, 8);
  const favoriteTools = tools.filter(t => favorites.includes(t.path));

  const renderTools = (toolList: typeof tools) => {
    if (toolList.length === 0) {
      return <p className="text-center text-muted-foreground mt-8">No tools in this category yet. Mark some as favorites!</p>
    }
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-8">
        {toolList.map((tool, index) => (
          <ToolCard 
            key={tool.path} 
            tool={tool}
            animationDelay={`${index * 100}ms`}
          />
        ))}
      </div>
    );
  }

  return (
    <section id="tool-showcase" className="py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Discover Our Tools</h2>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-lg mx-auto grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="hot">Hot</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
        </TabsList>
        <TabsContent value="all">{renderTools(tools.slice(0, 8))}</TabsContent>
        <TabsContent value="favorites">{renderTools(favoriteTools)}</TabsContent>
        <TabsContent value="popular">{renderTools(popularTools)}</TabsContent>
        <TabsContent value="hot">{renderTools(hotTools)}</TabsContent>
        <TabsContent value="new">{renderTools(newTools)}</TabsContent>
      </Tabs>
    </section>
  );
};

const HomePage = () => {
  const schema = {
    ...getWebsiteSchema(),
    ...getOrganizationSchema(),
  };

  return (
    <>
      <Seo
        title="70+ Free Client-Side Online Tools"
        description="Toollab offers a comprehensive suite of 70+ free, fast, and secure client-side tools. No uploads, no waiting. From text utilities to file converters, get instant results directly in your browser."
        keywords="online tools, free tools, client-side tools, developer tools, text utilities, file converter, privacy-focused tools"
        canonicalPath="/"
        schema={schema}
      />
      <Hero />
      <BlackVaultAdBlock />
      <div className="container mx-auto px-4">
        <CategoryCarousel />
        <DynamicToolShowcase />
        <Stats />
      </div>
    </>
  );
};

export default HomePage;