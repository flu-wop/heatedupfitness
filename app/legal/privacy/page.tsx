import LegalPage from "@/components/LegalPage";
import { PRIVACY } from "@/lib/legal";

export const metadata = {
  title: "Privacy Policy",
  description: "How HeatedUpFitness collects, uses, and protects your information.",
};

export default function Page() {
  return <LegalPage title="Privacy Policy" sections={PRIVACY} />;
}
