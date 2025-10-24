import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  Image, 
  Bell, 
  FileText,
  PlusCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

interface Metric {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  trend: "up" | "down" | "neutral";
}

interface Activity {
  id: number;
  type: "update" | "create" | "delete" | "login";
  description: string;
  user: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      title: "Total Students",
      value: 1250,
      change: 5.2,
      icon: <Users className="h-5 w-5" />,
      trend: "up"
    },
    {
      title: "Total Teachers",
      value: 78,
      change: 2.1,
      icon: <GraduationCap className="h-5 w-5" />,
      trend: "up"
    },
    {
      title: "Active Events",
      value: 12,
      change: -1.5,
      icon: <Calendar className="h-5 w-5" />,
      trend: "down"
    },
    {
      title: "Gallery Items",
      value: 342,
      change: 8.3,
      icon: <Image className="h-5 w-5" />,
      trend: "up"
    },
    {
      title: "Notices",
      value: 24,
      change: 0,
      icon: <Bell className="h-5 w-5" />,
      trend: "neutral"
    },
    {
      title: "Circulars",
      value: 18,
      change: 3.7,
      icon: <FileText className="h-5 w-5" />,
      trend: "up"
    },
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      type: "update",
      description: "Updated principal's message on homepage",
      user: "Admin User",
      timestamp: "2 minutes ago"
    },
    {
      id: 2,
      type: "create",
      description: "Added new event 'Annual Sports Day 2023'",
      user: "Content Editor",
      timestamp: "1 hour ago"
    },
    {
      id: 3,
      type: "upload",
      description: "Uploaded 15 new photos to 'School Trip' album",
      user: "Media Manager",
      timestamp: "3 hours ago"
    },
    {
      id: 4,
      type: "login",
      description: "Logged in to the system",
      user: "Admin User",
      timestamp: "5 hours ago"
    },
    {
      id: 5,
      type: "update",
      description: "Updated admission criteria for 2023-24",
      user: "Admin User",
      timestamp: "Yesterday"
    },
    {
      id: 6,
      type: "create",
      description: "Created new faculty profile for 'Dr. Sharma'",
      user: "HR Manager",
      timestamp: "Yesterday"
    },
    {
      id: 7,
      type: "delete",
      description: "Removed expired notice 'Fee Submission Last Date'",
      user: "Content Editor",
      timestamp: "2 days ago"
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "update":
        return <Badge className="bg-amber-500">UPDATE</Badge>;
      case "create":
        return <Badge className="bg-green-500">CREATE</Badge>;
      case "delete":
        return <Badge className="bg-red-500">DELETE</Badge>;
      case "login":
        return <Badge className="bg-blue-500">LOGIN</Badge>;
      case "upload":
        return <Badge className="bg-purple-500">UPLOAD</Badge>;
      default:
        return <Badge>ACTION</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case "down":
        return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      default:
        return <span className="h-4 w-4 inline-block"></span>;
    }
  };

  const getTrendClass = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const quickActions = [
    { title: "Add Event", icon: <Calendar className="h-5 w-5" />, href: "/admin/events/new" },
    { title: "Add Gallery", icon: <Image className="h-5 w-5" />, href: "/admin/gallery/upload" },
    { title: "Add Notice", icon: <Bell className="h-5 w-5" />, href: "/admin/homepage/notices/new" },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back, Admin!</h2>
            <p className="text-muted-foreground">Here's what's happening with your school website today.</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className="flex items-center gap-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-700 dark:hover:bg-blue-900/30"
                onClick={() => window.location.href = action.href}
              >
                <PlusCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                {action.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </CardTitle>
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    {metric.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center pt-1">
                    {getTrendIcon(metric.trend)}
                    <span className={`text-xs ${getTrendClass(metric.trend)}`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}% from last month
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Activity Log */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions performed on the website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                  <div className="mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{activity.user}</span>
                      <span className="mx-2">•</span>
                      <span>{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analytics Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Website Analytics</CardTitle>
            <CardDescription>Traffic and engagement metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="visitors">
              <TabsList className="mb-4">
                <TabsTrigger value="visitors">Visitors</TabsTrigger>
                <TabsTrigger value="pageviews">Page Views</TabsTrigger>
                <TabsTrigger value="engagement">Engagement</TabsTrigger>
              </TabsList>
              <TabsContent value="visitors" className="space-y-4">
                <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Visitor analytics chart will appear here</p>
                </div>
              </TabsContent>
              <TabsContent value="pageviews" className="space-y-4">
                <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Page views chart will appear here</p>
                </div>
              </TabsContent>
              <TabsContent value="engagement" className="space-y-4">
                <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Engagement metrics will appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}