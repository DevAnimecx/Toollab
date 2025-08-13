import React from 'react';
import Logo from '@/components/Logo';
import Stats from '@/components/Stats';
import { CheckCircle } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center py-16 rounded-2xl bg-secondary/40 border border-white/10">
        <h1 className="text-5xl font-extrabold font-heading">About Toollab</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          We're on a mission to build the best suite of client-side tools, focusing on speed, privacy, and elegant design.
        </p>
      </section>

      <section className="py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold">Our Vision</h2>
          <p className="mt-4 text-muted-foreground">
            In an era where data privacy is paramount, we saw a need for a tool hub that operates entirely within your browser. Toollab was born from this vision. We believe that you shouldn't have to compromise on security or speed to get your daily tasks done. Whether you're a developer, a designer, a student, or just a curious internet user, Toollab is built for you.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold">Privacy First</h3>
              <p className="text-sm text-muted-foreground">All our tools are 100% client-side. Your files and data never leave your computer.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold">Blazing Fast</h3>
              <p className="text-sm text-muted-foreground">Since everything happens in your browser, there are no upload times or server processing delays.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold">Completely Free</h3>
              <p className="text-sm text-muted-foreground">Access over 70+ tools without any cost, ads, or hidden fees.</p>
            </div>
          </div>
        </div>
      </section>

      <Stats />
    </div>
  );
};

export default AboutPage;