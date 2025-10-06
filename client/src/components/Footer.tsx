import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/about">
                  <button className="block hover:text-primary transition-colors" data-testid="footer-link-about">
                    About Us
                  </button>
                </Link>
                <Link href="/admissions">
                  <button className="block hover:text-primary transition-colors" data-testid="footer-link-admissions">
                    Admissions
                  </button>
                </Link>
                <Link href="/academics">
                  <button className="block hover:text-primary transition-colors" data-testid="footer-link-academics">
                    Academics
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="block hover:text-primary transition-colors" data-testid="footer-link-contact">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="text-sm opacity-80 mb-4">
                Subscribe to get updates on events, news, and announcements.
              </p>
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  data-testid="input-newsletter"
                />
                <Button type="submit" variant="secondary" data-testid="button-subscribe">
                  Subscribe
                </Button>
              </form>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-white/10 text-white"
                  data-testid="social-facebook"
                >
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-white/10 text-white"
                  data-testid="social-twitter"
                >
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-white/10 text-white"
                  data-testid="social-instagram"
                >
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-white/10 text-white"
                  data-testid="social-linkedin"
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-white/10 text-white"
                  data-testid="social-youtube"
                >
                  <Youtube className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm opacity-80">
            <p>© 2025 Excellence Academy. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
