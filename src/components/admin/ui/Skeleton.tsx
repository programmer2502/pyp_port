"use client";

import { cn } from "@/lib/utils";

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("admin-card p-4", className)}>
      <div className="admin-skeleton rounded-lg mb-3" style={{ aspectRatio: "4/3" }} />
      <div className="admin-skeleton h-3.5 w-3/4 rounded mb-2" />
      <div className="admin-skeleton h-3 w-1/2 rounded" />
    </div>
  );
}

export function SkeletonRow({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center gap-4 px-4 py-3", className)}
      style={{ borderBottom: "1px solid var(--admin-border-subtle)" }}
    >
      <div className="admin-skeleton w-10 h-10 rounded-lg flex-shrink-0" />
      <div className="flex-1 flex flex-col gap-2">
        <div className="admin-skeleton h-3.5 w-48 rounded" />
        <div className="admin-skeleton h-3 w-24 rounded" />
      </div>
      <div className="admin-skeleton h-5 w-16 rounded-full" />
      <div className="admin-skeleton h-3 w-20 rounded" />
    </div>
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="admin-skeleton rounded"
          style={{ height: 14, width: i === lines - 1 ? "60%" : "100%" }}
        />
      ))}
    </div>
  );
}
