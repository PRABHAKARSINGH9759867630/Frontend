import { useEffect, useMemo, useState } from "react";
import { useStrapiCollection } from "@/hooks/use-strapi";
import { getStrapiImageUrl, formatStrapiDate } from "@/lib/strapi";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

type GalleryEntity = {
  id: number;
  attributes: {
    title: string;
    caption?: string;
    image: any;
    category?: string;
    tags?: string[] | { id: number; name: string }[];
    eventName?: string;
    uploadDate?: string;
  };
};

export default function Gallery() {
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<GalleryEntity | null>(null);
  const [igData, setIgData] = useState<any[] | null>(null);
  const [igError, setIgError] = useState<string | null>(null);
  const [igLoading, setIgLoading] = useState<boolean>(false);

  const filters: Record<string, any> = {};
  if (category) filters["category\[$eq\]"] = category;

  const { data, isLoading, isError } = useStrapiCollection<GalleryEntity>(
    "galleries",
    {
      populate: "*",
      sort: "uploadDate:desc",
      filters,
    }
  );

  const items = useMemo(() => {
    const list = (data?.data || []) as GalleryEntity[];
    if (!search) return list;
    const q = search.toLowerCase();
    return list.filter(({ attributes }) => {
      const inTitle = attributes.title?.toLowerCase().includes(q);
      const inCaption = attributes.caption?.toLowerCase().includes(q);
      const inEvent = attributes.eventName?.toLowerCase().includes(q);
      return Boolean(inTitle || inCaption || inEvent);
    });
  }, [data, search]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    (data?.data || []).forEach((e: GalleryEntity) => {
      if (e.attributes.category) set.add(e.attributes.category);
    });
    return Array.from(set);
  }, [data]);

  // Fetch Instagram media via backend proxy
  useEffect(() => {
    let cancelled = false;
    const fetchIg = async () => {
      try {
        setIgLoading(true);
        setIgError(null);
        const res = await fetch("/api/instagram");
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `status ${res.status}`);
        }
        const json = await res.json();
        if (!cancelled) {
          const list = Array.isArray(json?.data) ? json.data : [];
          setIgData(list);
        }
      } catch (e: any) {
        if (!cancelled) setIgError(e?.message || "Failed to load Instagram");
      } finally {
        if (!cancelled) setIgLoading(false);
      }
    };
    fetchIg();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="min-h-screen">
      <section className="relative h-56 md:h-72 bg-gradient-to-r from-chart-3 to-chart-5 text-white flex items-center">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-2">
            Photo Gallery
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg md:text-xl opacity-90">
            New uploads appear automatically from Strapi
          </motion.p>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-2xl md:text-3xl font-bold">Instagram</h2>
            <p className="text-sm text-muted-foreground">Latest posts</p>
          </div>
          {igLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square w-full" />
              ))}
            </div>
          )}
          {igError && (
            <p className="text-sm text-destructive">{igError}</p>
          )}
          {!igLoading && !igError && Array.isArray(igData) && igData.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {igData.slice(0, 12).map((m: any) => {
                const isVideo = m.media_type === "VIDEO";
                const imgSrc = m.thumbnail_url || m.media_url;
                return (
                  <a key={m.id} href={m.permalink} target="_blank" rel="noopener noreferrer">
                    <Card className="overflow-hidden hover-elevate">
                      <div className="relative aspect-square w-full">
                        <img src={imgSrc} alt={m.caption || "Instagram post"} className="w-full h-full object-cover" />
                        {isVideo && (
                          <span className="absolute bottom-1 right-1 text-[10px] bg-black/60 text-white px-1 rounded">VIDEO</span>
                        )}
                      </div>
                    </Card>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search by title, caption, or event name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                className="h-10 rounded-md border bg-background px-3 text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <Button variant="outline" onClick={() => { setCategory(""), setSearch("") }}>Reset</Button>
            </div>
          </div>

          {isError && (
            <p className="text-center text-destructive">Failed to load gallery. Please check Strapi connection.</p>
          )}

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square w-full" />
              ))}
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 [column-fill:_balance]"> {/* Masonry via CSS columns */}
              <AnimatePresence>
                {items.map((item) => {
                  const a = item.attributes;
                  const url = getStrapiImageUrl(a.image);
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      className="mb-4"
                      style={{ breakInside: "avoid" }}
                    >
                      <Card className="overflow-hidden hover-elevate cursor-pointer" onClick={() => setSelected(item)}>
                        <img src={url} alt={a.title || a.caption || "Gallery image"} className="w-full h-auto object-cover" />
                      </Card>
                      <div className="mt-2 px-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          {a.eventName && <Badge variant="secondary">{a.eventName}</Badge>}
                          {a.category && <Badge>{a.category}</Badge>}
                        </div>
                        <p className="mt-1 font-medium">{a.title}</p>
                        {a.caption && <p className="text-muted-foreground text-sm">{a.caption}</p>}
                        {a.uploadDate && (
                          <p className="text-xs text-muted-foreground mt-1">{formatStrapiDate(a.uploadDate)}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-4xl p-0">
          {selected && (
            <div className="relative">
              <img
                src={getStrapiImageUrl(selected.attributes.image)}
                alt={selected.attributes.title || selected.attributes.caption || "Selected image"}
                className="w-full h-auto object-contain"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  {selected.attributes.eventName && <Badge variant="secondary">{selected.attributes.eventName}</Badge>}
                  {selected.attributes.category && <Badge>{selected.attributes.category}</Badge>}
                  {Array.isArray(selected.attributes.tags) && selected.attributes.tags.map((t: any, idx: number) => (
                    <Badge key={idx} variant="outline">{typeof t === 'string' ? t : t.name}</Badge>
                  ))}
                </div>
                <h3 className="font-semibold">{selected.attributes.title}</h3>
                {selected.attributes.caption && (
                  <p className="text-muted-foreground text-sm mt-1">{selected.attributes.caption}</p>
                )}
                {selected.attributes.uploadDate && (
                  <p className="text-xs text-muted-foreground mt-2">Uploaded {formatStrapiDate(selected.attributes.uploadDate)}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
