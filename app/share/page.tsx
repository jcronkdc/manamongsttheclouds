import type { Metadata } from "next";
import ShareClient from "./ShareClient";

export const metadata: Metadata = {
  title: "Share a Passage",
  description:
    "Generate beautiful quote cards from Man Amongst the Clouds and share them on Instagram, Twitter, Facebook, and TikTok. Choose from featured passages or create your own.",
  alternates: { canonical: "https://manamongsttheclouds.com/share" },
  openGraph: {
    title: "Share a Passage — Man Amongst the Clouds",
    description:
      "Generate beautiful quote cards from Man Amongst the Clouds and share them everywhere.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Share a Passage — Man Amongst the Clouds",
    description:
      "Generate beautiful quote cards and share them on social media.",
  },
};

export default function SharePage() {
  return <ShareClient />;
}
