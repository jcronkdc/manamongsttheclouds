import { Metadata } from "next";
import PartOneReader from "./PartOneReader";

export const metadata: Metadata = {
  title: "Read Part One: The Still Water — Free",
  description:
    "Read Part One of Man Amongst the Clouds for free. Ten chapters. Leave feedback, highlight what works, flag what doesn\u2019t. Help shape this book.",
  alternates: {
    canonical: "https://www.manamongsttheclouds.com/read/part-one",
  },
  openGraph: {
    title: "Read Part One: The Still Water — Free",
    description:
      "Part One of Man Amongst the Clouds is free to read. Leave comments. Help shape the book before it publishes.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Read Part One: The Still Water — Free",
    description:
      "Part One of Man Amongst the Clouds is free to read. Leave comments. Help shape the book before it publishes.",
    images: ["/opengraph-image"],
  },
};

const CHAPTER_META: { number: number; title: string; pov: string }[] = [
  { number: 0, title: "The First Song", pov: "" },
  { number: 1, title: "The Herbs", pov: "Aelo" },
  { number: 2, title: "The Collection", pov: "The Knife" },
  { number: 3, title: "The Blue Sun", pov: "Aelo" },
  { number: 4, title: "The Running", pov: "Aelo" },
  { number: 5, title: "The Merchant", pov: "Sereth" },
  { number: 6, title: "The History", pov: "Jalo" },
  { number: 7, title: "The Growing", pov: "Aelo" },
  { number: 8, title: "The Patrol", pov: "The Knife" },
  { number: 9, title: "The Flood", pov: "Aelo" },
  { number: 10, title: "The Report", pov: "The Knife" },
];

export default function PartOnePage() {
  return <PartOneReader chapters={CHAPTER_META} />;
}
