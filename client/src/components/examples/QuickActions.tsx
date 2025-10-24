import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface Action {
  id: number;
  title: string;
  icon: string;
  description: string;
  link?: string;
}

interface QuickActionsProps {
  actions: Action[];
}

export const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 p-1">
      {actions.map((action) => (
        <Card
          key={action.id}
          className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
        >
          <CardContent className="flex flex-col items-center justify-center text-center p-6">
            <div className="text-4xl mb-3">{/* you can map icons here */}</div>
            <h3 className="text-lg font-semibold">{action.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{action.description}</p>

            {action.link ? (
              <a
                href={action.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="flex items-center gap-2">
                  Visit <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            ) : (
              <Button disabled>Coming Soon</Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
