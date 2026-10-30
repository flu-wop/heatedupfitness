import LegalPage from "@/components/LegalPage";
import { TERMS } from "@/lib/legal";

export const metadata = {
  title: "Terms of Service",
  description: "Terms of service for HeatedUpFitness training, coaching, and digital plans.",
};

export default function Page() {
  return <LegalPage title="Terms of Service" sections={TERMS} />;
}
