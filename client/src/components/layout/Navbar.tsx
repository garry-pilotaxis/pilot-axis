import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/solutions",  label: "Solutions"  },
    { href: "/use-cases",  label: "Use Cases"  },
    { href: "/process",    label: "Process"    },
    { href: "/pricing",    label: "Pricing"    },
    { href: "/about",      label: "About"      },
    { href: "/contact",    label: "Contact"    },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{
        borderColor: "rgba(0,0,0,0.08)",
        background:  "rgba(255,255,255,0.9)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
    >
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading font-bold text-xl tracking-tight text-gray-900 flex items-center">
          PILOT AXIS
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                location === link.href
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" data-testid="link-book-call-header">
            <Button
              className="rounded-none text-white h-9 px-6 font-medium text-sm border-0 btn-sweep"
              style={{ background: "linear-gradient(135deg,#6d5ce7,#9b8bf4)" }}
              data-testid="button-book-call-header"
            >
              Book a Call
            </Button>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 -mr-2 text-gray-500 hover:text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div
          className="md:hidden border-t px-4 py-6 flex flex-col gap-4 absolute w-full shadow-2xl"
          style={{
            borderColor: "rgba(0,0,0,0.08)",
            background:  "rgba(255,255,255,0.97)",
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium py-2 text-gray-600 hover:text-gray-900 block border-b"
              style={{ borderColor: "rgba(0,0,0,0.07)" }}
              onClick={() => setIsOpen(false)}
              data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setIsOpen(false)} data-testid="link-book-call-mobile">
            <Button
              className="rounded-none text-white w-full mt-4 border-0"
              style={{ background: "linear-gradient(135deg,#6d5ce7,#9b8bf4)" }}
              data-testid="button-book-call-mobile"
            >
              Book a Call
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
