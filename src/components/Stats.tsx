import { tools } from "@/data/tools";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Code, Users, ShieldCheck, Heart } from "lucide-react";
import { useState, useEffect } from "react";

const Stats = () => {
  const totalTools = tools.length;
  const [projectsPowered, setProjectsPowered] = useState(42814);
  const [happyDevelopers, setHappyDevelopers] = useState(15329);

  useEffect(() => {
    const interval = setInterval(() => {
      setProjectsPowered(prev => prev + Math.floor(Math.random() * 3) + 1);
      setHappyDevelopers(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 2500); // Update every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Tools Available",
      value: totalTools,
      isAnimated: false,
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Projects Powered",
      value: projectsPowered,
      isAnimated: true,
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Happy Developers",
      value: happyDevelopers,
      isAnimated: true,
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Privacy Focused",
      value: "100%",
      isAnimated: false,
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center bg-card/50 border-border/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
              <CardHeader className="items-center">
                {stat.icon}
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold font-heading">
                  {stat.isAnimated ? stat.value.toLocaleString() + '+' : stat.value}
                </p>
                <p className="text-muted-foreground mt-2">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;