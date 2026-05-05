import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useBlogPostsForProject,
  useProject,
  useTestimonialsForProject,
} from "@/hooks/useBackend";
import type { BlogPost, Testimonial } from "@/types";
import { Canvas, useFrame } from "@react-three/fiber";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Code2,
  Layers,
  MessageSquareQuote,
  Quote,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

// ─── 3D Scene ────────────────────────────────────────────────────────────────

function NeonKnot({ scrollY }: { scrollY: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scrollInfluence = scrollY * 0.0025;

    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.18 + scrollInfluence;
      meshRef.current.rotation.y = t * 0.25 + scrollInfluence * 1.2;
      meshRef.current.rotation.z = t * 0.12;
      const pulse = 1 + Math.sin(t * 1.4) * 0.05;
      meshRef.current.scale.setScalar(pulse);
    }
    if (glowRef.current) {
      glowRef.current.rotation.x = t * 0.18 + scrollInfluence;
      glowRef.current.rotation.y = t * 0.25 + scrollInfluence * 1.2;
      glowRef.current.rotation.z = t * 0.12;
      const glowPulse = 1.08 + Math.sin(t * 1.4) * 0.06;
      glowRef.current.scale.setScalar(glowPulse);
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.x = t * 0.3 + scrollInfluence * 0.8;
      orbitRef.current.rotation.y = t * 0.4;
      orbitRef.current.position.x = 3.2 + Math.sin(t * 0.5) * 0.3;
      orbitRef.current.position.y = 1.2 + Math.cos(t * 0.7) * 0.2;
    }
  });

  return (
    <group>
      {/* glow halo */}
      <mesh ref={glowRef}>
        <torusKnotGeometry args={[1.6, 0.45, 180, 28, 2, 3]} />
        <meshBasicMaterial
          color={0xff6600}
          transparent
          opacity={0.07}
          side={THREE.BackSide}
        />
      </mesh>
      {/* main torus knot */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.5, 0.38, 180, 28, 2, 3]} />
        <meshStandardMaterial
          color={0x110500}
          emissive={new THREE.Color(0xff6600)}
          emissiveIntensity={0.9}
          metalness={0.88}
          roughness={0.12}
        />
      </mesh>
      {/* cyan icosahedron orbiter */}
      <mesh ref={orbitRef} position={[3.2, 1.2, -2]}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color={0x000814}
          emissive={new THREE.Color(0x4488ff)}
          emissiveIntensity={1.2}
          metalness={0.9}
          roughness={0.08}
          wireframe
        />
      </mesh>
      {/* lights */}
      <ambientLight intensity={0.12} />
      <pointLight position={[4, 4, 4]} intensity={8} color={0xff6600} />
      <pointLight position={[-4, -3, 3]} intensity={4} color={0x4488ff} />
      <pointLight position={[0, 0, 6]} intensity={2} color={0xffffff} />
    </group>
  );
}

function Scene({ scrollY }: { scrollY: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 52 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <NeonKnot scrollY={scrollY} />
      </Suspense>
    </Canvas>
  );
}

