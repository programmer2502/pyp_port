"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, ArrowUpRight } from "lucide-react";
import { createInquiry } from "@/lib/data/api";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  service: z.string().optional(),
  event_date: z.string().optional(),
  budget_range: z.string().optional(),
  message: z.string().min(10, "Please provide a few details (at least 10 characters)"),
});

type FormData = z.infer<typeof schema>;

interface ContactFormProps {
  initialService?: string;
}

export function ContactForm({ initialService }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      service: initialService || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    try {
      const res = await createInquiry({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        service: data.service || null,
        event_date: data.event_date || null,
        budget_range: data.budget_range || null,
        message: data.message,
      });

      if (!res.success) {
        setServerError(res.error || "Failed to submit inquiry. Please try again.");
        return;
      }

      setSubmitted(true);
      reset();
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-[#121316] border border-white/10 text-center flex flex-col items-center justify-center shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center mb-6 border border-amber-400/40">
          <CheckCircle2 size={32} />
        </div>
        <h3
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          INQUIRY RECEIVED.
        </h3>
        <p className="mt-3 text-zinc-300 max-w-md text-base leading-relaxed">
          Thank you for reaching out. A member of our production team will review your project details and get back to you within 24 business hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 inline-flex items-center gap-2 bg-amber-400 text-black px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-wider font-bold hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
        >
          <span>Send Another Message</span>
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 sm:p-12 rounded-3xl bg-[#121316] border border-white/10 shadow-2xl flex flex-col gap-6"
      noValidate
    >
      {serverError && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-sm font-medium">
          {serverError}
        </div>
      )}

      {/* Name & Email Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2 font-medium">
            Your Full Name <span className="text-amber-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Elena Vance"
            {...register("name")}
            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-amber-400 focus:bg-white/[0.07] outline-none transition-colors text-sm font-medium text-white placeholder-zinc-500"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-amber-400 font-mono">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2 font-medium">
            Email Address <span className="text-amber-400">*</span>
          </label>
          <input
            type="email"
            placeholder="elena@example.com"
            {...register("email")}
            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-amber-400 focus:bg-white/[0.07] outline-none transition-colors text-sm font-medium text-white placeholder-zinc-500"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-amber-400 font-mono">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Phone & Service */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2 font-medium">
            Phone / WhatsApp
          </label>
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            {...register("phone")}
            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-amber-400 focus:bg-white/[0.07] outline-none transition-colors text-sm font-medium text-white placeholder-zinc-500"
          />
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2 font-medium">
            Service Required
          </label>
          <select
            {...register("service")}
            className="w-full px-4 py-3.5 rounded-xl bg-[#181920] border border-white/10 focus:border-amber-400 focus:bg-[#20212A] outline-none transition-colors text-sm font-medium text-white"
          >
            <option value="">Select a format or package...</option>
            <option value="Wedding Cinematography & Photography">Wedding Cinematography &amp; Photography</option>
            <option value="Commercial Films & Brand Campaigns">Commercial Films &amp; Brand Campaigns</option>
            <option value="Editorial & Portrait Photography">Editorial &amp; Portrait Photography</option>
            <option value="Documentary & Music Visuals">Documentary &amp; Music Visuals</option>
            <option value="Live Events & Galas">Live Events &amp; Galas</option>
            <option value="Drone & Heavy-Lift Aerials">Drone &amp; Heavy-Lift Aerials</option>
            <option value="Custom Production">Custom / Multi-discipline Commission</option>
          </select>
        </div>
      </div>

      {/* Event Date & Budget Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2 font-medium">
            Target Date or Month
          </label>
          <input
            type="text"
            placeholder="e.g. October 2026 or Spring 2027"
            {...register("event_date")}
            className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-amber-400 focus:bg-white/[0.07] outline-none transition-colors text-sm font-medium text-white placeholder-zinc-500"
          />
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2 font-medium">
            Estimated Budget Range
          </label>
          <select
            {...register("budget_range")}
            className="w-full px-4 py-3.5 rounded-xl bg-[#181920] border border-white/10 focus:border-amber-400 focus:bg-[#20212A] outline-none transition-colors text-sm font-medium text-white"
          >
            <option value="">Select budget range...</option>
            <option value="$3,000 – $6,000">$3,000 – $6,000</option>
            <option value="$6,000 – $10,000">$6,000 – $10,000</option>
            <option value="$10,000 – $20,000">$10,000 – $20,000</option>
            <option value="$20,000 – $40,000+">$20,000 – $40,000+</option>
          </select>
        </div>
      </div>

      {/* Project Details */}
      <div>
        <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2 font-medium">
          Project Narrative &amp; Location <span className="text-amber-400">*</span>
        </label>
        <textarea
          rows={4}
          placeholder="Tell us about the location, mood, timeline, and what you want the visuals to achieve..."
          {...register("message")}
          className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-amber-400 focus:bg-white/[0.07] outline-none transition-colors text-sm font-medium text-white placeholder-zinc-500"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-amber-400 font-mono">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2 inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black py-4 sm:py-4.5 rounded-full font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Transmitting Inquiry...</span>
          </>
        ) : (
          <>
            <span>Transmit Inquiry</span>
            <ArrowUpRight size={16} className="stroke-[2.5]" />
          </>
        )}
      </button>
    </form>
  );
}
