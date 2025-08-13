import { Link } from "react-router-dom";
import { GlassBadge } from "@/components/ui/GlassBadge";

interface ToolCardProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  href: string;
  accentColor: string;
  category: string;
}

const ToolCard = ({ icon, name, description, href, accentColor, category }: ToolCardProps) => {
  const style = {
    '--accent-color': accentColor,
  } as React.CSSProperties;

  return (
    <Link to={href} style={style} className="group block h-full">
      <div className="relative p-6 rounded-xl h-full overflow-hidden transition-all duration-300 ease-out
                      bg-[rgba(19,43,71,0.65)] backdrop-blur-lg border border-white/10
                      hover:scale-105 hover:border-[var(--accent-color)]/50 hover:shadow-2xl hover:shadow-[var(--accent-color)]/10">
        
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)] to-transparent opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>

        <div className="relative z-10 flex flex-col h-full text-center items-center">
          <div className="mb-4 text-[var(--accent-color)] transition-transform duration-300 group-hover:-translate-y-1">
            {icon}
          </div>
          <h3 className="font-heading text-xl font-bold text-white mb-2">{name}</h3>
          <p className="text-muted-foreground text-sm flex-grow mb-4">{description}</p>
          <GlassBadge accentColor={accentColor}>{category}</GlassBadge>
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;