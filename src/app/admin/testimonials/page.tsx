"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MessageSquareQuote, Plus, Trash2, Edit, Save, CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ui/ConfirmDialog";
import { toast } from "sonner";
import type { Testimonial } from "@/types/database";
import { getTestimonials, saveTestimonial, deleteTestimonial } from "@/lib/data/api";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);

  // Form fields
  const [quote, setQuote] = useState("");
  const [clientName, setClientName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [clientAvatar, setClientAvatar] = useState("");
  const [published, setPublished] = useState(true);

  useEffect(() => {
    getTestimonials().then(setTestimonials);
  }, []);

  const handleStartEdit = (t: Testimonial) => {
    setEditingItem(t);
    setQuote(t.quote);
    setClientName(t.client_name);
    setProjectName(t.project_name);
    setClientAvatar(t.client_avatar || "");
    setPublished(t.published);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setQuote("");
    setClientName("");
    setProjectName("");
    setClientAvatar("");
    setPublished(true);
  };

  const handleSave = async () => {
    if (!quote.trim() || !clientName.trim()) {
      toast.error("Quote and client name are required");
      return;
    }

    await saveTestimonial({
      id: editingItem?.id,
      quote,
      client_name: clientName,
      project_name: projectName || "Commission",
      client_avatar: clientAvatar || null,
      published,
    });

    toast.success(editingItem ? "Testimonial updated" : "Testimonial created");
    handleCancel();
    getTestimonials().then(setTestimonials);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteTestimonial(deleteTarget.id);
    setDeleteTarget(null);
    toast.success("Testimonial deleted");
    getTestimonials().then(setTestimonials);
  };

  return (
    <>
      <PageHeader
        title="Client Endorsements"
        description="Manage the quotes and reviews displayed in the home page testimonial carousel."
        icon={MessageSquareQuote}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Testimonials List (Left 7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="admin-card p-5 flex flex-col justify-between gap-4">
              <p className="text-sm italic leading-relaxed" style={{ color: "var(--admin-text)" }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: "var(--admin-border)" }}>
                <div className="flex items-center gap-3">
                  {t.client_avatar ? (
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-[#D9D5CB] flex-shrink-0">
                      <img src={t.client_avatar} alt="" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                      {t.client_name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-semibold" style={{ color: "var(--admin-text)" }}>
                      {t.client_name}
                    </h4>
                    <p className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
                      {t.project_name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <StatusBadge status={t.published ? "published" : "draft"} />
                  <button
                    onClick={() => handleStartEdit(t)}
                    className="admin-btn admin-btn-ghost admin-btn-icon"
                  >
                    <Edit size={15} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(t)}
                    className="admin-btn admin-btn-ghost admin-btn-icon text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form (Right 5 cols) */}
        <div className="lg:col-span-5 admin-card p-6 sticky top-20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold" style={{ color: "var(--admin-text)" }}>
              {editingItem ? "Edit Testimonial" : "Add Testimonial"}
            </h3>
            {editingItem && (
              <button onClick={handleCancel} className="text-xs text-red-500 hover:underline">
                Cancel
              </button>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="admin-label">Client Quote</label>
              <textarea
                rows={4}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="PYP did not just shoot our wedding — they crafted an heirloom film..."
                className="admin-input text-sm"
              />
            </div>

            <div>
              <label className="admin-label">Client Name &amp; Title</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Elena & Marcus Vance"
                className="admin-input"
              />
            </div>

            <div>
              <label className="admin-label">Project / Event Name</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="The Highland Vows, Isle of Skye"
                className="admin-input"
              />
            </div>

            <div>
              <label className="admin-label">Avatar Image URL</label>
              <input
                type="url"
                value={clientAvatar}
                onChange={(e) => setClientAvatar(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="admin-input font-mono text-xs"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="admin-checkbox"
              />
              <span className="text-sm font-medium" style={{ color: "var(--admin-text)" }}>
                Published on Live Site
              </span>
            </label>

            <button
              onClick={handleSave}
              className="admin-btn admin-btn-primary mt-2 flex items-center justify-center gap-2"
            >
              <Save size={16} />
              <span>{editingItem ? "Save Changes" : "Publish Testimonial"}</span>
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Testimonial?"
        description={`Are you sure you want to delete the quote from "${deleteTarget?.client_name}"?`}
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}

