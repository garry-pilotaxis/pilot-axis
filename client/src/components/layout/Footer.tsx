import { Link } from "wouter";

export function Footer() {
  const links = [
    { href: "/solutions",  label: "Solutions"  },
    { href: "/use-cases",  label: "Use Cases"  },
    { href: "/process",    label: "Process"    },
    { href: "/pricing",    label: "Pricing"    },
    { href: "/about",      label: "About"      },
    { href: "/contact",    label: "Contact"    },
  ];

  return (
    <footer
      className="border-t pt-16 pb-8"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="font-heading font-bold text-xl tracking-tight mb-4 block text-white" data-testid="link-footer-home">
              PILOT AXIS
            </Link>
            <p className="text-white/45 max-w-sm mt-4 text-sm leading-relaxed">
              Done-for-you AI voice and workflow automation for appointment-based businesses.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 text-white">Sitemap</h4>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/45 hover:text-white text-sm transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 text-white">Legal</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/privacy" className="text-white/45 hover:text-white text-sm transition-colors" data-testid="link-footer-privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/45 hover:text-white text-sm transition-colors" data-testid="link-footer-terms">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/45 hover:text-white text-sm transition-colors mt-4 block">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t text-xs text-white/30"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <p>© {new Date().getFullYear()} Pilot Axis. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Precision Engineering.</p>
        </div>
      </div>
    </footer>
  );
}
