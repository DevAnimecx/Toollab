import ToolCard from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { tools } from "@/data/tools";
import { Link } from "react-router-dom";
import Stats from "@/components/Stats";

const featuredToolPaths = [
  "/tools/json-formatter",
  "/tools/image-to-base64",
  "/tools/password-generator",
  "/tools/qr-code-generator",
];

const featuredTools = tools.filter(tool => featuredToolPaths.includes(tool.path));

const HomePage = () => {
  return (
    <div className="container mx-auto px-4">
      <section className="text-center py-20">
        <h1 className="text-5xl md:text-7xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-primary to-foreground">
          Your Ultimate Client-Side Toolkit
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Toollab offers {tools.length}+ fast, secure, and free tools that work entirely in your browser. No uploads, no waiting. Just instant results.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/tools">Browse All Tools</Link>
          </Button>
          <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
            {featuredTools.slice(0, 3).map(tool => (
              <Button asChild variant="link" className="text-muted-foreground hover:text-primary" key={tool.path}>
                <Link to={tool.path}>{tool.name}</Link>
              </Button>
            ))}
          </div>
        </div>
      </section>

      <Stats />

      <section id="featured-tools" className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Most Popular Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredTools.map((tool) => (
            <ToolCard 
              key={tool.name} 
              name={tool.name}
              description={tool.description}
              href={tool.path}
              icon={<tool.icon className="h-8 w-8" />}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;