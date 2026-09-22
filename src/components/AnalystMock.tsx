import { AnalystMock as Mock } from "@tessera/mocks";
import { PRODUCTS } from "@/lib/products";

export default function AnalystMock() {
  return <Mock color={PRODUCTS.analyst.color} />;
}
