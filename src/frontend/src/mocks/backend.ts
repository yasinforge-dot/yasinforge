import type { backendInterface, PostType } from "../backend";

const sampleProjects = [
  {
    id: BigInt(0),
    title: "Lagos State Judiciary Portal",
    category: "Government / Fintech",
    description:
      "A secure government judiciary portal for Lagos State enabling case management, e-payments, and digital records. Integrated Paystack for fine payments and built on a hardened Laravel backend with MySQL.",
    techStack: ["Laravel", "Paystack", "MySQL", "REST API"],
    imageUrl: "",
    createdAt: BigInt(1714000000000000000),
  },
  {
    id: BigInt(1),
    title: "Roister Platform",
    category: "E-Commerce / Events",
    description:
      "A full-featured e-commerce and events platform with vendor management, Stripe payments, Zoho CRM integration, and a dynamic jQuery frontend for seamless user experience.",
    techStack: ["Laravel", "Stripe", "Zoho API", "jQuery", "MySQL"],
    imageUrl: "",
    createdAt: BigInt(1714000000000000001),
  },
  {
    id: BigInt(2),
    title: "Airboot Crypto",
    category: "Crypto / Fintech",
    description:
      "A real-time crypto trading and digital wallet platform with live Binance API feeds, portfolio tracking, and secure digital asset management.",
    techStack: ["Laravel", "Binance API", "Digital Wallet", "WebSockets", "Vue.js"],
    imageUrl: "",
    createdAt: BigInt(1714000000000000002),
  },
  {
    id: BigInt(3),
    title: "CutCue Barber",
    category: "Marketplace / Booking",
    description:
      "A B2C barber marketplace with geo-location discovery, real-time booking system, and a seamless mobile-first UI connecting customers with local barbers.",
    techStack: ["Laravel", "Geo-location API", "Booking System", "B2C", "MySQL"],
    imageUrl: "",
    createdAt: BigInt(1714000000000000003),
  },
];

const now = BigInt(Date.now()) * BigInt(1_000_000);

const sampleTestimonials = [
  {
    id: BigInt(0),
    projectId: BigInt(0),
    clientName: "Adebayo Mensah",
    clientTitle: "Director of IT",
    company: "Lagos State Judiciary",
    quote: "The portal transformed how we handle case management. YasinForge delivered a secure, scalable system ahead of schedule.",
    rating: BigInt(5),
    imageUrl: "",
    featured: true,
    tags: ["Laravel", "Government"],
    createdAt: BigInt(1714000000000000000),
  },
  {
    id: BigInt(1),
    clientName: "Fatima Al-Rashid",
    clientTitle: "CTO",
    company: "Airboot Crypto",
    quote: "Real-time Binance feeds, a rock-solid wallet — Bilal's team built exactly what we envisioned, on time and on budget.",
    rating: BigInt(5),
    imageUrl: "",
    featured: true,
    tags: ["Crypto", "API"],
    createdAt: BigInt(1714000000000000001),
  },
  {
    id: BigInt(2),
    projectId: BigInt(3),
    clientName: "James Okonkwo",
    clientTitle: "Founder",
    company: "CutCue",
    quote: "Our barber marketplace went from idea to 500+ bookings in the first month. YasinForge made it feel effortless.",
    rating: BigInt(5),
    imageUrl: "",
    featured: false,
    tags: ["Marketplace", "Mobile"],
    createdAt: BigInt(1714000000000000002),
  },
];

const sampleBlogPosts = [
  {
    id: BigInt(0),
    projectId: BigInt(0),
    title: "How We Built a Secure E-Payment System for Lagos State Judiciary",
    slug: "lagos-judiciary-epayment",
    excerpt: "A deep dive into building a high-security Paystack integration for government fine payments, including our approach to data integrity and audit trails.",
    content: "When the Lagos State Judiciary approached us, the challenge was clear: thousands of daily transactions, strict audit requirements, and zero tolerance for downtime.\n\nWe architected a hardened Laravel backend with Paystack webhooks, idempotency keys, and a full audit log stored in an immutable MySQL table...\n\nThe result was a system that processed over 50,000 payments in the first month with 99.98% uptime.",
    featured: true,
    tags: ["Laravel", "Paystack", "Security", "Government"],
    imageUrl: "",
    postType: "caseStudy" as PostType,
    createdAt: BigInt(1714000000000000000),
  },
  {
    id: BigInt(1),
    title: "5 Reasons Laravel Remains the Best Choice for Fintech APIs in 2025",
    slug: "laravel-fintech-apis-2025",
    excerpt: "Exploring why Laravel's ecosystem — from queues to Sanctum to Telescope — makes it the go-to framework for building reliable, auditable financial APIs.",
    content: "Laravel's maturity shows most clearly when you need things to just work under pressure. Here are five reasons we keep reaching for it on fintech projects...\n\n1. Queues & Jobs for async processing\n2. Sanctum for token-based API auth\n3. Telescope for real-time debugging\n4. Policy-based authorization\n5. First-class database transactions",
    featured: false,
    tags: ["Laravel", "Fintech", "API"],
    imageUrl: "",
    postType: "standalone" as PostType,
    createdAt: BigInt(1714000000000000001),
  },
];

export const mockBackend: backendInterface = {
  addProject: async (input) => ({ id: BigInt(4), ...input, createdAt: now }),
  deleteProject: async () => true,
  deleteSubmission: async () => true,
  getProject: async (id) => sampleProjects.find((p) => p.id === id) ?? null,
  getProjects: async () => sampleProjects,
  getSubmissions: async () => [
    {
      id: BigInt(0),
      name: "Amara Okafor",
      email: "amara@example.com",
      service: "Web Development",
      projectDetails: "Need a Laravel + React SaaS platform.",
      createdAt: BigInt(1714000000000000000),
    },
  ],
  isAdmin: async () => true,
  submitContact: async (input) => ({ id: BigInt(0), ...input, createdAt: now }),
  updateProject: async (id, input) => ({ id, ...input, createdAt: now }),
  // Testimonials
  addTestimonial: async (input) => ({ __kind__: "ok", ok: { id: BigInt(10), ...input, createdAt: now } }),
  updateTestimonial: async (id, input) => ({ __kind__: "ok", ok: { id, ...input, createdAt: now } }),
  deleteTestimonial: async () => ({ __kind__: "ok", ok: null }),
  featureTestimonial: async () => ({ __kind__: "ok", ok: null }),
  getTestimonials: async () => sampleTestimonials,
  getTestimonialsForProject: async (id) => sampleTestimonials.filter((t) => t.projectId === id),
  getFeaturedTestimonials: async () => sampleTestimonials.filter((t) => t.featured),
  // Blog
  addBlogPost: async (input) => ({ __kind__: "ok", ok: { id: BigInt(10), ...input, createdAt: now } }),
  updateBlogPost: async (id, input) => ({ __kind__: "ok", ok: { id, ...input, createdAt: now } }),
  deleteBlogPost: async () => ({ __kind__: "ok", ok: null }),
  featureBlogPost: async () => ({ __kind__: "ok", ok: null }),
  getBlogPosts: async () => sampleBlogPosts,
  getBlogPost: async (slug) => sampleBlogPosts.find((p) => p.slug === slug) ?? null,
  getBlogPostsForProject: async (id) => sampleBlogPosts.filter((p) => p.projectId === id),
  getFeaturedBlogPosts: async () => sampleBlogPosts.filter((p) => p.featured),
};

