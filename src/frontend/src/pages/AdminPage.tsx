import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddBlogPost,
  useAddProject,
  useAddTestimonial,
  useBlogPosts,
  useDeleteBlogPost,
  useDeleteProject,
  useDeleteSubmission,
  useDeleteTestimonial,
  useFeatureBlogPost,
  useFeatureTestimonial,
  useIsAdmin,
  useProjects,
  useSubmissions,
  useTestimonials,
  useUpdateBlogPost,
  useUpdateProject,
  useUpdateTestimonial,
} from "@/hooks/useBackend";
import type {
  BlogPost,
  BlogPostInput,
  PostType,
  Project,
  ProjectFormData,
  Testimonial,
  TestimonialInput,
} from "@/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen, Quote, Star } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// ─── Inline ProjectForm ────────────────────────────────────────────────────
interface ProjectFormProps {
  defaultValues?: ProjectFormData;
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
  submitLabel: string;
}

function ProjectForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: defaultValues ?? {
      title: "",
      category: "",
      description: "",
      techStack: "",
      imageUrl: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="title"
            className="text-xs font-display tracking-wide text-muted-foreground uppercase"
          >
            Title
          </Label>
          <Input
            id="title"
            data-ocid="project_form.title_input"
            placeholder="Project name"
            className="bg-muted border-border/60 focus:border-primary h-9"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <p
              data-ocid="project_form.title_field_error"
              className="text-xs text-destructive"
            >
              Required
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label
            htmlFor="category"
            className="text-xs font-display tracking-wide text-muted-foreground uppercase"
          >
            Category
          </Label>
          <Input
            id="category"
            data-ocid="project_form.category_input"
            placeholder="e.g. Web App, Platform"
            className="bg-muted border-border/60 focus:border-primary h-9"
            {...register("category", { required: true })}
          />
          {errors.category && (
            <p
              data-ocid="project_form.category_field_error"
              className="text-xs text-destructive"
            >
              Required
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="description"
          className="text-xs font-display tracking-wide text-muted-foreground uppercase"
        >
          Description
        </Label>
        <Textarea
          id="description"
          data-ocid="project_form.description_textarea"
          placeholder="Brief project overview..."
          rows={3}
          className="bg-muted border-border/60 focus:border-primary resize-none"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <p
            data-ocid="project_form.description_field_error"
            className="text-xs text-destructive"
          >
            Required
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="techStack"
            className="text-xs font-display tracking-wide text-muted-foreground uppercase"
          >
            Tech Stack
          </Label>
          <Input
            id="techStack"
            data-ocid="project_form.techstack_input"
            placeholder="React, Laravel, PostgreSQL"
            className="bg-muted border-border/60 focus:border-primary h-9"
            {...register("techStack", { required: true })}
          />
          {errors.techStack && (
            <p
              data-ocid="project_form.techstack_field_error"
              className="text-xs text-destructive"
            >
              Required
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label
            htmlFor="imageUrl"
            className="text-xs font-display tracking-wide text-muted-foreground uppercase"
          >
            Image URL
          </Label>
          <Input
            id="imageUrl"
            data-ocid="project_form.imageurl_input"
            placeholder="https://..."
            className="bg-muted border-border/60 focus:border-primary h-9"
            {...register("imageUrl")}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <Button
          type="submit"
          data-ocid="project_form.submit_button"
          disabled={isLoading}
          size="sm"
          className="glow-neon font-display font-semibold"
        >
          {isLoading ? "Saving..." : submitLabel}
        </Button>
        <Button
          type="button"
          data-ocid="project_form.cancel_button"
          onClick={onCancel}
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

// ─── ProjectRow ────────────────────────────────────────────────────────────
interface ProjectRowProps {
  project: Project;
  index: number;
  onEdit: (p: Project) => void;
  onDelete: (id: bigint) => void;
  isDeleting: boolean;
}

function ProjectRow({
  project,
  index,
  onEdit,
  onDelete,
  isDeleting,
}: ProjectRowProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-start gap-4 p-4 rounded-xl border border-border/40 bg-card/60 hover:border-border/70 transition-smooth group"
      data-ocid={`projects.item.${index + 1}`}
    >
      {/* Thumbnail */}
      <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-border/30">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-muted-foreground"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-display font-semibold text-sm text-foreground truncate">
            {project.title}
          </h3>
          <Badge
            variant="secondary"
            className="text-xs flex-shrink-0 font-body"
          >
            {project.category}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {confirmDelete ? (
          <>
            <span className="text-xs text-destructive font-body">Delete?</span>
            <Button
              type="button"
              data-ocid={`projects.confirm_button.${index + 1}`}
              size="sm"
              variant="destructive"
              className="h-7 text-xs"
              disabled={isDeleting}
              onClick={() => {
                onDelete(project.id);
                setConfirmDelete(false);
              }}
            >
              Yes
            </Button>
            <Button
              type="button"
              data-ocid={`projects.cancel_button.${index + 1}`}
              size="sm"
              variant="ghost"
              className="h-7 text-xs"
              onClick={() => setConfirmDelete(false)}
            >
              No
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              data-ocid={`projects.edit_button.${index + 1}`}
              size="sm"
              variant="ghost"
              className="h-7 text-xs opacity-0 group-hover:opacity-100 transition-smooth"
              onClick={() => onEdit(project)}
            >
              Edit
            </Button>
            <Button
              type="button"
              data-ocid={`projects.delete_button.${index + 1}`}
              size="sm"
              variant="ghost"
              className="h-7 text-xs text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-smooth"
              onClick={() => setConfirmDelete(true)}
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );
}

// ─── ProjectsTab ───────────────────────────────────────────────────────────
function ProjectsTab() {
  const { data: projects = [], isLoading } = useProjects();
  const addProject = useAddProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [mode, setMode] = useState<"idle" | "add" | "edit">("idle");
  const [editTarget, setEditTarget] = useState<Project | null>(null);

  const handleAdd = async (data: ProjectFormData) => {
    try {
      await addProject.mutateAsync(data);
      toast.success("Project added successfully");
      setMode("idle");
    } catch {
      toast.error("Failed to add project");
    }
  };

  const handleEdit = async (data: ProjectFormData) => {
    if (!editTarget) return;
    try {
      await updateProject.mutateAsync({ id: editTarget.id, data });
      toast.success("Project updated");
      setMode("idle");
      setEditTarget(null);
    } catch {
      toast.error("Failed to update project");
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteProject.mutateAsync(id);
      toast.success("Project deleted");
    } catch {
      toast.error("Failed to delete project");
    }
  };

  const startEdit = (p: Project) => {
    setEditTarget(p);
    setMode("edit");
  };

  const editDefaults: ProjectFormData | undefined = editTarget
    ? {
        title: editTarget.title,
        category: editTarget.category,
        description: editTarget.description,
        techStack: editTarget.techStack.join(", "),
        imageUrl: editTarget.imageUrl,
      }
    : undefined;

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {projects.length} project{projects.length !== 1 ? "s" : ""} total
        </p>
        {mode === "idle" && (
          <Button
            type="button"
            data-ocid="projects.open_modal_button"
            size="sm"
            onClick={() => setMode("add")}
            className="glow-neon font-display font-semibold text-xs h-8"
          >
            + Add New Project
          </Button>
        )}
      </div>

      {/* Inline add form */}
      {mode === "add" && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl border border-primary/30 bg-card/80"
          data-ocid="projects.dialog"
        >
          <h3 className="font-display font-semibold text-sm mb-4 text-gradient-forge">
            New Project
          </h3>
          <ProjectForm
            onSubmit={handleAdd}
            onCancel={() => setMode("idle")}
            isLoading={addProject.isPending}
            submitLabel="Add Project"
          />
        </motion.div>
      )}

      {/* Inline edit form */}
      {mode === "edit" && editDefaults && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl border border-secondary/30 bg-card/80"
          data-ocid="projects.dialog"
        >
          <h3 className="font-display font-semibold text-sm mb-4 text-secondary">
            Edit: {editTarget?.title}
          </h3>
          <ProjectForm
            defaultValues={editDefaults}
            onSubmit={handleEdit}
            onCancel={() => {
              setMode("idle");
              setEditTarget(null);
            }}
            isLoading={updateProject.isPending}
            submitLabel="Save Changes"
          />
        </motion.div>
      )}

      {/* Project list */}
      {isLoading ? (
        <div className="space-y-3">
          {["sk1", "sk2", "sk3"].map((k) => (
            <Skeleton key={k} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div
          data-ocid="projects.empty_state"
          className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border/40 rounded-xl"
        >
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-muted-foreground"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
          </div>
          <p className="font-display font-semibold text-sm text-foreground mb-1">
            No projects yet
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Add your first portfolio project to get started
          </p>
          <Button
            type="button"
            size="sm"
            onClick={() => setMode("add")}
            className="glow-neon font-display font-semibold text-xs"
          >
            + Add Project
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((p, i) => (
            <ProjectRow
              key={p.id.toString()}
              project={p}
              index={i}
              onEdit={startEdit}
              onDelete={handleDelete}
              isDeleting={deleteProject.isPending}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SubmissionsTab ────────────────────────────────────────────────────────
function SubmissionsTab() {
  const { data: submissions = [], isLoading } = useSubmissions();
  const deleteSubmission = useDeleteSubmission();
  const [confirmId, setConfirmId] = useState<bigint | null>(null);

  const handleDelete = async (id: bigint) => {
    try {
      await deleteSubmission.mutateAsync(id);
      toast.success("Submission deleted");
      setConfirmId(null);
    } catch {
      toast.error("Failed to delete submission");
    }
  };

  const formatDate = (ts: bigint) => {
    const ms = Number(ts) / 1_000_000;
    return new Date(ms).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {["sk1", "sk2", "sk3"].map((k) => (
          <Skeleton key={k} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div
        data-ocid="submissions.empty_state"
        className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border/40 rounded-xl"
      >
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-muted-foreground"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <p className="font-display font-semibold text-sm text-foreground mb-1">
          No submissions yet
        </p>
        <p className="text-xs text-muted-foreground">
          Contact form submissions will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {submissions.map((s, i) => (
        <motion.div
          key={s.id.toString()}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="p-4 rounded-xl border border-border/40 bg-card/60 hover:border-border/70 transition-smooth group"
          data-ocid={`submissions.item.${i + 1}`}
        >
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-sm bg-secondary/15 text-secondary ring-1 ring-secondary/30">
              {s.name.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-display font-semibold text-sm text-foreground">
                  {s.name}
                </span>
                <span className="text-xs text-muted-foreground">{s.email}</span>
                <Badge
                  variant="outline"
                  className="text-xs font-body ml-auto border-secondary/40 text-secondary"
                >
                  {s.service}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {s.projectDetails}
              </p>
              <span className="text-xs text-muted-foreground/60">
                {formatDate(s.createdAt)}
              </span>
            </div>

            <div className="flex-shrink-0 flex items-center gap-2">
              {confirmId === s.id ? (
                <>
                  <span className="text-xs text-destructive">Delete?</span>
                  <Button
                    type="button"
                    data-ocid={`submissions.confirm_button.${i + 1}`}
                    size="sm"
                    variant="destructive"
                    className="h-7 text-xs"
                    disabled={deleteSubmission.isPending}
                    onClick={() => handleDelete(s.id)}
                  >
                    Yes
                  </Button>
                  <Button
                    type="button"
                    data-ocid={`submissions.cancel_button.${i + 1}`}
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs"
                    onClick={() => setConfirmId(null)}
                  >
                    No
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  data-ocid={`submissions.delete_button.${i + 1}`}
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-smooth"
                  onClick={() => setConfirmId(s.id)}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── TestimonialsTab ───────────────────────────────────────────────────────
interface TestimonialFormValues {
  clientName: string;
  clientTitle: string;
  company: string;
  quote: string;
  rating: string;
  imageUrl: string;
  projectId: string;
  tags: string;
  featured: boolean;
}

function StarRatingDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 star-rating">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={`star-pos-${i}`}
          className={`w-3 h-3 ${i < rating ? "fill-current" : "opacity-25"}`}
        />
      ))}
    </div>
  );
}

function TestimonialsTab() {
  const { data: testimonials = [], isLoading } = useTestimonials();
  const { data: projects = [] } = useProjects();
  const addTestimonial = useAddTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();
  const featureTestimonial = useFeatureTestimonial();

  const [mode, setMode] = useState<"idle" | "add" | "edit">("idle");
  const [editTarget, setEditTarget] = useState<Testimonial | null>(null);
  const [confirmId, setConfirmId] = useState<bigint | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestimonialFormValues>({
    defaultValues: {
      clientName: "",
      clientTitle: "",
      company: "",
      quote: "",
      rating: "5",
      imageUrl: "",
      projectId: "",
      tags: "",
      featured: false,
    },
  });

  const openAdd = () => {
    reset({
      clientName: "",
      clientTitle: "",
      company: "",
      quote: "",
      rating: "5",
      imageUrl: "",
      projectId: "",
      tags: "",
      featured: false,
    });
    setEditTarget(null);
    setMode("add");
  };

  const openEdit = (t: Testimonial) => {
    setEditTarget(t);
    reset({
      clientName: t.clientName,
      clientTitle: t.clientTitle,
      company: t.company,
      quote: t.quote,
      rating: t.rating.toString(),
      imageUrl: t.imageUrl,
      projectId: t.projectId ? t.projectId.toString() : "",
      tags: t.tags.join(", "),
      featured: t.featured,
    });
    setMode("edit");
  };

  const onSubmit = async (data: TestimonialFormValues) => {
    const input: TestimonialInput = {
      clientName: data.clientName,
      clientTitle: data.clientTitle,
      company: data.company,
      quote: data.quote,
      rating: BigInt(data.rating),
      imageUrl: data.imageUrl,
      featured: data.featured,
      tags: data.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      ...(data.projectId ? { projectId: BigInt(data.projectId) } : {}),
    };
    try {
      if (mode === "edit" && editTarget) {
        await updateTestimonial.mutateAsync({ id: editTarget.id, input });
        toast.success("Testimonial updated");
      } else {
        await addTestimonial.mutateAsync(input);
        toast.success("Testimonial added");
      }
      setMode("idle");
      setEditTarget(null);
    } catch {
      toast.error("Failed to save testimonial");
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteTestimonial.mutateAsync(id);
      toast.success("Testimonial deleted");
      setConfirmId(null);
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleToggleFeature = async (t: Testimonial) => {
    try {
      await featureTestimonial.mutateAsync({ id: t.id, featured: !t.featured });
      toast.success(t.featured ? "Unfeatured" : "Featured");
    } catch {
      toast.error("Failed to update");
    }
  };

  const isPending = addTestimonial.isPending || updateTestimonial.isPending;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {testimonials.length} testimonial
          {testimonials.length !== 1 ? "s" : ""}
        </p>
        {mode === "idle" && (
          <Button
            type="button"
            size="sm"
            data-ocid="testimonials_admin.open_modal_button"
            onClick={openAdd}
            className="glow-neon font-display font-semibold text-xs h-8"
          >
            + Add Testimonial
          </Button>
        )}
      </div>

      {mode !== "idle" && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl border border-primary/30 bg-card/80"
          data-ocid="testimonials_admin.dialog"
        >
          <h3 className="font-display font-semibold text-sm mb-4 text-gradient-forge">
            {mode === "edit"
              ? `Edit: ${editTarget?.clientName}`
              : "New Testimonial"}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="t-clientName"
                  className="text-xs font-display tracking-wide text-muted-foreground uppercase"
                >
                  Client Name
                </Label>
                <Input
                  id="t-clientName"
                  data-ocid="testimonials_admin.clientname_input"
                  placeholder="Jane Smith"
                  className="bg-muted border-border/60 focus:border-primary h-9"
                  {...register("clientName", { required: true })}
                />
                {errors.clientName && (
                  <p
                    data-ocid="testimonials_admin.clientname_field_error"
                    className="text-xs text-destructive"
                  >
                    Required
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="t-clientTitle"
                  className="text-xs font-display tracking-wide text-muted-foreground uppercase"
                >
                  Title / Role
                </Label>
                <Input
                  id="t-clientTitle"
                  data-ocid="testimonials_admin.clienttitle_input"
                  placeholder="CEO, Acme Corp"
                  className="bg-muted border-border/60 focus:border-primary h-9"
                  {...register("clientTitle", { required: true })}
                />
                {errors.clientTitle && (
                  <p className="text-xs text-destructive">Required</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="t-company"
                  className="text-xs font-display tracking-wide text-muted-foreground uppercase"
                >
                  Company
                </Label>
                <Input
                  id="t-company"
                  data-ocid="testimonials_admin.company_input"
                  placeholder="Company"
                  className="bg-muted border-border/60 focus:border-primary h-9"
                  {...register("company")}
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="t-rating"
                  className="text-xs font-display tracking-wide text-muted-foreground uppercase"
                >
                  Rating
                </Label>
                <select
                  id="t-rating"
                  data-ocid="testimonials_admin.rating_select"
                  className="w-full h-9 px-3 rounded-md bg-muted border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  {...register("rating")}
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} Stars
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="t-project"
                  className="text-xs font-display tracking-wide text-muted-foreground uppercase"
                >
                  Project (optional)
                </Label>
                <select
                  id="t-project"
                  data-ocid="testimonials_admin.project_select"
                  className="w-full h-9 px-3 rounded-md bg-muted border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  {...register("projectId")}
                >
                  <option value="">None</option>
                  {projects.map((p) => (
                    <option key={p.id.toString()} value={p.id.toString()}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="t-quote"
                className="text-xs font-display tracking-wide text-muted-foreground uppercase"
              >
                Quote
              </Label>
              <Textarea
                id="t-quote"
                data-ocid="testimonials_admin.quote_textarea"
                placeholder="What the client said..."
                rows={3}
                className="bg-muted border-border/60 focus:border-primary resize-none"
                {...register("quote", { required: true })}
              />
              {errors.quote && (
                <p className="text-xs text-destructive">Required</p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="t-imageUrl"
                  className="text-xs font-display tracking-wide text-muted-foreground uppercase"
                >
                  Avatar URL
                </Label>
                <Input
                  id="t-imageUrl"
                  data-ocid="testimonials_admin.imageurl_input"
                  placeholder="https://..."
                  className="bg-muted border-border/60 focus:border-primary h-9"
                  {...register("imageUrl")}
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="t-tags"
                  className="text-xs font-display tracking-wide text-muted-foreground uppercase"
                >
                  Tags (comma-separated)
                </Label>
                <Input
                  id="t-tags"
                  data-ocid="testimonials_admin.tags_input"
                  placeholder="Laravel, Fintech"
                  className="bg-muted border-border/60 focus:border-primary h-9"
                  {...register("tags")}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="t-featured"
                data-ocid="testimonials_admin.featured_checkbox"
                className="w-4 h-4 accent-primary rounded"
                {...register("featured")}
              />
              <Label
                htmlFor="t-featured"
                className="text-sm font-body text-foreground cursor-pointer"
              >
                Feature on homepage
              </Label>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <Button
                type="submit"
                data-ocid="testimonials_admin.submit_button"
                disabled={isPending}
                size="sm"
                className="glow-neon font-display font-semibold"
              >
                {isPending
                  ? "Saving..."
                  : mode === "edit"
                    ? "Save Changes"
                    : "Add Testimonial"}
              </Button>
              <Button
                type="button"
                data-ocid="testimonials_admin.cancel_button"
                onClick={() => {
                  setMode("idle");
                  setEditTarget(null);
                }}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {["s1", "s2", "s3"].map((k) => (
            <Skeleton key={k} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div
          data-ocid="testimonials_admin.empty_state"
          className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border/40 rounded-xl"
        >
          <Quote className="w-10 h-10 text-muted-foreground/40 mb-3" />
          <p className="font-display font-semibold text-sm text-foreground mb-1">
            No testimonials yet
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Add your first client testimonial
          </p>
          <Button
            type="button"
            size="sm"
            onClick={openAdd}
            className="glow-neon font-display font-semibold text-xs"
          >
            + Add Testimonial
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id.toString()}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 p-4 rounded-xl border border-border/40 bg-card/60 hover:border-border/70 transition-smooth group"
              data-ocid={`testimonials_admin.item.${i + 1}`}
            >
              <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
                {t.imageUrl ? (
                  <img
                    src={t.imageUrl}
                    alt={t.clientName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-display font-bold text-sm text-primary">
                    {t.clientName.charAt(0)}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-display font-semibold text-sm text-foreground">
                    {t.clientName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {t.clientTitle}
                    {t.company ? `, ${t.company}` : ""}
                  </span>
                  {t.featured && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30">
                      Featured
                    </span>
                  )}
                </div>
                <StarRatingDisplay rating={Number(t.rating)} />
                <p className="text-xs text-muted-foreground line-clamp-1 mt-1 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                {t.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-1.5 py-0.5 rounded bg-secondary/10 text-secondary font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button
                  type="button"
                  data-ocid={`testimonials_admin.feature_toggle.${i + 1}`}
                  size="sm"
                  variant="ghost"
                  className={`h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-smooth ${
                    t.featured ? "text-primary" : "text-muted-foreground"
                  }`}
                  title={t.featured ? "Unfeature" : "Feature"}
                  onClick={() => handleToggleFeature(t)}
                >
                  <Star
                    className={`w-3.5 h-3.5 ${t.featured ? "fill-current" : ""}`}
                  />
                </Button>
                <Button
                  type="button"
                  data-ocid={`testimonials_admin.edit_button.${i + 1}`}
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs opacity-0 group-hover:opacity-100 transition-smooth"
                  onClick={() => openEdit(t)}
                >
                  Edit
                </Button>
                {confirmId === t.id ? (
                  <>
                    <span className="text-xs text-destructive">Delete?</span>
                    <Button
                      type="button"
                      data-ocid={`testimonials_admin.confirm_button.${i + 1}`}
                      size="sm"
                      variant="destructive"
                      className="h-7 text-xs"
                      disabled={deleteTestimonial.isPending}
                      onClick={() => handleDelete(t.id)}
                    >
                      Yes
                    </Button>
                    <Button
                      type="button"
                      data-ocid={`testimonials_admin.cancel_button.${i + 1}`}
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs"
                      onClick={() => setConfirmId(null)}
                    >
                      No
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    data-ocid={`testimonials_admin.delete_button.${i + 1}`}
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-smooth"
                    onClick={() => setConfirmId(t.id)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── BlogPostsTab ──────────────────────────────────────────────────────────
interface BlogPostFormValues {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  postType: PostType;
  projectId: string;
  tags: string;
  imageUrl: string;
  featured: boolean;
}

function BlogPostsTab() {
  const { data: blogPosts = [], isLoading } = useBlogPosts();
  const { data: projects = [] } = useProjects();
  const addBlogPost = useAddBlogPost();
  const updateBlogPost = useUpdateBlogPost();
  const deleteBlogPost = useDeleteBlogPost();
  const featureBlogPost = useFeatureBlogPost();

  const [mode, setMode] = useState<"idle" | "add" | "edit">("idle");
  const [editTarget, setEditTarget] = useState<BlogPost | null>(null);
  const [confirmId, setConfirmId] = useState<bigint | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BlogPostFormValues>({
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      postType: "standalone",
      projectId: "",
      tags: "",
      imageUrl: "",
      featured: false,
    },
  });

  const titleValue = watch("title");

  useEffect(() => {
    if (mode === "add" && titleValue) {
      setValue(
        "slug",
        titleValue
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
      );
    }
  }, [titleValue, mode, setValue]);

  const openAdd = () => {
    reset({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      postType: "standalone",
      projectId: "",
      tags: "",
      imageUrl: "",
      featured: false,
    });
    setEditTarget(null);
    setMode("add");
  };

  const openEdit = (post: BlogPost) => {
    setEditTarget(post);
    reset({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      postType: post.postType,
      projectId: post.projectId ? post.projectId.toString() : "",
      tags: post.tags.join(", "),
      imageUrl: post.imageUrl,
      featured: post.featured,
    });
    setMode("edit");
  };

  const onSubmit = async (data: BlogPostFormValues) => {
    const input: BlogPostInput = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      postType: data.postType,
      featured: data.featured,
      tags: data.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      imageUrl: data.imageUrl,
      ...(data.projectId ? { projectId: BigInt(data.projectId) } : {}),
    };
    try {
      if (mode === "edit" && editTarget) {
        await updateBlogPost.mutateAsync({ id: editTarget.id, input });
        toast.success("Blog post updated");
      } else {
        await addBlogPost.mutateAsync(input);
        toast.success("Blog post added");
      }
      setMode("idle");
      setEditTarget(null);
    } catch {
      toast.error("Failed to save blog post");
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteBlogPost.mutateAsync(id);
      toast.success("Blog post deleted");
      setConfirmId(null);
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleToggleFeature = async (post: BlogPost) => {
    try {
      await featureBlogPost.mutateAsync({
        id: post.id,
        featured: !post.featured,
      });
      toast.success(post.featured ? "Unfeatured" : "Featured");
    } catch {
      toast.error("Failed to update");
    }
  };

  const isPending = addBlogPost.isPending || updateBlogPost.isPending;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {blogPosts.length} post{blogPosts.length !== 1 ? "s" : ""}
        </p>
        {mode === "idle" && (
          <Button
            type="button"
            size="sm"
            data-ocid="blog_admin.open_modal_button"
            onClick={openAdd}
            className="glow-neon font-display font-semibold text-xs h-8"
          >
            + Add Blog Post
          </Button>
        )}
      </div>

      {mode !== "idle" && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl border border-secondary/30 bg-card/80"
          data-ocid="blog_admin.dialog"
        >
          <h3 className="font-display font-semibold text-sm mb-4 text-secondary">
            {mode === "edit" ? `Edit: ${editTarget?.title}` : "New Blog Post"}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="b-title"
                  className="text-xs font-display tracking-wide text-muted-foreground uppercase"
                >
                  Title
                </Label>
                <Input
                  id="b-title"
                  data-ocid="blog_admin.title_input"
                  placeholder="Post title"
                  className="bg-muted border-border/60 focus:border-primary h-9"
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <p
                    data-ocid="blog_admin.title_field_error"
                    className="text-xs text-destructive"
                  >
                    Required
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="b-slug"
                  className="text-xs font-display tracking-wide text-muted-foreground uppercase"
                >
                  Slug
                </Label>
                <Input
                  id="b-slug"
                  data-ocid="blog_admin.slug_input"
                  placeholder="auto-generated"
                  className="bg-muted border-border/60 focus:border-primary h-9"
                  {...register("slug", { required: true })}
                />
                {errors.slug && (
                  <p className="text-xs text-destructive">Required</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="b-postType"
                  className="text-xs font-display tracking-wide text-muted-foreground uppercase"
                >
                  Type
                </Label>
                <select
                  id="b-postType"
                  data-ocid="blog_admin.posttype_select"
                  className="w-full h-9 px-3 rounded-md bg-muted border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  {...register("postType")}
                >
                  <option value="caseStudy">Case Study</option>
                  <option value="standalone">Standalone Article</option>
                </select>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label
                  htmlFor="b-project"
                  className="text-xs font-display tracking-wide text-muted-foreground uppercase"
                >
                  Project (optional)
                </Label>
                <select
                  id="b-project"
                  data-ocid="blog_admin.project_select"
                  className="w-full h-9 px-3 rounded-md bg-muted border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  {...register("projectId")}
                >
                  <option value="">None</option>
                  {projects.map((p) => (
                    <option key={p.id.toString()} value={p.id.toString()}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="b-excerpt"
                className="text-xs font-display tracking-wide text-muted-foreground uppercase"
              >
                Excerpt
              </Label>
              <Textarea
                id="b-excerpt"
                data-ocid="blog_admin.excerpt_textarea"
                placeholder="Brief summary..."
                rows={2}
                className="bg-muted border-border/60 focus:border-primary resize-none"
                {...register("excerpt", { required: true })}
              />
              {errors.excerpt && (
                <p className="text-xs text-destructive">Required</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="b-content"
                className="text-xs font-display tracking-wide text-muted-foreground uppercase"
              >
                Content
              </Label>
              <Textarea
                id="b-content"
                data-ocid="blog_admin.content_textarea"
                placeholder="Full article content (Markdown supported)..."
                rows={6}
                className="bg-muted border-border/60 focus:border-primary resize-none"
                {...register("content", { required: true })}
              />
              {errors.content && (
                <p className="text-xs text-destructive">Required</p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="b-imageUrl"
                  className="text-xs font-display tracking-wide text-muted-foreground uppercase"
                >
                  Cover Image URL
                </Label>
                <Input
                  id="b-imageUrl"
                  data-ocid="blog_admin.imageurl_input"
                  placeholder="https://..."
                  className="bg-muted border-border/60 focus:border-primary h-9"
                  {...register("imageUrl")}
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="b-tags"
                  className="text-xs font-display tracking-wide text-muted-foreground uppercase"
                >
                  Tags (comma-separated)
                </Label>
                <Input
                  id="b-tags"
                  data-ocid="blog_admin.tags_input"
                  placeholder="Laravel, Security"
                  className="bg-muted border-border/60 focus:border-primary h-9"
                  {...register("tags")}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="b-featured"
                data-ocid="blog_admin.featured_checkbox"
                className="w-4 h-4 accent-primary rounded"
                {...register("featured")}
              />
              <Label
                htmlFor="b-featured"
                className="text-sm font-body text-foreground cursor-pointer"
              >
                Feature this post
              </Label>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <Button
                type="submit"
                data-ocid="blog_admin.submit_button"
                disabled={isPending}
                size="sm"
                className="glow-neon font-display font-semibold"
              >
                {isPending
                  ? "Saving..."
                  : mode === "edit"
                    ? "Save Changes"
                    : "Add Post"}
              </Button>
              <Button
                type="button"
                data-ocid="blog_admin.cancel_button"
                onClick={() => {
                  setMode("idle");
                  setEditTarget(null);
                }}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {["s1", "s2", "s3"].map((k) => (
            <Skeleton key={k} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : blogPosts.length === 0 ? (
        <div
          data-ocid="blog_admin.empty_state"
          className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border/40 rounded-xl"
        >
          <BookOpen className="w-10 h-10 text-muted-foreground/40 mb-3" />
          <p className="font-display font-semibold text-sm text-foreground mb-1">
            No blog posts yet
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Write your first case study or article
          </p>
          <Button
            type="button"
            size="sm"
            onClick={openAdd}
            className="glow-neon font-display font-semibold text-xs"
          >
            + Add Blog Post
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.id.toString()}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 p-4 rounded-xl border border-border/40 bg-card/60 hover:border-border/70 transition-smooth group"
              data-ocid={`blog_admin.item.${i + 1}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-display font-semibold text-sm text-foreground truncate">
                    {post.title}
                  </span>
                  <span
                    className={
                      post.postType === "caseStudy"
                        ? "badge-case-study"
                        : "badge-article"
                    }
                  >
                    {post.postType === "caseStudy" ? "Case Study" : "Article"}
                  </span>
                  {post.featured && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground font-mono mb-1">
                  /blog/{post.slug}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {post.excerpt}
                </p>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-1.5 py-0.5 rounded bg-secondary/10 text-secondary font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button
                  type="button"
                  data-ocid={`blog_admin.feature_toggle.${i + 1}`}
                  size="sm"
                  variant="ghost"
                  className={`h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-smooth ${
                    post.featured ? "text-primary" : "text-muted-foreground"
                  }`}
                  title={post.featured ? "Unfeature" : "Feature"}
                  onClick={() => handleToggleFeature(post)}
                >
                  <Star
                    className={`w-3.5 h-3.5 ${
                      post.featured ? "fill-current" : ""
                    }`}
                  />
                </Button>
                <Button
                  type="button"
                  data-ocid={`blog_admin.edit_button.${i + 1}`}
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs opacity-0 group-hover:opacity-100 transition-smooth"
                  onClick={() => openEdit(post)}
                >
                  Edit
                </Button>
                {confirmId === post.id ? (
                  <>
                    <span className="text-xs text-destructive">Delete?</span>
                    <Button
                      type="button"
                      data-ocid={`blog_admin.confirm_button.${i + 1}`}
                      size="sm"
                      variant="destructive"
                      className="h-7 text-xs"
                      disabled={deleteBlogPost.isPending}
                      onClick={() => handleDelete(post.id)}
                    >
                      Yes
                    </Button>
                    <Button
                      type="button"
                      data-ocid={`blog_admin.cancel_button.${i + 1}`}
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs"
                      onClick={() => setConfirmId(null)}
                    >
                      No
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    data-ocid={`blog_admin.delete_button.${i + 1}`}
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-smooth"
                    onClick={() => setConfirmId(post.id)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── StatCard ──────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  color,
  ocid,
}: {
  label: string;
  value: number;
  color: string;
  ocid: string;
}) {
  const borderClass =
    color === "primary"
      ? "border-primary/35"
      : color === "secondary"
        ? "border-secondary/35"
        : "border-border/40";

  const valueClass =
    color === "primary"
      ? "text-primary"
      : color === "secondary"
        ? "text-secondary"
        : "text-foreground";

  return (
    <div
      data-ocid={ocid}
      className={`p-4 rounded-xl bg-card/60 border transition-smooth hover:border-border/70 ${borderClass}`}
    >
      <div
        className={`text-2xl font-display font-bold mb-1 tabular-nums ${valueClass}`}
      >
        {value}
      </div>
      <div className="text-xs text-muted-foreground font-body">{label}</div>
    </div>
  );
}

// ─── AdminPage ─────────────────────────────────────────────────────────────
export default function AdminPage() {
  const { loginStatus, clear, isAuthenticated } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: projects = [] } = useProjects();
  const { data: submissions = [] } = useSubmissions();
  const { data: testimonials = [] } = useTestimonials();
  const { data: blogPosts = [] } = useBlogPosts();

  useEffect(() => {
    if (!isAuthenticated && loginStatus !== "initializing") {
      navigate({ to: "/admin/login" });
    }
  }, [isAuthenticated, loginStatus, navigate]);

  const handleLogout = () => {
    clear();
    navigate({ to: "/admin/login" });
  };

  // Auth guard — loading state
  if (loginStatus === "initializing" || loginStatus === "logging-in") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Verifying identity...</p>
        </div>
      </div>
    );
  }

  // Admin check loading
  if (adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            Checking permissions...
          </p>
        </div>
      </div>
    );
  }

  // Not admin
  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div
          data-ocid="admin.error_state"
          className="text-center max-w-sm mx-4 p-8 rounded-2xl border border-destructive/30 bg-card"
        >
          <div className="w-12 h-12 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center mx-auto mb-4">
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-destructive"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <h2 className="font-display font-bold text-lg text-foreground mb-2">
            Access Denied
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            Your identity is not authorized to access the admin dashboard.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="font-display"
          >
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="bg-card border-b border-border/50 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-primary/10 border border-primary/40">
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M16 4L28 10V22L16 28L4 22V10L16 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="currentColor"
                  className="text-primary opacity-20"
                />
                <path
                  d="M16 10L22 13V19L16 22L10 19V13L16 10Z"
                  fill="currentColor"
                  className="text-primary"
                />
              </svg>
            </div>
            <div>
              <span className="font-display font-bold text-sm text-foreground">
                YasinForge
              </span>
              <span className="ml-2 text-xs text-muted-foreground">Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              data-ocid="admin.nav_link"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ← View Site
            </a>
            <Button
              type="button"
              data-ocid="admin.logout_button"
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="h-7 text-xs font-display border-border/60 hover:border-destructive/50 hover:text-destructive"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          <StatCard
            label="Total Projects"
            value={projects.length}
            color="primary"
            ocid="admin.stats_projects"
          />
          <StatCard
            label="Submissions"
            value={submissions.length}
            color="secondary"
            ocid="admin.stats_submissions"
          />
          <StatCard
            label="Testimonials"
            value={testimonials.length}
            color="muted"
            ocid="admin.stats_testimonials"
          />
          <StatCard
            label="Blog Posts"
            value={blogPosts.length}
            color="accent"
            ocid="admin.stats_blogposts"
          />
        </motion.div>

        {/* Main tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <Tabs defaultValue="projects" data-ocid="admin.tab">
            <TabsList className="mb-6 bg-card border border-border/40 h-10">
              <TabsTrigger
                value="projects"
                data-ocid="admin.projects_tab"
                className="font-display text-xs font-medium data-[state=active]:glow-neon"
              >
                Projects
                <span className="ml-1.5 px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                  {projects.length}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="submissions"
                data-ocid="admin.submissions_tab"
                className="font-display text-xs font-medium"
              >
                Submissions
                <span className="ml-1.5 px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                  {submissions.length}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="testimonials"
                data-ocid="admin.testimonials_tab"
                className="font-display text-xs font-medium"
              >
                Testimonials
                <span className="ml-1.5 px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                  {testimonials.length}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="blog"
                data-ocid="admin.blog_tab"
                className="font-display text-xs font-medium"
              >
                Blog Posts
                <span className="ml-1.5 px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                  {blogPosts.length}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects">
              <ProjectsTab />
            </TabsContent>

            <TabsContent value="submissions">
              <SubmissionsTab />
            </TabsContent>

            <TabsContent value="testimonials">
              <TestimonialsTab />
            </TabsContent>

            <TabsContent value="blog">
              <BlogPostsTab />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
