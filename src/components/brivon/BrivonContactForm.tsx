"use client";

import { useState } from "react";
import { createInquiry } from "@/lib/data/api";

export function BrivonContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const brand = formData.get("brand") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;
    const tier = formData.get("tier") as string;
    const dates = formData.get("dates") as string;
    const where = formData.get("where") as string;
    const brief = formData.get("brief") as string;
    const refs = formData.get("refs") as string;

    const fullMessage = [
      `Brand / Studio: ${brand || "N/A"}`,
      `Role: ${role || "N/A"}`,
      `Where work lands: ${where || "N/A"}`,
      `Reference Link: ${refs || "N/A"}`,
      "",
      "Brief:",
      brief,
    ].join("\n");

    try {
      const res = await createInquiry({
        name,
        email,
        phone: null,
        service: tier,
        event_date: dates || null,
        budget_range: tier,
        message: fullMessage,
      });

      if (res.success) {
        setSubmitted(true);
      } else {
        setError(res.error || "Failed to submit. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      {error && (
        <div style={{ color: "#ff6b6b", marginBottom: "var(--space-4)", fontSize: "var(--text-sm)" }}>
          {error}
        </div>
      )}

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="f-name">Your name</label>
          <input id="f-name" name="name" type="text" required placeholder="Mira Halden" />
        </div>
        <div className="form-field">
          <label htmlFor="f-brand">Brand / studio</label>
          <input id="f-brand" name="brand" type="text" placeholder="Atrium &bull; Lisbon" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="f-email">Email</label>
          <input id="f-email" name="email" type="email" required placeholder="mira@atrium.studio" />
        </div>
        <div className="form-field">
          <label htmlFor="f-role">Your role</label>
          <input id="f-role" name="role" type="text" placeholder="Creative director &bull; brand-side" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="f-tier">Probable tier</label>
          <select id="f-tier" name="tier" defaultValue="Campaign — seasonal / multi-day">
            <option value="Editorial — single feature / portrait">Editorial &mdash; single feature / portrait</option>
            <option value="Campaign — seasonal / multi-day">Campaign &mdash; seasonal / multi-day</option>
            <option value="Marque — long-form, full cycle">Marque &mdash; long-form, full cycle</option>
            <option value="Not sure — please advise">Not sure &mdash; please advise</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="f-dates">Working dates</label>
          <input id="f-dates" name="dates" type="text" placeholder="Mid-March, 4 days, Lisbon" />
        </div>
      </div>

      <div className="form-row form-row--full">
        <div className="form-field">
          <label htmlFor="f-where">Where the work lands</label>
          <input
            id="f-where"
            name="where"
            type="text"
            placeholder="Print catalogue &bull; digital campaign &bull; brand-owned channels"
          />
        </div>
      </div>

      <div className="form-row form-row--full">
        <div className="form-field">
          <label htmlFor="f-brief">The brief &mdash; one paragraph</label>
          <textarea
            id="f-brief"
            name="brief"
            required
            placeholder="What is the project, what does the brand want, what does the audience need? Bullet points fine, no need for a deck on the first pass."
          ></textarea>
        </div>
      </div>

      <div className="form-row form-row--full">
        <div className="form-field">
          <label htmlFor="f-refs">Reference link (optional)</label>
          <input id="f-refs" name="refs" type="url" placeholder="https://… moodboard / deck / past campaign" />
        </div>
      </div>

      <div className="form-actions">
        <small>
          By submitting, you agree we will reply to the email above. No newsletter signup. No third-party sharing.
        </small>
        <button type="submit" className="btn btn--primary btn--lg" disabled={submitting || submitted}>
          {submitted ? (
            "Thank you — we will be in touch."
          ) : submitting ? (
            "Sending note..."
          ) : (
            <>
              Send first note
              <svg className="arrow" width="16" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                <path
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

