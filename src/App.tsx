import React, { Suspense, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FontProvider } from "@/components/FontProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "./pages/HomePage";
import ToolsPage from "./pages/ToolsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import DisclaimerPage from "./pages/DisclaimerPage";
import NotFound from "./pages/NotFound";
import { tools } from "./data/tools";
import Loader from "./components/Loader";
import GlassBackground from "./components/GlassBackground";
import SkeletonCard from "./components/SkeletonCard";
import { BottomCreditsBar } from "./components/BottomCreditsBar";

const queryClient = new QueryClient();

const AppLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">
      <Suspense fallback={
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      }>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
    <BottomCreditsBar />
  </div>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Match loader animation duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="toollab-theme">
        <FontProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <GlassBackground />
            {isLoading && <Loader />}
            <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
              <BrowserRouter>
                <Routes>
                  <Route element={<AppLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/tools" element={<ToolsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                    <Route path="/disclaimer" element={<DisclaimerPage />} />
                    
                    {tools.map(tool => (
                      <Route key={tool.path} path={tool.path} element={<tool.component />} />
                    ))}
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </div>
          </TooltipProvider>
        </FontProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;