"use client";

import { useState } from "react";

/**
 * Silent, real-app footage in the site's film frame. Media is requested only
 * after the visitor presses play; until then the frame holds a static poster,
 * landscape on a wide screen and the vertical edit on a phone.
 */
export default function PolarisVideo({
  name,
  label,
  duration,
}: {
  name: string;
  label: string;
  duration: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [format, setFormat] = useState("landscape");
  const base = `/demos/polaris/launch/polaris-${name}`;
  return (
    <div
      className={`film${playing ? " film--playing" : ""}`}
      style={playing ? { aspectRatio: format === "vertical" ? "9/16" : "16/9" } : undefined}
    >
      {playing ? (
        <video
          ref={(element) => {
            element?.focus();
          }}
          tabIndex={0}
          controls
          autoPlay
          playsInline
          muted
          preload="none"
          aria-label={label}
          poster={`${base}-${format}.jpg`}
        >
          <source src={`${base}-${format}.mp4`} type="video/mp4" />
          Your browser cannot play this video.{" "}
          <a href={`${base}-${format}.mp4`}>Download the demo</a>.
        </video>
      ) : (
        <button
          type="button"
          className="film__play"
          aria-label={`Play ${label}, ${duration}, silent video`}
          onClick={() => {
            setFormat(window.matchMedia("(max-width: 600px)").matches ? "vertical" : "landscape");
            setPlaying(true);
          }}
        >
          <picture>
            <source media="(max-width: 600px)" srcSet={`${base}-vertical.jpg`} />
            {/* Static local posters preserve their full frame at either aspect ratio. */}
            <img src={`${base}-landscape.jpg`} alt="" width="1920" height="1080" />
          </picture>
          <span className="film__control">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m6 3 11 7-11 7Z" fill="currentColor" />
            </svg>
            Watch {duration}
          </span>
        </button>
      )}
    </div>
  );
}
