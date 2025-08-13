import React from "react";

interface StaticPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const StaticPageLayout = ({ title, children }: StaticPageLayoutProps) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-heading mb-8">{title}</h1>
        <div className="prose prose-invert max-w-none prose-p:text-muted-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:marker:text-primary">
          {children}
        </div>
      </div>
    </div>
  );
};

export default StaticPageLayout;