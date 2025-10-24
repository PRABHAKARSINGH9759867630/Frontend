import { Card } from "@/components/ui/card";
import { LogIn, CreditCard, FileDown, Briefcase, ArrowRight } from "lucide-react";

export interface QuickAction {
  id: number;
  title: string;
  icon: "login" | "payment" | "download" | "careers";
  description: string;
  link?: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const iconMap = {
  login: LogIn,
  payment: CreditCard,
  download: FileDown,
  careers: Briefcase,
};

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {actions.map((action) => {
            const Icon = iconMap[action.icon];
            return (
              <div key={action.id} data-testid={`action-${action.id}`}>
                {action.link ? (
                  <a
                    href={action.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    aria-label={action.title}
                  >
                    <Card className="p-6 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer group hover-elevate">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{action.title}</h3>
                            <p className="text-sm opacity-80">{action.description}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-6 h-6" />
                      </div>
                    </Card>
                  </a>
                ) : (
                  <Card className="p-6 hover:bg-primary hover:text-primary-foreground transition-colors group hover-elevate">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{action.title}</h3>
                          <p className="text-sm opacity-80">{action.description}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
