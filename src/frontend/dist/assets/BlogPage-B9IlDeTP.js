import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-D0yZ9B68.js";
import { N as Navigation, F as Footer } from "./Navigation-DIE_Fx6h.js";
import { j as useBlogPosts, x as useFeaturedBlogPosts, S as Skeleton, B as Badge } from "./useBackend-CzoG8yy-.js";
import { m as motion, B as Button } from "./proxy-BcgAcmJN.js";
import { B as BookOpen } from "./book-open-BC0noi5b.js";
import { T as Tag, C as Calendar } from "./tag-D5GM9GjY.js";
import { A as ArrowRight } from "./arrow-right-MsaGTgjp.js";
import "./vanilla-wjP-HMWV.js";
function formatDate(createdAt) {
  return new Date(Number(createdAt) / 1e6).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function BlogCard({
  post,
  index,
  variant = "default"
}) {
  const date = formatDate(post.createdAt);
  const isFeatured = variant === "featured";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.article,
    {
      initial: { opacity: 0, y: 28 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: index * 0.07 },
      className: `blog-card flex flex-col ${isFeatured ? "md:flex-row md:items-stretch" : ""}`,
      "data-ocid": `blog.item.${index + 1}`,
      children: [
        post.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `overflow-hidden shrink-0 ${isFeatured ? "md:w-1/2" : ""}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: post.imageUrl,
                alt: post.title,
                className: `w-full object-cover transition-transform duration-500 hover:scale-105 ${isFeatured ? "min-h-[260px] h-full" : "h-48"}`
              }
            )
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `overflow-hidden bg-muted/30 flex items-center justify-center shrink-0 ${isFeatured ? "md:w-1/2 min-h-[260px]" : "h-48"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-12 h-12 text-muted-foreground/20" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `p-6 flex flex-col flex-1 ${isFeatured ? "justify-center" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `badge-${post.postType === "caseStudy" ? "case-study" : "article"}`,
                    children: post.postType === "caseStudy" ? "Case Study" : "Article"
                  }
                ),
                post.featured && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Featured" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: `font-display font-bold text-foreground leading-snug mb-2 ${isFeatured ? "text-2xl md:text-3xl" : "text-lg line-clamp-2"}`,
                  children: post.title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-muted-foreground leading-relaxed mb-4 flex-1 ${isFeatured ? "text-base line-clamp-4" : "text-sm line-clamp-3"}`,
                  children: post.excerpt
                }
              ),
              post.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3.5 h-3.5 text-muted-foreground/40 shrink-0" }),
                post.tags.slice(0, 4).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "blog-tag", children: tag }, tag))
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-auto pt-4 border-t border-border/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
                  date
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/blog/$slug",
                    params: { slug: post.slug },
                    "data-ocid": `blog.read_link.${index + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        className: "text-primary hover:text-primary/80 hover:bg-primary/8 gap-1.5",
                        children: [
                          "Read more ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                        ]
                      }
                    )
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function BlogPage() {
  const { data: posts = [], isLoading } = useBlogPosts();
  const { data: featuredPosts = [] } = useFeaturedBlogPosts();
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const [activeTag, setActiveTag] = reactExports.useState("All");
  const allTags = reactExports.useMemo(() => {
    const tagSet = /* @__PURE__ */ new Set();
    for (const p of posts) {
      for (const tag of p.tags) {
        tagSet.add(tag);
      }
    }
    return ["All", ...Array.from(tagSet).sort()];
  }, [posts]);
  const filtered = reactExports.useMemo(() => {
    let result = posts;
    if (typeFilter !== "all")
      result = result.filter((p) => p.postType === typeFilter);
    if (activeTag !== "All")
      result = result.filter((p) => p.tags.includes(activeTag));
    return result;
  }, [posts, typeFilter, activeTag]);
  const featuredPost = featuredPosts[0] ?? null;
  const gridPosts = filtered.filter(
    (p) => !featuredPost || p.id !== featuredPost.id || typeFilter !== "all" || activeTag !== "All"
  );
  const showFeaturedHero = featuredPost !== null && typeFilter === "all" && activeTag === "All";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "pt-32 pb-20 bg-card border-b border-border/50 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-grid-subtle pointer-events-none opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-secondary/6 via-transparent to-primary/8 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-6 text-center relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/8 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-secondary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-secondary", children: "Agency Insights" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-5", children: [
              "Blog &",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-forge", children: "Case Studies" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed", children: "Deep dives into the projects we've built, the technologies we've mastered, and the lessons we've learned along the way." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/20 border-b border-border/30 sticky top-16 z-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex items-center gap-2",
          role: "tablist",
          "aria-label": "Post type filter",
          children: ["all", "caseStudy", "standalone"].map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": typeFilter === type,
              onClick: () => setTypeFilter(type),
              className: `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${typeFilter === type ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
              "data-ocid": `blog.filter_${type}.tab`,
              children: type === "all" ? "All" : type === "caseStudy" ? "Case Studies" : "Articles"
            },
            type
          ))
        }
      ),
      allTags.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 overflow-x-auto pb-1", children: allTags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveTag(tag),
          className: `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all duration-200 ${activeTag === tag ? "bg-secondary/20 text-secondary border border-secondary/40" : "border border-border/40 text-muted-foreground hover:text-foreground hover:border-border"}`,
          "data-ocid": "blog.tag_filter.toggle",
          children: tag
        },
        tag
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-background flex-1", "data-ocid": "blog.list", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-80 rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: ["s1", "s2", "s3", "s4", "s5"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-2xl" }, k)) })
    ] }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-24", "data-ocid": "blog.empty_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-12 h-12 text-muted-foreground/25 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-6", children: "No posts found. Try a different filter." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: () => {
            setTypeFilter("all");
            setActiveTag("All");
          },
          "data-ocid": "blog.clear_filter_button",
          children: "Clear filters"
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      showFeaturedHero && featuredPost && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "mb-8",
          "data-ocid": "blog.featured_post",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(BlogCard, { post: featuredPost, index: 0, variant: "featured" })
        }
      ),
      gridPosts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: gridPosts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(BlogCard, { post, index: i }, post.id.toString())) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  BlogPage as default
};
