import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "HeatedUpFitness admin.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
