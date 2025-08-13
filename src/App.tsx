import React, { Suspense } from "react";
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
import { Skeleton } from "./components/ui/skeleton";

const queryClient = new QueryClient();

const AppLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const PageLoader = () => (
  <div className="container mx-auto px-4 py-12">
    <div className="text-center mb-12">
      <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
      <Skeleton className="h-6 w-1/4 mx-auto" />
    </div>
    <div className="max-w-4xl mx-auto">
      <Skeleton className="h-64 w-full" />
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="toollab-theme">
      <FontProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route element={<AppLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/tools" element={<ToolsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                  <Route path="/disclaimer" element={<DisclaimerPage />} />
                  
                  {/* Add routes for all tools */}
                  {tools.map(tool => (
                    <Route key={tool.path} path={tool.path} element={<tool.component />} />
                  ))}

                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </FontProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;