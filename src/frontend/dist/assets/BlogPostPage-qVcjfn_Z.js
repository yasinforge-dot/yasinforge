import { a as useParams, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-Cdk8ITCB.js";
import { N as Navigation, F as Footer } from "./Navigation-BeRgmhB4.js";
import { y as useBlogPost, j as useBlogPosts, S as Skeleton, B as Badge } from "./useBackend-polHKaev.js";
import { B as Button, m as motion } from "./proxy-DTk2W0P-.js";
import { B as BookOpen } from "./book-open-C3OZvWhn.js";
import { A as ArrowLeft } from "./arrow-left-eeMvleno.js";
import { C as Calendar, T as Tag } from "./tag-CRynnWqg.js";
import { E as ExternalLink } from "./external-link-BzpvSdou.js";
import "./vanilla-wjP-HMWV.js";
function formatDate(createdAt) {
  return new Date(Number(createdAt) / 1e6).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long"
  });
}
function MarkdownContent({ content }) {
  const blocks = content.split(/\n{2,}/).filter(Boolean);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5 text-foreground/85 leading-relaxed", children: blocks.map((block, i) => {
    const key = `block-${i}`;
    if (block.startsWith("### ")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h3",
        {
          className: "font-display text-xl font-semibold text-foreground mt-8 mb-2",
          children: block.replace(/^### /, "")
        },
        key
      );
    }
    if (block.startsWith("## ")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h2",
        {
          className: "font-display text-2xl font-bold text-foreground mt-10 mb-3 pb-2 border-b border-border/30",
          children: block.replace(/^## /, "")
        },
        key
      );
    }
    if (block.startsWith("# ")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h1",
        {
          className: "font-display text-3xl font-bold text-foreground mt-10 mb-4",
          children: block.replace(/^# /, "")
        },
        key
      );
    }
    const rendered = block.replace(
      /\*\*(.+?)\*\*/g,
      (_m, text) => `<strong class="text-foreground font-semibold">${text}</strong>`
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-foreground/85 text-base leading-relaxed",
        dangerouslySetInnerHTML: { __html: rendered }
      },
      key
    );
  }) });
}
function BlogPostPage() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const { data: post, isLoading } = useBlogPost(slug);
  const { data: allPosts = [] } = useBlogPosts();
  const projectId = (post == null ? void 0 : post.projectId) ?? null;
  const relatedPosts = reactExports.useMemo(() => {
    if (!post) return [];
    return allPosts.filter(
      (p) => p.slug !== slug && p.tags.some((tag) => post.tags.includes(tag))
    ).slice(0, 3);
  }, [allPosts, post, slug]);
  const date = post ? formatDate(post.createdAt) : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 pt-24 pb-20", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-6 space-y-6 pt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-32 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-3/4 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-full rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-96 rounded-xl" })
    ] }) : !post ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-3xl mx-auto px-6 py-24 text-center",
        "data-ocid": "blog_post.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-14 h-14 text-muted-foreground/20 mx-auto mb-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground mb-3", children: "Post not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "The article you're looking for doesn't exist or may have been moved." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", "data-ocid": "blog_post.back_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            " Back to Blog"
          ] }) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-6 pt-4 pb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/blog",
                className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8",
                "data-ocid": "blog_post.back_link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                  " Back to Blog"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-wrap gap-2 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `badge-${post.postType === "caseStudy" ? "case-study" : "article"}`,
                  children: post.postType === "caseStudy" ? "Case Study" : "Article"
                }
              ),
              post.featured && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "Featured" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight", children: post.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground mb-6 leading-relaxed", children: post.excerpt }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-wrap gap-4 text-sm text-muted-foreground mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
                date
              ] }),
              post.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3.5 h-3.5 shrink-0" }),
                post.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "blog-tag", children: tag }, tag))
              ] })
            ] }),
            projectId !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/project/$id",
                params: { id: projectId.toString() },
                "data-ocid": "blog_post.view_project_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    className: "gap-2 border-secondary/30 text-secondary hover:bg-secondary/8 hover:border-secondary/50",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }),
                      "View Project"
                    ]
                  }
                )
              }
            )
          ]
        }
      ) }) }),
      post.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-6 mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.img,
        {
          initial: { opacity: 0, scale: 0.98 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.5, delay: 0.15 },
          src: post.imageUrl,
          alt: post.title,
          className: "w-full rounded-2xl object-cover max-h-96 border border-border/30"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.article,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.2 },
          className: "max-w-3xl mx-auto px-6 mt-10",
          "data-ocid": "blog_post.content",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(MarkdownContent, { content: post.content })
        }
      ),
      relatedPosts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          className: "max-w-3xl mx-auto px-6 mt-16 pt-10 border-t border-border/30",
          "data-ocid": "blog_post.related_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-6", children: "Related Posts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: relatedPosts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/blog/$slug",
                params: { slug: p.slug },
                className: "group flex items-start gap-4 p-4 rounded-xl border border-border/30 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200",
                "data-ocid": `blog_post.related_item.${i + 1}`,
                children: [
                  p.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: p.imageUrl,
                      alt: p.title,
                      className: "w-16 h-16 rounded-lg object-cover shrink-0 border border-border/20"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-lg bg-muted/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-muted-foreground/40" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `badge-${p.postType === "caseStudy" ? "case-study" : "article"} text-[10px] py-0.5`,
                        children: p.postType === "caseStudy" ? "Case Study" : "Article"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1", children: p.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 mt-1", children: p.excerpt })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 text-muted-foreground/40 group-hover:text-primary rotate-180 transition-colors shrink-0 mt-1" })
                ]
              },
              p.id.toString()
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-6 mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", "data-ocid": "blog_post.bottom_back_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
        " Back to Blog"
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  BlogPostPage as default
};
