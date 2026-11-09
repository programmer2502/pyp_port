"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  Plus,
  Search,
  Star,
  Trash2,
  Edit,
  ExternalLink,
  GripVertical,
  Play,
  Camera,
  Film,
  Layers,
} from "lucide-react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ui/ConfirmDialog";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Project } from "@/types/database";
import { getProjects, deleteProject, reorderProjects, saveProject } from "@/lib/data/api";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    getProjects({ publishedOnly: false }).then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.client.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (typeFilter !== "all" && p.type !== typeFilter && p.type !== "both") {
        return false;
      }
      return true;
    });
  }, [projects, search, typeFilter]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex((p) => p.id === active.id);
    const newIndex = projects.findIndex((p) => p.id === over.id);
    const updated = arrayMove(projects, oldIndex, newIndex);
    setProjects(updated);

    try {
      await reorderProjects(updated.map((p) => p.id));
      toast.success("Order updated successfully");
    } catch {
      toast.error("Failed to update project order");
    }
  };

  const handleTogglePublished = async (project: Project) => {
    const updated = { ...project, published: !project.published };
    setProjects((prev) => prev.map((p) => (p.id === project.id ? updated : p)));
    await saveProject(updated);
    toast.success(updated.published ? "Project published" : "Project unpublished");
  };

  const handleToggleFeatured = async (project: Project) => {
    const updated = { ...project, featured: !project.featured };
    setProjects((prev) => prev.map((p) => (p.id === project.id ? updated : p)));
    await saveProject(updated);
    toast.success(updated.featured ? "Featured on Home" : "Removed from Featured");
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProject(deleteTarget.id);
      setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      toast.success("Project deleted successfully");
    } catch {
      toast.error("Failed to delete project");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Project Showcase"
        description="Manage your photography series, case studies, and cinema films."
        icon={Briefcase}
        actions={
          <Link href="/admin/projects/new" className="admin-btn admin-btn-primary">
            <Plus size={16} />
            <span>New Project</span>
          </Link>
        }
      />

      {/* Filter & Search Bar */}
      <div className="admin-card p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--admin-text-muted)" }}
          />
          <input
            type="text"
            placeholder="Search by title, client, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTypeFilter("all")}
            className={`admin-btn ${typeFilter === "all" ? "admin-btn-primary" : "admin-btn-secondary"}`}
          >
            All Types
          </button>
          <button
            onClick={() => setTypeFilter("photo")}
            className={`admin-btn ${typeFilter === "photo" ? "admin-btn-primary" : "admin-btn-secondary"}`}
          >
            Photos
          </button>
          <button
            onClick={() => setTypeFilter("video")}
            className={`admin-btn ${typeFilter === "video" ? "admin-btn-primary" : "admin-btn-secondary"}`}
          >
            Videos
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="admin-card overflow-hidden">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={filtered.map((p) => p.id)} strategy={verticalListSortingStrategy}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: 44 }} aria-label="Reorder handle" />
                  <th style={{ width: 80 }}>Cover</th>
                  <th>Project Title &amp; Client</th>
                  <th>Category</th>
                  <th>Format</th>
                  <th>Featured</th>
                  <th>Status</th>
                  <th style={{ width: 120, textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((proj) => (
                  <SortableRow
                    key={proj.id}
                    project={proj}
                    onTogglePublished={() => handleTogglePublished(proj)}
                    onToggleFeatured={() => handleToggleFeatured(proj)}
                    onDelete={() => setDeleteTarget(proj)}
                  />
                ))}
              </tbody>
            </table>
          </SortableContext>
        </DndContext>

        {filtered.length === 0 && !loading && (
          <div className="p-12 text-center" style={{ color: "var(--admin-text-muted)" }}>
            <p className="text-sm">No projects found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Project?"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? All associated gallery media files will also be permanently deleted.`}
        confirmLabel="Delete Project"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}

function SortableRow({
  project,
  onTogglePublished,
  onToggleFeatured,
  onDelete,
}: {
  project: Project;
  onTogglePublished: () => void;
  onToggleFeatured: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: project.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <tr ref={setNodeRef} style={style}>
      <td>
        <button
          {...attributes}
          {...listeners}
          className="admin-btn-icon cursor-grab active:cursor-grabbing p-1"
          style={{ color: "var(--admin-text-muted)" }}
          aria-label="Reorder project"
        >
          <GripVertical size={16} />
        </button>
      </td>
      <td>
        <div
          className="relative rounded-lg overflow-hidden border"
          style={{ width: 56, height: 40, borderColor: "var(--admin-border)", background: "var(--admin-surface-raised)" }}
        >
          <img src={project.cover_image} alt="" className="w-full h-full object-cover" />
        </div>
      </td>
      <td>
        <div>
          <Link
            href={`/admin/projects/${project.id}`}
            className="text-sm font-semibold hover:underline block"
            style={{ color: "var(--admin-text)" }}
          >
            {project.title}
          </Link>
          <span className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
            {project.client} • {project.year}
          </span>
        </div>
      </td>
      <td>
        <span className="text-xs font-mono" style={{ color: "var(--admin-text)" }}>
          {project.category_name || "General"}
        </span>
      </td>
      <td>
        <span className="text-xs font-mono uppercase inline-flex items-center gap-1.5" style={{ color: "var(--admin-text)" }}>
          {project.type === "both" ? (
            <>
              <Camera size={13} /> + <Film size={13} />
            </>
          ) : project.type === "video" ? (
            <>
              <Film size={13} /> Video
            </>
          ) : (
            <>
              <Camera size={13} /> Photo
            </>
          )}
        </span>
      </td>
      <td>
        <button
          onClick={onToggleFeatured}
          className="p-1 rounded transition-colors"
          title={project.featured ? "Featured on Home" : "Not featured"}
        >
          <Star
            size={18}
            className={project.featured ? "text-amber-500 fill-amber-500" : "text-gray-300"}
          />
        </button>
      </td>
      <td>
        <button
          onClick={onTogglePublished}
          className="cursor-pointer"
          title="Click to toggle publish status"
        >
          <StatusBadge status={project.published ? "published" : "draft"} />
        </button>
      </td>
      <td style={{ textAlign: "right" }}>
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/work/${project.slug}`}
            target="_blank"
            className="admin-btn admin-btn-ghost admin-btn-icon"
            title="View on site"
          >
            <ExternalLink size={15} />
          </Link>
          <Link
            href={`/admin/projects/${project.id}`}
            className="admin-btn admin-btn-ghost admin-btn-icon"
            title="Edit project"
          >
            <Edit size={15} />
          </Link>
          <button
            onClick={onDelete}
            className="admin-btn admin-btn-ghost admin-btn-icon text-red-500 hover:text-red-700"
            title="Delete project"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
}

