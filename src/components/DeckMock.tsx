import { DeckMock as Mock } from "@tessera/mocks";
import { PRODUCTS } from "@/lib/products";

export default function DeckMock() {
  return <Mock color={PRODUCTS.deck.color} />;
}
