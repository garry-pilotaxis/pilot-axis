import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/solutions", label: "Solutions" },
    { href: "/use-cases", label: "Use Cases" },
    { href: "/process", label: "Process" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading font-bold text-xl tracking-tight flex items-center">
          PILOT AXIS
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-black ${
                location === link.href ? "text-black" : "text-black/60"
              }`}
              data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" data-testid="link-book-call-header">
            <Button className="rounded-none bg-black text-white hover:bg-black/90 h-9 px-6 font-medium text-sm" data-testid="button-book-call-header">
              Book a Call
            </Button>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 -mr-2 text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-black/10 bg-white px-4 py-6 flex flex-col gap-4 shadow-xl absolute w-full">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium py-2 block border-b border-black/5"
              onClick={() => setIsOpen(false)}
              data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setIsOpen(false)} data-testid="link-book-call-mobile">
            <Button className="rounded-none bg-black text-white hover:bg-black/90 w-full mt-4" data-testid="button-book-call-mobile">
              Book a Call
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
