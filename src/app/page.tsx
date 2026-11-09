import Link from "next/link";

export default function IndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container container--wide">
          <div className="hero-grid">
            <div className="hero-text">
              <span className="eyebrow">
                <span className="dot" aria-hidden="true"></span>Brooklyn &bull; Berlin &bull; est. 2014
              </span>
              <h1 className="hero-headline">
                We photograph<br />
                <span className="lime">the work,</span> not<br />
                the <span className="slash">/</span> brief.
              </h1>
              <p className="hero-sub">
                Brivon is a small commercial photography studio. We make pictures for brands that care about craft &mdash; fashion houses, architecture practices, food magazines, and the kind of catalogues people keep on a shelf instead of in a folder.
              </p>
              <div className="hero-cta-row">
                <Link className="btn btn--primary btn--lg" href="/work">
                  See selected work
                  <svg className="arrow" width="16" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                    <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link className="btn btn--ghost btn--lg" href="/services">
                  Services &amp; rates
                </Link>
              </div>
              <div className="hero-meta">
                <span><strong>140+</strong> &bull; campaigns delivered</span>
                <span aria-hidden="true">&bull;</span>
                <span><strong>11</strong> &bull; cover stories, 2024</span>
                <span aria-hidden="true">&bull;</span>
                <span><strong>3</strong> &bull; ADC awards</span>
              </div>
            </div>
            <div className="hero-media reveal">
              <img src="/assets/img/hero-portrait.jpg" alt="A studio portrait lit in warm tungsten — a young woman in profile against a deep charcoal seamless, soft fall-off on her shoulder, signature Brivon lighting." />
              <div className="floating-tag ft-bottom">
                35mm &bull; &fnof;/1.4 &bull; 1/250s &bull; ISO 400
              </div>
            </div>
          </div>

          {/* Stat strip */}
          <div className="stat-strip">
            <div className="stat-cell">
              <div className="stat-num"><span className="lime">11</span>YR</div>
              <div className="stat-label">Studio established 2014</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num"><span className="lime">142</span></div>
              <div className="stat-label">Commissions delivered</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num"><span className="lime">02</span></div>
              <div className="stat-label">Daylight studios (NYC + BER)</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num"><span className="lime">100%</span></div>
              <div className="stat-label">In-house retouch &amp; print proof</div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section>
        <div className="container container--wide">
          <div className="section-head">
            <div>
              <span className="eyebrow"><span className="dot" aria-hidden="true"></span>Selected work &bull; 2024&ndash;25</span>
              <h2>Twelve frames<br />from a working year.</h2>
            </div>
            <div>
              <p className="lead">
                Every frame here was shot to a brief, on location or in one of our two rooms, delivered on deadline, and cleared for editorial or commercial run.
              </p>
            </div>
          </div>

          <div className="work-grid">
            <Link className="work-item work-item--xl reveal" href="/work">
              <div className="wm">
                <img src="/assets/img/work-atrium.jpg" alt="A model in profile wearing a layered linen coat, shot against a chalky stone wall in raking afternoon light." />
                <span className="wm-pill">Editorial</span>
                <span className="wm-arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <div className="work-meta">
                <div>
                  <div className="wm-title">Atrium SS25</div>
                  <div className="wm-cap">Outerwear lookbook &bull; 18 frames &bull; Paris</div>
                </div>
                <div className="wm-cap">No. 142</div>
              </div>
            </Link>

            <Link className="work-item work-item--sm reveal" href="/work">
              <div className="wm">
                <img src="/assets/img/work-still-1.jpg" alt="A still life of a brushed-steel chair and a folded silk scarf on a concrete floor, shot top-down in flat overhead light." />
                <span className="wm-pill">Still</span>
                <span className="wm-arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <div className="work-meta">
                <div>
                  <div className="wm-title">Kaldor Chair</div>
                  <div className="wm-cap">Object catalogue &bull; Studio B</div>
                </div>
                <div className="wm-cap">No. 139</div>
              </div>
            </Link>

            <Link className="work-item work-item--md reveal" href="/work">
              <div className="wm">
                <img src="/assets/img/work-arch.jpg" alt="Sweeping stair of a brutalist concrete museum lit by a single high window, a figure ascending the second flight." />
                <span className="wm-pill">Architecture</span>
                <span className="wm-arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <div className="work-meta">
                <div>
                  <div className="wm-title">Neue Nationalgalerie</div>
                  <div className="wm-cap">Monograph study &bull; Berlin</div>
                </div>
                <div className="wm-cap">No. 136</div>
              </div>
            </Link>

            <Link className="work-item work-item--md reveal" href="/work">
              <div className="wm">
                <img src="/assets/img/work-food.jpg" alt="A bowl of saffron risotto on a rough ceramic plate, shot from above with a long shadow, deep umber palette." />
                <span className="wm-pill">Food</span>
                <span className="wm-arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <div className="work-meta">
                <div>
                  <div className="wm-title">Ochre Table</div>
                  <div className="wm-cap">Cookbook cover &bull; 34 recipes</div>
                </div>
                <div className="wm-cap">No. 134</div>
              </div>
            </Link>

            <Link className="work-item work-item--lg reveal" href="/work">
              <div className="wm">
                <img src="/assets/img/work-portrait-1.jpg" alt="A close portrait of an older painter in his studio, hair lit by a single window, paint flecks on his hands." />
                <span className="wm-pill">Portrait</span>
                <span className="wm-arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <div className="work-meta">
                <div>
                  <div className="wm-title">Vance in Studio</div>
                  <div className="wm-cap">The New Yorker profile &bull; Red Hook</div>
                </div>
                <div className="wm-cap">No. 131</div>
              </div>
            </Link>

            <Link className="work-item work-item--sm reveal" href="/work">
              <div className="wm">
                <img src="/assets/img/work-product.jpg" alt="A pair of leather oxfords on a marble plinth, lit by a single hard light to throw a sharp shadow against a charcoal backdrop." />
                <span className="wm-pill">Product</span>
                <span className="wm-arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <div className="work-meta">
                <div>
                  <div className="wm-title">Soren Derby</div>
                  <div className="wm-cap">Campaign still &bull; 8x10 crop</div>
                </div>
                <div className="wm-cap">No. 128</div>
              </div>
            </Link>

            <Link className="work-item work-item--lg reveal" href="/work">
              <div className="wm">
                <img src="/assets/img/work-still-2.jpg" alt="A close still of folded merino sweaters in cream, ochre, and stone — a precise stack shot under flat soft light." />
                <span className="wm-pill">Still</span>
                <span className="wm-arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <div className="work-meta">
                <div>
                  <div className="wm-title">Raw Wool Series</div>
                  <div className="wm-cap">Textile catalogue &bull; Biella, IT</div>
                </div>
                <div className="wm-cap">No. 122</div>
              </div>
            </Link>
          </div>

          <div style={{ textAlign: "center", marginTop: "var(--space-7)" }}>
            <Link className="btn btn--ghost btn--lg" href="/work">
              All projects &bull; 142
              <svg className="arrow" width="16" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Chapter 01 */}
      <section className="chapter tile-section">
        <div className="container container--narrow">
          <div className="chapter-grid">
            <div>
              <span className="label">Chapter 01</span>
              <h2>A studio that<br />treats each<br />frame as work.</h2>
            </div>
            <div>
              <p className="lead">
                We are eight people: four photographers, two retouchers, one digital technician, and a studio manager who makes sure calls start on time.
              </p>
              <p style={{ marginTop: "var(--space-4)", color: "var(--fg-on-tile-mute)" }}>
                We don&apos;t keep account executives or junior producers who relay messages between rooms. When you commission Brivon, you talk directly to the person holding the cable, the light, or the loupe. It is faster, it costs less, and nobody has to apologize for something getting lost between meetings.
              </p>
              <div style={{ marginTop: "var(--space-5)" }}>
                <Link className="btn btn--dark" href="/studio">
                  Read studio manifesto
                  <svg className="arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                    <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section>
        <div className="container container--wide">
          <div className="section-head">
            <div>
              <span className="eyebrow"><span className="dot" aria-hidden="true"></span>What we do</span>
              <h2>Five disciplines.<br />One pair of hands.</h2>
            </div>
            <div>
              <p className="lead">
                We don&apos;t shoot weddings, events, or corporate headshots. We focus entirely on commercial and editorial still photography where light, surface, and composition carry the message.
              </p>
            </div>
          </div>

          <div className="cap-bento">
            <div className="cap-card cap-card--wide">
              <span className="cap-num">01</span>
              <div className="cap-tag">Core practice</div>
              <h3>Editorial &amp; Fashion</h3>
              <p>Lookbooks, seasonal campaigns, magazine covers, and editorial stories shot on location or in our daylight bays. Full team support including digital tech and hair/makeup coordination.</p>
            </div>

            <div className="cap-card cap-card--std">
              <span className="cap-num">02</span>
              <div className="cap-tag">Studio A / B</div>
              <h3>Still Life &amp; Objects</h3>
              <p>Tabletop, luxury packaging, cosmetics, and fine objects shot under precision tungsten or flat continuous daylight with calibrated monitors.</p>
            </div>

            <div className="cap-card cap-card--std">
              <span className="cap-num">03</span>
              <div className="cap-tag">Location</div>
              <h3>Architecture &amp; Spaces</h3>
              <p>Documenting built work for architects, interior practices, and monographs. Large-format tilt-shift perspectives and natural light studies.</p>
            </div>

            <div className="cap-card cap-card--tall">
              <img src="/assets/img/cap-tall.jpg" alt="A wide architectural interior — concrete columns and a tall window casting a long shadow on a polished concrete floor." />
              <div className="cap-tall-meta">
                <span className="pill">Architecture</span>
                Neue Gallery &bull; 4x5 View
              </div>
            </div>

            <div className="cap-card cap-card--std">
              <span className="cap-num">04</span>
              <div className="cap-tag">Culinary</div>
              <h3>Food &amp; Hospitality</h3>
              <p>Cookbooks, brand menus, culinary editorial, and ingredient studies. In-house food-styling prep kitchen at our Greenpoint studio.</p>
            </div>

            <div className="cap-card cap-card--std">
              <span className="cap-num">05</span>
              <div className="cap-tag">In-House</div>
              <h3>Retouching &amp; Proofing</h3>
              <p>Color grading in calibrated Eizo environments, skin-tone matching, prepress conversion, and physical pigment proofs on archival rag paper.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process split */}
      <section className="snug">
        <div className="container container--wide">
          <div className="split">
            <div className="split-text">
              <span className="eyebrow"><span className="dot" aria-hidden="true"></span>How we work</span>
              <h2>From the first call<br />to the last frame.</h2>
              <p className="lead">
                Every shoot follows a tight, documented four-stage pipeline so there are no surprises on set or on the invoice.
              </p>
              <div className="process-grid" style={{ marginTop: "var(--space-6)" }}>
                <div>
                  <div className="step-num">01</div>
                  <h4>Treatment &amp; Lighting Plan</h4>
                  <p>We build a visual deck, test palette, and light diagram before we confirm the date.</p>
                </div>
                <div>
                  <div className="step-num">02</div>
                  <h4>Tethered Capture</h4>
                  <p>Client reviews live on calibrated screens on set or via encrypted private stream.</p>
                </div>
                <div>
                  <div className="step-num">03</div>
                  <h4>Grading &amp; Proofs</h4>
                  <p>First round of graded selects delivered within 48 hours for selection.</p>
                </div>
                <div>
                  <div className="step-num">04</div>
                  <h4>Master Archive</h4>
                  <p>Full-res TIFFs, web masters, and physical contact prints shipped to your office.</p>
                </div>
              </div>
              <div style={{ marginTop: "var(--space-6)" }}>
                <Link className="btn btn--ghost" href="/services">
                  See full process &amp; rates
                  <svg className="arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                    <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="split-media reveal">
              <img src="/assets/img/process-shoot.jpg" alt="A working set in the Brivon Brooklyn studio — two stylists pinning a garment on a model while a photographer reviews tethered captures on a calibrated monitor." />
              <span className="ft-corner">Day 02 &bull; Brooklyn</span>
            </div>
          </div>
        </div>
      </section>

      {/* Studios split */}
      <section className="snug" style={{ paddingTop: 0 }}>
        <div className="container container--wide">
          <div className="split split--reverse">
            <div className="split-text">
              <span className="eyebrow"><span className="dot" aria-hidden="true"></span>The spaces</span>
              <h2>Two rooms,<br />two grids,<br />one team.</h2>
              <p className="lead">
                We operate two fully equipped daylight photography studios: Studio A in Greenpoint, Brooklyn, and Studio B in Kreuzberg, Berlin.
              </p>
              <p style={{ marginTop: "var(--space-4)", color: "var(--fg-soft)" }}>
                Both spaces feature 4.5-meter ceilings, north-facing frosted glass skylights, 100A 3-phase power, full Profoto and Broncolor grip packages, private styling rooms, and dedicated prep kitchens. Available for commissioned productions and dry-hire by vetted teams.
              </p>
              <div style={{ marginTop: "var(--space-6)" }}>
                <Link className="btn btn--ghost" href="/studio">
                  Visit the studios
                  <svg className="arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                    <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="split-media reveal">
              <img src="/assets/img/studio-room.jpg" alt="A daylight photography studio with high ceilings, a single grey seamless rolled down, and a stylist arranging garments on a rack against the far wall." />
              <span className="ft-corner">Greenpoint &bull; NYC</span>
            </div>
          </div>
        </div>
      </section>

      {/* Press strip */}
      <section className="compact">
        <div className="container container--wide">
          <div className="press-strip">
            <div>
              <span className="label">Published in</span>
              <p className="mono" style={{ marginTop: "6px", color: "var(--fg-soft)" }}>
                Vogue France &bull; The New Yorker &bull; Kinfolk &bull; Wallpaper* &bull; Architectural Digest &bull; Openhouse
              </p>
            </div>
            <div>
              <span className="label">Recognition</span>
              <p className="mono" style={{ marginTop: "6px", color: "var(--fg-soft)" }}>
                ADC Gold Cube 2024 &bull; D&amp;AD Pencil (Craft) &bull; Photo District News 30 &bull; German Design Award
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journal */}
      <section>
        <div className="container container--wide">
          <div className="section-head">
            <div>
              <span className="eyebrow"><span className="dot" aria-hidden="true"></span>Notes from the floor</span>
              <h2>The journal.</h2>
            </div>
            <div>
              <p className="lead">
                Occasional technical notes, lighting diagrams, and candid post-mortems from recent productions. Written for photographers, art directors, and print nerds.
              </p>
            </div>
          </div>

          <div className="journal-grid">
            <article className="journal-card">
              <div className="j-img">
                <img src="/assets/img/journal-light.jpg" alt="A single Profoto strobe firing through a 4x6 silk on a Brooklyn rooftop at golden hour, two stylists holding the frame against the wind." />
              </div>
              <div className="j-meta">
                <span>Lighting</span>
                <span aria-hidden="true">&bull;</span>
                <span>14 Oct 2025</span>
              </div>
              <h3>On raking light and wide silk.</h3>
              <p>Soft does not have to mean flat. A working note about why a hard silk still beats a soft box for portrait work on a clear day.</p>
              <a className="btn btn--ghost btn--sm" href="#">Read note</a>
            </article>

            <article className="journal-card">
              <div className="j-img">
                <img src="/assets/img/journal-colour.jpg" alt="A printed proof sheet next to a calibrated monitor, the proof showing a sequence of skin-tone patches under different studio lighting." />
              </div>
              <div className="j-meta">
                <span>Process</span>
                <span aria-hidden="true">&bull;</span>
                <span>22 Sep 2025</span>
              </div>
              <h3>Calibration is the cheapest hire.</h3>
              <p>An argument for hiring your printer before you hire your retoucher. A note for studios scaling from solo into a working team.</p>
              <a className="btn btn--ghost btn--sm" href="#">Read note</a>
            </article>

            <article className="journal-card">
              <div className="j-img">
                <img src="/assets/img/journal-archive.jpg" alt="A long contact sheet of medium-format frames hanging in the studio archive room, lit by a single warm bulb." />
              </div>
              <div className="j-meta">
                <span>Archive</span>
                <span aria-hidden="true">&bull;</span>
                <span>09 Aug 2025</span>
              </div>
              <h3>The third frame is usually the one.</h3>
              <p>From the Atrium SS25 shoot &mdash; why the third frame in any sequence almost always reads the best, and what to do about it.</p>
              <a className="btn btn--ghost btn--sm" href="#">Read note</a>
            </article>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="closing-cta">
        <div className="container container--narrow">
          <span className="label" style={{ color: "rgba(10,10,12,0.6)" }}>Booking &bull; 2026</span>
          <h2>Have a project<br />that deserves the<br />third frame?</h2>
          <p className="lede">
            We take on twenty to twenty-six campaigns a year, and we book three to five months ahead. If you have a brief brewing for Q2 or later, the right time to send a first note is now.
          </p>
          <div className="cta-row">
            <Link className="btn btn--dark btn--lg" href="/contact">
              Start a project
              <svg className="arrow" width="16" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link className="btn btn--ghost btn--lg" href="/services">
              See rates &amp; process
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
