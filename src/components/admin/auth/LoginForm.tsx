"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const isPlaceholder = !supabaseUrl || supabaseUrl.includes("placeholder");

      if (isPlaceholder) {
        document.cookie = "vareno_admin_demo=true; path=/; max-age=86400; SameSite=Lax";
        toast.success("Welcome back (Demo Mode)!");
        router.push("/admin");
        router.refresh();
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        setServerError(error.message);
        return;
      }
      toast.success("Welcome back!");
      router.push("/admin");
      router.refresh();
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: 380, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div
          className="lg:hidden"
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "#4f46e5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <span style={{ color: "white", fontWeight: 700, fontSize: "15px", fontFamily: "Inter, sans-serif" }}>P</span>
        </div>
        <h1
          style={{
            fontFamily: "Inter, sans-serif !important",
            fontSize: "24px",
            fontWeight: 700,
            color: "var(--admin-text)",
            letterSpacing: "-0.02em",
            marginBottom: 6,
            margin: "0 0 6px 0",
            textTransform: "none",
          }}
        >
          Sign in to PYP Studio
        </h1>
        <p style={{ fontSize: "14px", color: "var(--admin-text-muted)", margin: 0, fontFamily: "Inter, sans-serif" }}>
          Enter your credentials to access the admin panel
        </p>
      </div>

      {/* Server error */}
      {serverError && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            padding: 12,
            borderRadius: 8,
            marginBottom: 20,
            background: "var(--admin-danger-bg)",
            border: "1px solid var(--admin-danger-border)",
          }}
          role="alert"
        >
          <AlertCircle size={16} style={{ color: "var(--admin-danger)", flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: "13px", color: "var(--admin-danger)", margin: 0 }}>{serverError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Email */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label className="admin-label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="admin-input"
              placeholder="you@studio.com"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <p className="admin-error-text">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <label className="admin-label" htmlFor="password" style={{ marginBottom: 0 }}>
                Password
              </label>
              <button
                type="button"
                style={{ fontSize: "12px", color: "var(--admin-accent)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                Forgot password?
              </button>
            </div>
            <div style={{ position: "relative" }}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className="admin-input"
                placeholder="••••••••"
                style={{ paddingRight: 40 }}
                aria-invalid={!!errors.password}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--admin-text-muted)",
                  cursor: "pointer",
                  padding: 2,
                  display: "flex",
                  alignItems: "center",
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="admin-error-text">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            disabled={isSubmitting}
            style={{ width: "100%", height: 42, marginTop: 4, fontSize: "14px" }}
          >
            {isSubmitting ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Loader2 size={16} className="animate-spin" />
                Signing in…
              </span>
            ) : (
              "Sign in"
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              document.cookie = "vareno_admin_demo=true; path=/; max-age=86400; SameSite=Lax";
              toast.success("Signed in (Demo Mode)");
              router.push("/admin");
              router.refresh();
            }}
            className="admin-btn admin-btn-secondary"
            style={{ width: "100%", height: 38, fontSize: "13px" }}
          >
            Quick Demo Sign In
          </button>
        </div>
      </form>

      <p
        style={{ fontSize: "12px", color: "var(--admin-text-muted)", textAlign: "center", marginTop: 32 }}
      >
        Protected admin area · PYP Studio
      </p>
    </div>
  );
}
