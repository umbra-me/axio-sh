import { MediaFrame } from "@tessera/marketing";
import { polarisFilm } from "@/content/polaris-media";

/** Silent, real-app footage of Polaris in Tessera's film frame. */
export default function PolarisVideo({ name, label, duration }: { name: string; label: string; duration: string }) {
  return <MediaFrame {...polarisFilm(name)} label={label} duration={duration} />;
}
