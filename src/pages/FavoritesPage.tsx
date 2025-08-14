import ToolCard from "@/components/ToolCard";
import { tools } from "@/data/tools";
import { useFavorites } from "@/context/FavoritesContext";
import Seo from "@/components/Seo";
import { Star } from "lucide-react";

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const favoriteTools = tools.filter(tool => favorites.includes(tool.path));

  return (
    <>
      <Seo
        title="Your Favorite Tools"
        description="Access your hand-picked collection of favorite tools on Toollab for quick and easy use."
        canonicalPath="/favorites"
      />
      <div className="container mx-auto px-4 py-12">
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold font-heading">
            Favorite Tools
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Your personal collection of most-used tools.
          </p>
        </section>

        <section>
          {favoriteTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {favoriteTools.map((tool) => (
                <ToolCard 
                  key={tool.path} 
                  tool={tool}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-border rounded-2xl">
              <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold">No Favorites Yet</h3>
              <p className="text-muted-foreground mt-2">Click the star icon on any tool to add it here.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default FavoritesPage;