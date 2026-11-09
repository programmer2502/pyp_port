import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Brivon · Services & Rates — Photography Studio HTML Template",
  description: "Three working scopes, one honest rate card. Day rates, half-day rates, post-production, licensing, and equipment packages.",
};

export default function ServicesPage() {
  return (
    <>


    {/*  Hero  */}
    <section className="hero">
      <div className="container container--wide">
        <div className="hero-grid">
          <div className="hero-text">
            <span className="eyebrow"><span className="dot" aria-hidden="true"></span>Three tiers · One studio</span>
            <h1 className="hero-headline">
              Three working<br />
              <span className="lime">scopes,</span> one<br />
              honest rate card.
            </h1>
            <p className="hero-sub">
              Most studios bury their pricing in a "request a quote" form. We do not — every brief we have shipped in
              the last three years has fit into one of three tiers, and the rate is on the card. The conversation we
              want to have with a client is about the brief, not about the budget.
            </p>
            <div className="hero-cta-row">
              <a className="btn btn--primary btn--lg" href="#rates">See the rates</a>
              <a className="btn btn--ghost btn--lg" href="#process">See the process</a>
            </div>
            <div className="hero-meta">
              <span><strong>3 — 6</strong> · weeks from kickoff to delivery</span>
              <span aria-hidden="true">·</span>
              <span><strong>3 — 5</strong> · months booking lead time</span>
              <span aria-hidden="true">·</span>
              <span><strong>20 — 26</strong> · projects per year</span>
            </div>
          </div>
          <div className="hero-media">
            <img src="/assets/img/services-hero.jpg"
              alt="A printed contact sheet of 12 medium-format frames laid out on a working table next to a calibrated monitor, the contact sheet marked with grease pencil." />
            <div className="floating-tag ft-top">
              <span className="pill">Tier 02</span>
              Campaign · ATRIUM
            </div>
            <div className="floating-tag ft-bottom">
              4 shooting days · 24 selects
            </div>
          </div>
        </div>
      </div>
    </section>

    {/*  Tiers  */}
    <section id="rates">
      <div className="container container--wide">
        <div className="section-head">
          <div>
            <span className="eyebrow"><span className="dot" aria-hidden="true"></span>Service tiers</span>
            <h2>Editorial. Campaign.<br />Marque.</h2>
          </div>
          <p className="lede">
            The tier maps to the scope of the brief, not to the brand spending. A small fashion house can sit in Marque;
            a household brand can sit in Editorial. The right tier is the one that fits the shape of the work, and we
            will tell you which we think it is on the first call.
          </p>
        </div>

        <div className="tier-grid">
          <article className="tier-card">
            <span className="label">Tier 01</span>
            <h3>Editorial</h3>
            <span className="tier-meta">From $14,000 · 1 — 2 shoot days</span>
            <hr className="tier-divider" />
            <p>For magazine features, single-feature stories, designer portraits, and small editorial assignments where
              the client is a publication or a single section of a magazine.</p>
            <ul className="tier-list">
              <li>1 lead photographer · 1 producer · 1 assistant</li>
              <li>Up to 24 retouched selects</li>
              <li>One round of revisions, in-house retouch</li>
              <li>Colour-managed gallery within 24 hours of wrap</li>
              <li>Print files (sRGB, Adobe RGB, CMYK if needed)</li>
              <li>3-month archive on private gallery</li>
            </ul>
            <a className="btn btn--ghost" href="/contact">Enquire about editorial</a>
          </article>

          <article className="tier-card featured">
            <span className="label">Tier 02 · most booked</span>
            <h3>Campaign</h3>
            <span className="tier-meta">From $42,000 · 3 — 5 shoot days</span>
            <hr className="tier-divider" />
            <p>The studio's principal tier — seasonal brand campaigns, lookbooks, catalogues, multi-location
              architecture features, cookbook commissions. The shape of work we built the studio around.</p>
            <ul className="tier-list">
              <li>1 lead photographer · 1 producer · 2 assistants</li>
              <li>Up to 60 retouched selects</li>
              <li>Two rounds of revisions, in-house retouch</li>
              <li>Colour-managed gallery within 24 hours of wrap</li>
              <li>Full deliverables (master TIFF, sized JPG, print TIFF)</li>
              <li>12-month archive · usage licence per use case</li>
              <li>Hybrid stills + motion add-on available</li>
            </ul>
            <a className="btn btn--dark" href="/contact">Enquire about campaign</a>
          </article>

          <article className="tier-card">
            <span className="label">Tier 03</span>
            <h3>Marque</h3>
            <span className="tier-meta">From $96,000 · full season</span>
            <hr className="tier-divider" />
            <p>A long-form working partnership — Brivon as the single visual studio for a brand across a full SS/FW
              cycle. Editorial, campaign, e-commerce, and architecture rolled into one continuous engagement.</p>
            <ul className="tier-list">
              <li>Lead photographer + secondary photographer</li>
              <li>Dedicated producer for the duration of the cycle</li>
              <li>Continuous in-house retouching pipeline</li>
              <li>Up to 240 retouched selects per cycle</li>
              <li>Quarterly review and creative direction</li>
              <li>Full archive · exclusive sector access</li>
              <li>Press &amp; PR support for launches</li>
            </ul>
            <a className="btn btn--ghost" href="/contact">Enquire about marque</a>
          </article>
        </div>

        <p className="mono" style={{ "textAlign": "center", "color": "var(--fg-mute)", "marginTop": "var(--space-7)" }}>
          All rates are starting points · the producer will quote a fixed scope after the first call · no hidden post or
          licensing fees · all media usage scopes negotiated upfront.
        </p>
      </div>
    </section>

    {/*  Process  */}
    <section id="process">
      <div className="container container--wide">
        <div className="section-head">
          <div>
            <span className="eyebrow"><span className="dot" aria-hidden="true"></span>How we work</span>
            <h2>From the first<br />call to the<br />delivered archive.</h2>
          </div>
          <p className="lede">
            Every project moves through the same eight phases, regardless of tier. The phase lengths change, the
            principles do not. Most campaigns take six weeks; the shortest editorial shipped in eleven days; the longest
            marque cycle ran for ten months.
          </p>
        </div>

        <div className="process-grid">
          <article className="process-card">
            <h3>Discovery</h3>
            <p>Twenty-minute first call with the producer. Brief, references, working dates, audience, where the work
              lands. Free, always.</p>
          </article>
          <article className="process-card">
            <h3>Scope</h3>
            <p>Within 72 hours: a fixed scope, fixed rate, and proposed working window. No estimate creep.</p>
          </article>
          <article className="process-card">
            <h3>Pre-production</h3>
            <p>Casting, location lock, props, talent, light maps. The producer holds every contract, every release.</p>
          </article>
          <article className="process-card">
            <h3>Kickoff</h3>
            <p>One-hour creative call with the lead and the brand. Agree the visual rules, agree the deliverables.</p>
          </article>
          <article className="process-card">
            <h3>Shoot</h3>
            <p>1 to 5 days. Tethered to a calibrated monitor. Daily live galleries for the brand-side approver.</p>
          </article>
          <article className="process-card">
            <h3>Selects</h3>
            <p>Within 24 hours of wrap, a colour-managed gallery of all keepers — ranked, captioned, ready to choose.
            </p>
          </article>
          <article className="process-card">
            <h3>Retouch</h3>
            <p>5 to 10 business days in-house. Two rounds of revisions standard, more on marque.</p>
          </article>
          <article className="process-card">
            <h3>Delivery</h3>
            <p>Master TIFF, sized JPG, print TIFF, contact sheets, signed model releases — all in one delivery package.
            </p>
          </article>
        </div>
      </div>
    </section>

    {/*  FAQ  */}
    <section className="tile-section">
      <div className="container container--narrow">
        <div className="section-head">
          <div>
            <span className="eyebrow eyebrow--on-tile"><span className="dot" aria-hidden="true"></span>Frequent questions</span>
            <h2>The questions<br />brands ask first.</h2>
          </div>
          <p className="lede">
            These come up on roughly every third call. If your question is not here, send the producer a note — the
            address is on the contact page.
          </p>
        </div>

        <div className="faq-grid">
          <div className="faq-card">
            <h3>How far ahead do you book?</h3>
            <p>Three to five months for Campaign and Marque, four to six weeks for Editorial. We block specific weeks
              once a deposit is in.</p>
          </div>
          <div className="faq-card">
            <h3>Do you travel?</h3>
            <p>Yes — we work globally and have shot in 14 countries since 2014. Travel is quoted on top of the rate at
              cost; we never markup flights or accommodation.</p>
          </div>
          <div className="faq-card">
            <h3>What about usage rights?</h3>
            <p>Always negotiated upfront, never bolted on later. We licence by use, region, and duration — and we are
              happy to draft a buyout if the project genuinely needs one.</p>
          </div>
          <div className="faq-card">
            <h3>Can we book just the room?</h3>
            <p>Yes. Both rooms are available to outside crews for a limited number of weeks per year. The Brooklyn rate
              card is on request — ask Felix.</p>
          </div>
          <div className="faq-card">
            <h3>Do you do AI or generative imagery?</h3>
            <p>No. We make pictures. We will gladly retouch, composite, and grade — but the image we ship is the image
              that came out of the camera.</p>
          </div>
          <div className="faq-card">
            <h3>What if we hate the first round?</h3>
            <p>Every campaign tier includes two rounds of revisions. If the second round still misses, we re-shoot at
              studio cost — this has happened twice in eleven years, and we shipped both.</p>
          </div>
        </div>
      </div>
    </section>

    {/*  Closing  */}
    <section className="closing-cta">
      <div className="container container--narrow">
        <span className="label" style={{ "color": "rgba(10,10,12,0.6)" }}>Booking · 2026</span>
        <h2>Tell us the<br />shape of the work.</h2>
        <p className="lede">
          A producer will read your first note inside 48 hours on a working day, and we will get back the same week with
          availability and a first read on the right tier. No long form.
        </p>
        <div className="cta-row">
          <a className="btn btn--dark btn--lg" href="/contact">Start a project
            <svg className="arrow" width="16" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
              <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                strokeLinejoin="round" />
            </svg>
          </a>
          <a className="btn btn--ghost btn--lg" href="/work">See selected work</a>
        </div>
      </div>
    </section>

  
    </>
  );
}
