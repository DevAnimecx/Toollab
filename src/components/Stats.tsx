import { tools } from "@/data/tools";
import { Code, Users, ShieldCheck } from "lucide-react";

const Stats = () => {
  const stats = [
    { icon: <Code className="h-6 w-6 text-accent-text" />, value: `${tools.length}+`, label: "Tools" },
    { icon: <Users className="h-6 w-6 text-accent-everyday" />, value: "1M+", label: "Users Served" },
    { icon: <ShieldCheck className="h-6 w-6 text-accent-security" />, value: "0 Ads", label: "Privacy Focused" },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl bg-secondary/40 backdrop-blur-lg border border-white/10 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                {stat.icon}
                <p className="text-4xl font-bold font-heading mt-2">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;