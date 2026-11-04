import { AnalystMock as Mock } from "@tessera/mocks";
import { PRODUCTS } from "@/lib/products";
import ReadableMock from "./ReadableMock";

export default function AnalystMock() {
  return <ReadableMock><Mock color={PRODUCTS.analyst.color} /></ReadableMock>;
}
