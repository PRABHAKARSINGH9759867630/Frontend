import { Moon, Sun, Menu, X, Languages, Home, Info, BookOpen, Calendar, Images, Phone as PhoneIcon, Grid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.academics"), href: "/academics" },
    { label: t("nav.admissions"), href: "/admissions" },
    { label: t("nav.activities"), href: "/activities" },
    { label: t("nav.events"), href: "/events" },
    { label: t("nav.gallery"), href: "/gallery" },
    { label: t("nav.achievements"), href: "/achievements" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <>
      <div className="bg-primary text-primary-foreground py-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-4">
            <span>📧 Contact@gdgoenkarudrapur.com</span>
            <span>+7060037789<br /></span>
            <span>7060047789</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/10"
              data-testid="link-admissions"
            >
              {t("header.admissions")}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/10"
              data-testid="link-careers"
            >
              {t("header.careers")}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/10"
              data-testid="https://gdgr.udtweb.com/"
            >
              {t("header.erp")}
            </Button>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b" id="app-header">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3" data-testid="link-home">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold text-xl">
                GD
              </div>
              <div>
                <div className="font-bold text-lg">GD Goenka Public School</div>
                <div className="text-xs text-muted-foreground">{t("header.tagline")}</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={location === item.href ? "text-primary" : ""}
                    data-testid={`nav-${item.label.toLowerCase().replace(" ", "-")}`}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" data-testid="button-language-toggle">
                    <Languages className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => setLanguage("en")}
                    className={language === "en" ? "bg-accent" : ""}
                    data-testid="language-en"
                  >
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setLanguage("hi")}
                    className={language === "hi" ? "bg-accent" : ""}
                    data-testid="language-hi"
                  >
                    हिन्दी (Hindi)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                data-testid="button-theme-toggle"
              >
                {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto h-full flex flex-col">
              <div className="flex items-center justify-between px-4 h-16 border-b">
                <span className="font-semibold">Menu</span>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <nav className="flex-1 overflow-y-auto px-4 py-6 grid grid-cols-1 gap-3">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={location === item.href ? "default" : "outline"}
                      className="w-full justify-start h-14 text-base"
                      onClick={() => setIsMobileMenuOpen(false)}
                      data-testid={`nav-mobile-${item.label.toLowerCase().replace(" ", "-")}`}
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Bottom Tab Bar - Mobile Only */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t bg-background/95 backdrop-blur-sm" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="max-w-7xl mx-auto px-2 py-1">
          <div className="grid grid-cols-5 gap-1">
            <Link href="/">
              <Button variant="ghost" className={`w-full flex flex-col items-center py-2 ${location === "/" ? "text-primary" : ""}`}>
                <Home className="w-5 h-5" />
                <span className="text-[10px]">Home</span>
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" className={`w-full flex flex-col items-center py-2 ${location === "/about" ? "text-primary" : ""}`}>
                <Info className="w-5 h-5" />
                <span className="text-[10px]">About</span>
              </Button>
            </Link>
            <Link href="/academics">
              <Button variant="ghost" className={`w-full flex flex-col items-center py-2 ${location === "/academics" ? "text-primary" : ""}`}>
                <BookOpen className="w-5 h-5" />
                <span className="text-[10px]">Academics</span>
              </Button>
            </Link>
            <Link href="/events">
              <Button variant="ghost" className={`w-full flex flex-col items-center py-2 ${location === "/events" ? "text-primary" : ""}`}>
                <Calendar className="w-5 h-5" />
                <span className="text-[10px]">Events</span>
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" className={`w-full flex flex-col items-center py-2 ${location === "/contact" ? "text-primary" : ""}`}>
                <PhoneIcon className="w-5 h-5" />
                <span className="text-[10px]">Contact</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
