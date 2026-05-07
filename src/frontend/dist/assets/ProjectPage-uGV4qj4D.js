import { a as useParams, b as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-Cdk8ITCB.js";
import { e as useProject, B as Badge, S as Skeleton, f as useBlogPostsForProject, g as useTestimonialsForProject } from "./useBackend-polHKaev.js";
import { m as motion, B as Button } from "./proxy-DTk2W0P-.js";
import { Z as Zap, L as Layers, a as CodeXml, C as Canvas, b as MessageSquareQuote, u as useFrame, B as BackSide, c as Color } from "./react-three-fiber.esm-CaH0EOX6.js";
import { A as ArrowLeft } from "./arrow-left-eeMvleno.js";
import { B as BookOpen } from "./book-open-C3OZvWhn.js";
import { Q as Quote, S as Star } from "./star-D0idqhvT.js";
import "./vanilla-wjP-HMWV.js";
function NeonKnot({ scrollY }) {
  const meshRef = reactExports.useRef(null);
  const glowRef = reactExports.useRef(null);
  const orbitRef = reactExports.useRef(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scrollInfluence = scrollY * 25e-4;
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: glowRef, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("torusKnotGeometry", { args: [1.6, 0.45, 180, 28, 2, 3] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshBasicMaterial",
        {
          color: 16737792,
          transparent: true,
          opacity: 0.07,
          side: BackSide
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: meshRef, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("torusKnotGeometry", { args: [1.5, 0.38, 180, 28, 2, 3] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshStandardMaterial",
        {
          color: 1115392,
          emissive: new Color(16737792),
          emissiveIntensity: 0.9,
          metalness: 0.88,
          roughness: 0.12
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: orbitRef, position: [3.2, 1.2, -2], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("icosahedronGeometry", { args: [0.55, 1] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshStandardMaterial",
        {
          color: 2068,
          emissive: new Color(4491519),
          emissiveIntensity: 1.2,
          metalness: 0.9,
          roughness: 0.08,
          wireframe: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.12 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [4, 4, 4], intensity: 8, color: 16737792 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [-4, -3, 3], intensity: 4, color: 4491519 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [0, 0, 6], intensity: 2, color: 16777215 })
  ] });
}
function Scene({ scrollY }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Canvas,
    {
      camera: { position: [0, 0, 6.5], fov: 52 },
      style: { background: "transparent" },
      gl: { antialias: true, alpha: true },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(NeonKnot, { scrollY }) })
    }
  );
}
function StarRating({ rating }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex gap-0.5 star-rating",
      "aria-label": `${rating} out of 5 stars`,
      children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Star,
        {
          className: `w-3.5 h-3.5 ${i < rating ? "fill-current" : "opacity-25"}`
        },
        `star-pos-${i}`
      ))
    }
  );
}
function TestimonialCard({ t, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: index * 0.08 },
      className: `testimonial-card flex flex-col ${t.featured ? "testimonial-featured" : ""}`,
      "data-ocid": `project.testimonial.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: Number(t.rating) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "w-5 h-5 text-primary/30 mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground/85 text-sm leading-relaxed italic font-body", children: [
            "“",
            t.quote,
            "”"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-4 border-t border-border/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center", children: t.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: t.imageUrl,
              alt: t.clientName,
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xs text-primary", children: t.clientName.charAt(0) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground truncate", children: t.clientName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
              t.clientTitle,
              t.company ? `, ${t.company}` : ""
            ] })
          ] })
        ] })
      ]
    }
  );
}
function CaseStudyCard({ post, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: index * 0.08 },
      "data-ocid": `project.case_study.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog/$slug", params: { slug: post.slug }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "blog-card group rounded-xl overflow-hidden border border-border/40 hover:border-primary/50 transition-smooth", children: [
        post.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-36 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: post.imageUrl,
            alt: post.title,
            className: "blog-image w-full h-full"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-case-study mb-3 inline-block", children: "Case Study" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground mb-2 group-hover:text-primary transition-smooth", children: post.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm line-clamp-2", children: post.excerpt }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-4 text-primary text-sm font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
            "Read Case Study"
          ] })
        ] })
      ] }) })
    }
  );
}
function ProjectSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background",
      "data-ocid": "project.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[70vh] flex items-end pb-16 overflow-hidden bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-full w-full rounded-none bg-muted/30" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-5xl mx-auto px-6 w-full space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24 rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-3/4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-48" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-6 py-20 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-5/6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-4/6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 pt-6", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24 rounded-full" }, i)) })
        ] })
      ]
    }
  );
}
function NotFound({ onBack }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-6",
      "data-ocid": "project.error_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 32 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-8xl font-display font-bold text-gradient-forge mb-4", children: "404" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-semibold text-foreground mb-3", children: "Project Not Found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm mx-auto", children: "This project doesn't exist or may have been removed from the portfolio." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: onBack,
            "data-ocid": "project.back_button",
            className: "gap-2 border-border hover:border-primary/60 transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              "Back to Portfolio"
            ]
          }
        )
      ]
    }
  );
}
function ProjectSocialProof({ projectId }) {
  const { data: blogPosts = [] } = useBlogPostsForProject(projectId);
  const { data: testimonials = [] } = useTestimonialsForProject(projectId);
  const hasPosts = blogPosts.length > 0;
  const hasTestimonials = testimonials.length > 0;
  if (!hasPosts && !hasTestimonials) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    hasPosts && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground", children: [
          "Case ",
          blogPosts.length === 1 ? "Study" : "Studies"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `grid gap-6 ${blogPosts.length === 1 ? "grid-cols-1 max-w-md" : "sm:grid-cols-2"}`,
          children: blogPosts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CaseStudyCard, { post, index: i }, post.id.toString()))
        }
      )
    ] }),
    hasTestimonials && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquareQuote, { className: "w-5 h-5 text-secondary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground", children: "Client Feedback" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `grid gap-6 ${testimonials.length === 1 ? "grid-cols-1 max-w-md" : "sm:grid-cols-2"}`,
          children: testimonials.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialCard, { t, index: i }, t.id.toString()))
        }
      )
    ] })
  ] });
}
function ProjectPage() {
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
  const [scrollY, setScrollY] = reactExports.useState(0);
  const heroRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleBack = () => navigate({ to: "/", hash: "portfolio" });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectSkeleton, {});
  if (!project) return /* @__PURE__ */ jsxRuntimeExports.jsx(NotFound, { onBack: handleBack });
  const parallaxOffset = scrollY * 0.2;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "project.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        ref: heroRef,
        className: "relative h-[80vh] min-h-[600px] flex items-end overflow-hidden",
        "data-ocid": "project.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0 opacity-80",
                style: { transform: `translateY(${parallaxOffset}px)` },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scene, { scrollY })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0",
                style: {
                  background: "radial-gradient(ellipse 70% 70% at 60% 40%, transparent 20%, oklch(0.12 0 0) 75%)"
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-background via-background/70 to-transparent z-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-6 left-6 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: -16 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.4, delay: 0.1 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: handleBack,
                  "data-ocid": "project.back_button",
                  className: "gap-2 text-muted-foreground hover:text-foreground hover:bg-card/60 backdrop-blur-sm border border-border/40 transition-smooth",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                    "Portfolio"
                  ]
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-20 w-full max-w-5xl mx-auto px-6 pb-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 40 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.2 },
              className: "space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "bg-primary/15 text-primary border border-primary/30 font-mono text-xs tracking-widest uppercase",
                    "data-ocid": "project.category_badge",
                    children: project.category
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl md:text-7xl font-display font-bold leading-tight text-foreground", children: project.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                    project.techStack.length,
                    " technologies used"
                  ] })
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-divider" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "max-w-5xl mx-auto px-6 py-20",
        "data-ocid": "project.content_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 24 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.6 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-5 h-5 text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground", children: "Project Overview" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-foreground/85 leading-relaxed", children: project.description })
                ]
              }
            ),
            project.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.97 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: true },
                transition: { duration: 0.7, delay: 0.1 },
                className: "rounded-xl overflow-hidden border-glow",
                "data-ocid": "project.image",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: project.imageUrl,
                    alt: project.title,
                    className: "w-full aspect-video object-cover",
                    onError: (e) => {
                      e.target.style.display = "none";
                    }
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.aside,
            {
              initial: { opacity: 0, x: 24 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.6, delay: 0.15 },
              className: "space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "w-5 h-5 text-secondary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground", children: "Tech Stack" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "card-elevated rounded-xl p-6 space-y-1",
                    "data-ocid": "project.tech_stack_panel",
                    children: project.techStack.map((tech, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, x: 14 },
                        whileInView: { opacity: 1, x: 0 },
                        viewport: { once: true },
                        transition: { duration: 0.35, delay: i * 0.06 },
                        className: "flex items-center gap-3 py-2.5 border-b border-border/25 last:border-0",
                        "data-ocid": `project.tech_item.${i + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-mono text-foreground/85", children: tech })
                        ]
                      },
                      tech
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-xl p-6 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono tracking-widest uppercase text-muted-foreground", children: "Category" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: project.category })
                ] })
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "max-w-5xl mx-auto px-6 pb-12",
        "data-ocid": "project.social_proof_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectSocialProof, { projectId: numericId })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-card/50 border-t border-border/30",
        "data-ocid": "project.cta_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono tracking-widest uppercase text-muted-foreground mb-1", children: "Explore More Work" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-display font-bold text-foreground", children: "See All Projects" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: handleBack,
              "data-ocid": "project.cta_button",
              className: "gap-2 border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60 transition-smooth glow-neon",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                "Back to Portfolio"
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-card border-t border-border/30 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      ". Built with love using",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-primary/70 hover:text-primary transition-smooth",
          children: "caffeine.ai"
        }
      )
    ] }) }) })
  ] });
}
export {
  ProjectPage as default
};
