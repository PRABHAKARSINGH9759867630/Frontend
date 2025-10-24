import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import { 
  PlusCircle, 
  Trash2, 
  Pencil, 
  Upload, 
  Save,
  Image as ImageIcon,
  Video,
  FolderPlus,
  Folder,
  GripVertical,
  X,
  Search,
  Filter,
  ChevronDown,
  Check,
  Eye
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

interface MediaItem {
  id: string;
  title: string;
  type: "image" | "video";
  url: string;
  thumbnailUrl?: string;
  albumId?: string;
  tags: string[];
  uploadDate: Date;
  size?: string;
  dimensions?: string;
}

interface Album {
  id: string;
  name: string;
  description?: string;
  coverImageUrl?: string;
  itemCount: number;
}

export default function GalleryManager() {
  const [albums, setAlbums] = useState<Album[]>([
    {
      id: "1",
      name: "Annual Day 2023",
      description: "Photos from our Annual Day celebration",
      coverImageUrl: "/images/gallery/annual-day-cover.jpg",
      itemCount: 24
    },
    {
      id: "2",
      name: "Sports Day",
      description: "Sports activities and competitions",
      coverImageUrl: "/images/gallery/sports-day-cover.jpg",
      itemCount: 18
    },
    {
      id: "3",
      name: "School Trip",
      description: "Educational trip to Science Museum",
      coverImageUrl: "/images/gallery/school-trip-cover.jpg",
      itemCount: 32
    }
  ]);

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: "1",
      title: "Annual Day Performance",
      type: "image",
      url: "/images/gallery/annual-day-1.jpg",
      albumId: "1",
      tags: ["annual day", "cultural", "dance"],
      uploadDate: new Date(2023, 5, 15),
      size: "1.2 MB",
      dimensions: "1920x1080"
    },
    {
      id: "2",
      title: "Principal's Speech",
      type: "video",
      url: "/videos/gallery/principals-speech.mp4",
      thumbnailUrl: "/images/gallery/principal-speech-thumb.jpg",
      albumId: "1",
      tags: ["annual day", "speech"],
      uploadDate: new Date(2023, 5, 15),
      size: "24.5 MB"
    },
    {
      id: "3",
      title: "100m Race Finals",
      type: "image",
      url: "/images/gallery/100m-race.jpg",
      albumId: "2",
      tags: ["sports", "race", "athletics"],
      uploadDate: new Date(2023, 7, 25),
      size: "0.8 MB",
      dimensions: "1600x900"
    },
    {
      id: "4",
      title: "Basketball Tournament",
      type: "image",
      url: "/images/gallery/basketball.jpg",
      albumId: "2",
      tags: ["sports", "basketball", "tournament"],
      uploadDate: new Date(2023, 7, 25),
      size: "1.5 MB",
      dimensions: "2000x1500"
    },
    {
      id: "5",
      title: "Science Museum Exhibits",
      type: "image",
      url: "/images/gallery/science-museum-1.jpg",
      albumId: "3",
      tags: ["trip", "science", "education"],
      uploadDate: new Date(2023, 9, 10),
      size: "2.1 MB",
      dimensions: "2400x1600"
    },
    {
      id: "6",
      title: "Group Photo at Museum",
      type: "image",
      url: "/images/gallery/science-museum-group.jpg",
      albumId: "3",
      tags: ["trip", "group photo"],
      uploadDate: new Date(2023, 9, 10),
      size: "1.8 MB",
      dimensions: "2200x1400"
    }
  ]);

  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [isAlbumDialogOpen, setIsAlbumDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isMediaDetailDialogOpen, setIsMediaDetailDialogOpen] = useState(false);
  const [selectedMediaItem, setSelectedMediaItem] = useState<MediaItem | null>(null);
  const [newAlbum, setNewAlbum] = useState<Omit<Album, 'id' | 'itemCount'>>({ 
    name: "", 
    description: ""
  });
  const [newMediaItem, setNewMediaItem] = useState<Omit<MediaItem, 'id' | 'uploadDate'>>({ 
    title: "", 
    type: "image", 
    url: "", 
    tags: [] 
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [albumFilter, setAlbumFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [viewMode, setViewMode] = useState<"albums" | "media">("albums");
  const [currentAlbumId, setCurrentAlbumId] = useState<string | null>(null);

  // Filter media items based on search term and filters
  const filteredMediaItems = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesAlbum = albumFilter ? item.albumId === albumFilter : true;
    const matchesType = typeFilter ? item.type === typeFilter : true;
    const matchesCurrentAlbum = currentAlbumId ? item.albumId === currentAlbumId : true;
    
    return matchesSearch && matchesAlbum && matchesType && (viewMode === "media" || matchesCurrentAlbum);
  });

  // Function to handle album selection
  const handleSelectAlbum = (album: Album) => {
    setCurrentAlbumId(album.id);
    setViewMode("media");
  };

  // Function to create a new album
  const handleCreateAlbum = () => {
    setSelectedAlbum(null);
    setNewAlbum({ name: "", description: "" });
    setIsAlbumDialogOpen(true);
  };

  // Function to edit an album
  const handleEditAlbum = (album: Album) => {
    setSelectedAlbum(album);
    setIsAlbumDialogOpen(true);
  };

  // Function to save album (create or update)
  const handleSaveAlbum = () => {
    if (selectedAlbum) {
      // Update existing album
      setAlbums(prev => 
        prev.map(album => 
          album.id === selectedAlbum.id ? 
          {...selectedAlbum, name: selectedAlbum.name, description: selectedAlbum.description} : 
          album
        )
      );
    } else {
      // Create new album
      const album: Album = {
        id: Date.now().toString(),
        name: newAlbum.name,
        description: newAlbum.description,
        itemCount: 0
      };
      
      setAlbums(prev => [...prev, album]);
    }
    
    setIsAlbumDialogOpen(false);
  };

  // Function to delete album
  const handleDeleteAlbum = (id: string) => {
    setAlbums(prev => prev.filter(album => album.id !== id));
    
    // Remove album association from media items
    setMediaItems(prev => 
      prev.map(item => 
        item.albumId === id ? {...item, albumId: undefined} : item
      )
    );
    
    if (currentAlbumId === id) {
      setCurrentAlbumId(null);
      setViewMode("albums");
    }
  };

  // Function to open upload dialog
  const handleOpenUploadDialog = () => {
    setNewMediaItem({ 
      title: "", 
      type: "image", 
      url: "", 
      tags: [],
      albumId: currentAlbumId
    });
    setIsUploadDialogOpen(true);
  };

  // Function to save media item
  const handleSaveMediaItem = () => {
    const mediaItem: MediaItem = {
      id: Date.now().toString(),
      ...newMediaItem,
      uploadDate: new Date()
    };
    
    setMediaItems(prev => [...prev, mediaItem]);
    
    // Update album item count
    if (mediaItem.albumId) {
      setAlbums(prev => 
        prev.map(album => 
          album.id === mediaItem.albumId ? 
          {...album, itemCount: album.itemCount + 1} : 
          album
        )
      );
      
      // Set album cover if it's the first item
      const album = albums.find(a => a.id === mediaItem.albumId);
      if (album && album.itemCount === 0 && !album.coverImageUrl) {
        setAlbums(prev => 
          prev.map(a => 
            a.id === mediaItem.albumId ? 
            {...a, coverImageUrl: mediaItem.type === "image" ? mediaItem.url : mediaItem.thumbnailUrl} : 
            a
          )
        );
      }
    }
    
    setIsUploadDialogOpen(false);
  };

  // Function to delete media item
  const handleDeleteMediaItem = (id: string) => {
    const itemToDelete = mediaItems.find(item => item.id === id);
    
    setMediaItems(prev => prev.filter(item => item.id !== id));
    
    // Update album item count
    if (itemToDelete?.albumId) {
      setAlbums(prev => 
        prev.map(album => 
          album.id === itemToDelete.albumId ? 
          {...album, itemCount: Math.max(0, album.itemCount - 1)} : 
          album
        )
      );
    }
    
    // Clear selection if item was selected
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
  };

  // Function to view media item details
  const handleViewMediaDetails = (item: MediaItem) => {
    setSelectedMediaItem(item);
    setIsMediaDetailDialogOpen(true);
  };

  // Function to update media item details
  const handleUpdateMediaItem = () => {
    if (!selectedMediaItem) return;
    
    setMediaItems(prev => 
      prev.map(item => 
        item.id === selectedMediaItem.id ? selectedMediaItem : item
      )
    );
    
    setIsMediaDetailDialogOpen(false);
  };

  // Function to add tag to media item
  const handleAddTag = () => {
    if (!newTag.trim() || !selectedMediaItem) return;
    
    if (!selectedMediaItem.tags.includes(newTag.trim())) {
      const updatedTags = [...selectedMediaItem.tags, newTag.trim()];
      setSelectedMediaItem({...selectedMediaItem, tags: updatedTags});
    }
    
    setNewTag("");
  };

  // Function to remove tag from media item
  const handleRemoveTag = (tag: string) => {
    if (!selectedMediaItem) return;
    
    const updatedTags = selectedMediaItem.tags.filter(t => t !== tag);
    setSelectedMediaItem({...selectedMediaItem, tags: updatedTags});
  };

  // Function to toggle item selection
  const handleToggleSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? 
      prev.filter(itemId => itemId !== id) : 
      [...prev, id]
    );
  };

  // Function to handle bulk delete
  const handleBulkDelete = () => {
    // Get items to delete
    const itemsToDelete = mediaItems.filter(item => selectedItems.includes(item.id));
    
    // Update albums item count
    const albumUpdates: Record<string, number> = {};
    itemsToDelete.forEach(item => {
      if (item.albumId) {
        albumUpdates[item.albumId] = (albumUpdates[item.albumId] || 0) + 1;
      }
    });
    
    // Update albums
    setAlbums(prev => 
      prev.map(album => {
        if (albumUpdates[album.id]) {
          return {
            ...album, 
            itemCount: Math.max(0, album.itemCount - albumUpdates[album.id])
          };
        }
        return album;
      })
    );
    
    // Delete items
    setMediaItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    
    // Clear selection
    setSelectedItems([]);
  };

  // Function to handle bulk move to album
  const handleBulkMoveToAlbum = (albumId: string) => {
    // Update media items
    setMediaItems(prev => 
      prev.map(item => 
        selectedItems.includes(item.id) ? 
        {...item, albumId} : 
        item
      )
    );
    
    // Update old albums item count
    const itemsToMove = mediaItems.filter(item => selectedItems.includes(item.id));
    const oldAlbumUpdates: Record<string, number> = {};
    itemsToMove.forEach(item => {
      if (item.albumId && item.albumId !== albumId) {
        oldAlbumUpdates[item.albumId] = (oldAlbumUpdates[item.albumId] || 0) + 1;
      }
    });
    
    // Update new album item count
    const newItemCount = itemsToMove.filter(item => item.albumId !== albumId).length;
    
    // Update albums
    setAlbums(prev => 
      prev.map(album => {
        if (album.id === albumId) {
          return {...album, itemCount: album.itemCount + newItemCount};
        }
        if (oldAlbumUpdates[album.id]) {
          return {
            ...album, 
            itemCount: Math.max(0, album.itemCount - oldAlbumUpdates[album.id])
          };
        }
        return album;
      })
    );
    
    // Clear selection
    setSelectedItems([]);
  };

  // Function to handle drag and drop for media items
  const handleDragEndMedia = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(filteredMediaItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update the order in the full list
    const updatedMediaItems = [...mediaItems];
    filteredMediaItems.forEach((item, index) => {
      const originalIndex = mediaItems.findIndex(i => i.id === item.id);
      if (originalIndex !== -1) {
        updatedMediaItems[originalIndex] = items[index];
      }
    });
    
    setMediaItems(updatedMediaItems);
  };

  return (
    <AdminLayout title="Gallery Management">
      <div className="space-y-6">
        {/* Header with actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Tabs 
              value={viewMode} 
              onValueChange={(value) => setViewMode(value as "albums" | "media")}
              className="w-[400px]"
            >
              <TabsList>
                <TabsTrigger 
                  value="albums"
                  onClick={() => {
                    setCurrentAlbumId(null);
                    setViewMode("albums");
                  }}
                >
                  Albums
                </TabsTrigger>
                <TabsTrigger value="media">All Media</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {currentAlbumId && viewMode === "media" && (
              <Badge variant="outline" className="ml-2">
                Album: {albums.find(a => a.id === currentAlbumId)?.name}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 ml-1 p-0"
                  onClick={() => {
                    setCurrentAlbumId(null);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {viewMode === "albums" ? (
              <Button onClick={handleCreateAlbum} className="flex items-center gap-2">
                <FolderPlus className="h-4 w-4" /> Create Album
              </Button>
            ) : (
              <>
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search media..."
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
                        <Label>Album</Label>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={albumFilter || ""}
                          onChange={(e) => setAlbumFilter(e.target.value || null)}
                        >
                          <option value="">All Albums</option>
                          {albums.map((album) => (
                            <option key={album.id} value={album.id}>{album.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={typeFilter || ""}
                          onChange={(e) => setTypeFilter(e.target.value || null)}
                        >
                          <option value="">All Types</option>
                          <option value="image">Images</option>
                          <option value="video">Videos</option>
                        </select>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setSearchTerm("");
                            setAlbumFilter(null);
                            setTypeFilter(null);
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
                
                <Button onClick={handleOpenUploadDialog} className="flex items-center gap-2">
                  <Upload className="h-4 w-4" /> Upload Media
                </Button>
              </>
            )}
          </div>
        </div>
        
        {/* Selected items actions */}
        {viewMode === "media" && selectedItems.length > 0 && (
          <div className="flex items-center justify-between p-2 border rounded-md bg-muted/20">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{selectedItems.length} items selected</span>
            </div>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    Move to Album
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="space-y-2">
                    {albums.map((album) => (
                      <div 
                        key={album.id} 
                        className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer"
                        onClick={() => handleBulkMoveToAlbum(album.id)}
                      >
                        <span>{album.name}</span>
                        <Check className="h-4 w-4 opacity-0 group-hover:opacity-100" />
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleBulkDelete}
              >
                Delete Selected
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedItems([])}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
        
        {/* Albums View */}
        {viewMode === "albums" && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {albums.map((album, index) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="h-full flex flex-col">
                  <div 
                    className="aspect-video w-full overflow-hidden cursor-pointer"
                    onClick={() => handleSelectAlbum(album)}
                  >
                    {album.coverImageUrl ? (
                      <img 
                        src={album.coverImageUrl} 
                        alt={album.name} 
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Folder className="h-12 w-12 text-muted-foreground/50" />
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="flex-1 pt-4">
                    <h3 
                      className="font-semibold text-lg mb-1 cursor-pointer hover:text-primary"
                      onClick={() => handleSelectAlbum(album)}
                    >
                      {album.name}
                    </h3>
                    {album.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {album.description}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {album.itemCount} {album.itemCount === 1 ? "item" : "items"}
                    </p>
                  </CardContent>
                  
                  <CardFooter className="border-t pt-4 flex justify-end">
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditAlbum(album)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleDeleteAlbum(album.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Media Items View */}
        {viewMode === "media" && (
          <DragDropContext onDragEnd={handleDragEndMedia}>
            <Droppable droppableId="mediaItems" direction="horizontal">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
                >
                  {filteredMediaItems.length > 0 ? (
                    filteredMediaItems.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <motion.div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.03 }}
                            className="relative group"
                          >
                            <Card className="h-full flex flex-col overflow-hidden">
                              <div className="absolute top-2 left-2 z-10">
                                <Checkbox 
                                  checked={selectedItems.includes(item.id)}
                                  onCheckedChange={() => handleToggleSelection(item.id)}
                                  className="bg-white/80 border-gray-400"
                                />
                              </div>
                              
                              <div 
                                {...provided.dragHandleProps}
                                className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-move"
                              >
                                <GripVertical className="h-5 w-5 text-white drop-shadow-md" />
                              </div>
                              
                              <div 
                                className="aspect-square w-full overflow-hidden cursor-pointer"
                                onClick={() => handleViewMediaDetails(item)}
                              >
                                {item.type === "image" ? (
                                  <img 
                                    src={item.url} 
                                    alt={item.title} 
                                    className="object-cover w-full h-full"
                                  />
                                ) : (
                                  <div className="relative w-full h-full bg-gray-900">
                                    {item.thumbnailUrl ? (
                                      <img 
                                        src={item.thumbnailUrl} 
                                        alt={item.title} 
                                        className="object-cover w-full h-full opacity-80"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center">
                                        <Video className="h-12 w-12 text-white/50" />
                                      </div>
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                                        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                                          <Video className="h-4 w-4 text-gray-900" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                              
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <h4 className="text-white font-medium truncate">{item.title}</h4>
                                <div className="flex justify-between items-center mt-1">
                                  <div className="flex gap-1">
                                    {item.tags.slice(0, 2).map((tag, i) => (
                                      <Badge key={i} variant="outline" className="text-xs text-white border-white/40">
                                        {tag}
                                      </Badge>
                                    ))}
                                    {item.tags.length > 2 && (
                                      <Badge variant="outline" className="text-xs text-white border-white/40">
                                        +{item.tags.length - 2}
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex gap-1">
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      className="h-6 w-6 text-white hover:text-white hover:bg-white/20"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleViewMediaDetails(item);
                                      }}
                                    >
                                      <Eye className="h-3 w-3" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      className="h-6 w-6 text-white hover:text-white hover:bg-white/20"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteMediaItem(item.id);
                                      }}
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                      <ImageIcon className="h-12 w-12 text-muted-foreground/50 mb-4" />
                      <h3 className="font-medium text-lg">No media found</h3>
                      <p className="text-muted-foreground mt-1">
                        {searchTerm || albumFilter || typeFilter ? 
                          "Try adjusting your search or filters" : 
                          "Upload your first media item to get started"}
                      </p>
                      {(searchTerm || albumFilter || typeFilter) && (
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => {
                            setSearchTerm("");
                            setAlbumFilter(null);
                            setTypeFilter(null);
                          }}
                        >
                          Clear Filters
                        </Button>
                      )}
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
      
      {/* Album Dialog (Create/Edit) */}
      <Dialog open={isAlbumDialogOpen} onOpenChange={setIsAlbumDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedAlbum ? "Edit Album" : "Create New Album"}
            </DialogTitle>
            <DialogDescription>
              {selectedAlbum ? "Update the album details below" : "Fill in the album details below"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="albumName">Album Name *</Label>
              <Input 
                id="albumName" 
                value={selectedAlbum ? selectedAlbum.name : newAlbum.name}
                onChange={(e) => selectedAlbum ? 
                  setSelectedAlbum({...selectedAlbum, name: e.target.value}) : 
                  setNewAlbum({...newAlbum, name: e.target.value})}
                placeholder="Enter album name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="albumDescription">Description</Label>
              <Input 
                id="albumDescription" 
                value={selectedAlbum ? selectedAlbum.description || "" : newAlbum.description || ""}
                onChange={(e) => selectedAlbum ? 
                  setSelectedAlbum({...selectedAlbum, description: e.target.value}) : 
                  setNewAlbum({...newAlbum, description: e.target.value})}
                placeholder="Enter album description (optional)"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="coverImageUrl">Cover Image URL</Label>
              <div className="flex gap-2">
                <Input 
                  id="coverImageUrl" 
                  value={selectedAlbum?.coverImageUrl || ""}
                  onChange={(e) => selectedAlbum && 
                    setSelectedAlbum({...selectedAlbum, coverImageUrl: e.target.value})}
                  placeholder="Enter cover image URL (optional)"
                  className="flex-1"
                  disabled={!selectedAlbum}
                />
                <Button variant="outline" disabled={!selectedAlbum}>
                  <Upload className="h-4 w-4 mr-2" /> Browse
                </Button>
              </div>
              {selectedAlbum?.coverImageUrl && (
                <div className="mt-2 aspect-video w-full max-w-md overflow-hidden rounded-md">
                  <img 
                    src={selectedAlbum.coverImageUrl} 
                    alt="Album cover preview" 
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x400?text=Album+Cover";
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAlbumDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveAlbum}
              disabled={selectedAlbum ? !selectedAlbum.name : !newAlbum.name}
            >
              {selectedAlbum ? "Update Album" : "Create Album"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Upload Media Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Media</DialogTitle>
            <DialogDescription>
              Upload a new image or video to your gallery
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="mediaTitle">Title *</Label>
              <Input 
                id="mediaTitle" 
                value={newMediaItem.title}
                onChange={(e) => setNewMediaItem({...newMediaItem, title: e.target.value})}
                placeholder="Enter media title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mediaType">Type *</Label>
              <select
                id="mediaType"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newMediaItem.type}
                onChange={(e) => setNewMediaItem({...newMediaItem, type: e.target.value as "image" | "video"})}
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mediaUrl">URL *</Label>
              <div className="flex gap-2">
                <Input 
                  id="mediaUrl" 
                  value={newMediaItem.url}
                  onChange={(e) => setNewMediaItem({...newMediaItem, url: e.target.value})}
                  placeholder="Enter media URL or upload"
                  className="flex-1"
                />
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" /> Browse
                </Button>
              </div>
            </div>
            
            {newMediaItem.type === "video" && (
              <div className="space-y-2">
                <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
                <div className="flex gap-2">
                  <Input 
                    id="thumbnailUrl" 
                    value={newMediaItem.thumbnailUrl || ""}
                    onChange={(e) => setNewMediaItem({...newMediaItem, thumbnailUrl: e.target.value})}
                    placeholder="Enter thumbnail URL or upload"
                    className="flex-1"
                  />
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" /> Browse
                  </Button>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="mediaAlbum">Album</Label>
              <select
                id="mediaAlbum"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newMediaItem.albumId || ""}
                onChange={(e) => setNewMediaItem({...newMediaItem, albumId: e.target.value || undefined})}
              >
                <option value="">No Album</option>
                {albums.map((album) => (
                  <option key={album.id} value={album.id}>{album.name}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mediaTags">Tags</Label>
              <div className="flex gap-2">
                <Input 
                  id="mediaTags" 
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Enter tag and press Add"
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (newTag.trim() && !newMediaItem.tags.includes(newTag.trim())) {
                        setNewMediaItem({
                          ...newMediaItem, 
                          tags: [...newMediaItem.tags, newTag.trim()]
                        });
                        setNewTag("");
                      }
                    }
                  }}
                />
                <Button 
                  variant="outline"
                  onClick={() => {
                    if (newTag.trim() && !newMediaItem.tags.includes(newTag.trim())) {
                      setNewMediaItem({
                        ...newMediaItem, 
                        tags: [...newMediaItem.tags, newTag.trim()]
                      });
                      setNewTag("");
                    }
                  }}
                >
                  Add
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {newMediaItem.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => {
                        setNewMediaItem({
                          ...newMediaItem,
                          tags: newMediaItem.tags.filter((_, i) => i !== index)
                        });
                      }}
                    />
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Additional Information</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mediaSize" className="text-xs">File Size</Label>
                  <Input 
                    id="mediaSize" 
                    value={newMediaItem.size || ""}
                    onChange={(e) => setNewMediaItem({...newMediaItem, size: e.target.value})}
                    placeholder="e.g. 1.2 MB"
                  />
                </div>
                <div>
                  <Label htmlFor="mediaDimensions" className="text-xs">Dimensions</Label>
                  <Input 
                    id="mediaDimensions" 
                    value={newMediaItem.dimensions || ""}
                    onChange={(e) => setNewMediaItem({...newMediaItem, dimensions: e.target.value})}
                    placeholder="e.g. 1920x1080"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveMediaItem}
              disabled={!newMediaItem.title || !newMediaItem.url}
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Media Details Dialog */}
      <Dialog open={isMediaDetailDialogOpen} onOpenChange={setIsMediaDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Media Details</DialogTitle>
            <DialogDescription>
              View and edit media information
            </DialogDescription>
          </DialogHeader>
          
          {selectedMediaItem && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div>
                <div className="aspect-square w-full overflow-hidden rounded-md mb-4">
                  {selectedMediaItem.type === "image" ? (
                    <img 
                      src={selectedMediaItem.url} 
                      alt={selectedMediaItem.title} 
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="relative w-full h-full bg-gray-900">
                      {selectedMediaItem.thumbnailUrl ? (
                        <img 
                          src={selectedMediaItem.thumbnailUrl} 
                          alt={selectedMediaItem.title} 
                          className="object-cover w-full h-full opacity-80"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Video className="h-12 w-12 text-white/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                            <Video className="h-4 w-4 text-gray-900" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">
                      {selectedMediaItem.type.charAt(0).toUpperCase() + selectedMediaItem.type.slice(1)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Uploaded on {selectedMediaItem.uploadDate.toLocaleDateString()}
                    </span>
                  </div>
                  
                  {(selectedMediaItem.size || selectedMediaItem.dimensions) && (
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      {selectedMediaItem.size && (
                        <span>Size: {selectedMediaItem.size}</span>
                      )}
                      {selectedMediaItem.dimensions && (
                        <span>Dimensions: {selectedMediaItem.dimensions}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="detailTitle">Title</Label>
                  <Input 
                    id="detailTitle" 
                    value={selectedMediaItem.title}
                    onChange={(e) => setSelectedMediaItem({...selectedMediaItem, title: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="detailAlbum">Album</Label>
                  <select
                    id="detailAlbum"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedMediaItem.albumId || ""}
                    onChange={(e) => setSelectedMediaItem({...selectedMediaItem, albumId: e.target.value || undefined})}
                  >
                    <option value="">No Album</option>
                    {albums.map((album) => (
                      <option key={album.id} value={album.id}>{album.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="detailTags">Tags</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="detailTags" 
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Enter tag and press Add"
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <Button 
                      variant="outline"
                      onClick={handleAddTag}
                    >
                      Add
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedMediaItem.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => handleRemoveTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {selectedMediaItem.type === "video" && (
                  <div className="space-y-2">
                    <Label htmlFor="detailThumbnail">Thumbnail URL</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="detailThumbnail" 
                        value={selectedMediaItem.thumbnailUrl || ""}
                        onChange={(e) => setSelectedMediaItem({...selectedMediaItem, thumbnailUrl: e.target.value})}
                        placeholder="Enter thumbnail URL"
                        className="flex-1"
                      />
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" /> Browse
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="detailUrl">Media URL</Label>
                  <Input 
                    id="detailUrl" 
                    value={selectedMediaItem.url}
                    onChange={(e) => setSelectedMediaItem({...selectedMediaItem, url: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="detailSize">File Size</Label>
                    <Input 
                      id="detailSize" 
                      value={selectedMediaItem.size || ""}
                      onChange={(e) => setSelectedMediaItem({...selectedMediaItem, size: e.target.value})}
                      placeholder="e.g. 1.2 MB"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="detailDimensions">Dimensions</Label>
                    <Input 
                      id="detailDimensions" 
                      value={selectedMediaItem.dimensions || ""}
                      onChange={(e) => setSelectedMediaItem({...selectedMediaItem, dimensions: e.target.value})}
                      placeholder="e.g. 1920x1080"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMediaDetailDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateMediaItem}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}