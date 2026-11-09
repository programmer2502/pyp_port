"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Layers, Plus, Trash2, Edit, Save, X, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { ConfirmDialog } from "@/components/admin/ui/ConfirmDialog";
import { toast } from "sonner";
import type { Service } from "@/types/database";
import { getServices, saveService, deleteService } from "@/lib/data/api";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);

  // Form fields
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [sampleImage, setSampleImage] = useState("");

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  const handleStartEdit = (srv: Service) => {
    setEditingService(srv);
    setName(srv.name);
    setSlug(srv.slug);
    setShortDesc(srv.short_desc);
    setSampleImage(srv.sample_image);
  };

  const handleCancel = () => {
    setEditingService(null);
    setName("");
    setSlug("");
    setShortDesc("");
    setSampleImage("");
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Service name is required");
      return;
    }

    await saveService({
      id: editingService?.id,
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      short_desc: shortDesc,
      sample_image: sampleImage || "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
    });

    toast.success(editingService ? "Service updated" : "Service created");
    handleCancel();
    getServices().then(setServices);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteService(deleteTarget.id);
    setDeleteTarget(null);
    toast.success("Service deleted");
    getServices().then(setServices);
  };

  return (
    <>
      <PageHeader
        title="Services &amp; Offerings"
        description="Manage the services displayed on the home page expanding list and the /services catalog."
        icon={Layers}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Services List (Left 7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="admin-card p-5 flex items-start justify-between gap-4"
            >
              <div className="flex gap-4 min-w-0">
                <div
                  className="relative rounded-lg overflow-hidden flex-shrink-0"
                  style={{ width: 80, height: 60, background: "var(--admin-surface-raised)" }}
                >
                  <img src={service.sample_image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold" style={{ color: "var(--admin-accent)" }}>
                      0{idx + 1}
                    </span>
                    <h3 className="text-base font-semibold truncate" style={{ color: "var(--admin-text)" }}>
                      {service.name}
                    </h3>
                  </div>
                  <p className="text-xs line-clamp-2 mt-1" style={{ color: "var(--admin-text-muted)" }}>
                    {service.short_desc}
                  </p>
                  <span className="font-mono text-[11px] block mt-2 text-[#4F46E5]">
                    {service.packages?.length || 0} Pricing Packages
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => handleStartEdit(service)}
                  className="admin-btn admin-btn-ghost admin-btn-icon"
                  title="Edit service"
                >
                  <Edit size={15} />
                </button>
                <button
                  onClick={() => setDeleteTarget(service)}
                  className="admin-btn admin-btn-ghost admin-btn-icon text-red-500 hover:text-red-700"
                  title="Delete service"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit / Create Form (Right 5 cols) */}
        <div className="lg:col-span-5 admin-card p-6 sticky top-20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold" style={{ color: "var(--admin-text)" }}>
              {editingService ? "Edit Service" : "Add New Service"}
            </h3>
            {editingService && (
              <button
                onClick={handleCancel}
                className="text-xs text-red-500 hover:underline"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="admin-label">Service Title</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!editingService) {
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                  }
                }}
                placeholder="e.g. Architectural Aerials"
                className="admin-input"
              />
            </div>

            <div>
              <label className="admin-label">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="architectural-aerials"
                className="admin-input font-mono text-xs"
              />
            </div>

            <div>
              <label className="admin-label">Short Description</label>
              <textarea
                rows={3}
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                placeholder="Brief summary shown on hover preview..."
                className="admin-input text-xs"
              />
            </div>

            <div>
              <label className="admin-label">Sample Image URL</label>
              <input
                type="url"
                value={sampleImage}
                onChange={(e) => setSampleImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="admin-input font-mono text-xs"
              />
            </div>

            <button
              onClick={handleSave}
              className="admin-btn admin-btn-primary mt-2 flex items-center justify-center gap-2"
            >
              <Save size={16} />
              <span>{editingService ? "Save Service Changes" : "Create Service"}</span>
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Service?"
        description={`Are you sure you want to delete "${deleteTarget?.name}"?`}
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}

