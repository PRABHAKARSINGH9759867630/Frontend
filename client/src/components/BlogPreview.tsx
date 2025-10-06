import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export interface BlogArticle {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image?: string;
  featured?: boolean;
}

interface BlogPreviewProps {
  articles: BlogArticle[];
}

export function BlogPreview({ articles }: BlogPreviewProps) {
  const featured = articles.find((a) => a.featured);
  const others = articles.filter((a) => !a.featured).slice(0, 2);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
          Educational Insights & Articles
        </h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {featured && (
            <Card
              className="overflow-hidden hover-elevate cursor-pointer"
              onClick={() => console.log("Article clicked:", featured.title)}
              data-testid={`blog-${featured.id}`}
            >
              {featured.image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <Badge className="mb-3">{featured.category}</Badge>
                <h3 className="text-2xl font-bold mb-3">{featured.title}</h3>
                <p className="text-muted-foreground mb-4">{featured.excerpt}</p>
                <button className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Card>
          )}
          <div className="flex flex-col gap-6">
            {others.map((article) => (
              <Card
                key={article.id}
                className="p-6 hover-elevate cursor-pointer"
                onClick={() => console.log("Article clicked:", article.title)}
                data-testid={`blog-${article.id}`}
              >
                <Badge variant="secondary" className="mb-3">
                  {article.category}
                </Badge>
                <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{article.excerpt}</p>
                <button className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all text-sm">
                  Read More <ArrowRight className="w-4 h-4" />
                </button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
