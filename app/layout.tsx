import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "HeatedUpFitness | Personal Training with Mikia Gumms",
    template: "%s | HeatedUpFitness",
  },
  robots: { index: false, follow: false }, // preview: remove at launch
  description:
    "ISSA-certified personal trainer serving Westbank New Orleans — weight training and nutrition coaching in person and online, custom meal plans, and workout programs for building strength. Where everyBODY's someBODY.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
