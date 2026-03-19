import type { Metadata } from "next";
import WorldMapClient from "./WorldMapClient";

const title = "Interactive World Map — Man Amongst the Clouds";
const description =
  "Explore the seven regions of Man Amongst the Clouds on an interactive map. Click to discover each region's people, culture, magic, and approximate distances. A fantasy world built on memory.";
const url = "https://www.manamongsttheclouds.com/world/map";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: "article",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive World Map — Man Amongst the Clouds",
    description,
  },
};

export default function WorldMapPage() {
  return <WorldMapClient />;
}
