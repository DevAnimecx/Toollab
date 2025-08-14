import { tools } from "@/data/tools";
import { Code, Users, ShieldCheck } from "lucide-react";

const Stats = () => {
  const stats = [
    { icon: <Code className="h-8 w-8 text-primary" />, value: `${tools.length}+`, label: "Tools Available" },
    { icon: <Users className="h-8 w-8 text-primary" />, value: "1M+", label: "Users Served Monthly" },
    { icon: <ShieldCheck className="h-8 w-8 text-primary" />, value: "100%", label: "Client-Side & Private" },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl bg-card border">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {stats.map((stat, index) => (
              <div key={index} className="p-8 flex flex-col items-center text-center">
                <div className="p-4 bg-background rounded-full mb-4 border">
                  {stat.icon}
                </div>
                <p className="text-4xl font-bold font-heading">{stat.value}</p>
                <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;