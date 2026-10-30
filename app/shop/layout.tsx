import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Plans",
  description: "Done-for-you meal plans and workout programs from Mikia Gumms, delivered instantly to your inbox.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
