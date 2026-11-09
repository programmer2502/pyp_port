import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Brivon · The Studio — Photography Studio HTML Template",
  description: "Eight people, two daylight rooms in Brooklyn and Berlin, one shared archive of editorial and commercial photography.",
};

export default function StudioPage() {
  return (
    <>


    {/*  Hero  */}
    <section className="hero">
      <div className="container container--wide">
        <div className="hero-grid">
          <div className="hero-text">
            <span className="eyebrow"><span className="dot" aria-hidden="true"></span>Studio · est. October 2014</span>
            <h1 className="hero-headline">
              Eight people,<br />
              two rooms,<br />
              <span className="lime">one rule</span> we keep.
            </h1>
            <p className="hero-sub">
              Brivon is a small commercial photography studio — eight people on staff, two rooms (Brooklyn and Berlin),
              one in-house retoucher who has worked the entire archive since 2017. We work slower than the average rate
              card and we keep the same producer on a brand from first call to final delivery.
            </p>
            <div className="hero-cta-row">
              <a className="btn btn--primary btn--lg" href="#team">Meet the team</a>
              <a className="btn btn--ghost btn--lg" href="/contact">Start a project</a>
            </div>
            <div className="hero-meta">
              <span><strong>2014</strong> · founded in Brooklyn</span>
              <span aria-hidden="true">·</span>
              <span><strong>2018</strong> · Berlin room opened</span>
              <span aria-hidden="true">·</span>
              <span><strong>2022</strong> · in-house print lab</span>
            </div>
          </div>
          <div className="hero-media">
            <img src="assets/img/studio-hero.jpg"
              alt="The Brooklyn studio with a tall north window, a rolled grey seamless, and two stylists steaming a garment on a rolling rack." />
            <div className="floating-tag ft-top">
              <span className="pill">280 m²</span>
              GREENPOINT · NYC
            </div>
            <div className="floating-tag ft-bottom">
              4.6 m ceilings · N light
            </div>
          </div>
        </div>
      </div>
    </section>

    {/*  Founding chapter  */}
    <section className="chapter">
      <div className="container container--narrow">
        <div className="chapter-grid">
          <div>
            <span className="label">Chapter 01 · founding</span>
            <h2>2014 — a working group<br />of three people in<br />a borrowed loft.</h2>
          </div>
          <div className="chapter-body">
            <p>
              The studio started in October 2014 as a working group of three — Mira Halden, Joon Park, and Tomas Brivón
              — sharing a 90-square-metre loft in Williamsburg that we had borrowed for the autumn from a friend who had
              gone to film a documentary in Patagonia. We took on twelve projects that first quarter and lost money on
              five of them. We kept going because the projects we were turning down were starting to ask twice.
            </p>
            <blockquote className="pull-quote">
              The first studio rule we ever wrote down: never ship a frame we would not hang.
              <cite>— Mira Halden, founder</cite>
            </blockquote>
            <p>
              The name "Brivon" comes from Tomas Brivón's family — a small printing shop his grandparents ran in Lisbon
              in the 1950s. The shop is gone, but the discipline carried. The studio's house style — careful colour,
              considered light, paper-first thinking — is a direct inheritance from that shop, even though the work
              itself is contemporary.
            </p>
            <p>
              The studio is privately held; we have never taken outside investment, never sold a percentage to an
              agency, and we expect to remain owner-operated for the foreseeable future. We are eight people. We intend
              to stay eight people.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/*  Awards strip  */}
    <section className="compact">
      <div className="container container--wide">
        <div className="awards-strip">
          <div className="award-cell">
            <div className="award-num">03</div>
            <div className="award-label">ADC Awards · 2022 — 24</div>
          </div>
          <div className="award-cell">
            <div className="award-num">11</div>
            <div className="award-label">Cover stories · 2024</div>
          </div>
          <div className="award-cell">
            <div className="award-num">02</div>
            <div className="award-label">Type Directors Club · 2023</div>
          </div>
          <div className="award-cell">
            <div className="award-num">94%</div>
            <div className="award-label">Repeat-client rate</div>
          </div>
        </div>
      </div>
    </section>

    {/*  Principles (cap-bento reuse)  */}
    <section>
      <div className="container container--wide">
        <div className="section-head">
          <div>
            <span className="eyebrow"><span className="dot" aria-hidden="true"></span>Principles</span>
            <h2>Six rules we<br />refuse to bend.</h2>
          </div>
          <p className="lede">
            These are not aspirations — they are the constraints that have shaped every shoot we have produced. Most
            studios learn these the hard way after a few years. We wrote them down in 2015 and have not relaxed any of
            them since.
          </p>
        </div>

        <div className="cap-bento">
          <article className="cap-card cap-card--std">
            <span className="cap-num">01</span>
            <h3>Daylight first.</h3>
            <p>If natural light can do it, we use natural light. Supplement only when the brief genuinely needs the
              supplement.</p>
          </article>

          <article className="cap-card cap-card--std">
            <span className="cap-num">02</span>
            <h3>Colour-managed end-to-end.</h3>
            <p>From capture to print. ICC-profiled. Calibrated monitors. A real print proof for any campaign that lands
              on paper.</p>
          </article>

          <article className="cap-card cap-card--std">
            <span className="cap-num">03</span>
            <h3>One producer per brand.</h3>
            <p>The same person from the first call to the final delivery. Continuity is the cheapest quality lever a
              studio has.</p>
          </article>

          <article className="cap-card cap-card--std">
            <span className="cap-num">04</span>
            <h3>Retouching is editing.</h3>
            <p>Done in-house. Treated as part of the creative decision, never outsourced to a post house that has not
              seen the brief.</p>
          </article>

          <article className="cap-card cap-card--std">
            <span className="cap-num">05</span>
            <h3>The third frame.</h3>
            <p>Almost always the one. We shoot enough of every setup to find it; we never settle on the first or the
              safest.</p>
          </article>

          <article className="cap-card cap-card--std">
            <span className="cap-num">06</span>
            <h3>Never ship a frame we<br />would not hang.</h3>
            <p>The first rule we ever wrote down. We have killed projects in post that we could have shipped — and we
              have not regretted it.</p>
          </article>
        </div>
      </div>
    </section>

    {/*  Split: rooms  */}
    <section className="snug">
      <div className="container container--wide">
        <div className="split">
          <div className="split-text">
            <span className="eyebrow"><span className="dot" aria-hidden="true"></span>Room 01 · Brooklyn</span>
            <h2>280 m² of<br />north light.</h2>
            <p>
              The Brooklyn room sits in a converted printers' building in Greenpoint, a five-minute walk from the G
              train. Four-and-a-half-metre ceilings, true north light, a working kitchen for food work, two pre-rigged
              grid points, and enough corner storage for three full backdrop libraries. The room is available to outside
              crews for ten weeks of the year — contact the studio if you would like to enquire.
            </p>
            <ul className="split-fact-list">
              <li><b>Address</b><span>137 Banker Street, Brooklyn NY 11222</span></li>
              <li><b>Hours</b><span>Mon–Fri 0800–1900 · weekends by booking</span></li>
              <li><b>Capacity</b><span>Up to 18 people on set</span></li>
              <li><b>Daylight</b><span>4 north windows · 9.8 m run</span></li>
              <li><b>Power</b><span>3 × 30A circuits · independent grip ring</span></li>
            </ul>
            <a className="btn btn--ghost" href="/contact">Book a visit
              <svg className="arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                  strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <div className="split-img">
            <img src="assets/img/studio-brooklyn.jpg"
              alt="A wide view of the Brooklyn studio — tall north windows, polished concrete floor, a single grey seamless rolled down at the back wall." />
            <span className="ft-corner">Greenpoint · NYC</span>
          </div>
        </div>
      </div>
    </section>

    {/*  Split: berlin  */}
    <section className="snug" style={{ "paddingTop": "0" }}>
      <div className="container container--wide">
        <div className="split split--reverse">
          <div className="split-text">
            <span className="eyebrow"><span className="dot" aria-hidden="true"></span>Room 02 · Berlin</span>
            <h2>140 m² of<br />south daylight.</h2>
            <p>
              The Berlin room opened in 2018 — a calmer, smaller space on a Mitte ground floor with south-facing windows
              that give us a warmer, slower light than Brooklyn. Polished concrete, exposed concrete columns, a single
              3.6-metre roll-down, and a quiet street that we can close to traffic for outdoor stills. We use it
              primarily for editorial portraiture, product still life, and any project that benefits from the slower
              European pace.
            </p>
            <ul className="split-fact-list">
              <li><b>Address</b><span>Brunnenstraße 162, 10119 Berlin</span></li>
              <li><b>Hours</b><span>Mon–Fri 0900–1800 · evenings by booking</span></li>
              <li><b>Capacity</b><span>Up to 10 people on set</span></li>
              <li><b>Daylight</b><span>2 south windows · 5.4 m run</span></li>
              <li><b>Quirk</b><span>Brunnenstraße closes weekly for the Sunday market</span></li>
            </ul>
            <a className="btn btn--ghost" href="/contact">Book a visit
              <svg className="arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                  strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <div className="split-img">
            <img src="assets/img/studio-berlin.jpg"
              alt="The Berlin studio room — a quieter space with south-facing windows, concrete columns, and a single grey seamless against the back wall." />
            <span className="ft-corner">Mitte · Berlin</span>
          </div>
        </div>
      </div>
    </section>

    {/*  Team  */}
    <section id="team">
      <div className="container container--wide">
        <div className="section-head">
          <div>
            <span className="eyebrow"><span className="dot" aria-hidden="true"></span>The team</span>
            <h2>Eight people.<br />You will work<br />with two.</h2>
          </div>
          <p className="lede">
            The producer and the lead photographer assigned to your project are the two people you will speak to most.
            The retoucher, the studio manager, and the production assistant are visible through the pipeline but stay
            off the brand-side calls unless invited.
          </p>
        </div>

        <div className="team-grid">
          <div className="team-card">
            <div className="t-img"><img src="assets/img/team-mira.jpg"
                alt="Studio portrait of Mira Halden, founder of Brivon, in a navy linen overshirt." /></div>
            <h3>Mira Halden</h3>
            <div className="t-role">Founder · Lead photographer</div>
          </div>
          <div className="team-card">
            <div className="t-img"><img src="assets/img/team-joon.jpg"
                alt="Studio portrait of Joon Park, partner and director, in a charcoal jumper against a grey backdrop." />
            </div>
            <h3>Joon Park</h3>
            <div className="t-role">Partner · Director of work</div>
          </div>
          <div className="team-card">
            <div className="t-img"><img src="assets/img/team-tomas.jpg"
                alt="Studio portrait of Tomas Brivón, founder, in a grey overcoat against a Brooklyn brick wall." />
            </div>
            <h3>Tomas Brivón</h3>
            <div className="t-role">Founder · Director of production</div>
          </div>
          <div className="team-card">
            <div className="t-img"><img src="assets/img/team-anya.jpg"
                alt="Studio portrait of Anya Stenmark, senior producer, with a calm expression in raking afternoon light." />
            </div>
            <h3>Anya Stenmark</h3>
            <div className="t-role">Senior producer · NYC</div>
          </div>
          <div className="team-card">
            <div className="t-img"><img src="assets/img/team-eli.jpg"
                alt="Studio portrait of Eli Wender, producer, in a denim shirt against the Berlin studio's concrete wall." />
            </div>
            <h3>Eli Wender</h3>
            <div className="t-role">Producer · Berlin</div>
          </div>
          <div className="team-card">
            <div className="t-img"><img src="assets/img/team-rosa.jpg"
                alt="Studio portrait of Rosa Linder, in-house retoucher, with a serious expression in soft window light." />
            </div>
            <h3>Rosa Linder</h3>
            <div className="t-role">In-house retoucher · since 2017</div>
          </div>
          <div className="team-card">
            <div className="t-img"><img src="assets/img/team-felix.jpg"
                alt="Studio portrait of Felix Vahl, studio manager, in a Brivon-branded apron in the Brooklyn working kitchen." />
            </div>
            <h3>Felix Vahl</h3>
            <div className="t-role">Studio manager · NYC</div>
          </div>
          <div className="team-card">
            <div className="t-img"><img src="assets/img/team-iris.jpg"
                alt="Studio portrait of Iris Tornsen, production assistant, in a navy linen overshirt with a slight smile." />
            </div>
            <h3>Iris Tornsen</h3>
            <div className="t-role">Production assistant</div>
          </div>
        </div>
      </div>
    </section>

    {/*  Closing  */}
    <section className="closing-cta">
      <div className="container container--narrow">
        <span className="label" style={{ "color": "rgba(10,10,12,0.6)" }}>Hiring · 2026</span>
        <h2>Looking for a studio,<br />or a job at one?</h2>
        <p className="lede">
          We are currently hiring a junior producer based in Berlin and a freelance digital tech for the Brooklyn room.
          Brand-side enquiries take ten to fourteen days for a reply; hiring enquiries take four to seven.
        </p>
        <div className="cta-row">
          <a className="btn btn--dark btn--lg" href="/contact">Start a project
            <svg className="arrow" width="16" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
              <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                strokeLinejoin="round" />
            </svg>
          </a>
          <a className="btn btn--ghost btn--lg" href="/contact#careers">See open roles</a>
        </div>
      </div>
    </section>

  
    </>
  );
}
