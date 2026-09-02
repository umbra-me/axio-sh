import { IconArrowRight } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="nf">
      <div className="container container--narrow">
        <p className="label">404</p>
        <h1 className="display display--lg" style={{ marginTop: "0.75rem" }}>
          Nothing at this address.
        </h1>
        <p className="lede" style={{ marginInline: "auto" }}>
          The page may have moved when the site grew from one page to several.
          The products, the downloads and the legal pages are all one click
          away.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="/">
            Home
            <IconArrowRight />
          </a>
          <a className="btn btn--ghost" href="/products">
            Products
          </a>
        </div>
      </div>
    </section>
  );
}
