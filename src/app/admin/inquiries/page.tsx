"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Inbox,
  Search,
  Mail,
  Phone,
  MessageSquare,
  Download,
  Calendar,
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { toast } from "sonner";
import type { Inquiry, InquiryStatus } from "@/types/database";
import { getInquiries, updateInquiryStatus } from "@/lib/data/api";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    getInquiries().then(setInquiries);
  }, []);

  const filtered = useMemo(() => {
    return inquiries.filter((inq) => {
      if (
        search &&
        !inq.name.toLowerCase().includes(search.toLowerCase()) &&
        !inq.email.toLowerCase().includes(search.toLowerCase()) &&
        !(inq.service || "").toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      if (statusFilter !== "all" && inq.status !== statusFilter) {
        return false;
      }
      return true;
    });
  }, [inquiries, search, statusFilter]);

  const handleOpenDetail = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setNotes(inq.notes || "");
  };

  const handleStatusChange = async (inqId: string, newStatus: InquiryStatus) => {
    await updateInquiryStatus(inqId, newStatus, notes);
    setInquiries((prev) =>
      prev.map((i) => (i.id === inqId ? { ...i, status: newStatus, notes } : i))
    );
    if (selectedInquiry && selectedInquiry.id === inqId) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus, notes } : null));
    }
    toast.success(`Inquiry marked as ${newStatus}`);
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    await updateInquiryStatus(selectedInquiry.id, selectedInquiry.status, notes);
    setInquiries((prev) =>
      prev.map((i) => (i.id === selectedInquiry.id ? { ...i, notes } : i))
    );
    toast.success("Notes saved");
  };

  // CSV Export
  const handleExportCSV = () => {
    if (inquiries.length === 0) {
      toast.info("No inquiries to export");
      return;
    }

    const headers = ["Date", "Name", "Email", "Phone", "Service", "Event Date", "Budget", "Status", "Message"];
    const rows = inquiries.map((i) => [
      new Date(i.created_at).toISOString().split("T")[0],
      `"${i.name.replace(/"/g, '""')}"`,
      `"${i.email}"`,
      `"${i.phone || ""}"`,
      `"${(i.service || "").replace(/"/g, '""')}"`,
      `"${(i.event_date || "").replace(/"/g, '""')}"`,
      `"${(i.budget_range || "").replace(/"/g, '""')}"`,
      i.status,
      `"${i.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `pyp_inquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV file downloaded successfully");
  };

  return (
    <>
      <PageHeader
        title="Client Inquiries Inbox"
        description="Review inbound messages from the public contact page, track booking states, and reply directly."
        icon={Inbox}
        actions={
          <button onClick={handleExportCSV} className="admin-btn admin-btn-secondary">
            <Download size={15} />
            <span>Export CSV</span>
          </button>
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
            placeholder="Search by name, email, service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          {["all", "new", "contacted", "booked", "closed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`admin-btn capitalize ${
                statusFilter === st ? "admin-btn-primary" : "admin-btn-secondary"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="admin-card overflow-hidden">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Prospective Client</th>
              <th>Service</th>
              <th>Event Date</th>
              <th>Budget</th>
              <th>Status</th>
              <th style={{ width: 100, textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inq) => (
              <tr
                key={inq.id}
                onClick={() => handleOpenDetail(inq)}
                className="cursor-pointer hover:bg-black/[0.02]"
              >
                <td>
                  <span className="font-mono text-xs" style={{ color: "var(--admin-text-muted)" }}>
                    {new Date(inq.created_at).toLocaleDateString()}
                  </span>
                </td>
                <td>
                  <div>
                    <span className="text-sm font-semibold block" style={{ color: "var(--admin-text)" }}>
                      {inq.name}
                    </span>
                    <span className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
                      {inq.email}
                    </span>
                  </div>
                </td>
                <td>
                  <span className="text-xs font-mono" style={{ color: "var(--admin-text)" }}>
                    {inq.service || "General Commission"}
                  </span>
                </td>
                <td>
                  <span className="text-xs font-mono" style={{ color: "var(--admin-text-muted)" }}>
                    {inq.event_date || "Not specified"}
                  </span>
                </td>
                <td>
                  <span className="text-xs font-mono font-semibold" style={{ color: "var(--admin-text)" }}>
                    {inq.budget_range || "TBD"}
                  </span>
                </td>
                <td>
                  <span
                    className={`text-[11px] font-mono uppercase px-2.5 py-1 rounded-full font-bold ${
                      inq.status === "new"
                        ? "bg-red-100 text-red-700"
                        : inq.status === "contacted"
                        ? "bg-amber-100 text-amber-700"
                        : inq.status === "booked"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {inq.status}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDetail(inq);
                    }}
                    className="admin-btn admin-btn-secondary admin-btn-sm"
                  >
                    Inspect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-12 text-center" style={{ color: "var(--admin-text-muted)" }}>
            <p className="text-sm">No inquiries found matching criteria.</p>
          </div>
        )}
      </div>

      {/* Slide-over Detail Drawer */}
      {selectedInquiry && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedInquiry(null)}
          />
          <div
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xl bg-white shadow-2xl flex flex-col justify-between overflow-y-auto"
            style={{ background: "var(--admin-surface)", borderLeft: "1px solid var(--admin-border)" }}
          >
            {/* Drawer Header */}
            <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: "var(--admin-border)" }}>
              <div>
                <span className="font-mono text-xs font-bold text-[#FF4B2B] tracking-widest uppercase">
                  INQUIRY RECORD
                </span>
                <h2 className="text-xl font-bold mt-1" style={{ color: "var(--admin-text)" }}>
                  {selectedInquiry.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="admin-btn admin-btn-ghost admin-btn-icon"
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 flex-1 flex flex-col gap-6">
              {/* Status Switcher */}
              <div>
                <label className="admin-label">Pipeline Status</label>
                <div className="grid grid-cols-4 gap-2">
                  {(["new", "contacted", "booked", "closed"] as InquiryStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedInquiry.id, st)}
                      className={`admin-btn capitalize ${
                        selectedInquiry.status === st
                          ? "admin-btn-primary"
                          : "admin-btn-secondary"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact metadata info */}
              <div className="admin-card p-4 flex flex-col gap-3 font-mono text-xs">
                <div className="flex justify-between">
                  <span style={{ color: "var(--admin-text-muted)" }}>Email:</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="font-semibold text-indigo-600 hover:underline">
                    {selectedInquiry.email}
                  </a>
                </div>
                {selectedInquiry.phone && (
                  <div className="flex justify-between">
                    <span style={{ color: "var(--admin-text-muted)" }}>Phone:</span>
                    <span className="font-semibold">{selectedInquiry.phone}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span style={{ color: "var(--admin-text-muted)" }}>Service:</span>
                  <span className="font-semibold">{selectedInquiry.service || "General"}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--admin-text-muted)" }}>Target Date:</span>
                  <span className="font-semibold">{selectedInquiry.event_date || "Unspecified"}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--admin-text-muted)" }}>Budget:</span>
                  <span className="font-semibold text-[#FF4B2B]">{selectedInquiry.budget_range || "Unspecified"}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--admin-text-muted)" }}>Received:</span>
                  <span>{new Date(selectedInquiry.created_at).toLocaleString()}</span>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="admin-label">Client Message</label>
                <div className="p-4 rounded-xl bg-black/[0.03] border border-[#D9D5CB] text-sm leading-relaxed" style={{ color: "var(--admin-text)" }}>
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Internal Production Notes */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="admin-label">Internal Production Notes</label>
                  <button
                    onClick={handleSaveNotes}
                    className="text-xs text-indigo-600 hover:underline font-semibold"
                  >
                    Save Notes
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record call notes, proposal pricing, follow-up dates..."
                  className="admin-input text-xs"
                />
              </div>
            </div>

            {/* Drawer Actions Footer */}
            <div className="p-6 border-t flex items-center justify-between gap-4" style={{ borderColor: "var(--admin-border)" }}>
              <a
                href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                  `PYP Studio — Regarding your inquiry for ${selectedInquiry.service || "production"}`
                )}`}
                className="admin-btn admin-btn-primary flex-1 flex items-center justify-center gap-2"
              >
                <Mail size={15} />
                <span>Reply by Email</span>
              </a>

              {selectedInquiry.phone && (
                <a
                  href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-btn admin-btn-secondary flex items-center gap-2"
                >
                  <MessageSquare size={15} />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