// ─── Shared helpers ─────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5 star-rating"
      aria-label={`${rating} out of 5 stars`}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={`star-pos-${i}`}
          className={`w-3.5 h-3.5 ${
            i < rating ? "fill-current" : "opacity-25"
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`testimonial-card flex flex-col ${
        t.featured ? "testimonial-featured" : ""
      }`}
      data-ocid={`project.testimonial.item.${index + 1}`}
    >
      <div className="mb-3">
        <StarRating rating={Number(t.rating)} />
      </div>
      <div className="flex-1 mb-4">
        <Quote className="w-5 h-5 text-primary/30 mb-2" />
        <p className="text-foreground/85 text-sm leading-relaxed italic font-body">
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-border/30">
        <div className="w-9 h-9 rounded-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
          {t.imageUrl ? (
            <img
              src={t.imageUrl}
              alt={t.clientName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-display font-bold text-xs text-primary">
              {t.clientName.charAt(0)}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <p className="font-display font-semibold text-sm text-foreground truncate">
            {t.clientName}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {t.clientTitle}
            {t.company ? `, ${t.company}` : ""}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function CaseStudyCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      data-ocid={`project.case_study.item.${index + 1}`}
    >
      <Link to="/blog/$slug" params={{ slug: post.slug }}>
        <div className="blog-card group rounded-xl overflow-hidden border border-border/40 hover:border-primary/50 transition-smooth">
          {post.imageUrl && (
            <div className="h-36 overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="blog-image w-full h-full"
              />
            </div>
          )}
          <div className="p-5">
            <span className="badge-case-study mb-3 inline-block">
              Case Study
            </span>
            <h3 className="font-display font-bold text-foreground mb-2 group-hover:text-primary transition-smooth">
              {post.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-1.5 mt-4 text-primary text-sm font-medium">
              <BookOpen className="w-4 h-4" />
              Read Case Study
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function ProjectSkeleton() {
  return (
    <div
      className="min-h-screen bg-background"
      data-ocid="project.loading_state"
    >
      <div className="relative h-[70vh] flex items-end pb-16 overflow-hidden bg-card">
        <div className="absolute inset-0">
          <Skeleton className="h-full w-full rounded-none bg-muted/30" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 w-full space-y-4">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-14 w-3/4" />
          <Skeleton className="h-5 w-48" />
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-5">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
        <Skeleton className="h-5 w-4/6" />
        <div className="flex gap-3 pt-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 404 ─────────────────────────────────────────────────────────────────────

function NotFound({ onBack }: { onBack: () => void }) {
  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-6"
      data-ocid="project.error_state"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-8xl font-display font-bold text-gradient-forge mb-4">
          404
        </p>
        <h1 className="text-2xl font-display font-semibold text-foreground mb-3">
          Project Not Found
        </h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          This project doesn&apos;t exist or may have been removed from the
          portfolio.
        </p>
      </motion.div>
      <Button
        variant="outline"
        onClick={onBack}
        data-ocid="project.back_button"
        className="gap-2 border-border hover:border-primary/60 transition-smooth"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Portfolio
      </Button>
    </div>
  );
}

// ─── Social Proof (Case Studies + Testimonials) ────────────────────────────────────────────

function ProjectSocialProof({ projectId }: { projectId: bigint }) {
  const { data: blogPosts = [] } = useBlogPostsForProject(projectId);
  const { data: testimonials = [] } = useTestimonialsForProject(projectId);

  const hasPosts = blogPosts.length > 0;
  const hasTestimonials = testimonials.length > 0;

  if (!hasPosts && !hasTestimonials) return null;

  return (
    <>
      {hasPosts && (
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground">
              Case {blogPosts.length === 1 ? "Study" : "Studies"}
            </span>
          </div>
          <div
            className={`grid gap-6 ${
              blogPosts.length === 1 ? "grid-cols-1 max-w-md" : "sm:grid-cols-2"
            }`}
          >
            {blogPosts.map((post, i) => (
              <CaseStudyCard key={post.id.toString()} post={post} index={i} />
            ))}
          </div>
        </div>
      )}
      {hasTestimonials && (
        <div>
          <div className="flex items-center gap-3 mb-8">
            <MessageSquareQuote className="w-5 h-5 text-secondary" />
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground">
              Client Feedback
            </span>
          </div>
          <div
            className={`grid gap-6 ${
              testimonials.length === 1
                ? "grid-cols-1 max-w-md"
                : "sm:grid-cols-2"
            }`}
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id.toString()} t={t} index={i} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ProjectPage() {
  const { id } = useParams({ from: "/project/$id" });
  const navigate = useNavigate();

  const numericId = (() => {
    try {
      return BigInt(id ?? "");
    } catch {
      return null;
    }
  })();

  const { data: project, isLoading } = useProject(numericId);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBack = () => navigate({ to: "/", hash: "portfolio" });

  if (isLoading) return <ProjectSkeleton />;
  if (!project) return <NotFound onBack={handleBack} />;

  const parallaxOffset = scrollY * 0.2;

  return (
    <div className="min-h-screen bg-background" data-ocid="project.page">
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative h-[80vh] min-h-[600px] flex items-end overflow-hidden"
        data-ocid="project.hero_section"
      >
        {/* 3D WebGL canvas */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background" />
          <div
            className="absolute inset-0 opacity-80"
            style={{ transform: `translateY(${parallaxOffset}px)` }}
          >
            <Scene scrollY={scrollY} />
          </div>
          {/* Radial vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 70% at 60% 40%, transparent 20%, oklch(0.12 0 0) 75%)",
            }}
          />
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-background via-background/70 to-transparent z-10" />

        {/* Back button */}
        <div className="absolute top-6 left-6 z-20">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              data-ocid="project.back_button"
              className="gap-2 text-muted-foreground hover:text-foreground hover:bg-card/60 backdrop-blur-sm border border-border/40 transition-smooth"
            >
              <ArrowLeft className="w-4 h-4" />
              Portfolio
            </Button>
          </motion.div>
        </div>

        {/* Hero content */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-6 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            <Badge
              variant="secondary"
              className="bg-primary/15 text-primary border border-primary/30 font-mono text-xs tracking-widest uppercase"
              data-ocid="project.category_badge"
            >
              {project.category}
            </Badge>

            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight text-foreground">
              {project.title}
            </h1>

            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Zap className="w-4 h-4 text-primary" />
              <span className="font-mono">
                {project.techStack.length} technologies used
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Content ── */}
      <section
        className="max-w-5xl mx-auto px-6 py-20"
        data-ocid="project.content_section"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Description */}
          <div className="lg:col-span-2 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <Layers className="w-5 h-5 text-primary" />
                <span className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground">
                  Project Overview
                </span>
              </div>
              <p className="text-lg text-foreground/85 leading-relaxed">
                {project.description}
              </p>
            </motion.div>

            {/* Image */}
            {project.imageUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="rounded-xl overflow-hidden border-glow"
                data-ocid="project.image"
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full aspect-video object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </motion.div>
            )}
          </div>

          {/* Tech Stack sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-5">
              <Code2 className="w-5 h-5 text-secondary" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground">
                Tech Stack
              </span>
            </div>

            <div
              className="card-elevated rounded-xl p-6 space-y-1"
              data-ocid="project.tech_stack_panel"
            >
              {project.techStack.map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="flex items-center gap-3 py-2.5 border-b border-border/25 last:border-0"
                  data-ocid={`project.tech_item.${i + 1}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm font-mono text-foreground/85">
                    {tech}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="card-elevated rounded-xl p-6 space-y-2">
              <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
                Category
              </p>
              <p className="font-display font-semibold text-foreground">
                {project.category}
              </p>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* ── Case Studies + Testimonials ── */}
      <section
        className="max-w-5xl mx-auto px-6 pb-12"
        data-ocid="project.social_proof_section"
      >
        <ProjectSocialProof projectId={numericId!} />
      </section>

      {/* ── Bottom CTA ── */}
      <section
        className="bg-card/50 border-t border-border/30"
        data-ocid="project.cta_section"
      >
        <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground mb-1">
              Explore More Work
            </p>
            <h3 className="text-2xl font-display font-bold text-foreground">
              See All Projects
            </h3>
          </div>
          <Button
            variant="outline"
            onClick={handleBack}
            data-ocid="project.cta_button"
            className="gap-2 border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60 transition-smooth glow-neon"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border/30 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/70 hover:text-primary transition-smooth"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
