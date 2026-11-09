"use client";

import { useState, useEffect } from "react";
import { Tags, Plus, Trash2, Edit, Save, X, GripVertical } from "lucide-react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { ConfirmDialog } from "@/components/admin/ui/ConfirmDialog";
import { toast } from "sonner";
import type { Category } from "@/types/database";
import { getCategories, saveCategory, deleteCategory } from "@/lib/data/api";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleCreate = async () => {
    if (!newName.trim()) {
      toast.error("Category name is required");
      return;
    }
    const slug = newSlug.trim() || newName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await saveCategory({ name: newName, slug });
    toast.success("Category created successfully");
    setNewName("");
    setNewSlug("");
    getCategories().then(setCategories);
  };

  const handleStartEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditSlug(cat.slug);
  };

  const handleSaveEdit = async (cat: Category) => {
    if (!editName.trim()) return;
    await saveCategory({ id: cat.id, name: editName, slug: editSlug });
    setEditingId(null);
    toast.success("Category updated");
    getCategories().then(setCategories);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteCategory(deleteTarget.id);
    setDeleteTarget(null);
    toast.success("Category deleted");
    getCategories().then(setCategories);
  };

  return (
    <>
      <PageHeader
        title="Categories &amp; Disciplines"
        description="Organize your portfolio archive into searchable photography and film categories."
        icon={Tags}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Categories List (Left 7 cols) */}
        <div className="lg:col-span-7 admin-card overflow-hidden">
          <div className="px-5 py-4 border-b" style={{ borderColor: "var(--admin-border)" }}>
            <h3 className="text-sm font-semibold" style={{ color: "var(--admin-text)" }}>
              Active Categories ({categories.length})
            </h3>
          </div>

          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 44 }} />
                <th>Category Name</th>
                <th>URL Slug</th>
                <th style={{ width: 100, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, idx) => {
                const isEditing = editingId === cat.id;

                return (
                  <tr key={cat.id}>
                    <td>
                      <span className="font-mono text-xs" style={{ color: "var(--admin-text-muted)" }}>
                        0{idx + 1}
                      </span>
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="admin-input text-xs py-1"
                        />
                      ) : (
                        <span className="text-sm font-semibold" style={{ color: "var(--admin-text)" }}>
                          {cat.name}
                        </span>
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editSlug}
                          onChange={(e) => setEditSlug(e.target.value)}
                          className="admin-input text-xs py-1 font-mono"
                        />
                      ) : (
                        <span className="font-mono text-xs" style={{ color: "var(--admin-text-muted)" }}>
                          /{cat.slug}
                        </span>
                      )}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleSaveEdit(cat)}
                            className="admin-btn admin-btn-primary admin-btn-sm"
                          >
                            <Save size={13} />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="admin-btn admin-btn-ghost admin-btn-sm"
                          >
                            <X size={13} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleStartEdit(cat)}
                            className="admin-btn admin-btn-ghost admin-btn-icon"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(cat)}
                            className="admin-btn admin-btn-ghost admin-btn-icon text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Add Category Form (Right 5 cols) */}
        <div className="lg:col-span-5 admin-card p-6">
          <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--admin-text)" }}>
            Add New Category
          </h3>

          <div className="flex flex-col gap-4">
            <div>
              <label className="admin-label">Category Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value);
                  setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                }}
                placeholder="e.g. Underwater Cinematography"
                className="admin-input"
              />
            </div>

            <div>
              <label className="admin-label">Slug</label>
              <input
                type="text"
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                placeholder="underwater-cinematography"
                className="admin-input font-mono text-xs"
              />
            </div>

            <button
              onClick={handleCreate}
              className="admin-btn admin-btn-primary mt-2 flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              <span>Create Category</span>
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Category?"
        description={`Are you sure you want to delete "${deleteTarget?.name}"?`}
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}

