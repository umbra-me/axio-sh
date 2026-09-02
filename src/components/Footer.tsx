import { PRODUCT_LIST, productHref } from "@/lib/products";
import { COMPANY, NAV, ORG, UMBRA } from "@/lib/site";
import { IconGitHub } from "./Icons";

const AGENT = "https://github.com/umbra-me/axio";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <a className="wordmark" href="/">
              <i aria-hidden="true" />
              axio
            </a>
            <p>
              Developer tools that stay on your machine. A coding agent, a
              screenshot tool, an analyst for Binary Ninja and a Windows control
              surface, built by Umbra.
            </p>
            <a
              className="icon-btn"
              href={ORG}
              aria-label="Umbra on GitHub"
              rel="noopener"
            >
              <IconGitHub />
            </a>
          </div>

          <div>
            <h3>Products</h3>
            <ul>
              {PRODUCT_LIST.map((p) => (
                <li key={p.id}>
                  <a href={productHref(p.id)}>{p.name}</a>
                </li>
              ))}
              <li>
                <a href="/download">Download</a>
              </li>
            </ul>
          </div>

          <div>
            <h3>Resources</h3>
            <ul>
              <li>
                <a href={AGENT} rel="noopener">
                  Agent repository
                </a>
              </li>
              <li>
                <a href={`${AGENT}/blob/main/docs/architecture.md`} rel="noopener">
                  Architecture
                </a>
              </li>
              <li>
                <a href={`${AGENT}/blob/main/docs/roadmap.md`} rel="noopener">
                  Roadmap
                </a>
              </li>
              <li>
                <a href={`${AGENT}/blob/main/CHANGELOG.md`} rel="noopener">
                  Changelog
                </a>
              </li>
              <li>
                <a href="/install">Install script</a>
              </li>
            </ul>
          </div>

          <div>
            <h3>Company</h3>
            <ul>
              <li>
                <a href="/about">About Axio</a>
              </li>
              {/* data-umbra-link is what the shared collector watches for. The
                  press is counted as an hourly total against this site and this
                  link name, with no visitor identifier. */}
              <li>
                <a href={UMBRA} data-umbra-link="umbra-attribution">
                  Umbra
                </a>
              </li>
              {NAV.legal.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {COMPANY.name}. Software licences apply
            to each product; see <a href="/legal/licenses">Licences</a>.
          </span>
          <span>Built independently in {COMPANY.location}.</span>
        </div>
      </div>
    </footer>
  );
}
