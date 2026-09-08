import Image from "next/image";

export type PolarisMediaItem = {
  src: string;
  kind: "image" | "video";
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
  poster?: string;
};

function Media({ item, priority = false }: { item: PolarisMediaItem; priority?: boolean }) {
  if (item.kind === "video") {
    return (
      <video
        aria-label={item.alt}
        className="polaris-media__asset"
        controls
        muted
        playsInline
        poster={item.poster}
        preload="metadata"
      >
        <source src={item.src} />
      </video>
    );
  }

  return (
    <a
      aria-label={`Open full-size image: ${item.alt}`}
      className="polaris-media__image-link"
      href={item.src}
      rel="noopener"
      target="_blank"
    >
      <Image
        alt={item.alt}
        className="polaris-media__asset"
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        src={item.src}
      />
    </a>
  );
}

export function PolarisMediaFrame({
  item,
  priority = false,
}: {
  item: PolarisMediaItem;
  priority?: boolean;
}) {
  return (
    <figure className="polaris-media polaris-media--hero">
      <div className="polaris-media__viewport">
        <Media item={item} priority={priority} />
      </div>
      <figcaption>
        <span className="artifact">{item.eyebrow}</span>
        <strong>{item.title}</strong>
        <p>{item.description}</p>
      </figcaption>
    </figure>
  );
}

export default function PolarisMediaGallery({ items }: { items: PolarisMediaItem[] }) {
  return (
    <div className="polaris-gallery">
      {items.map((item) => (
        <figure className="polaris-media" key={item.src}>
          <div className="polaris-media__viewport">
            <Media item={item} />
          </div>
          <figcaption>
            <span className="artifact">{item.eyebrow}</span>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
