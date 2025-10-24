import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  Calendar as CalendarIcon, 
  PlusCircle, 
  Trash2, 
  Pencil, 
  Upload, 
  Save,
  Clock,
  MapPin,
  Tag,
  FileText,
  Search,
  Filter,
  ChevronDown
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
  category: string;
  featured: boolean;
  imageUrl?: string;
  attachments?: { name: string; url: string }[];
  published: boolean;
}

const categories = [
  "Academic", "Sports", "Cultural", "Competition", "Workshop", "Celebration", "Other"
];

export default function EventsManager() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Annual Sports Day 2023",
      description: "Join us for the annual sports day celebration featuring track and field events, team sports competitions, and exciting games for all age groups.",
      startDate: new Date(2023, 7, 25, 9, 0), // August 25, 2023, 9:00 AM
      endDate: new Date(2023, 7, 25, 17, 0), // August 25, 2023, 5:00 PM
      location: "School Sports Ground",
      category: "Sports",
      featured: true,
      imageUrl: "/images/events/sports-day.jpg",
      attachments: [
        { name: "Schedule.pdf", url: "/documents/sports-day-schedule.pdf" },
        { name: "Rules.pdf", url: "/documents/sports-day-rules.pdf" }
      ],
      published: true
    },
    {
      id: "2",
      title: "Science Exhibition",
      description: "Students will showcase their innovative science projects and experiments. Parents and community members are invited to attend and encourage young scientists.",
      startDate: new Date(2023, 6, 20, 10, 0), // July 20, 2023, 10:00 AM
      endDate: new Date(2023, 6, 20, 16, 0), // July 20, 2023, 4:00 PM
      location: "School Auditorium",
      category: "Academic",
      featured: true,
      imageUrl: "/images/events/science-exhibition.jpg",
      published: true
    },
    {
      id: "3",
      title: "Parent-Teacher Meeting",
      description: "Discuss your child's academic progress and development with teachers. Individual time slots will be allocated to each parent.",
      startDate: new Date(2023, 6, 10, 9, 0), // July 10, 2023, 9:00 AM
      endDate: new Date(2023, 6, 10, 15, 0), // July 10, 2023, 3:00 PM
      location: "Respective Classrooms",
      category: "Academic",
      featured: false,
      published: true
    },
    {
      id: "4",
      title: "Annual Day Celebration",
      description: "Join us for a cultural extravaganza featuring performances by students across all grades. The event will showcase dance, music, drama, and more.",
      startDate: new Date(2023, 11, 15, 17, 0), // December 15, 2023, 5:00 PM
      endDate: new Date(2023, 11, 15, 21, 0), // December 15, 2023, 9:00 PM
      location: "School Auditorium",
      category: "Cultural",
      featured: true,
      imageUrl: "/images/events/annual-day.jpg",
      published: false
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({ 
    title: "", 
    description: "", 
    startDate: new Date(), 
    category: "Academic", 
    featured: false, 
    published: true 
  });
  const [attachmentName, setAttachmentName] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");

  // Filter events based on search term and filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? event.category === categoryFilter : true;
    const matchesStatus = statusFilter ? 
      (statusFilter === "published" ? event.published : !event.published) : true;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Function to handle event selection for editing
  const handleSelectEvent = (event: Event) => {
    setSelectedEvent({...event});
    setIsDialogOpen(true);
  };

  // Function to create a new event
  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setNewEvent({ 
      title: "", 
      description: "", 
      startDate: new Date(), 
      category: "Academic", 
      featured: false, 
      published: true 
    });
    setIsDialogOpen(true);
  };

  // Function to save event (create or update)
  const handleSaveEvent = () => {
    if (selectedEvent) {
      // Update existing event
      setEvents(prev => 
        prev.map(event => 
          event.id === selectedEvent.id ? selectedEvent : event
        )
      );
    } else {
      // Create new event
      const event: Event = {
        id: Date.now().toString(),
        ...newEvent,
        attachments: []
      };
      
      setEvents(prev => [...prev, event]);
    }
    
    setIsDialogOpen(false);
  };

  // Function to delete event
  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    if (selectedEvent?.id === id) {
      setSelectedEvent(null);
      setIsDialogOpen(false);
    }
  };

  // Function to add attachment to event
  const handleAddAttachment = () => {
    if (!attachmentName || !attachmentUrl) return;
    
    const attachment = { name: attachmentName, url: attachmentUrl };
    
    if (selectedEvent) {
      const updatedAttachments = [...(selectedEvent.attachments || []), attachment];
      setSelectedEvent({...selectedEvent, attachments: updatedAttachments});
    }
    
    setAttachmentName("");
    setAttachmentUrl("");
  };

  // Function to remove attachment from event
  const handleRemoveAttachment = (index: number) => {
    if (!selectedEvent || !selectedEvent.attachments) return;
    
    const updatedAttachments = [...selectedEvent.attachments];
    updatedAttachments.splice(index, 1);
    
    setSelectedEvent({...selectedEvent, attachments: updatedAttachments});
  };

  // Function to toggle event published status
  const handleTogglePublished = (id: string) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === id ? {...event, published: !event.published} : event
      )
    );
  };

  // Function to toggle event featured status
  const handleToggleFeatured = (id: string) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === id ? {...event, featured: !event.featured} : event
      )
    );
  };

  return (
    <AdminLayout title="Events Management">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={categoryFilter || ""}
                      onChange={(e) => setCategoryFilter(e.target.value || null)}
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={statusFilter || ""}
                      onChange={(e) => setStatusFilter(e.target.value || null)}
                    >
                      <option value="">All Statuses</option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchTerm("");
                        setCategoryFilter(null);
                        setStatusFilter(null);
                      }}
                    >
                      Reset
                    </Button>
                    <Button onClick={() => {}}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          <Button onClick={handleCreateEvent} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" /> Add New Event
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="h-full flex flex-col">
                  {event.imageUrl ? (
                    <div className="relative aspect-video w-full overflow-hidden">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title} 
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        {event.featured && (
                          <Badge className="bg-amber-500">
                            Featured
                          </Badge>
                        )}
                        <Badge className={event.published ? "bg-green-500" : "bg-gray-500"}>
                          {event.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-video w-full bg-muted flex items-center justify-center">
                      <CalendarIcon className="h-12 w-12 text-muted-foreground/50" />
                      <div className="absolute top-2 right-2 flex gap-1">
                        {event.featured && (
                          <Badge className="bg-amber-500">
                            Featured
                          </Badge>
                        )}
                        <Badge className={event.published ? "bg-green-500" : "bg-gray-500"}>
                          {event.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                    </div>
                  )}
                  
                  <CardContent className="flex-1 pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {event.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {format(event.startDate, "MMM d, yyyy")}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {event.description}
                    </p>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>
                          {format(event.startDate, "h:mm a")} - 
                          {event.endDate ? format(event.endDate, "h:mm a") : "TBD"}
                        </span>
                      </div>
                      
                      {event.location && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTogglePublished(event.id)}
                      >
                        {event.published ? "Unpublish" : "Publish"}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleToggleFeatured(event.id)}
                      >
                        {event.featured ? "Unfeature" : "Feature"}
                      </Button>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleSelectEvent(event)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <CalendarIcon className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="font-medium text-lg">No events found</h3>
              <p className="text-muted-foreground mt-1">
                {searchTerm || categoryFilter || statusFilter ? 
                  "Try adjusting your search or filters" : 
                  "Create your first event to get started"}
              </p>
              {(searchTerm || categoryFilter || statusFilter) && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter(null);
                    setStatusFilter(null);
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Event Dialog (Create/Edit) */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedEvent ? "Edit Event" : "Create New Event"}
            </DialogTitle>
            <DialogDescription>
              {selectedEvent ? "Update the event details below" : "Fill in the event details below"}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Event Details</TabsTrigger>
              <TabsTrigger value="schedule">Schedule & Location</TabsTrigger>
              <TabsTrigger value="media">Media & Attachments</TabsTrigger>
            </TabsList>
            
            {/* Event Details Tab */}
            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input 
                  id="title" 
                  value={selectedEvent ? selectedEvent.title : newEvent.title}
                  onChange={(e) => selectedEvent ? 
                    setSelectedEvent({...selectedEvent, title: e.target.value}) : 
                    setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="Enter event title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description" 
                  value={selectedEvent ? selectedEvent.description : newEvent.description}
                  onChange={(e) => selectedEvent ? 
                    setSelectedEvent({...selectedEvent, description: e.target.value}) : 
                    setNewEvent({...newEvent, description: e.target.value})}
                  placeholder="Enter event description"
                  rows={5}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedEvent ? selectedEvent.category : newEvent.category}
                  onChange={(e) => selectedEvent ? 
                    setSelectedEvent({...selectedEvent, category: e.target.value}) : 
                    setNewEvent({...newEvent, category: e.target.value})}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="published"
                  checked={selectedEvent ? selectedEvent.published : newEvent.published}
                  onCheckedChange={(checked) => selectedEvent ? 
                    setSelectedEvent({...selectedEvent, published: checked}) : 
                    setNewEvent({...newEvent, published: checked})}
                />
                <Label htmlFor="published">Publish event</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="featured"
                  checked={selectedEvent ? selectedEvent.featured : newEvent.featured}
                  onCheckedChange={(checked) => selectedEvent ? 
                    setSelectedEvent({...selectedEvent, featured: checked}) : 
                    setNewEvent({...newEvent, featured: checked})}
                />
                <Label htmlFor="featured">Feature on homepage</Label>
              </div>
            </TabsContent>
            
            {/* Schedule & Location Tab */}
            <TabsContent value="schedule" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <div className="grid gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedEvent && !newEvent.startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedEvent ? 
                            format(selectedEvent.startDate, "PPP") : 
                            newEvent.startDate ? format(newEvent.startDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedEvent ? selectedEvent.startDate : newEvent.startDate}
                          onSelect={(date) => selectedEvent ? 
                            setSelectedEvent({...selectedEvent, startDate: date || new Date()}) : 
                            setNewEvent({...newEvent, startDate: date || new Date()})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    
                    <div className="flex space-x-2">
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={selectedEvent ? 
                          selectedEvent.startDate.getHours() : 
                          newEvent.startDate.getHours()}
                        onChange={(e) => {
                          const hours = parseInt(e.target.value);
                          if (selectedEvent) {
                            const newDate = new Date(selectedEvent.startDate);
                            newDate.setHours(hours);
                            setSelectedEvent({...selectedEvent, startDate: newDate});
                          } else {
                            const newDate = new Date(newEvent.startDate);
                            newDate.setHours(hours);
                            setNewEvent({...newEvent, startDate: newDate});
                          }
                        }}
                      >
                        {Array.from({ length: 24 }, (_, i) => (
                          <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                        ))}
                      </select>
                      <span className="flex items-center">:</span>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={selectedEvent ? 
                          selectedEvent.startDate.getMinutes() : 
                          newEvent.startDate.getMinutes()}
                        onChange={(e) => {
                          const minutes = parseInt(e.target.value);
                          if (selectedEvent) {
                            const newDate = new Date(selectedEvent.startDate);
                            newDate.setMinutes(minutes);
                            setSelectedEvent({...selectedEvent, startDate: newDate});
                          } else {
                            const newDate = new Date(newEvent.startDate);
                            newDate.setMinutes(minutes);
                            setNewEvent({...newEvent, startDate: newDate});
                          }
                        }}
                      >
                        {Array.from({ length: 60 }, (_, i) => (
                          <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <div className="grid gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedEvent?.endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedEvent?.endDate ? 
                            format(selectedEvent.endDate, "PPP") : 
                            "Pick a date (optional)"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedEvent?.endDate}
                          onSelect={(date) => {
                            if (selectedEvent) {
                              setSelectedEvent({...selectedEvent, endDate: date || undefined});
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    
                    {selectedEvent?.endDate && (
                      <div className="flex space-x-2">
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={selectedEvent.endDate.getHours()}
                          onChange={(e) => {
                            const hours = parseInt(e.target.value);
                            if (selectedEvent?.endDate) {
                              const newDate = new Date(selectedEvent.endDate);
                              newDate.setHours(hours);
                              setSelectedEvent({...selectedEvent, endDate: newDate});
                            }
                          }}
                        >
                          {Array.from({ length: 24 }, (_, i) => (
                            <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                          ))}
                        </select>
                        <span className="flex items-center">:</span>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={selectedEvent.endDate.getMinutes()}
                          onChange={(e) => {
                            const minutes = parseInt(e.target.value);
                            if (selectedEvent?.endDate) {
                              const newDate = new Date(selectedEvent.endDate);
                              newDate.setMinutes(minutes);
                              setSelectedEvent({...selectedEvent, endDate: newDate});
                            }
                          }}
                        >
                          {Array.from({ length: 60 }, (_, i) => (
                            <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  value={selectedEvent?.location || ""}
                  onChange={(e) => selectedEvent ? 
                    setSelectedEvent({...selectedEvent, location: e.target.value}) : 
                    setNewEvent({...newEvent, location: e.target.value})}
                  placeholder="Enter event location"
                />
              </div>
            </TabsContent>
            
            {/* Media & Attachments Tab */}
            <TabsContent value="media" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Event Image</Label>
                <div className="flex gap-2">
                  <Input 
                    id="imageUrl" 
                    value={selectedEvent?.imageUrl || ""}
                    onChange={(e) => selectedEvent ? 
                      setSelectedEvent({...selectedEvent, imageUrl: e.target.value}) : 
                      setNewEvent({...newEvent, imageUrl: e.target.value})}
                    placeholder="Enter image URL or upload"
                    className="flex-1"
                  />
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" /> Browse
                  </Button>
                </div>
                
                {(selectedEvent?.imageUrl || newEvent.imageUrl) && (
                  <div className="mt-2 aspect-video w-full max-w-md overflow-hidden rounded-md">
                    <img 
                      src={selectedEvent?.imageUrl || newEvent.imageUrl} 
                      alt="Event preview" 
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/600x400?text=Image+Preview";
                      }}
                    />
                  </div>
                )}
              </div>
              
              {selectedEvent && (
                <div className="space-y-4 border-t pt-4">
                  <h4 className="font-medium">Attachments</h4>
                  
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Attachment name"
                      value={attachmentName}
                      onChange={(e) => setAttachmentName(e.target.value)}
                      className="flex-1"
                    />
                    <Input 
                      placeholder="Attachment URL"
                      value={attachmentUrl}
                      onChange={(e) => setAttachmentUrl(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleAddAttachment}>
                      <PlusCircle className="h-4 w-4 mr-2" /> Add
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {selectedEvent.attachments && selectedEvent.attachments.length > 0 ? (
                      selectedEvent.attachments.map((attachment, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-2 border rounded-md"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>{attachment.name}</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleRemoveAttachment(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No attachments added yet
                      </p>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEvent}>
              {selectedEvent ? "Update Event" : "Create Event"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}