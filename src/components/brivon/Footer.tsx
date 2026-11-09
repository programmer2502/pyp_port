import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container container--wide">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="brand" href="/" aria-label="PYP Studio">
              <img
                src="/assets/img/pyp-logo-trans.png"
                alt="PYP"
                className="brand-logo"
                style={{
                  height: "36px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                  marginBottom: "var(--space-2)",
                }}
              />
            </Link>
            <p>
              A small commercial photography studio between Brooklyn and Berlin. Editorial,
              campaign, architecture, food, product.
            </p>
            <span className="label">Studio &bull; 0900&ndash;1900 CET &bull; 0900&ndash;1800 EST</span>
          </div>
          <div>
            <h4>Studio</h4>
            <ul>
              <li>
                <Link href="/studio">About</Link>
              </li>
              <li>
                <Link href="/studio#team">Team</Link>
              </li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/services#rates">Rates</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Work</h4>
            <ul>
              <li>
                <Link href="/work">Selected work</Link>
              </li>
              <li>
                <Link href="/work#archive">Archive</Link>
              </li>
              <li>
                <Link href="/work#editorial">Editorial</Link>
              </li>
              <li>
                <Link href="/work#architecture">Architecture</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
              <li>
                <Link href="/contact">Start a project</Link>
              </li>
              <li>
                <Link href="/contact#press">Press</Link>
              </li>
              <li>
                <Link href="/contact#careers">Careers</Link>
              </li>
              <li>
                <Link href="/admin">CMS Admin</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            &copy; 2026 PYP Studio &bull; Made for html.design. Distributed by{" "}
            <a href="https://themewagon.com/" target="_blank" rel="noopener noreferrer">
              ThemeWagon
            </a>
          </span>
          <div className="footer-meta-links">
            <a href="#">Privacy</a>
            <a href="#">Imprint</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
