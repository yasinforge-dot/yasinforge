import { Layout } from "@/components/Layout";
import {
  AboutCanvas,
  ContactCanvas,
  GemstoneCrystal,
  HelixRing,
  ParticleField,
  PortfolioCanvas,
  ScrollCanvas,
  TeamCanvas,
  TestimonialsCanvas,
  TorusKnotMesh,
  WhyUsCanvas,
} from "@/components/ScrollCanvas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useFeaturedTestimonials,
  useProjects,
  useSubmitContact,
  useTestimonials,
} from "@/hooks/useBackend";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import type { Testimonial } from "@/types";
import type { ContactFormData, Project } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  Code2,
  Globe,
  Layers,
  Lock,
  MessageSquareQuote,
  Puzzle,
  Quote,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as THREE from "three";

// ─── 3D Hero Scene Components ────────────────────────────────────────────────

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 4, 4]} intensity={2.5} color="#f97316" />
      <pointLight position={[-4, -2, 3]} intensity={1.5} color="#22d3ee" />
      <pointLight position={[0, 6, -2]} intensity={1} color="#ffffff" />
      <TorusKnotMesh />
      <GemstoneCrystal />
      <HelixRing />
      <ParticleField count={180} />
    </>
  );
}

// ─── Stat Counter ─────────────────────────────────────────────────────────────

function StatCounter({
  value,
  suffix,
  label,
}: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setCount(value);
      return;
    }
    let start = 0;
    const step = Math.ceil(value / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-display font-bold text-gradient-forge">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-1 font-body">
        {label}
      </div>
    </div>
  );
}

// ─── Section Reveal ────────────────────────────────────────────────────────────

