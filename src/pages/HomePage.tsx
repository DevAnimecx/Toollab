import ToolCard from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { Code, Image, Type, Hash } from "lucide-react";
import { Link } from "react-router-dom";

const featuredTools = [
  {
    name: "JSON Formatter",
    description: "Beautify and validate your JSON data.",
    href: "/tools/json-formatter",
    icon: <Code className="h-8 w-8" />,
  },
  {
    name: "Image Converter",
    description: "Convert images between PNG, JPG, WEBP.",
    href: "/tools/image-converter",
    icon: <Image className="h-8 w-8" />,
  },
  {
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text for your designs.",
    href: "/tools/lorem-ipsum",
    icon: <Type className="h-8 w-8" />,
  },
  {
    name: "Hash Generator",
    description: "Create MD5, SHA-1, and SHA-256 hashes.",
    href: "/tools/hash-generator",
    icon: <Hash className="h-8 w-8" />,
  },
];

const HomePage = () => {
  return (
    <div className="container mx-auto px-4">
      <section className="text-center py-20">
        <h1 className="text-5xl md:text-7xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-primary to-foreground">
          Your Ultimate Client-Side Toolkit
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Toollab offers 70+ fast, secure, and free tools that work entirely in your browser. No uploads, no waiting. Just instant results.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/tools">Browse All Tools</Link>
          </Button>
        </div>
      </section>

      <section id="featured-tools" className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Most Popular Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.name} {...tool} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;