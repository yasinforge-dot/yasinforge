import { createActor } from "@/backend";
import type { PostType as BackendPostType } from "@/backend";
import type {
  BlogPost,
  BlogPostInput,
  ContactFormData,
  ContactSubmission,
  Project,
  ProjectFormData,
  Testimonial,
  TestimonialInput,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useBackendActor() {
  return useActor(createActor);
}

export function useProjects() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      return (
        actor as unknown as { getProjects: () => Promise<Project[]> }
      ).getProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProject(id: bigint | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Project | null>({
    queryKey: ["project", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      const result = await (
        actor as unknown as {
          getProject: (id: bigint) => Promise<Project | null>;
        }
      ).getProject(id);
      return result;
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useAddProject() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: ProjectFormData) => {
      if (!actor) throw new Error("Actor not ready");
      const tech = data.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      return (
        actor as unknown as {
          addProject: (input: {
            title: string;
            category: string;
            description: string;
            techStack: string[];
            imageUrl: string;
          }) => Promise<Project>;
        }
      ).addProject({
        title: data.title,
        category: data.category,
        description: data.description,
        techStack: tech,
        imageUrl: data.imageUrl,
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useUpdateProject() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: bigint; data: ProjectFormData }) => {
      if (!actor) throw new Error("Actor not ready");
      const tech = data.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      return (
        actor as unknown as {
          updateProject: (
            id: bigint,
            input: {
              title: string;
              category: string;
              description: string;
              techStack: string[];
              imageUrl: string;
            },
          ) => Promise<Project | null>;
        }
      ).updateProject(id, {
        title: data.title,
        category: data.category,
        description: data.description,
        techStack: tech,
        imageUrl: data.imageUrl,
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useDeleteProject() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return (
        actor as unknown as { deleteProject: (id: bigint) => Promise<boolean> }
      ).deleteProject(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useSubmitContact() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async (data: ContactFormData) => {
      if (!actor) throw new Error("Actor not ready");
      return (
        actor as unknown as {
          submitContact: (input: {
            name: string;
            email: string;
            service: string;
            projectDetails: string;
          }) => Promise<ContactSubmission>;
        }
      ).submitContact({
        name: data.name,
        email: data.email,
        service: data.service,
        projectDetails: data.projectDetails,
      });
    },
  });
}

export function useSubmissions() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ContactSubmission[]>({
    queryKey: ["submissions"],
    queryFn: async () => {
      if (!actor) return [];
      return (
        actor as unknown as {
          getSubmissions: () => Promise<ContactSubmission[]>;
        }
      ).getSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDeleteSubmission() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return (
        actor as unknown as {
          deleteSubmission: (id: bigint) => Promise<boolean>;
        }
      ).deleteSubmission(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["submissions"] }),
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return (
        actor as unknown as { isAdmin: () => Promise<boolean> }
      ).isAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
// ─── Testimonial hooks ───────────────────────────────────────────────────────

type BackendResult<T> =
  | { __kind__: "ok"; ok: T }
  | { __kind__: "err"; err: string };

export function useTestimonials() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return (
        actor as unknown as { getTestimonials: () => Promise<Testimonial[]> }
      ).getTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTestimonialsForProject(projectId: bigint) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials", "project", projectId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return (
        actor as unknown as {
          getTestimonialsForProject: (id: bigint) => Promise<Testimonial[]>;
        }
      ).getTestimonialsForProject(projectId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFeaturedTestimonials() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      return (
        actor as unknown as {
          getFeaturedTestimonials: () => Promise<Testimonial[]>;
        }
      ).getFeaturedTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTestimonial() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: TestimonialInput) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await (
        actor as unknown as {
          addTestimonial: (
            input: TestimonialInput,
          ) => Promise<BackendResult<Testimonial>>;
        }
      ).addTestimonial(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useUpdateTestimonial() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: { id: bigint; input: TestimonialInput }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await (
        actor as unknown as {
          updateTestimonial: (
            id: bigint,
            input: TestimonialInput,
          ) => Promise<BackendResult<Testimonial>>;
        }
      ).updateTestimonial(id, input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useDeleteTestimonial() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await (
        actor as unknown as {
          deleteTestimonial: (id: bigint) => Promise<BackendResult<null>>;
        }
      ).deleteTestimonial(id);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useFeatureTestimonial() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, featured }: { id: bigint; featured: boolean }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await (
        actor as unknown as {
          featureTestimonial: (
            id: bigint,
            featured: boolean,
          ) => Promise<BackendResult<null>>;
        }
      ).featureTestimonial(id, featured);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

// ─── Blog hooks ──────────────────────────────────────────────────────────────

type RawBlogPost = Omit<BlogPost, "postType"> & { postType: BackendPostType };

function normalizeBlogPost(raw: RawBlogPost): BlogPost {
  return {
    ...raw,
    postType:
      (raw.postType as string) === "caseStudy" ? "caseStudy" : "standalone",
  };
}

export function useBlogPosts() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await (
        actor as unknown as { getBlogPosts: () => Promise<RawBlogPost[]> }
      ).getBlogPosts();
      return raw.map(normalizeBlogPost);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBlogPost(slug: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<BlogPost | null>({
    queryKey: ["blogPost", slug],
    queryFn: async () => {
      if (!actor) return null;
      const result = await (
        actor as unknown as {
          getBlogPost: (slug: string) => Promise<RawBlogPost | null>;
        }
      ).getBlogPost(slug);
      return result ? normalizeBlogPost(result) : null;
    },
    enabled: !!actor && !isFetching && !!slug,
  });
}

export function useBlogPostsForProject(projectId: bigint) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts", "project", projectId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await (
        actor as unknown as {
          getBlogPostsForProject: (id: bigint) => Promise<RawBlogPost[]>;
        }
      ).getBlogPostsForProject(projectId);
      return raw.map(normalizeBlogPost);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFeaturedBlogPosts() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await (
        actor as unknown as {
          getFeaturedBlogPosts: () => Promise<RawBlogPost[]>;
        }
      ).getFeaturedBlogPosts();
      return raw.map(normalizeBlogPost);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddBlogPost() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: BlogPostInput) => {
      if (!actor) throw new Error("Actor not ready");
      const rawInput = {
        ...input,
        postType: input.postType as BackendPostType,
      };
      const result = await (
        actor as unknown as {
          addBlogPost: (
            input: typeof rawInput,
          ) => Promise<BackendResult<RawBlogPost>>;
        }
      ).addBlogPost(rawInput);
      if (result.__kind__ === "err") throw new Error(result.err);
      return normalizeBlogPost(result.ok);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blogPosts"] }),
  });
}

export function useUpdateBlogPost() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: bigint; input: BlogPostInput }) => {
      if (!actor) throw new Error("Actor not ready");
      const rawInput = {
        ...input,
        postType: input.postType as BackendPostType,
      };
      const result = await (
        actor as unknown as {
          updateBlogPost: (
            id: bigint,
            input: typeof rawInput,
          ) => Promise<BackendResult<RawBlogPost>>;
        }
      ).updateBlogPost(id, rawInput);
      if (result.__kind__ === "err") throw new Error(result.err);
      return normalizeBlogPost(result.ok);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blogPosts"] }),
  });
}

export function useDeleteBlogPost() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await (
        actor as unknown as {
          deleteBlogPost: (id: bigint) => Promise<BackendResult<null>>;
        }
      ).deleteBlogPost(id);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blogPosts"] }),
  });
}

export function useFeatureBlogPost() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, featured }: { id: bigint; featured: boolean }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await (
        actor as unknown as {
          featureBlogPost: (
            id: bigint,
            featured: boolean,
          ) => Promise<BackendResult<null>>;
        }
      ).featureBlogPost(id, featured);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blogPosts"] }),
  });
}
