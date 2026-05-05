import { useScrollStore } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/#contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const scrollY = useScrollStore((s) => s.scrollY);
  const scrolled = scrollY > 40;
  const { loginStatus: _loginStatus } = useInternetIdentity();
  const routerState = useRouterState();
  const isAdminPage = routerState.location.pathname.startsWith("/admin");

  // Close mobile menu on resize
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  const handleSectionLink = (href: string) => {
    setOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-card/90 backdrop-blur-xl border-b border-border shadow-[0_4px_24px_oklch(0_0_0/0.4)]"
          : "bg-transparent",
      )}
      data-ocid="nav.panel"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          data-ocid="nav.logo_link"
        >
          <img
            src="/assets/generated/yasinforge-logo.dim_200x200.png"
            alt="YasinForge"
            className="w-8 h-8 object-contain"
          />
          <span className="font-display font-bold text-lg tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
            Yasin<span className="text-primary">Forge</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.href.startsWith("/#")) {
                  e.preventDefault();
                  handleSectionLink(link.href);
                  if (window.location.pathname !== "/") {
                    window.location.href = link.href;
                  }
                }
              }}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
              data-ocid={`nav.${link.label.toLowerCase()}_link`}
            >
              {link.label}
              <span className="absolute bottom-0 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}

          {/* Admin link */}
          <Link
            to="/admin"
            className={cn(
              "ml-2 p-2 rounded-md transition-all duration-200",
              isAdminPage
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-primary hover:bg-primary/10",
            )}
            title="Admin Dashboard"
            data-ocid="nav.admin_link"
          >
            <ShieldCheck className="w-5 h-5" />
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle menu"
          data-ocid="nav.mobile_menu_toggle"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border px-6 py-4 flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.href.startsWith("/#")) {
                  e.preventDefault();
                  handleSectionLink(link.href);
                  if (window.location.pathname !== "/") {
                    window.location.href = link.href;
                  }
                } else {
                  setOpen(false);
                }
              }}
              className="text-sm font-medium text-muted-foreground hover:text-foreground py-2 border-b border-border/30 last:border-0"
              data-ocid={`nav.mobile_${link.label.toLowerCase()}_link`}
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary py-2"
            data-ocid="nav.mobile_admin_link"
          >
            <ShieldCheck className="w-4 h-4" />
            Admin
          </Link>
        </div>
      )}
    </header>
  );
}
