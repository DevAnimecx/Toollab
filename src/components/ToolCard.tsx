import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ToolCardProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  href: string;
}

const ToolCard = ({ icon, name, description, href }: ToolCardProps) => {
  return (
    <Card className="flex flex-col justify-between transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 text-center">
      <CardHeader className="items-center">
        <div className="p-4 bg-primary/10 rounded-full mb-4 text-primary">
          {icon}
        </div>
        <CardTitle className="font-heading">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="justify-center">
        <Button asChild variant="outline">
          <Link to={href}>
            Open Tool <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;