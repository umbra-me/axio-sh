/** Where the Polaris demos live and how each film's four files are named. */
export const POLARIS_DEMOS = "/demos/polaris/launch";

export function polarisFilm(name: string) {
  const base = `${POLARIS_DEMOS}/polaris-${name}`;
  return { src: `${base}-landscape.mp4`, poster: `${base}-landscape.jpg`, verticalSrc: `${base}-vertical.mp4`, verticalPoster: `${base}-vertical.jpg` };
}
