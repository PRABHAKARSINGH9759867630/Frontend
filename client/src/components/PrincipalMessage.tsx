import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";

export interface PrincipalMessageProps {
  name: string;
  title: string;
  photo: string;
  message: string;
  fullMessageLink?: string;
}

export function PrincipalMessage({
  name,
  title,
  photo,
  message,
  fullMessageLink,
}: PrincipalMessageProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Principal's Message</h2>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <Quote className="absolute -top-4 -left-4 w-16 h-16 text-primary opacity-20" />
            <img
              src={photo}
              alt={name}
              className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold">{name}</h3>
              <p className="text-muted-foreground">{title}</p>
            </div>
            <p className="text-lg leading-relaxed">{message}</p>
            {fullMessageLink && (
              <Button variant="outline" data-testid="button-full-message">
                Read Full Message
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
