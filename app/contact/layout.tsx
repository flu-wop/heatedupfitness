import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Consult",
  description: "Book a free consult with Mikia Gumms — in-person on the Westbank or virtual.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
