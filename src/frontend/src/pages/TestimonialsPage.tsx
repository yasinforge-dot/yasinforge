import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedTestimonials, useTestimonials } from "@/hooks/useBackend";
import type { Testimonial } from "@/types";
import { Link } from "@tanstack/react-router";
import { ExternalLink, Quote, Star } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="star-rating flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={`star-pos-${i}`}
          className={`w-4 h-4 ${i < rating ? "fill-current" : "opacity-20"}`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  t,
  index,
  featured = false,
}: {
  t: Testimonial;
  index: number;
  featured?: boolean;
}) {
  const initials = t.clientName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={`flex flex-col h-full ${
        featured ? "testimonial-card testimonial-featured" : "testimonial-card"
      }`}
      data-ocid={`testimonials.item.${index + 1}`}
    >
      {featured && (
        <div className="flex items-center gap-1.5 mb-3">
          <Star className="w-3.5 h-3.5 fill-primary text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            Featured
          </span>
        </div>
      )}

      <Quote className="w-7 h-7 text-primary/30 mb-3 shrink-0" />
      <p className="text-foreground/85 leading-relaxed text-sm italic mb-5 flex-1">
        &ldquo;{t.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3 mt-auto">
        {t.imageUrl ? (
          <img
            src={t.imageUrl}
            alt={t.clientName}
            className="w-10 h-10 rounded-full object-cover border border-border/60 shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center border border-primary/25 shrink-0">
            <span className="text-primary font-bold text-sm">{initials}</span>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm text-foreground truncate">
            {t.clientName}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {t.clientTitle}
            {t.company ? `, ${t.company}` : ""}
          </p>
        </div>
        <div className="shrink-0">
          <StarRating rating={Number(t.rating)} />
        </div>
      </div>

      {(t.tags.length > 0 || t.projectId !== undefined) && (
        <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-4 border-t border-border/20">
          {t.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {t.projectId !== undefined && (
            <Link
              to="/project/$id"
              params={{ id: t.projectId.toString() }}
              className="ml-auto"
              data-ocid={`testimonials.project_link.${index + 1}`}
            >
              <Badge className="gap-1 text-xs bg-secondary/10 text-secondary border border-secondary/25 hover:bg-secondary/20 transition-colors">
                <ExternalLink className="w-3 h-3" />
                Related Project
              </Badge>
            </Link>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function TestimonialsPage() {
  const { data: all = [], isLoading } = useTestimonials();
  const { data: featured = [] } = useFeaturedTestimonials();
  const [activeTag, setActiveTag] = useState<string>("All");

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    for (const t of all) {
      for (const tag of t.tags) {
        tagSet.add(tag);
      }
    }
    return ["All", ...Array.from(tagSet).sort()];
  }, [all]);

  const filtered = useMemo(() => {
    if (activeTag === "All") return all;
    return all.filter((t) => t.tags.includes(activeTag));
  }, [all, activeTag]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <section className="pt-32 pb-20 bg-card border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/6 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/8 mb-6">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-medium text-primary">
                Client Voices
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-5">
              What Our <span className="text-gradient-forge">Clients Say</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Real words from the people we've had the privilege to work with—
              their success is our greatest achievement.
            </p>
          </motion.div>
        </div>
      </section>

      {allTags.length > 1 && (
        <section className="bg-muted/20 border-b border-border/30 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-6">
            <div
              className="flex items-center gap-2 py-3 overflow-x-auto"
              role="tablist"
              aria-label="Filter by tag"
            >
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  role="tab"
                  aria-selected={activeTag === tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${
                    activeTag === tag
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  data-ocid="testimonials.tag_filter.tab"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {featured.length > 0 && activeTag === "All" && (
        <section
          className="py-16 bg-muted/20 border-b border-border/20"
          data-ocid="testimonials.featured_section"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-2 mb-8">
              <Star className="w-5 h-5 fill-primary text-primary" />
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Featured Testimonials
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map((t, i) => (
                <TestimonialCard
                  key={t.id.toString()}
                  t={t}
                  index={i}
                  featured
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        className="py-16 bg-background flex-1"
        data-ocid="testimonials.list"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-8">
            {activeTag === "All" ? "All Testimonials" : `Tagged: ${activeTag}`}
            {!isLoading && (
              <span className="ml-3 text-lg font-normal text-muted-foreground">
                ({filtered.length})
              </span>
            )}
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
                <Skeleton key={k} className="h-64 rounded-2xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="text-center py-24"
              data-ocid="testimonials.empty_state"
            >
              <Quote className="w-12 h-12 text-muted-foreground/25 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg mb-6">
                No testimonials found
                {activeTag !== "All" ? ` for "${activeTag}"` : ""}.
              </p>
              {activeTag !== "All" && (
                <Button
                  variant="outline"
                  onClick={() => setActiveTag("All")}
                  data-ocid="testimonials.clear_filter_button"
                >
                  Clear filter
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((t, i) => (
                <TestimonialCard
                  key={t.id.toString()}
                  t={t}
                  index={i}
                  featured={t.featured}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
