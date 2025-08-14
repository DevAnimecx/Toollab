import React, { Suspense, useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FontProvider } from "@/components/FontProvider";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { AuthProvider } from "@/context/AuthContext";
import { SeasonalThemeProvider, useSeasonalTheme } from "./context/SeasonalThemeProvider";
import { IndependenceDayPopup } from "./components/seasonal/IndependenceDayPopup";
import { IndependenceDayOverlay } from "./components/seasonal/IndependenceDayOverlay";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "./pages/HomePage";
import ToolsPage from "./pages/ToolsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import DisclaimerPage from "./pages/DisclaimerPage";
import StatusPage from "./pages/StatusPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdsManagementPage from "./pages/admin/AdsManagementPage";
import NotFound from "./pages/NotFound";
import { tools } from "./data/tools";
import Loader from "./components/Loader";
import GlassBackground from "./components/GlassBackground";
import SkeletonCard from "./components/SkeletonCard";
import SlimSnowHeader from "./components/SlimSnowHeader";
import Sitemap from "./pages/Sitemap";
import BlogIndexPage from "./pages/BlogIndexPage";
import BlogPostPage from "./pages/BlogPostPage";
import ChangelogPage from "./pages/ChangelogPage";

const queryClient = new QueryClient();

const AppLayout = () => (
  <div className="min-h-screen flex flex-col">
    <SlimSnowHeader />
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
  </div>
);

const AppContent = () => {
  const { isIndependenceDay } = useSeasonalTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isIndependenceDay && (
        <>
          <IndependenceDayOverlay />
          <IndependenceDayPopup />
        </>
      )}
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
              <Route path="/status" element={<StatusPage />} />
              <Route path="/changelog" element={<ChangelogPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/ads" element={<AdsManagementPage />} />
              <Route path="/blog" element={<BlogIndexPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              
              {tools.map(tool => (
                <Route key={tool.path} path={tool.path} element={<tool.component />} />
              ))}
            </Route>
            <Route path="/sitemap.xml" element={<Sitemap />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="toollab-theme">
          <FontProvider>
            <SeasonalThemeProvider>
              <FavoritesProvider>
                <AuthProvider>
                  <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <GlassBackground />
                    <AppContent />
                  </TooltipProvider>
                </AuthProvider>
              </FavoritesProvider>
            </SeasonalThemeProvider>
          </FontProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;