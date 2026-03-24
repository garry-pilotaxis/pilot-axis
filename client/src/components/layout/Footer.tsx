import { Link } from "wouter";

export function Footer() {
  const links = [
    { href: "/solutions", label: "Solutions" },
    { href: "/use-cases", label: "Use Cases" },
    { href: "/process", label: "Process" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="border-t border-black/10 bg-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="font-heading font-bold text-xl tracking-tight mb-4 block" data-testid="link-footer-home">
              PILOT AXIS
            </Link>
            <p className="text-black/60 max-w-sm mt-4 text-sm leading-relaxed">
              Done-for-you AI voice and workflow automation for appointment-based businesses.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Sitemap</h4>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-black/60 hover:text-black text-sm transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Legal</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-black/60 hover:text-black text-sm transition-colors"
                  data-testid="link-footer-privacy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-black/60 hover:text-black text-sm transition-colors"
                  data-testid="link-footer-terms"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="#" className="text-black/60 hover:text-black text-sm transition-colors mt-4 block">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/10 text-xs text-black/40">
          <p>© {new Date().getFullYear()} Pilot Axis. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Precision Engineering.</p>
        </div>
      </div>
    </footer>
  );
}
