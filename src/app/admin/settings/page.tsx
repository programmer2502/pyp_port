"use client";

import { useState, useEffect } from "react";
import { Settings, Globe, Mail, Phone, MessageSquare, Video, Save, Loader2, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { FormSection, Field } from "@/components/admin/ui/FormSection";
import { toast } from "sonner";
import type { SiteSettings } from "@/types/database";
import { getSiteSettings, updateSiteSettings } from "@/lib/data/api";

function InstagramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [brandName, setBrandName] = useState("");
  const [tagline, setTagline] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [vimeo, setVimeo] = useState("");
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  useEffect(() => {
    getSiteSettings().then((data) => {
      setSettings(data);
      setBrandName(data.brand_name);
      setTagline(data.tagline);
      setEmail(data.email);
      setPhone(data.phone);
      setWhatsapp(data.whatsapp);
      setInstagram(data.instagram);
      setVimeo(data.vimeo);
      setAddress(data.address);
      setCoordinates(data.coordinates);
      setSeoTitle(data.seo_title);
      setSeoDescription(data.seo_description);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSiteSettings({
        brand_name: brandName,
        tagline,
        email,
        phone,
        whatsapp,
        instagram,
        vimeo,
        address,
        coordinates,
        seo_title: seoTitle,
        seo_description: seoDescription,
      });
      toast.success("Site settings updated successfully!");
    } catch {
      toast.error("Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Site Settings &amp; Global Identity"
        description="Brand copywriting, global contact information, social links, and crawler SEO defaults."
        icon={Settings}
        actions={
          <button
            onClick={handleSave}
            disabled={saving}
            className="admin-btn admin-btn-primary"
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save All Settings</span>
              </>
            )}
          </button>
        }
      />

      <div className="max-w-3xl flex flex-col gap-6">
        {/* Brand & Copywriting */}
        <FormSection title="Brand Identity" description="Core typography, studio wordmark, and prominent tagline">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Brand Wordmark">
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="admin-input"
              />
            </Field>

            <Field label="Global Tagline" helper="Rendered on the home hero and footer">
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="admin-input"
              />
            </Field>
          </div>
        </FormSection>

        {/* Contact Information */}
        <FormSection title="Studio Communications" description="Displayed across the site header, CTA, and contact page" icon={Mail}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Primary Production Email">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-input"
              />
            </Field>

            <Field label="Telephone Number">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="admin-input"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="WhatsApp Direct Number" helper="Without symbols or spaces (e.g. 15552345678)">
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="admin-input font-mono"
              />
            </Field>

            <Field label="Studio Geographic Coordinates">
              <input
                type="text"
                value={coordinates}
                onChange={(e) => setCoordinates(e.target.value)}
                placeholder="N 40.7128° / W 74.0060°"
                className="admin-input font-mono"
              />
            </Field>
          </div>

          <Field label="Physical Studio Address">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="admin-input"
            />
          </Field>
        </FormSection>

        {/* Social Media Links */}
        <FormSection title="Social &amp; Film Portals" description="External media profiles" icon={InstagramIcon}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Instagram Profile URL">
              <input
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="admin-input font-mono text-xs"
              />
            </Field>

            <Field label="Vimeo Channel URL">
              <input
                type="url"
                value={vimeo}
                onChange={(e) => setVimeo(e.target.value)}
                className="admin-input font-mono text-xs"
              />
            </Field>
          </div>
        </FormSection>

        {/* SEO Defaults */}
        <FormSection title="Search &amp; Meta Indexing" description="Default meta titles and descriptions when not customized per project" icon={Globe}>
          <Field label="Default Meta Title">
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              className="admin-input"
            />
          </Field>

          <Field label="Default Meta Description">
            <textarea
              rows={3}
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              className="admin-input text-sm leading-relaxed"
            />
          </Field>
        </FormSection>
      </div>
    </>
  );
}
