import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-D0yZ9B68.js";
import { N as Navigation, F as Footer } from "./Navigation-DIE_Fx6h.js";
import { b as useTestimonials, a as useFeaturedTestimonials, S as Skeleton, B as Badge } from "./useBackend-CzoG8yy-.js";
import { m as motion, B as Button } from "./proxy-BcgAcmJN.js";
import { S as Star, Q as Quote } from "./star-51PYhvQz.js";
import { E as ExternalLink } from "./external-link-AjrMEc8i.js";
import "./vanilla-wjP-HMWV.js";
function StarRating({ rating }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "star-rating flex items-center gap-0.5",
      "aria-label": `${rating} out of 5 stars`,
      children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Star,
        {
          className: `w-4 h-4 ${i < rating ? "fill-current" : "opacity-20"}`
        },
        `star-pos-${i}`
      ))
    }
  );
}
function TestimonialCard({
  t,
  index,
  featured = false
}) {
  const initials = t.clientName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 28 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: index * 0.07 },
      className: `flex flex-col h-full ${featured ? "testimonial-card testimonial-featured" : "testimonial-card"}`,
      "data-ocid": `testimonials.item.${index + 1}`,
      children: [
        featured && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 fill-primary text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-primary uppercase tracking-wider", children: "Featured" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "w-7 h-7 text-primary/30 mb-3 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground/85 leading-relaxed text-sm italic mb-5 flex-1", children: [
          "“",
          t.quote,
          "”"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-auto", children: [
          t.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: t.imageUrl,
              alt: t.clientName,
              className: "w-10 h-10 rounded-full object-cover border border-border/60 shrink-0"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center border border-primary/25 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold text-sm", children: initials }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: t.clientName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
              t.clientTitle,
              t.company ? `, ${t.company}` : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: Number(t.rating) }) })
        ] }),
        (t.tags.length > 0 || t.projectId !== void 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1.5 mt-4 pt-4 border-t border-border/20", children: [
          t.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: tag }, tag)),
          t.projectId !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/project/$id",
              params: { id: t.projectId.toString() },
              className: "ml-auto",
              "data-ocid": `testimonials.project_link.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "gap-1 text-xs bg-secondary/10 text-secondary border border-secondary/25 hover:bg-secondary/20 transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" }),
                "Related Project"
              ] })
            }
          )
        ] })
      ]
    }
  );
}
function TestimonialsPage() {
  const { data: all = [], isLoading } = useTestimonials();
  const { data: featured = [] } = useFeaturedTestimonials();
  const [activeTag, setActiveTag] = reactExports.useState("All");
  const allTags = reactExports.useMemo(() => {
    const tagSet = /* @__PURE__ */ new Set();
    for (const t of all) {
      for (const tag of t.tags) {
        tagSet.add(tag);
      }
    }
    return ["All", ...Array.from(tagSet).sort()];
  }, [all]);
  const filtered = reactExports.useMemo(() => {
    if (activeTag === "All") return all;
    return all.filter((t) => t.tags.includes(activeTag));
  }, [all, activeTag]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "pt-32 pb-20 bg-card border-b border-border/50 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-grid-subtle pointer-events-none opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/6 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-6 text-center relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/8 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-primary text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-primary", children: "Client Voices" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-5", children: [
              "What Our ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-forge", children: "Clients Say" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed", children: "Real words from the people we've had the privilege to work with— their success is our greatest achievement." })
          ]
        }
      ) })
    ] }),
    allTags.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/20 border-b border-border/30 sticky top-16 z-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center gap-2 py-3 overflow-x-auto",
        role: "tablist",
        "aria-label": "Filter by tag",
        children: allTags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            role: "tab",
            "aria-selected": activeTag === tag,
            onClick: () => setActiveTag(tag),
            className: `px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${activeTag === tag ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
            "data-ocid": "testimonials.tag_filter.tab",
            children: tag
          },
          tag
        ))
      }
    ) }) }),
    featured.length > 0 && activeTag === "All" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 bg-muted/20 border-b border-border/20",
        "data-ocid": "testimonials.featured_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 fill-primary text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground", children: "Featured Testimonials" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: featured.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            TestimonialCard,
            {
              t,
              index: i,
              featured: true
            },
            t.id.toString()
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 bg-background flex-1",
        "data-ocid": "testimonials.list",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl font-semibold text-foreground mb-8", children: [
            activeTag === "All" ? "All Testimonials" : `Tagged: ${activeTag}`,
            !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-3 text-lg font-normal text-muted-foreground", children: [
              "(",
              filtered.length,
              ")"
            ] })
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-2xl" }, k)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-24",
              "data-ocid": "testimonials.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "w-12 h-12 text-muted-foreground/25 mx-auto mb-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-lg mb-6", children: [
                  "No testimonials found",
                  activeTag !== "All" ? ` for "${activeTag}"` : "",
                  "."
                ] }),
                activeTag !== "All" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    onClick: () => setActiveTag("All"),
                    "data-ocid": "testimonials.clear_filter_button",
                    children: "Clear filter"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filtered.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            TestimonialCard,
            {
              t,
              index: i,
              featured: t.featured
            },
            t.id.toString()
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  TestimonialsPage as default
};
