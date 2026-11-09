import type { Metadata } from "next";
import Link from "next/link";
import { BrivonContactForm } from "@/components/brivon/BrivonContactForm";

export const metadata: Metadata = {
  title: "Brivon · Contact — Photography Studio HTML Template",
  description: "Send a real first note, get a real reply. Commission inquiries, studio visits in Brooklyn and Berlin, and press desk.",
};

export default function ContactPage() {
  return (
    <>


    {/*  Hero  */}
    <section className="hero">
      <div className="container container--wide">
        <div className="hero-grid">
          <div className="hero-text">
            <span className="eyebrow"><span className="dot" aria-hidden="true"></span>Reply within 48 working hours</span>
            <h1 className="hero-headline">
              Send a real<br />
              <span className="lime">first note,</span> get<br />
              a real reply.
            </h1>
            <p className="hero-sub">
              We do not staff an inbox bot. Every note that lands on the studio inbox is read by Anya or Eli — the two
              producers — and answered by one of them, signed by them, with a real opinion attached. We aim for
              forty-eight working hours, and we hit it.
            </p>
            <div className="hero-cta-row">
              <a className="btn btn--primary btn--lg" href="#intake">New project</a>
              <a className="btn btn--ghost btn--lg" href="#channels">Other ways to reach us</a>
            </div>
            <div className="hero-meta">
              <span><strong>48hr</strong> · target reply</span>
              <span aria-hidden="true">·</span>
              <span><strong>2</strong> · producers reading</span>
              <span aria-hidden="true">·</span>
              <span><strong>11yr</strong> · in business</span>
            </div>
          </div>
          <div className="hero-media">
            <img src="/assets/img/contact-hero.jpg"
              alt="A working studio scene — a wide table with a laptop, a printed contact sheet, a coffee cup, and a Brivon-branded planner open to the week ahead." />
            <div className="floating-tag ft-top">
              <span className="pill">Inbox</span>
              ANYA · NEW YORK
            </div>
            <div className="floating-tag ft-bottom">
              hello @ brivon.studio
            </div>
          </div>
        </div>
      </div>
    </section>

    {/*  Channels  */}
    <section id="channels">
      <div className="container container--wide">
        <div className="section-head">
          <div>
            <span className="eyebrow"><span className="dot" aria-hidden="true"></span>Three channels</span>
            <h2>Pick the right<br />door to come<br />through.</h2>
          </div>
          <p className="lede">
            Project enquiries land with the producers. Press and licensing requests land with Joon. Careers and hiring
            land with Felix. We keep these doors separate so that every note gets to the right pair of hands first.
          </p>
        </div>

        <div className="channel-grid">
          <article className="channel-card">
            <span className="label">01 / New project</span>
            <h3>For brand briefs.</h3>
            <p>The right door for campaign, editorial, marque, and any first-time enquiry from a brand or agency. Aim
              for one paragraph: who, what, when, audience.</p>
            <a className="channel-line" href="/cdn-cgi/l/email-protection#2149444d4d4e61435348574e4f0f52555445484e">hello @ brivon.studio</a>
            <span className="mono" style={{ "color": "var(--fg-mute)" }}>Anya Stenmark · Eli Wender · 48hr reply target</span>
          </article>

          <article className="channel-card" id="press">
            <span className="label label--lime">02 / Press &amp; licensing</span>
            <h3>For publications.</h3>
            <p>Image licensing, interview requests, archive enquiries, exhibition loans, and any editorial use of
              existing Brivon imagery. Joon answers personally.</p>
            <a className="channel-line" href="/cdn-cgi/l/email-protection#dfafadbaacac9fbdadb6a9b0b1f1acabaabbb6b0">press @ brivon.studio</a>
            <span className="mono" style={{ "color": "var(--fg-mute)" }}>Joon Park · 5-day reply target · press kit below</span>
          </article>

          <article className="channel-card" id="careers">
            <span className="label">03 / Careers</span>
            <h3>For job-seekers.</h3>
            <p>Currently hiring a junior producer (Berlin) and a freelance digital tech (Brooklyn). Open applications
              welcome for studio assistant roles. No PDFs &gt; 8&nbsp;MB please.</p>
            <a className="channel-line" href="/cdn-cgi/l/email-protection#74171506111106073416061d021b1a5a070001101d1b">careers @ brivon.studio</a>
            <span className="mono" style={{ "color": "var(--fg-mute)" }}>Felix Vahl · 7 — 14 day reply window</span>
          </article>
        </div>
      </div>
    </section>

    {/*  Intake form  */}
    <section id="intake">
      <div className="container container--narrow">
        <div className="section-head">
          <div>
            <span className="eyebrow"><span className="dot" aria-hidden="true"></span>New project intake</span>
            <h2>Tell us the<br />shape of the<br />brief.</h2>
          </div>
          <p className="lede">
            We promise to read every note ourselves and reply within 48 working hours. No long form — a paragraph is
            enough. If you would rather send a deck, the studio inbox accepts attachments up to 25&nbsp;MB.
          </p>
        </div>

        <BrivonContactForm />
      </div>
    </section>

    {/*  Studio locations split  */}
    <section className="snug tile-section">
      <div className="container container--wide">
        <div className="split">
          <div className="split-text">
            <span className="eyebrow eyebrow--on-tile"><span className="dot" aria-hidden="true"></span>Two rooms</span>
            <h2>Visit either<br />studio by booking.</h2>
            <p>
              Both rooms are working studios — they are not gallery spaces and we do not run open hours. If you would
              like to visit, write to the producer at <strong><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="452d2029292a0527372c332a2b6b363130212c2a">[email&#160;protected]</a></strong> with a working window and a
              reason; we will say yes more often than no, and we will put the kettle on.
            </p>
            <ul className="split-fact-list">
              <li><b>Brooklyn</b><span>137 Banker Street, Brooklyn NY 11222 · +1 718 0204 0220</span></li>
              <li><b>Berlin</b><span>Brunnenstraße 162, 10119 Berlin · +49 30 0204 0220</span></li>
              <li><b>Studio hours</b><span>Mon–Fri 0900–1900 CET · 0900–1800 EST</span></li>
              <li><b>Closed</b><span>Dec 22 — Jan 06 every year · public holidays</span></li>
            </ul>
            <a className="btn btn--ghost-on-tile btn--lg" href="#intake">Send a first note
              <svg className="arrow" width="16" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                  strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <div className="split-img">
            <img src="/assets/img/contact-room.jpg"
              alt="A working corner of the Brivon Brooklyn studio — a wide table with a laptop, a printed contact sheet, a coffee mug, and a Brivon-branded notebook open to a project plan." />
            <span className="ft-corner">Brooklyn studio</span>
          </div>
        </div>
      </div>
    </section>

    {/*  Press kit  */}
    <section>
      <div className="container container--wide">
        <div className="section-head">
          <div>
            <span className="eyebrow"><span className="dot" aria-hidden="true"></span>Press kit</span>
            <h2>Everything a<br />journalist needs<br />in one folder.</h2>
          </div>
          <p className="lede">
            High-resolution founder portraits, studio shots, a 600-word boilerplate, and a usage agreement. Drop a note
            to <strong><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="6a1a180f19192a0818031c050444191e1f0e0305">[email&#160;protected]</a></strong> if you would like a passworded archive link to past campaigns.
          </p>
        </div>

        <div className="channel-grid">
          <article className="channel-card">
            <span className="label">Press pack · ZIP</span>
            <h3>Studio assets.</h3>
            <p>Brivon logo (SVG, PNG), founder portraits, two studio interiors, the studio one-liner and a 600-word
              boilerplate. Updated quarterly. 18&nbsp;MB.</p>
            <a className="channel-line" href="#">Download press pack ↓</a>
            <span className="mono" style={{ "color": "var(--fg-mute)" }}>Last updated · 02 Feb 2026</span>
          </article>
          <article className="channel-card">
            <span className="label">Bio · founders</span>
            <h3>Founder bios.</h3>
            <p>Short and long-form bios for Mira, Joon and Tomas, each in English and German. Quotation rights granted
              on request — write to press first.</p>
            <a className="channel-line" href="#">Read founder bios →</a>
            <span className="mono" style={{ "color": "var(--fg-mute)" }}>EN · DE · last reviewed Jan 2026</span>
          </article>
          <article className="channel-card">
            <span className="label">Image licensing</span>
            <h3>Editorial use.</h3>
            <p>Use of an existing Brivon image in editorial context. Free for one-time use with byline; request
              approval, attach the placement, and we will reply within 5 working days.</p>
            <a className="channel-line" href="/cdn-cgi/l/email-protection#0a7a786f79794a6878637c656424797e7f6e6365">press @ brivon.studio</a>
            <span className="mono" style={{ "color": "var(--fg-mute)" }}>Joon Park · always-on, no agency</span>
          </article>
        </div>
      </div>
    </section>

    {/*  Closing  */}
    <section className="closing-cta">
      <div className="container container--narrow">
        <span className="label" style={{ "color": "rgba(10,10,12,0.6)" }}>Final note</span>
        <h2>Send a real note.<br />We will send a<br />real one back.</h2>
        <p className="lede">
          We do not use intake forms to filter people out. We use them to read the brief faster. If a form is the wrong
          shape for your project, write directly — every channel above is a real inbox watched by a real human at the
          studio.
        </p>
        <div className="cta-row">
          <a className="btn btn--dark btn--lg" href="#intake">Open the form
            <svg className="arrow" width="16" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
              <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                strokeLinejoin="round" />
            </svg>
          </a>
          <a className="btn btn--ghost btn--lg" href="/cdn-cgi/l/email-protection#18707d747477587a6a716e7776366b6c6d7c7177">Or write directly</a>
        </div>
      </div>
    </section>

  
    </>
  );
}
