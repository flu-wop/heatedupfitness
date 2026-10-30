import LegalPage from "@/components/LegalPage";
import { REFUND } from "@/lib/legal";

export const metadata = {
  title: "Refund Policy",
  description: "Refund and cancellation terms for HeatedUpFitness plans and coaching.",
};

export default function Page() {
  return <LegalPage title="Refund Policy" sections={REFUND} />;
}
