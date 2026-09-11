import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Polaris personal licence and refunds",
  description: "Price, personal-use licence, digital delivery, support and refunds for Axio Polaris.",
  alternates: { canonical: "/products/polaris/licence" },
};

export default function PolarisLicencePage() {
  return <LegalPage title="Polaris personal licence" current="/products/polaris/licence"
    back={{ name: "Axio Polaris", href: "/products/polaris" }}
    summary="A one-time personal licence for two Macs, with an explicit no-card trial.">
    <h2>Try before buying</h2>
    <p>The Mac app offers 14 days of full trial access, starting only when you choose Start Trial. No payment card is required and the trial never charges you automatically.</p>
    <h2>Price and use</h2>
    <p>The personal licence is A$59 once, inclusive of applicable tax, with no subscription. Stripe may present a converted local-currency price; review the final total before paying. Purchase grants you perpetual personal use of the supplied application on up to two activated Macs at a time. Deactivate an old Mac in Settings → Licence to move its activation. If you no longer have that Mac, <a href="/polaris-license/seats">release its activation here</a> using your licence key.</p>
    <p>The licence is for the distributed application, not ownership of its source. Third-party components and previously MIT-licensed code retain their original rights and notices. The Mac release does not include the separate Chromium browser companion.</p>
    <h2>Delivery and activation</h2>
    <p>Download the signed Mac installer from <a href="/products/polaris">the product page</a>. After payment completes, the licence service emails your key separately from your billing receipt. Paste it into Settings → Licence. Initial activation needs internet; an activated copy can use its cached licence for up to 30 days after a successful verification.</p>
    <p>Use <a href="/polaris-license/recover">licence recovery</a> with your purchase email if the key is missing. Your locally saved content remains on your Mac when a trial expires or a licence is disabled.</p>
    <h2>Billing, support and refunds</h2>
    <p>Checkout is sold through Link using Stripe Managed Payments, so your card statement shows this purchase as Link.com* Axio.sh rather than Axio alone. Link provides billing receipts, transaction support and refund requests through <a href="https://support.link.com/topics/sold-through-link">Link support</a>. For installation, product faults or licence delivery, contact <a href="mailto:support@umbra.me">support@umbra.me</a> with your purchase email and a description of the problem; do not send card details.</p>
    <p>A full refund disables the associated licence. Nothing here limits rights or remedies that cannot be excluded under Australian Consumer Law or other applicable consumer law. See the <a href="https://www.accc.gov.au/consumers/problem-with-a-product-or-service-you-bought/repair-replace-refund-cancel">ACCC’s consumer remedies guidance</a>.</p>
    <h2>Privacy</h2>
    <p>Read <a href="/legal/privacy#polaris">what Polaris stores and sends for purchases, activation and updates</a>. Notes, tasks and clipboard history are not uploaded to the licence service.</p>
  </LegalPage>;
}
