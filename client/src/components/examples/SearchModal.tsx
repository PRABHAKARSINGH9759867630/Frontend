import { SearchModal } from "../SearchModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SearchModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setIsOpen(true)}>Open Search</Button>
      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
