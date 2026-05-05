import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Testimonial {
    id: TestimonialId;
    featured: boolean;
    clientName: string;
    createdAt: bigint;
    tags: Array<string>;
    quote: string;
    company: string;
    imageUrl: string;
    projectId?: bigint;
    rating: bigint;
    clientTitle: string;
}
export interface ContactInput {
    service: string;
    name: string;
    email: string;
    projectDetails: string;
}
export interface BlogPost {
    id: BlogPostId;
    postType: PostType;
    title: string;
    featured: boolean;
    content: string;
    createdAt: bigint;
    slug: string;
    tags: Array<string>;
    imageUrl: string;
    projectId?: bigint;
    excerpt: string;
}
export interface ProjectInput {
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    techStack: Array<string>;
}
export type BlogPostId = bigint;
export interface ContactSubmission {
    id: SubmissionId;
    service: string;
    name: string;
    createdAt: bigint;
    email: string;
    projectDetails: string;
}
export interface BlogPostInput {
    postType: PostType;
    title: string;
    featured: boolean;
    content: string;
    slug: string;
    tags: Array<string>;
    imageUrl: string;
    projectId?: bigint;
    excerpt: string;
}
export type ProjectId = bigint;
export interface TestimonialInput {
    featured: boolean;
    clientName: string;
    tags: Array<string>;
    quote: string;
    company: string;
    imageUrl: string;
    projectId?: bigint;
    rating: bigint;
    clientTitle: string;
}
export interface Project {
    id: ProjectId;
    title: string;
    createdAt: bigint;
    description: string;
    imageUrl: string;
    category: string;
    techStack: Array<string>;
}
export type TestimonialId = bigint;
export type SubmissionId = bigint;
export enum PostType {
    caseStudy = "caseStudy",
    standalone = "standalone"
}
export interface backendInterface {
    addBlogPost(input: BlogPostInput): Promise<{
        __kind__: "ok";
        ok: BlogPost;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addProject(input: ProjectInput): Promise<Project>;
    addTestimonial(input: TestimonialInput): Promise<{
        __kind__: "ok";
        ok: Testimonial;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteBlogPost(id: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteProject(id: ProjectId): Promise<boolean>;
    deleteSubmission(id: SubmissionId): Promise<boolean>;
    deleteTestimonial(id: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    featureBlogPost(id: bigint, featured: boolean): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    featureTestimonial(id: bigint, featured: boolean): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getBlogPost(slug: string): Promise<BlogPost | null>;
    getBlogPosts(): Promise<Array<BlogPost>>;
    getBlogPostsForProject(projectId: bigint): Promise<Array<BlogPost>>;
    getFeaturedBlogPosts(): Promise<Array<BlogPost>>;
    getFeaturedTestimonials(): Promise<Array<Testimonial>>;
    getProject(id: ProjectId): Promise<Project | null>;
    getProjects(): Promise<Array<Project>>;
    getSubmissions(): Promise<Array<ContactSubmission>>;
    getTestimonials(): Promise<Array<Testimonial>>;
    getTestimonialsForProject(projectId: bigint): Promise<Array<Testimonial>>;
    isAdmin(): Promise<boolean>;
    submitContact(input: ContactInput): Promise<ContactSubmission>;
    updateBlogPost(id: bigint, input: BlogPostInput): Promise<{
        __kind__: "ok";
        ok: BlogPost;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateProject(id: ProjectId, input: ProjectInput): Promise<Project | null>;
    updateTestimonial(id: bigint, input: TestimonialInput): Promise<{
        __kind__: "ok";
        ok: Testimonial;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
