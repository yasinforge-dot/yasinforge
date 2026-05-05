import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPosts, useFeaturedBlogPosts } from "@/hooks/useBackend";
import type { BlogPost } from "@/types";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Calendar, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

function formatDate(createdAt: bigint) {
  return new Date(Number(createdAt) / 1_000_000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogCard({
  post,
  index,
  variant = "default",
}: {
  post: BlogPost;
  index: number;
  variant?: "default" | "featured";
}) {
  const date = formatDate(post.createdAt);
  const isFeatured = variant === "featured";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={`blog-card flex flex-col ${
        isFeatured ? "md:flex-row md:items-stretch" : ""
      }`}
      data-ocid={`blog.item.${index + 1}`}
    >
      {post.imageUrl ? (
        <div
          className={`overflow-hidden shrink-0 ${isFeatured ? "md:w-1/2" : ""}`}
        >
          <img
            src={post.imageUrl}
            alt={post.title}
            className={`w-full object-cover transition-transform duration-500 hover:scale-105 ${
              isFeatured ? "min-h-[260px] h-full" : "h-48"
            }`}
          />
        </div>
      ) : (
        <div
          className={`overflow-hidden bg-muted/30 flex items-center justify-center shrink-0 ${
            isFeatured ? "md:w-1/2 min-h-[260px]" : "h-48"
          }`}
        >
          <BookOpen className="w-12 h-12 text-muted-foreground/20" />
        </div>
      )}

      <div
        className={`p-6 flex flex-col flex-1 ${isFeatured ? "justify-center" : ""}`}
      >
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`badge-${
              post.postType === "caseStudy" ? "case-study" : "article"
            }`}
          >
            {post.postType === "caseStudy" ? "Case Study" : "Article"}
          </span>
          {post.featured && (
            <Badge variant="secondary" className="text-xs">
              Featured
            </Badge>
          )}
        </div>

        <h2
          className={`font-display font-bold text-foreground leading-snug mb-2 ${
            isFeatured ? "text-2xl md:text-3xl" : "text-lg line-clamp-2"
          }`}
        >
          {post.title}
        </h2>
        <p
          className={`text-muted-foreground leading-relaxed mb-4 flex-1 ${
            isFeatured ? "text-base line-clamp-4" : "text-sm line-clamp-3"
          }`}
        >
          {post.excerpt}
        </p>

        {post.tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap mb-4">
            <Tag className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
            {post.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="blog-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/20">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            {date}
          </span>
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            data-ocid={`blog.read_link.${index + 1}`}
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80 hover:bg-primary/8 gap-1.5"
            >
              Read more <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function BlogPage() {
  const { data: posts = [], isLoading } = useBlogPosts();
  const { data: featuredPosts = [] } = useFeaturedBlogPosts();
  const [typeFilter, setTypeFilter] = useState<
    "all" | "caseStudy" | "standalone"
  >("all");
  const [activeTag, setActiveTag] = useState<string>("All");

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    for (const p of posts) {
      for (const tag of p.tags) {
        tagSet.add(tag);
      }
    }
    return ["All", ...Array.from(tagSet).sort()];
  }, [posts]);

  const filtered = useMemo(() => {
    let result = posts;
    if (typeFilter !== "all")
      result = result.filter((p) => p.postType === typeFilter);
    if (activeTag !== "All")
      result = result.filter((p) => p.tags.includes(activeTag));
    return result;
  }, [posts, typeFilter, activeTag]);

  const featuredPost = featuredPosts[0] ?? null;
  const gridPosts = filtered.filter(
    (p) =>
      !featuredPost ||
      p.id !== featuredPost.id ||
      typeFilter !== "all" ||
      activeTag !== "All",
  );

  const showFeaturedHero =
    featuredPost !== null && typeFilter === "all" && activeTag === "All";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <section className="pt-32 pb-20 bg-card border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/6 via-transparent to-primary/8 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/8 mb-6">
              <BookOpen className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">
                Agency Insights
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-5">
              Blog &amp;{" "}
              <span className="text-gradient-forge">Case Studies</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Deep dives into the projects we've built, the technologies we've
              mastered, and the lessons we've learned along the way.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-muted/20 border-b border-border/30 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-3 py-4">
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Post type filter"
            >
              {(["all", "caseStudy", "standalone"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  role="tab"
                  aria-selected={typeFilter === type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    typeFilter === type
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  data-ocid={`blog.filter_${type}.tab`}
                >
                  {type === "all"
                    ? "All"
                    : type === "caseStudy"
                      ? "Case Studies"
                      : "Articles"}
                </button>
              ))}
            </div>

            {allTags.length > 1 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(tag)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all duration-200 ${
                      activeTag === tag
                        ? "bg-secondary/20 text-secondary border border-secondary/40"
                        : "border border-border/40 text-muted-foreground hover:text-foreground hover:border-border"
                    }`}
                    data-ocid="blog.tag_filter.toggle"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background flex-1" data-ocid="blog.list">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-80 rounded-2xl" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {["s1", "s2", "s3", "s4", "s5"].map((k) => (
                  <Skeleton key={k} className="h-72 rounded-2xl" />
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24" data-ocid="blog.empty_state">
              <BookOpen className="w-12 h-12 text-muted-foreground/25 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg mb-6">
                No posts found. Try a different filter.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setTypeFilter("all");
                  setActiveTag("All");
                }}
                data-ocid="blog.clear_filter_button"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <>
              {showFeaturedHero && featuredPost && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                  data-ocid="blog.featured_post"
                >
                  <BlogCard post={featuredPost} index={0} variant="featured" />
                </motion.div>
              )}
              {gridPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gridPosts.map((post, i) => (
                    <BlogCard key={post.id.toString()} post={post} index={i} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
