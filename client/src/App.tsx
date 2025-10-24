import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { FloatingShapes } from "@/components/FloatingShapes";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AccessibilityEnhancer } from "@/components/AccessibilityEnhancer";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Academics from "@/pages/Academics";
import Admissions from "@/pages/Admissions";
import Activities from "@/pages/Activities";
import Events from "@/pages/Events";
import Gallery from "@/pages/Gallery";
import Achievements from "@/pages/Achievements";
import Contact from "@/pages/Contact";
import StrapiTestPage from "@/pages/StrapiTestPage";
import BannerDemo from "@/pages/BannerDemo";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/academics" component={Academics} />
      <Route path="/admissions" component={Admissions} />
      <Route path="/activities" component={Activities} />
      <Route path="/events" component={Events} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/achievements" component={Achievements} />
      <Route path="/contact" component={Contact} />
      <Route path="/strapi-test" component={StrapiTestPage} />
      <Route path="/banner-demo" component={BannerDemo} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Set CSS var for header offset so anchors respect the fixed header height
  useEffect(() => {
    const updateHeaderOffset = () => {
      const header = document.getElementById("app-header");
      const height = header ? header.offsetHeight : 72;
      document.documentElement.style.setProperty("--header-offset", `${height + 8}px`);
    };
    updateHeaderOffset();
    window.addEventListener("resize", updateHeaderOffset);
    return () => window.removeEventListener("resize", updateHeaderOffset);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            {/* Add floating shapes for the entire app */}
            <FloatingShapes />
            <AccessibilityEnhancer />
            <SmoothScroll>
              <div className="relative z-10">
                <Header />
                <Router />
                <Footer />
              </div>
            </SmoothScroll>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
