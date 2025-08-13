import ToolCard from "@/components/ToolCard";
import { Code, Image, Type, Hash, Palette, Link2, ShieldCheck, FileText } from "lucide-react";

const allTools = [
  { name: "JSON Formatter", description: "Beautify and validate JSON.", href: "/tools/json-formatter", icon: <Code className="h-8 w-8" /> },
  { name: "Image Converter", description: "Convert image formats.", href: "/tools/image-converter", icon: <Image className="h-8 w-8" /> },
  { name: "Lorem Ipsum Generator", description: "Generate placeholder text.", href: "/tools/lorem-ipsum", icon: <Type className="h-8 w-8" /> },
  { name: "Hash Generator", description: "MD5, SHA-1, SHA-256 hashes.", href: "/tools/hash-generator", icon: <Hash className="h-8 w-8" /> },
  { name: "Color Picker", description: "Pick colors from a palette.", href: "/tools/color-picker", icon: <Palette className="h-8 w-8" /> },
  { name: "URL Encoder/Decoder", description: "Encode or decode URLs.", href: "/tools/url-encoder", icon: <Link2 className="h-8 w-8" /> },
  { name: "Password Generator", description: "Create strong passwords.", href: "/tools/password-generator", icon: <ShieldCheck className="h-8 w-8" /> },
  { name: "Base64 Encoder/Decoder", description: "Encode/decode Base64.", href: "/tools/base64", icon: <FileText className="h-8 w-8" /> },
  { name: "Text to Slug", description: "Convert text to URL slug.", href: "/tools/text-to-slug", icon: <Type className="h-8 w-8" /> },
  { name: "CSS Minifier", description: "Minify CSS code.", href: "/tools/css-minifier", icon: <Code className="h-8 w-8" /> },
  { name: "Image Resizer", description: "Resize images easily.", href: "/tools/image-resizer", icon: <Image className="h-8 w-8" /> },
  { name: "Unix Timestamp Converter", description: "Convert timestamps.", href: "/tools/unix-timestamp", icon: <Hash className="h-8 w-8" /> },
];

const ToolsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold font-heading">
          All Tools
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our full suite of 70+ client-side tools. Fast, free, and secure.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {allTools.map((tool) => (
            <ToolCard key={tool.name} {...tool} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ToolsPage;