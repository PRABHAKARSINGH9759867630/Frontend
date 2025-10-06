import { Bell, Info } from "lucide-react";
import { motion } from "framer-motion";

export interface Notice {
  id: number;
  text: string;
  type: "urgent" | "general";
  link?: string;
}

interface ScrollingNoticesProps {
  notices: Notice[];
}

export function ScrollingNotices({ notices }: ScrollingNoticesProps) {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-chart-2/10 py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4">
          <div className="font-semibold text-sm whitespace-nowrap flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Latest Updates:
          </div>
          <div className="flex-1 overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{
                x: [0, -1000],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {[...notices, ...notices].map((notice, index) => (
                <button
                  key={`${notice.id}-${index}`}
                  className="flex items-center gap-2 whitespace-nowrap text-sm hover:underline"
                  data-testid={`notice-${notice.id}`}
                  onClick={() => console.log("Notice clicked:", notice.text)}
                >
                  {notice.type === "urgent" ? (
                    <Bell className="w-4 h-4 text-destructive" />
                  ) : (
                    <Info className="w-4 h-4 text-primary" />
                  )}
                  {notice.text}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
