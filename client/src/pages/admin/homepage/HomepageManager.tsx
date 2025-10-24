import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { PlusCircle, X, Trash2, GripVertical, Upload, Save, Eye } from "lucide-react";
import { motion } from "framer-motion";

interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  active: boolean;
}

interface HeroImage {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Notice {
  id: string;
  text: string;
  link?: string;
  active: boolean;
}

interface Highlight {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
  type: "achievement" | "event" | "link";
}

export default function HomepageManager() {
  const [heroBanners, setHeroBanners] = useState<HeroBanner[]>([
    {
      id: "1",
      title: "Welcome to SchoolPilot",
      subtitle: "Nurturing minds, shaping futures",
      buttonText: "Learn More",
      buttonLink: "/about",
      imageUrl: "/images/hero-1.jpg",
      active: true
    },
    {
      id: "2",
      title: "Admissions Open 2023-24",
      subtitle: "Join our community of learners",
      buttonText: "Apply Now",
      buttonLink: "/admissions",
      imageUrl: "/images/hero-2.jpg",
      active: true
    }
  ]);

  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [principalMessage, setPrincipalMessage] = useState({
    id: "",
    name: "Dr. Rajesh Kumar",
    title: "Principal's Message",
    message: "Dear Parents and Students,\n\nIt gives me immense pleasure to welcome you to SchoolPilot. Our institution is committed to providing quality education with a focus on holistic development of students. We believe in nurturing not just academic excellence but also moral values and life skills that prepare our students for the challenges of tomorrow.\n\nAt SchoolPilot, we strive to create a learning environment that encourages curiosity, creativity, and critical thinking. Our dedicated faculty members work tirelessly to ensure that each student receives personalized attention and guidance.\n\nI invite you to explore our website and learn more about our academic programs, extracurricular activities, and achievements.\n\nWarm regards,\nDr. Rajesh Kumar",
    heroImageId: ""
  });

  const [notices, setNotices] = useState<Notice[]>([
    { id: "1", text: "Fee submission last date extended to 15th July 2023", active: true },
    { id: "2", text: "Annual Sports Day scheduled for 25th August 2023", link: "/events/sports-day", active: true },
    { id: "3", text: "Parent-Teacher Meeting on 10th July 2023", active: true },
    { id: "4", text: "Summer vacation from 15th May to 30th June 2023", active: false }
  ]);

  const [highlights, setHighlights] = useState<Highlight[]>([
    {
      id: "1",
      title: "100% Board Results",
      description: "Our students achieved 100% pass results in CBSE Board Examinations 2023",
      imageUrl: "/images/achievement-1.jpg",
      type: "achievement"
    },
    {
      id: "2",
      title: "Science Exhibition",
      description: "Annual Science Exhibition on 20th July 2023",
      imageUrl: "/images/event-1.jpg",
      link: "/events/science-exhibition",
      type: "event"
    },
    {
      id: "3",
      title: "Admission Portal",
      description: "Apply online for the academic year 2023-24",
      link: "/admissions",
      type: "link"
    }
  ]);

  const [selectedBanner, setSelectedBanner] = useState<HeroBanner | null>(null);
  const [newNotice, setNewNotice] = useState<Omit<Notice, 'id'>>({ text: "", active: true });
  const [newHighlight, setNewHighlight] = useState<Omit<Highlight, 'id'>>({ 
    title: "", 
    description: "", 
    type: "achievement" 
  });
  const [newHeroImage, setNewHeroImage] = useState<Omit<HeroImage, 'id' | 'createdAt' | 'updatedAt'>>({
    name: "",
    imageUrl: "",
    description: "",
    isActive: true
  });

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch hero images
        const heroImagesResponse = await fetch('/api/hero-images');
        if (heroImagesResponse.ok) {
          const heroImagesData = await heroImagesResponse.json();
          setHeroImages(heroImagesData);
        }

        // Fetch principal message
        const principalMessageResponse = await fetch('/api/principal-message');
        if (principalMessageResponse.ok) {
          const principalMessageData = await principalMessageResponse.json();
          setPrincipalMessage(principalMessageData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to handle banner selection for editing
  const handleSelectBanner = (banner: HeroBanner) => {
    setSelectedBanner({...banner});
  };

  // Function to update banner
  const handleUpdateBanner = () => {
    if (!selectedBanner) return;
    
    setHeroBanners(prev => 
      prev.map(banner => 
        banner.id === selectedBanner.id ? selectedBanner : banner
      )
    );
    
    // In a real app, you would save to backend here
    alert("Banner updated successfully!");
  };

  // Function to add new banner
  const handleAddBanner = () => {
    const newBanner: HeroBanner = {
      id: Date.now().toString(),
      title: "New Banner",
      subtitle: "Banner Subtitle",
      buttonText: "Click Here",
      buttonLink: "/",
      imageUrl: "/images/placeholder.jpg",
      active: true
    };
    
    setHeroBanners(prev => [...prev, newBanner]);
    setSelectedBanner(newBanner);
  };

  // Function to delete banner
  const handleDeleteBanner = (id: string) => {
    setHeroBanners(prev => prev.filter(banner => banner.id !== id));
    if (selectedBanner?.id === id) {
      setSelectedBanner(null);
    }
  };

  // Function to update principal's message
  const handleUpdatePrincipalMessage = async () => {
    try {
      if (principalMessage.id) {
        // Update existing message
        const response = await fetch(`/api/principal-message/${principalMessage.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: principalMessage.name,
            title: principalMessage.title,
            message: principalMessage.message,
            heroImageId: principalMessage.heroImageId
          }),
        });

        if (response.ok) {
          alert("Principal's message updated successfully!");
        } else {
          alert("Failed to update principal's message");
        }
      } else {
        // Create new message
        const response = await fetch('/api/principal-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: principalMessage.name,
            title: principalMessage.title,
            message: principalMessage.message,
            heroImageId: principalMessage.heroImageId
          }),
        });

        if (response.ok) {
          const newMessage = await response.json();
          setPrincipalMessage(newMessage);
          alert("Principal's message created successfully!");
        } else {
          alert("Failed to create principal's message");
        }
      }
    } catch (error) {
      console.error('Error updating principal message:', error);
      alert("Error updating principal's message");
    }
  };

  // Hero Image management functions
  const handleAddHeroImage = async () => {
    if (!newHeroImage.name.trim() || !newHeroImage.imageUrl.trim()) return;
    
    try {
      const response = await fetch('/api/hero-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHeroImage),
      });

      if (response.ok) {
        const newImage = await response.json();
        setHeroImages(prev => [...prev, newImage]);
        setNewHeroImage({
          name: "",
          imageUrl: "",
          description: "",
          isActive: true
        });
        alert("Hero image added successfully!");
      } else {
        alert("Failed to add hero image");
      }
    } catch (error) {
      console.error('Error adding hero image:', error);
      alert("Error adding hero image");
    }
  };

  const handleDeleteHeroImage = async (id: string) => {
    try {
      const response = await fetch(`/api/hero-images/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setHeroImages(prev => prev.filter(img => img.id !== id));
        // If this was the selected hero image for principal message, clear it
        if (principalMessage.heroImageId === id) {
          setPrincipalMessage(prev => ({ ...prev, heroImageId: "" }));
        }
        alert("Hero image deleted successfully!");
      } else {
        alert("Failed to delete hero image");
      }
    } catch (error) {
      console.error('Error deleting hero image:', error);
      alert("Error deleting hero image");
    }
  };

  // Function to add new notice
  const handleAddNotice = () => {
    if (!newNotice.text.trim()) return;
    
    const notice: Notice = {
      id: Date.now().toString(),
      ...newNotice
    };
    
    setNotices(prev => [...prev, notice]);
    setNewNotice({ text: "", active: true });
  };

  // Function to delete notice
  const handleDeleteNotice = (id: string) => {
    setNotices(prev => prev.filter(notice => notice.id !== id));
  };

  // Function to toggle notice active status
  const handleToggleNoticeStatus = (id: string) => {
    setNotices(prev => 
      prev.map(notice => 
        notice.id === id ? {...notice, active: !notice.active} : notice
      )
    );
  };

  // Function to add new highlight
  const handleAddHighlight = () => {
    if (!newHighlight.title.trim() || !newHighlight.description.trim()) return;
    
    const highlight: Highlight = {
      id: Date.now().toString(),
      ...newHighlight
    };
    
    setHighlights(prev => [...prev, highlight]);
    setNewHighlight({ 
      title: "", 
      description: "", 
      type: "achievement" 
    });
  };

  // Function to delete highlight
  const handleDeleteHighlight = (id: string) => {
    setHighlights(prev => prev.filter(highlight => highlight.id !== id));
  };

  // Function to handle drag and drop for notices
  const handleDragEndNotices = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(notices);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setNotices(items);
  };

  // Function to handle drag and drop for highlights
  const handleDragEndHighlights = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(highlights);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setHighlights(items);
  };

  return (
    <AdminLayout title="Homepage Management">
      <div className="space-y-6">
        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="hero">Hero Banners</TabsTrigger>
            <TabsTrigger value="hero-images">Hero Images</TabsTrigger>
            <TabsTrigger value="principal">Principal's Message</TabsTrigger>
            <TabsTrigger value="notices">Scrolling Notices</TabsTrigger>
            <TabsTrigger value="highlights">Highlights</TabsTrigger>
          </TabsList>
          
          {/* Hero Banners Tab */}
          <TabsContent value="hero" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Manage Hero Banners</h3>
              <Button onClick={handleAddBanner} className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" /> Add Banner
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1 space-y-4">
                {heroBanners.map((banner) => (
                  <Card 
                    key={banner.id} 
                    className={`cursor-pointer ${selectedBanner?.id === banner.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handleSelectBanner(banner)}
                  >
                    <CardContent className="p-4">
                      <div className="relative aspect-video w-full overflow-hidden rounded-md mb-2">
                        <img 
                          src={banner.imageUrl} 
                          alt={banner.title} 
                          className="object-cover w-full h-full"
                        />
                        {!banner.active && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-medium">Inactive</span>
                          </div>
                        )}
                      </div>
                      <h4 className="font-medium truncate">{banner.title}</h4>
                      <div className="flex justify-between items-center mt-2">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteBanner(banner.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Switch 
                          checked={banner.active} 
                          onCheckedChange={(checked) => {
                            const updatedBanner = {...banner, active: checked};
                            setHeroBanners(prev => 
                              prev.map(b => b.id === banner.id ? updatedBanner : b)
                            );
                            if (selectedBanner?.id === banner.id) {
                              setSelectedBanner(updatedBanner);
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Banner Details</CardTitle>
                  <CardDescription>
                    {selectedBanner ? "Edit the selected banner" : "Select a banner to edit"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedBanner ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Input 
                            id="title" 
                            value={selectedBanner.title}
                            onChange={(e) => setSelectedBanner({...selectedBanner, title: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subtitle">Subtitle</Label>
                          <Input 
                            id="subtitle" 
                            value={selectedBanner.subtitle}
                            onChange={(e) => setSelectedBanner({...selectedBanner, subtitle: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="buttonText">Button Text</Label>
                          <Input 
                            id="buttonText" 
                            value={selectedBanner.buttonText}
                            onChange={(e) => setSelectedBanner({...selectedBanner, buttonText: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="buttonLink">Button Link</Label>
                          <Input 
                            id="buttonLink" 
                            value={selectedBanner.buttonLink}
                            onChange={(e) => setSelectedBanner({...selectedBanner, buttonLink: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <div className="flex gap-2">
                          <Input 
                            id="imageUrl" 
                            value={selectedBanner.imageUrl}
                            onChange={(e) => setSelectedBanner({...selectedBanner, imageUrl: e.target.value})}
                            className="flex-1"
                          />
                          <Button variant="outline">
                            <Upload className="h-4 w-4 mr-2" /> Browse
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="active"
                          checked={selectedBanner.active}
                          onCheckedChange={(checked) => 
                            setSelectedBanner({...selectedBanner, active: checked})
                          }
                        />
                        <Label htmlFor="active">Active</Label>
                      </div>
                      
                      <div className="pt-4 flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setSelectedBanner(null)}>
                          Cancel
                        </Button>
                        <Button onClick={handleUpdateBanner}>
                          <Save className="h-4 w-4 mr-2" /> Save Changes
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                      Select a banner from the left to edit its details
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Hero Images Tab */}
          <TabsContent value="hero-images" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Manage Hero Images</h3>
              <Button onClick={handleAddHeroImage} className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" /> Add Hero Image
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Hero Image</CardTitle>
                    <CardDescription>
                      Add a new hero image that can be used in the principal's message section
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="heroImageName">Image Name</Label>
                      <Input 
                        id="heroImageName" 
                        value={newHeroImage.name}
                        onChange={(e) => setNewHeroImage({...newHeroImage, name: e.target.value})}
                        placeholder="e.g., School Campus Hero"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="heroImageUrl">Image URL</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="heroImageUrl" 
                          value={newHeroImage.imageUrl}
                          onChange={(e) => setNewHeroImage({...newHeroImage, imageUrl: e.target.value})}
                          placeholder="/assets/images/hero-image.jpg"
                          className="flex-1"
                        />
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" /> Browse
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="heroImageDescription">Description (Optional)</Label>
                      <Textarea 
                        id="heroImageDescription" 
                        value={newHeroImage.description}
                        onChange={(e) => setNewHeroImage({...newHeroImage, description: e.target.value})}
                        placeholder="Brief description of the image"
                        rows={2}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="heroImageActive"
                        checked={newHeroImage.isActive}
                        onCheckedChange={(checked) => 
                          setNewHeroImage({...newHeroImage, isActive: checked})
                        }
                      />
                      <Label htmlFor="heroImageActive">Active</Label>
                    </div>
                    
                    <Button onClick={handleAddHeroImage} className="w-full">
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Hero Image
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Current Hero Images</h4>
                <div className="space-y-3">
                  {heroImages.map((image) => (
                    <Card key={image.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-20 rounded-md overflow-hidden border">
                            <img 
                              src={image.imageUrl} 
                              alt={image.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium">{image.name}</h5>
                            {image.description && (
                              <p className="text-sm text-muted-foreground mt-1">{image.description}</p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1 truncate">
                              {image.imageUrl}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`text-xs px-2 py-1 rounded ${
                                image.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {image.isActive ? 'Active' : 'Inactive'}
                              </span>
                              {principalMessage.heroImageId === image.id && (
                                <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                                  Used in Principal Message
                                </span>
                              )}
                            </div>
                          </div>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteHeroImage(image.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Principal's Message Tab */}
          <TabsContent value="principal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Principal's Message</CardTitle>
                <CardDescription>
                  Edit the principal's message displayed on the homepage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="principalName">Principal's Name</Label>
                      <Input 
                        id="principalName" 
                        value={principalMessage.name}
                        onChange={(e) => setPrincipalMessage({...principalMessage, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="principalTitle">Section Title</Label>
                      <Input 
                        id="principalTitle" 
                        value={principalMessage.title}
                        onChange={(e) => setPrincipalMessage({...principalMessage, title: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="principalMessage">Message</Label>
                    <Textarea 
                      id="principalMessage" 
                      value={principalMessage.message}
                      onChange={(e) => setPrincipalMessage({...principalMessage, message: e.target.value})}
                      rows={10}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="principalHeroImage">Hero Image for Background</Label>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Select 
                          value={principalMessage.heroImageId} 
                          onValueChange={(value) => setPrincipalMessage({...principalMessage, heroImageId: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a hero image" />
                          </SelectTrigger>
                          <SelectContent>
                            {heroImages.filter(img => img.isActive).map((image) => (
                              <SelectItem key={image.id} value={image.id}>
                                {image.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {principalMessage.heroImageId && (
                        <div className="w-24 h-24 rounded-md overflow-hidden border">
                          <img 
                            src={heroImages.find(img => img.id === principalMessage.heroImageId)?.imageUrl} 
                            alt="Selected Hero Image" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This image will be used as the background in the principal's message section
                    </p>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button onClick={handleUpdatePrincipalMessage}>
                      <Save className="h-4 w-4 mr-2" /> Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Scrolling Notices Tab */}
          <TabsContent value="notices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Scrolling Notices</CardTitle>
                <CardDescription>
                  Manage notices that appear in the scrolling ticker on the homepage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Enter notice text"
                      value={newNotice.text}
                      onChange={(e) => setNewNotice({...newNotice, text: e.target.value})}
                      className="flex-1"
                    />
                    <Input 
                      placeholder="Link (optional)"
                      value={newNotice.link || ''}
                      onChange={(e) => setNewNotice({...newNotice, link: e.target.value})}
                      className="w-1/3"
                    />
                    <Button onClick={handleAddNotice}>
                      <PlusCircle className="h-4 w-4 mr-2" /> Add
                    </Button>
                  </div>
                  
                  <DragDropContext onDragEnd={handleDragEndNotices}>
                    <Droppable droppableId="notices">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="space-y-2"
                        >
                          {notices.map((notice, index) => (
                            <Draggable key={notice.id} draggableId={notice.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className={`flex items-center justify-between p-3 rounded-md border ${!notice.active ? 'bg-muted/30' : ''}`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div {...provided.dragHandleProps} className="cursor-move">
                                      <GripVertical className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1">
                                      <p className={`${!notice.active ? 'text-muted-foreground' : ''}`}>
                                        {notice.text}
                                      </p>
                                      {notice.link && (
                                        <p className="text-xs text-muted-foreground truncate">
                                          Link: {notice.link}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Switch 
                                      checked={notice.active} 
                                      onCheckedChange={() => handleToggleNoticeStatus(notice.id)}
                                    />
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      onClick={() => handleDeleteNotice(notice.id)}
                                    >
                                      <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Highlights Tab */}
          <TabsContent value="highlights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Homepage Highlights</CardTitle>
                <CardDescription>
                  Manage achievement, event, and important link highlights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4 p-4 border rounded-md">
                    <h4 className="font-medium">Add New Highlight</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="highlightTitle">Title</Label>
                        <Input 
                          id="highlightTitle" 
                          value={newHighlight.title}
                          onChange={(e) => setNewHighlight({...newHighlight, title: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="highlightType">Type</Label>
                        <select
                          id="highlightType"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={newHighlight.type}
                          onChange={(e) => setNewHighlight({...newHighlight, type: e.target.value as any})}
                        >
                          <option value="achievement">Achievement</option>
                          <option value="event">Event</option>
                          <option value="link">Important Link</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="highlightDescription">Description</Label>
                      <Textarea 
                        id="highlightDescription" 
                        value={newHighlight.description}
                        onChange={(e) => setNewHighlight({...newHighlight, description: e.target.value})}
                        rows={2}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="highlightImage">Image URL (optional)</Label>
                        <div className="flex gap-2">
                          <Input 
                            id="highlightImage" 
                            value={newHighlight.imageUrl || ''}
                            onChange={(e) => setNewHighlight({...newHighlight, imageUrl: e.target.value})}
                            className="flex-1"
                          />
                          <Button variant="outline">
                            <Upload className="h-4 w-4 mr-2" /> Browse
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="highlightLink">Link URL (optional)</Label>
                        <Input 
                          id="highlightLink" 
                          value={newHighlight.link || ''}
                          onChange={(e) => setNewHighlight({...newHighlight, link: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="pt-2 flex justify-end">
                      <Button onClick={handleAddHighlight}>
                        <PlusCircle className="h-4 w-4 mr-2" /> Add Highlight
                      </Button>
                    </div>
                  </div>
                  
                  <h4 className="font-medium">Current Highlights</h4>
                  <DragDropContext onDragEnd={handleDragEndHighlights}>
                    <Droppable droppableId="highlights">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        >
                          {highlights.map((highlight, index) => (
                            <Draggable key={highlight.id} draggableId={highlight.id} index={index}>
                              {(provided) => (
                                <motion.div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                  <Card>
                                    <CardContent className="p-4">
                                      <div className="flex justify-between items-start mb-2">
                                        <Badge className={`
                                          ${highlight.type === 'achievement' ? 'bg-green-500' : ''}
                                          ${highlight.type === 'event' ? 'bg-blue-500' : ''}
                                          ${highlight.type === 'link' ? 'bg-amber-500' : ''}
                                        `}>
                                          {highlight.type.charAt(0).toUpperCase() + highlight.type.slice(1)}
                                        </Badge>
                                        <div {...provided.dragHandleProps} className="cursor-move">
                                          <GripVertical className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                      </div>
                                      
                                      {highlight.imageUrl && (
                                        <div className="aspect-video w-full overflow-hidden rounded-md mb-2">
                                          <img 
                                            src={highlight.imageUrl} 
                                            alt={highlight.title} 
                                            className="object-cover w-full h-full"
                                          />
                                        </div>
                                      )}
                                      
                                      <h4 className="font-medium">{highlight.title}</h4>
                                      <p className="text-sm text-muted-foreground mt-1">{highlight.description}</p>
                                      
                                      {highlight.link && (
                                        <p className="text-xs text-primary mt-2 truncate">
                                          Link: {highlight.link}
                                        </p>
                                      )}
                                      
                                      <div className="flex justify-end mt-4">
                                        <Button 
                                          variant="destructive" 
                                          size="sm"
                                          onClick={() => handleDeleteHighlight(highlight.id)}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </motion.div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}