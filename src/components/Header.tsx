import type { CSSProperties } from "react";
import { PRODUCT_LIST, productHref } from "@/lib/products";
import { NAV, ORG } from "@/lib/site";
import {
  IconArrowRight,
  IconChevron,
  IconGitHub,
  PRODUCT_ICONS,
} from "./Icons";
import MobileMenu from "./MobileMenu";

// The header is a server component. The products menu opens on hover and on
// focus-within, so it needs no script; the only client code in the header is
// the mobile menu, which closes itself after a navigation.
export default function Header() {
  return (
    <header className="header">
      <div className="container header__row">
        <a className="wordmark" href="/">
          <i aria-hidden="true" />
          axio
          <small>by Umbra</small>
        </a>

        <nav className="nav" aria-label="Primary">
          <div className="nav__item">
            <a className="nav__link" href="/products">
              Products
              <IconChevron />
            </a>
            <div className="nav__menu">
              {PRODUCT_LIST.map((p) => {
                const Icon = PRODUCT_ICONS[p.id];
                return (
                  <a
                    key={p.id}
                    className="menu-item"
                    href={productHref(p.id)}
                    style={{ "--pc": p.color } as CSSProperties}
                  >
                    <span className="menu-item__icon">
                      <Icon />
                    </span>
                    <span className="menu-item__text">
                      <strong>{p.name}</strong>
                      <span>{p.tagline}</span>
                    </span>
                  </a>
                );
              })}
              <a className="nav__menu-foot" href="/products">
                All products
                <IconArrowRight />
              </a>
            </div>
          </div>
          {NAV.main.slice(1).map((item) => (
            <div className="nav__item" key={item.href}>
              <a className="nav__link" href={item.href}>
                {item.name}
              </a>
            </div>
          ))}
        </nav>

        <div className="header__actions">
          <a
            className="icon-btn"
            href={ORG}
            aria-label="Umbra on GitHub"
            rel="noopener"
          >
            <IconGitHub />
          </a>
          <a className="btn btn--primary btn--sm header__cta" href="/download">
            Download
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
