import { tools } from "@/data/tools";
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
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: <Code className="h-8 w-8 text-accent-text" />, title: "Tools Available", value: totalTools, isAnimated: false },
    { icon: <Heart className="h-8 w-8 text-accent-everyday" />, title: "Projects Powered", value: projectsPowered, isAnimated: true },
    { icon: <Users className="h-8 w-8 text-accent-file" />, title: "Happy Developers", value: happyDevelopers, isAnimated: true },
    { icon: <ShieldCheck className="h-8 w-8 text-accent-security" />, title: "Privacy Focused", value: "100%", isAnimated: false },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="relative text-center p-6 rounded-xl overflow-hidden transition-all duration-300 ease-out bg-[rgba(19,43,71,0.65)] backdrop-blur-lg border border-white/10 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <p className="text-4xl font-bold font-heading">
                {stat.isAnimated ? stat.value.toLocaleString() + '+' : stat.value}
              </p>
              <p className="text-muted-foreground mt-2">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;