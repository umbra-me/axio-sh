import { CaptureMock as Mock } from "@tessera/mocks";
import { PRODUCTS } from "@/lib/products";

export default function CaptureMock() {
  return <Mock color={PRODUCTS.capture.color} />;
}
