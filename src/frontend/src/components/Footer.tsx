import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const SERVICES = [
  "Laravel Development",
  "API Integration",
  "Security Hardening",
  "3D Web Experiences",
  "E-commerce Solutions",
];

const COMPANY = [
  { label: "About", href: "/#about" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Services", href: "/#services" },
  { label: "Blog", href: "/blog" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer
      className="bg-card border-t border-border/50"
      data-ocid="footer.panel"
    >
      {/* Glow bar */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/assets/generated/yasinforge-logo.dim_200x200.png"
                alt="YasinForge"
                className="w-8 h-8 object-contain"
              />
              <span className="font-display font-bold text-lg tracking-tight">
                Yasin<span className="text-primary">Forge</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Forging digital excellence — where code meets craft, performance
              meets artistry.
            </p>
            {/* Contact */}
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/923247019637"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group"
                data-ocid="footer.whatsapp_link"
              >
                <SiWhatsapp className="w-4 h-4 text-green-500" />
                +92 324 7019637
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="mailto:yasinforge@gmail.com"
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group"
                data-ocid="footer.email_link"
              >
                <Mail className="w-4 h-4" />
                yasinforge@gmail.com
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-sm tracking-wider uppercase text-foreground mb-5">
              Services
            </h3>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map((s) => (
                <li key={s}>
                  <a
                    href="/#services"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold text-sm tracking-wider uppercase text-foreground mb-5">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5">
              {COMPANY.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="font-display font-semibold text-sm tracking-wider uppercase text-foreground mb-5">
              Start a Project
            </h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Have an idea? Let's forge it into reality together.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all duration-200 glow-neon"
              data-ocid="footer.cta_button"
            >
              Get In Touch
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {year} YasinForge. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
