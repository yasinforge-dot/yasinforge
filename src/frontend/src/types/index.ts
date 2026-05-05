export interface Project {
  id: bigint;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  createdAt: bigint;
}

export interface ContactSubmission {
  id: bigint;
  name: string;
  email: string;
  service: string;
  projectDetails: string;
  createdAt: bigint;
}

export interface ProjectFormData {
  title: string;
  category: string;
  description: string;
  techStack: string;
  imageUrl: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  service: string;
  projectDetails: string;
}
export interface Testimonial {
  id: bigint;
  projectId?: bigint;
  clientName: string;
  clientTitle: string;
  company: string;
  quote: string;
  rating: bigint;
  imageUrl: string;
  featured: boolean;
  tags: string[];
  createdAt: bigint;
}

export interface TestimonialInput {
  projectId?: bigint;
  clientName: string;
  clientTitle: string;
  company: string;
  quote: string;
  rating: bigint;
  imageUrl: string;
  featured: boolean;
  tags: string[];
}

export type PostType = "caseStudy" | "standalone";

export interface BlogPost {
  id: bigint;
  projectId?: bigint;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured: boolean;
  tags: string[];
  imageUrl: string;
  postType: PostType;
  createdAt: bigint;
}

export interface BlogPostInput {
  projectId?: bigint;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured: boolean;
  tags: string[];
  imageUrl: string;
  postType: PostType;
}
