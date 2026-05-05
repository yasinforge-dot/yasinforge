import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPost, useBlogPosts } from "@/hooks/useBackend";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Calendar, ExternalLink, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";

function formatDate(createdAt: bigint) {
  return new Date(Number(createdAt) / 1_000_000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

function MarkdownContent({ content }: { content: string }) {
  const blocks = content.split(/\n{2,}/).filter(Boolean);

  return (
    <div className="space-y-5 text-foreground/85 leading-relaxed">
      {blocks.map((block, i) => {
        const key = `block-${i}`;
        if (block.startsWith("### ")) {
          return (
            <h3
              key={key}
              className="font-display text-xl font-semibold text-foreground mt-8 mb-2"
            >
              {block.replace(/^### /, "")}
            </h3>
          );
        }
        if (block.startsWith("## ")) {
          return (
            <h2
              key={key}
              className="font-display text-2xl font-bold text-foreground mt-10 mb-3 pb-2 border-b border-border/30"
            >
              {block.replace(/^## /, "")}
            </h2>
          );
        }
        if (block.startsWith("# ")) {
          return (
            <h1
              key={key}
              className="font-display text-3xl font-bold text-foreground mt-10 mb-4"
            >
              {block.replace(/^# /, "")}
            </h1>
          );
        }
        const rendered = block.replace(
          /\*\*(.+?)\*\*/g,
          (_m, text: string) =>
            `<strong class="text-foreground font-semibold">${text}</strong>`,
        );
        return (
          <p
            key={key}
            className="text-foreground/85 text-base leading-relaxed"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: safe — only inline bold HTML injected from markdown transform
            dangerouslySetInnerHTML={{ __html: rendered }}
          />
        );
      })}
    </div>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const { data: post, isLoading } = useBlogPost(slug);
  const { data: allPosts = [] } = useBlogPosts();

  const projectId = post?.projectId ?? null;

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return allPosts
      .filter(
        (p) => p.slug !== slug && p.tags.some((tag) => post.tags.includes(tag)),
      )
      .slice(0, 3);
  }, [allPosts, post, slug]);

  const date = post ? formatDate(post.createdAt) : "";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 pt-24 pb-20">
        {isLoading ? (
          <div className="max-w-3xl mx-auto px-6 space-y-6 pt-8">
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-12 w-3/4 rounded-xl" />
            <Skeleton className="h-6 w-full rounded" />
            <Skeleton className="h-72 rounded-2xl" />
            <Skeleton className="h-96 rounded-xl" />
          </div>
        ) : !post ? (
          <div
            className="max-w-3xl mx-auto px-6 py-24 text-center"
            data-ocid="blog_post.error_state"
          >
            <BookOpen className="w-14 h-14 text-muted-foreground/20 mx-auto mb-5" />
            <h1 className="font-display text-2xl font-bold text-foreground mb-3">
              Post not found
            </h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or may have been
              moved.
            </p>
            <Link to="/blog" data-ocid="blog_post.back_link">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <section className="bg-card border-b border-border/40">
              <div className="max-w-3xl mx-auto px-6 pt-4 pb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
                    data-ocid="blog_post.back_link"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                  </Link>

                  <div className="flex items-center flex-wrap gap-2 mb-5">
                    <span
                      className={`badge-${
                        post.postType === "caseStudy" ? "case-study" : "article"
                      }`}
                    >
                      {post.postType === "caseStudy" ? "Case Study" : "Article"}
                    </span>
                    {post.featured && (
                      <Badge variant="secondary">Featured</Badge>
                    )}
                  </div>

                  <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                    {post.title}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {date}
                    </span>
                    {post.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Tag className="w-3.5 h-3.5 shrink-0" />
                        {post.tags.map((tag) => (
                          <span key={tag} className="blog-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {projectId !== null && (
                    <Link
                      to="/project/$id"
                      params={{ id: projectId.toString() }}
                      data-ocid="blog_post.view_project_button"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 border-secondary/30 text-secondary hover:bg-secondary/8 hover:border-secondary/50"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Project
                      </Button>
                    </Link>
                  )}
                </motion.div>
              </div>
            </section>

            {post.imageUrl && (
              <div className="max-w-3xl mx-auto px-6 mt-8">
                <motion.img
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full rounded-2xl object-cover max-h-96 border border-border/30"
                />
              </div>
            )}

            <motion.article
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto px-6 mt-10"
              data-ocid="blog_post.content"
            >
              <MarkdownContent content={post.content} />
            </motion.article>

            {relatedPosts.length > 0 && (
              <section
                className="max-w-3xl mx-auto px-6 mt-16 pt-10 border-t border-border/30"
                data-ocid="blog_post.related_section"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                  Related Posts
                </h2>
                <div className="flex flex-col gap-4">
                  {relatedPosts.map((p, i) => (
                    <Link
                      key={p.id.toString()}
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      className="group flex items-start gap-4 p-4 rounded-xl border border-border/30 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                      data-ocid={`blog_post.related_item.${i + 1}`}
                    >
                      {p.imageUrl ? (
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="w-16 h-16 rounded-lg object-cover shrink-0 border border-border/20"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-muted/30 flex items-center justify-center shrink-0">
                          <BookOpen className="w-5 h-5 text-muted-foreground/40" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span
                            className={`badge-${
                              p.postType === "caseStudy"
                                ? "case-study"
                                : "article"
                            } text-[10px] py-0.5`}
                          >
                            {p.postType === "caseStudy"
                              ? "Case Study"
                              : "Article"}
                          </span>
                        </div>
                        <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {p.title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                          {p.excerpt}
                        </p>
                      </div>
                      <ArrowLeft className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary rotate-180 transition-colors shrink-0 mt-1" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="max-w-3xl mx-auto px-6 mt-12">
              <Link to="/blog" data-ocid="blog_post.bottom_back_link">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Button>
              </Link>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