function RevealSection({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const variants = {
    hidden: {
      opacity: 0,
      y: prefersReduced ? 0 : direction === "up" ? 40 : 0,
      x: prefersReduced
        ? 0
        : direction === "left"
          ? -40
          : direction === "right"
            ? 40
            : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        duration: prefersReduced ? 0 : 0.6,
        delay: prefersReduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Value Card ─────────────────────────────────────────────────────────────────

const whyUsItems = [
  {
    icon: Rocket,
    title: "Performance-First Architecture",
    desc: "Sub-second load times. Optimised databases. CDN-powered delivery. Built for scale from day one.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-Grade Security",
    desc: "OWASP-compliant code, encrypted data layers, and penetration-tested applications for enterprise confidence.",
  },
  {
    icon: Puzzle,
    title: "Seamless API Integration",
    desc: "Connect payment gateways, third-party services, and legacy systems with clean, documented APIs.",
  },
  {
    icon: Users,
    title: "24/7 Technical Partnership",
    desc: "We don't disappear after launch. Real support, real humans, real SLAs when you need them most.",
  },
  {
    icon: Code2,
    title: "Clean, Maintainable Code",
    desc: "PSR standards, full test coverage, and documentation so thorough your next developer will thank us.",
  },
  {
    icon: Zap,
    title: "Rapid Agile Delivery",
    desc: "Iterative sprints with weekly deliverables. Go from brief to live in weeks, not months.",
  },
];

// ─── Services ─────────────────────────────────────────────────────────────────

const services = [
  {
    icon: Globe,
    title: "Web Development",
    desc: "Laravel-powered platforms built for performance, security, and scale. Government portals to SaaS products.",
  },
  {
    icon: Puzzle,
    title: "API Development",
    desc: "RESTful and GraphQL APIs with comprehensive docs, rate limiting, and enterprise-grade authentication.",
  },
  {
    icon: Layers,
    title: "E-Commerce Solutions",
    desc: "High-conversion storefronts with inventory management, analytics, and seamless payment processing.",
  },
  {
    icon: Lock,
    title: "Fintech Solutions",
    desc: "Regulatory-compliant financial platforms with multi-layer encryption and audit-ready architecture.",
  },
  {
    icon: ShieldCheck,
    title: "Server Management",
    desc: "Proactive monitoring, automated backups, and 99.9% uptime SLAs for mission-critical applications.",
  },
  {
    icon: Sparkles,
    title: "UI/UX Design",
    desc: "Research-driven interfaces that reduce friction, build trust, and increase conversion rates measurably.",
  },
];

// ─── Portfolio Card ────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <RevealSection delay={index * 0.1}>
      <Link to="/project/$id" params={{ id: project.id.toString() }}>
        <div
          className="group card-elevated rounded-2xl overflow-hidden cursor-pointer transition-smooth hover:border-primary/60 hover:glow-neon"
          data-ocid={`portfolio.item.${index + 1}`}
        >
          <div className="h-40 bg-gradient-to-br from-muted to-card relative overflow-hidden">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-smooth group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="w-12 h-12 text-primary/40" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
          </div>
          <div className="p-5">
            <Badge
              variant="outline"
              className="text-primary border-primary/40 mb-3 text-xs"
            >
              {project.category}
            </Badge>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-smooth">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </RevealSection>
  );
}

const fallbackProjects: Project[] = [
  {
    id: BigInt(1),
    title: "Lagos State Judiciary Portal",
    category: "Government",
    description:
      "A high-security case management system for the Lagos State Judiciary handling thousands of case records with full audit trails.",
    techStack: ["Laravel", "MySQL", "Vue.js", "Redis"],
    imageUrl: "",
    createdAt: BigInt(0),
  },
  {
    id: BigInt(2),
    title: "Roister Platform",
    category: "SaaS",
    description:
      "Enterprise workforce scheduling platform with real-time shift management, payroll integration, and compliance reporting.",
    techStack: ["Laravel", "React", "PostgreSQL", "WebSockets"],
    imageUrl: "",
    createdAt: BigInt(0),
  },
  {
    id: BigInt(3),
    title: "Airboot Crypto",
    category: "Fintech",
    description:
      "Secure cryptocurrency exchange with multi-signature wallets, KYC/AML compliance, and real-time trading engine.",
    techStack: ["Laravel", "Node.js", "PostgreSQL", "Redis"],
    imageUrl: "",
    createdAt: BigInt(0),
  },
  {
    id: BigInt(4),
    title: "CutCue Barber",
    category: "E-Commerce",
    description:
      "Smart barbershop booking platform with dynamic scheduling, loyalty rewards, and integrated POS for walk-ins.",
    techStack: ["Laravel", "Vue.js", "Stripe", "MySQL"],
    imageUrl: "",
    createdAt: BigInt(0),
  },
];

// ─── Testimonial Card ────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5 star-rating"
      aria-label={`${rating} out of 5 stars`}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={`star-pos-${i}`}
          className={`w-4 h-4 ${i < rating ? "fill-current" : "opacity-25"}`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: { testimonial: Testimonial; index: number }) {
  return (
    <RevealSection delay={index * 0.1}>
      <div
        className={`testimonial-card h-full flex flex-col ${
          testimonial.featured ? "testimonial-featured" : ""
        }`}
        data-ocid={`testimonials.item.${index + 1}`}
      >
        {testimonial.featured && (
          <div className="flex items-center gap-1.5 mb-3">
            <span className="text-xs font-display font-semibold text-primary tracking-widest uppercase border border-primary/40 bg-primary/10 px-2 py-0.5 rounded-full">
              Featured
            </span>
          </div>
        )}
        <div className="mb-4">
          <StarRating rating={Number(testimonial.rating)} />
        </div>
        <div className="flex-1 mb-5">
          <Quote className="w-6 h-6 text-primary/30 mb-2" />
          <p className="text-foreground/85 text-sm leading-relaxed italic font-body">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </div>
        <div className="flex items-center gap-3 pt-4 border-t border-border/30">
          <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
            {testimonial.imageUrl ? (
              <img
                src={testimonial.imageUrl}
                alt={testimonial.clientName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-display font-bold text-sm text-primary">
                {testimonial.clientName.charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-display font-semibold text-sm text-foreground truncate">
              {testimonial.clientName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {testimonial.clientTitle}
              {testimonial.company ? `, ${testimonial.company}` : ""}
            </p>
          </div>
        </div>
        {testimonial.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {testimonial.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </RevealSection>
  );
}

// ─── Testimonials Section ─────────────────────────────────────────────────────

function TestimonialsSection() {
  const { data: featuredTestimonials = [], isLoading: featuredLoading } =
    useFeaturedTestimonials();
  const { data: allTestimonials = [], isLoading: allLoading } =
    useTestimonials();

  const isLoading =
    featuredLoading || (featuredTestimonials.length === 0 && allLoading);
  const testimonials =
    featuredTestimonials.length > 0 ? featuredTestimonials : allTestimonials;

  if (!isLoading && testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="py-32 bg-muted/20 relative overflow-hidden"
      data-ocid="testimonials.section"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-secondary blur-[100px]" />
      </div>
      <TestimonialsCanvas />
      <div className="container mx-auto px-6 relative z-10">
        <RevealSection>
          <div className="text-center mb-16">
            <p className="text-primary font-display font-medium tracking-widest text-sm uppercase mb-4">
              Client Stories
            </p>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground">
              What Our <span className="text-gradient-forge">Clients Say</span>
            </h2>
          </div>
        </RevealSection>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["sk1", "sk2", "sk3"].map((k) => (
              <div
                key={k}
                className="card-elevated rounded-lg p-6 space-y-4"
                data-ocid="testimonials.loading_state"
              >
                <div className="flex gap-1">
                  {["sk1", "sk2", "sk3", "sk4", "sk5"].map((k) => (
                    <div key={k} className="w-4 h-4 rounded bg-muted" />
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-5/6" />
                  <div className="h-4 bg-muted rounded w-4/6" />
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                  <div className="w-10 h-10 rounded-full bg-muted" />
                  <div className="space-y-1.5">
                    <div className="h-3.5 bg-muted rounded w-24" />
                    <div className="h-3 bg-muted rounded w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard
                key={t.id.toString()}
                testimonial={t}
                index={i}
              />
            ))}
          </div>
        )}

        <RevealSection delay={0.3}>
          <div className="text-center mt-12">
            <Link to="/testimonials">
              <Button
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-display font-semibold transition-smooth gap-2"
                data-ocid="testimonials.view_all_button"
              >
                <MessageSquareQuote className="w-4 h-4" />
                View All Testimonials
              </Button>
            </Link>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ─── Contact Form ──────────────────────────────────────────────────────────────

const SERVICE_OPTIONS = [
  "Web Development",
  "API Development",
  "E-Commerce",
  "Fintech Solutions",
  "Server Management",
  "UI/UX Design",
];

function ContactSection() {
  const submitContact = useSubmitContact();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitContact.mutateAsync(data);
      toast.success("Message sent! We'll be in touch within 24 hours.", {
        duration: 5000,
      });
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-32 bg-card relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-secondary blur-3xl" />
      </div>
      <ContactCanvas />
      <div className="container mx-auto px-6 relative z-10">
        <RevealSection>
          <div className="text-center mb-16">
            <p className="text-primary font-display font-medium tracking-widest text-sm uppercase mb-4">
              Get In Touch
            </p>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground">
              Let&apos;s Build Something{" "}
              <span className="text-gradient-forge">Amazing</span>
            </h2>
          </div>
        </RevealSection>
        <div className="max-w-2xl mx-auto">
          <RevealSection delay={0.2}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-elevated rounded-2xl p-8 space-y-6"
              data-ocid="contact.form"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    className="text-sm font-display font-medium text-foreground"
                    htmlFor="contact-name"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    {...register("name", { required: "Name is required" })}
                    placeholder="Bilal Yasin"
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth"
                    data-ocid="contact.name_input"
                  />
                  {errors.name && (
                    <p
                      className="text-destructive text-xs"
                      data-ocid="contact.name_error"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-display font-medium text-foreground"
                    htmlFor="contact-email"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^@]+@[^@]+\.[^@]+$/,
                        message: "Invalid email",
                      },
                    })}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth"
                    data-ocid="contact.email_input"
                  />
                  {errors.email && (
                    <p
                      className="text-destructive text-xs"
                      data-ocid="contact.email_error"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-display font-medium text-foreground"
                  htmlFor="contact-service"
                >
                  Service Needed
                </label>
                <select
                  id="contact-service"
                  {...register("service", {
                    required: "Please select a service",
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth appearance-none"
                  data-ocid="contact.service_select"
                >
                  <option value="">Select a service...</option>
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p
                    className="text-destructive text-xs"
                    data-ocid="contact.service_error"
                  >
                    {errors.service.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-display font-medium text-foreground"
                  htmlFor="contact-details"
                >
                  Project Details
                </label>
                <textarea
                  id="contact-details"
                  {...register("projectDetails", {
                    required: "Please describe your project",
                  })}
                  rows={4}
                  placeholder="Tell us about your project, timeline, and goals..."
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth resize-none"
                  data-ocid="contact.details_textarea"
                />
                {errors.projectDetails && (
                  <p
                    className="text-destructive text-xs"
                    data-ocid="contact.details_error"
                  >
                    {errors.projectDetails.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full glow-neon font-display font-semibold py-4 text-base bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
                disabled={submitContact.isPending}
                data-ocid="contact.submit_button"
              >
                {submitContact.isPending
                  ? "Sending..."
                  : "Send Message — Let's Build"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

// ─── HomePage ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  useScrollProgress();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const displayProjects =
    projects && projects.length > 0 ? projects : fallbackProjects;

  return (
    <Layout>
      {/* ── Hero Section ─────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden"
        data-ocid="hero.section"
      >
        {/* WebGL Canvas — full bleed background */}
        <div className="absolute inset-0 z-0">
          <ScrollCanvas
            className="w-full h-full"
            style={{ background: "transparent" }}
          >
            <HeroScene />
          </ScrollCanvas>
        </div>

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-background/80 via-transparent to-background/20" />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 text-primary font-display font-medium tracking-widest text-sm uppercase mb-6 border border-primary/30 px-4 py-1.5 rounded-full bg-primary/10">
                <Sparkles className="w-4 h-4" /> Web Development Agency
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display font-bold leading-tight tracking-tight"
            >
              <span className="text-6xl md:text-8xl text-foreground block">
                We Forge
              </span>
              <span className="text-6xl md:text-8xl block text-gradient-forge glow-neon bg-clip-text">
                Digital Empires
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-xl"
            >
              Stop losing revenue to slow, insecure websites. We build
              high-performance digital architectures that convert visitors into
              loyal customers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="glow-neon bg-primary text-primary-foreground font-display font-semibold px-8 py-5 text-base hover:bg-primary/90 transition-smooth group"
                onClick={() =>
                  document
                    .getElementById("portfolio")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="hero.view_work_button"
              >
                View Our Work
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-smooth" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-foreground font-display font-semibold px-8 py-5 text-base hover:bg-primary/10 hover:border-primary transition-smooth"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="hero.consultation_button"
              >
                Book Free Consultation
              </Button>
            </motion.div>
          </div>

          {/* Stat counters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl"
          >
            <StatCounter value={50} suffix="+" label="Projects Delivered" />
            <StatCounter value={98} suffix="%" label="Client Retention" />
            <StatCounter value={3} suffix="x" label="Average ROI" />
            <StatCounter value={24} suffix="/7" label="Support Available" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground"
          data-ocid="hero.scroll_indicator"
        >
          <span className="text-xs font-display tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.6,
              ease: "easeInOut",
              ...(typeof window !== "undefined" &&
              window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? { repeat: 0, duration: 0 }
                : {}),
            }}
          >
            <ChevronDown className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── About Section ────────────────────────────── */}
      <section
        id="about"
        className="py-32 bg-background relative overflow-hidden"
        data-ocid="about.section"
      >
        <AboutCanvas />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <RevealSection direction="left">
              <div>
                <p className="text-primary font-display font-medium tracking-widest text-sm uppercase mb-4">
                  About YasinForge
                </p>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight mb-6">
                  Architects of the{" "}
                  <span className="text-gradient-forge">Modern Web</span>
                </h2>
                <p className="text-muted-foreground font-body text-lg leading-relaxed mb-6">
                  Founded by Bilal Yasin with over 3 years of specialised
                  Laravel experience, YasinForge has delivered mission-critical
                  platforms for government, fintech, and enterprise clients
                  across three continents.
                </p>
                <p className="text-muted-foreground font-body leading-relaxed">
                  From the Lagos State Judiciary Portal to cutting-edge crypto
                  exchanges, we architect systems that handle real load, real
                  security requirements, and real business outcomes — not
                  prototypes.
                </p>
              </div>
            </RevealSection>

            <RevealSection direction="right" delay={0.2}>
              <div className="space-y-6">
                {/* Founder card */}
                <div className="card-elevated rounded-2xl p-6 flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <span className="font-display font-bold text-2xl text-primary">
                      BY
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground text-lg">
                      Bilal Yasin
                    </h3>
                    <p className="text-primary text-sm font-medium mb-2">
                      Founder &amp; Lead Developer
                    </p>
                    <p className="text-muted-foreground text-sm">
                      3+ years Laravel · Government portals · Fintech ·
                      E-Commerce
                    </p>
                  </div>
                </div>

                {/* Stat */}
                <div className="card-elevated rounded-2xl p-6 flex items-center gap-4">
                  <div className="text-4xl font-display font-bold text-gradient-forge">
                    3+
                  </div>
                  <div>
                    <div className="font-display font-semibold text-foreground">
                      Years of Excellence
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Delivering enterprise-grade solutions
                    </div>
                  </div>
                </div>

                {/* Skill badges */}
                <div className="flex flex-wrap gap-2">
                  {[
                    "Laravel Specialists",
                    "Fintech Security",
                    "API Integration",
                    "Team Collaboration",
                  ].map((badge) => (
                    <Badge
                      key={badge}
                      variant="outline"
                      className="border-primary/40 text-primary bg-primary/10 font-display"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Why Us Section ───────────────────────────── */}
      <section
        id="why-us"
        className="py-32 bg-muted/20 relative overflow-hidden"
        data-ocid="why_us.section"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary blur-[120px]" />
        </div>
        <WhyUsCanvas />
        <div className="container mx-auto px-6 relative z-10">
          <RevealSection>
            <div className="text-center mb-16">
              <p className="text-primary font-display font-medium tracking-widest text-sm uppercase mb-4">
                Why Choose Us
              </p>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground">
                The Forge{" "}
                <span className="text-gradient-forge">Difference</span>
              </h2>
            </div>
          </RevealSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUsItems.map((item, i) => (
              <RevealSection key={item.title} delay={i * 0.1}>
                <div
                  className="card-elevated rounded-2xl p-6 h-full hover:border-primary/60 transition-glow hover:glow-neon group"
                  data-ocid={`why_us.item.${i + 1}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-smooth">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Services Section ─────────────────────────── */}
      <section
        id="services"
        className="py-32 bg-background relative overflow-hidden"
        data-ocid="services.section"
      >
        <div className="container mx-auto px-6 relative z-10">
          <RevealSection>
            <div className="text-center mb-16">
              <p className="text-primary font-display font-medium tracking-widest text-sm uppercase mb-4">
                What We Do
              </p>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground">
                Solutions Built{" "}
                <span className="text-gradient-forge">for Scale</span>
              </h2>
            </div>
          </RevealSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <RevealSection key={service.title} delay={i * 0.1}>
                <div
                  className="group relative card-elevated rounded-2xl p-8 h-full overflow-hidden hover:border-primary/50 transition-glow cursor-default"
                  data-ocid={`services.item.${i + 1}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-5 group-hover:border-primary/50 transition-smooth">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-foreground text-xl mb-3 group-hover:text-primary transition-smooth">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Portfolio Section ────────────────────────── */}
      <section
        id="portfolio"
        className="py-32 bg-muted/20 relative overflow-hidden"
        data-ocid="portfolio.section"
      >
        <PortfolioCanvas />
        <div className="container mx-auto px-6 relative z-10">
          <RevealSection>
            <div className="text-center mb-16">
              <p className="text-primary font-display font-medium tracking-widest text-sm uppercase mb-4">
                Our Work
              </p>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground">
                Recent <span className="text-gradient-forge">Masterpieces</span>
              </h2>
            </div>
          </RevealSection>
          {projectsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {["sk1", "sk2", "sk3", "sk4"].map((key, i) => (
                <div
                  key={key}
                  className="card-elevated rounded-2xl overflow-hidden"
                  data-ocid={`portfolio.loading.${i + 1}`}
                >
                  <Skeleton className="h-40 w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayProjects.map((project, index) => (
                <ProjectCard
                  key={project.id.toString()}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Testimonials Section ─────────────────────── */}
      <TestimonialsSection />

      <div className="section-divider" />

      {/* ── Team Section ─────────────────────────────── */}
      <section
        id="team"
        className="py-32 bg-background relative overflow-hidden"
        data-ocid="team.section"
      >
        <TeamCanvas />
        <div className="container mx-auto px-6 relative z-10">
          <RevealSection>
            <div className="text-center mb-16">
              <p className="text-primary font-display font-medium tracking-widest text-sm uppercase mb-4">
                The Team
              </p>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground">
                Meet The <span className="text-gradient-forge">Architects</span>
              </h2>
            </div>
          </RevealSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                initials: "BY",
                name: "Bilal Yasin",
                role: "Founder & Lead Developer",
                accent: "primary",
              },
              {
                initials: "AS",
                name: "Ahsan Samad",
                role: "UI/UX Designer",
                accent: "secondary",
              },
              {
                initials: "AR",
                name: "Abdul Rehman",
                role: "Backend Engineer",
                accent: "primary",
              },
              {
                initials: "MH",
                name: "Muhammad Huzaifa",
                role: "Android Developer",
                accent: "secondary",
              },
            ].map((member, i) => (
              <RevealSection key={member.name} delay={i * 0.1}>
                <div
                  className="card-elevated rounded-2xl p-6 text-center group hover:border-primary/50 transition-glow"
                  data-ocid={`team.item.${i + 1}`}
                >
                  <div
                    className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 font-display font-bold text-2xl ${
                      member.accent === "primary"
                        ? "bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/40 text-primary group-hover:glow-neon"
                        : "bg-gradient-to-br from-secondary/30 to-secondary/10 border-2 border-secondary/40 text-secondary group-hover:glow-cyan"
                    } transition-smooth`}
                  >
                    {member.initials}
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {member.role}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Contact Section ───────────────────────────── */}
      <ContactSection />
    </Layout>
  );
}
