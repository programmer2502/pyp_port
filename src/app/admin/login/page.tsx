import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In — PYP Admin",
};

export default function LoginPage() {
  return (
    <div
      className="admin-root"
      style={{ minHeight: "100vh", display: "flex", width: "100%" }}
    >
      {/* Left branded panel (visible on lg screens >= 1024px) */}
      <div
        className="hidden lg:flex"
        style={{
          width: "45%",
          minWidth: 380,
          background: "#0a0a0a",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.28 }}>
          <img
            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&q=80&auto=format&fit=crop"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 60%)",
          }}
        />

        {/* Logo */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 12, zIndex: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "#4f46e5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ color: "white", fontWeight: 700, fontSize: "14px", fontFamily: "Inter, sans-serif" }}>P</span>
          </div>
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "15px", letterSpacing: "0.12em", color: "#f4f4f5" }}>
            PYP STUDIO
          </span>
        </div>

        {/* Tagline */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(244,244,245,0.5)",
              marginBottom: "12px",
            }}
          >
            Content Management System
          </p>
          <h1
            style={{
              fontFamily: "Inter, sans-serif !important",
              fontSize: "30px",
              fontWeight: 700,
              color: "#f4f4f5",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Stories captured
            <br />
            with intention.
          </h1>
          <p
            style={{ fontSize: "14px", color: "rgba(244,244,245,0.55)", lineHeight: 1.6, maxWidth: 360, marginTop: 12 }}
          >
            Manage photography archives, stream cinema showreels, track inbound commissions, and update your public portfolio.
          </p>
        </div>
      </div>

      {/* Right login form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 24px",
          background: "var(--admin-bg)",
        }}
      >
        <LoginForm />
      </div>
    </div>
  );
}
