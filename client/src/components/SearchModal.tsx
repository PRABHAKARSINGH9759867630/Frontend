import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Calendar, FileText, Image } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const results = query.length > 0
    ? [
        {
          id: 1,
          type: "news",
          icon: FileText,
          title: "Students Win State Science Fair",
          description: "Latest achievement in academics",
        },
        {
          id: 2,
          type: "event",
          icon: Calendar,
          title: "Annual Sports Day",
          description: "Upcoming event on Feb 15",
        },
        {
          id: 3,
          type: "gallery",
          icon: Image,
          title: "Campus Tour Photos",
          description: "Latest gallery updates",
        },
      ]
    : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0">
        <div className="flex items-center gap-3 p-4 border-b">
          <Search className="w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search news, events, circulars..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 text-lg"
            autoFocus
            data-testid="input-search"
          />
          <kbd className="px-2 py-1 text-xs bg-muted rounded">ESC</kbd>
        </div>

        {results.length > 0 && (
          <div className="max-h-96 overflow-y-auto p-2">
            {results.map((result) => {
              const Icon = result.icon;
              return (
                <button
                  key={result.id}
                  className="w-full p-3 rounded-lg hover:bg-muted flex items-center gap-3 text-left"
                  onClick={() => {
                    console.log("Search result clicked:", result.title);
                    onClose();
                  }}
                  data-testid={`search-result-${result.id}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{result.title}</div>
                    <div className="text-sm text-muted-foreground">{result.description}</div>
                  </div>
                  <Badge variant="secondary">{result.type}</Badge>
                </button>
              );
            })}
          </div>
        )}

        {query.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Start typing to search...</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
