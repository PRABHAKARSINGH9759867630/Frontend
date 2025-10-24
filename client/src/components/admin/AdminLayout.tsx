import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  FileEdit, 
  Image, 
  Calendar, 
  GraduationCap, 
  Users, 
  FileText, 
  Settings, 
  Bell, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  Sun,
  Moon,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ThemeProvider";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

interface NavItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  submenu?: { title: string; href: string }[];
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const [, setLocation] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  
  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("cms_auth_token") || sessionStorage.getItem("cms_auth_token");
    if (!token) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("cms_auth_token");
    sessionStorage.removeItem("cms_auth_token");
    localStorage.removeItem("cms_user_role");
    sessionStorage.removeItem("cms_user_role");
    setLocation("/admin/login");
  };

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  const navItems: NavItem[] = [
    { 
      title: "Dashboard", 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      href: "/admin/dashboard" 
    },
    { 
      title: "Homepage", 
      icon: <FileEdit className="h-5 w-5" />, 
      href: "/admin/homepage",
      submenu: [
        { title: "Hero Banners", href: "/admin/homepage/hero" },
        { title: "Principal's Message", href: "/admin/homepage/principal" },
        { title: "Notices", href: "/admin/homepage/notices" },
        { title: "Highlights", href: "/admin/homepage/highlights" },
      ]
    },
    { 
      title: "Events & News", 
      icon: <Calendar className="h-5 w-5" />, 
      href: "/admin/events",
      submenu: [
        { title: "Events", href: "/admin/events/list" },
        { title: "News", href: "/admin/events/news" },
        { title: "Achievements", href: "/admin/events/achievements" },
        { title: "Circulars", href: "/admin/events/circulars" },
      ]
    },
    { 
      title: "Gallery", 
      icon: <Image className="h-5 w-5" />, 
      href: "/admin/gallery",
      submenu: [
        { title: "Albums", href: "/admin/gallery/albums" },
        { title: "Upload Media", href: "/admin/gallery/upload" },
      ]
    },
    { 
      title: "Academics", 
      icon: <GraduationCap className="h-5 w-5" />, 
      href: "/admin/academics",
      submenu: [
        { title: "Curriculum", href: "/admin/academics/curriculum" },
        { title: "Departments", href: "/admin/academics/departments" },
        { title: "Academic Calendar", href: "/admin/academics/calendar" },
      ]
    },
    { 
      title: "Admissions", 
      icon: <Users className="h-5 w-5" />, 
      href: "/admin/admissions",
      submenu: [
        { title: "Applications", href: "/admin/admissions/applications" },
        { title: "Criteria", href: "/admin/admissions/criteria" },
        { title: "Important Dates", href: "/admin/admissions/dates" },
      ]
    },
    { 
      title: "Faculty", 
      icon: <Users className="h-5 w-5" />, 
      href: "/admin/faculty" 
    },
    { 
      title: "Pages", 
      icon: <FileText className="h-5 w-5" />, 
      href: "/admin/pages" 
    },
    { 
      title: "Settings", 
      icon: <Settings className="h-5 w-5" />, 
      href: "/admin/settings" 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white dark:bg-gray-800 shadow-md"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="absolute inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-xl flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src="/logo.png" 
                    alt="GD Goenka School" 
                    className="h-8 mr-2"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }} 
                  />
                  <span className="font-bold text-blue-900 dark:text-blue-400">GD Goenka CMS</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto py-4 px-3">
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <div key={item.title}>
                      {item.submenu ? (
                        <>
                          <button
                            onClick={() => toggleSubmenu(item.title)}
                            className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md font-medium ${openSubmenu === item.title ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                          >
                            <div className="flex items-center">
                              {item.icon}
                              <span className="ml-3">{item.title}</span>
                            </div>
                            <ChevronDown className={`h-4 w-4 transition-transform ${openSubmenu === item.title ? 'transform rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence>
                            {openSubmenu === item.title && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-6 mt-1 space-y-1"
                              >
                                {item.submenu.map((subitem) => (
                                  <a
                                    key={subitem.title}
                                    href={subitem.href}
                                    className="block px-3 py-2 text-sm rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setLocation(subitem.href);
                                      setIsMobileMenuOpen(false);
                                    }}
                                  >
                                    {subitem.title}
                                  </a>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <a
                          href={item.href}
                          className="flex items-center px-3 py-2 text-sm rounded-md font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={(e) => {
                            e.preventDefault();
                            setLocation(item.href);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          {item.icon}
                          <span className="ml-3">{item.title}</span>
                        </a>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign out
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-md transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="GD Goenka School" 
                className="h-8 mr-2"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }} 
              />
              <span className="font-bold text-blue-900 dark:text-blue-400">GD Goenka CMS</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <div key={item.title}>
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md font-medium ${openSubmenu === item.title ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                      >
                        <div className="flex items-center">
                          {item.icon}
                          <span className="ml-3">{item.title}</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openSubmenu === item.title ? 'transform rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openSubmenu === item.title && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-6 mt-1 space-y-1"
                          >
                            {item.submenu.map((subitem) => (
                              <a
                                key={subitem.title}
                                href={subitem.href}
                                className="block px-3 py-2 text-sm rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setLocation(subitem.href);
                                }}
                              >
                                {subitem.title}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a
                      href={item.href}
                      className="flex items-center px-3 py-2 text-sm rounded-md font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={(e) => {
                        e.preventDefault();
                        setLocation(item.href);
                      }}
                    >
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </a>
                  )}
                </div>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`${isSidebarOpen ? 'lg:ml-64' : ''} min-h-screen transition-all duration-300`}>
        {/* Top navbar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-4 hidden lg:flex"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-4 text-center text-sm">
                    No new notifications
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/admin-avatar.png" />
                      <AvatarFallback className="bg-blue-600 text-white">AD</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-block font-medium">Admin User</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLocation("/admin/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation("/admin/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-700">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}