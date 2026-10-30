import LegalPage from "@/components/LegalPage";
import { WAIVER } from "@/lib/legal";

export const metadata = {
  title: "Health & Liability Waiver",
  description: "Health and liability waiver for HeatedUpFitness training clients.",
};

export default function Page() {
  return <LegalPage title="Health & Liability Waiver" sections={WAIVER} />;
}
