import type { Metadata } from "next";
import ReadPageClient from "./ReadPageClient";

export const metadata: Metadata = {
  title: "Read — Man Amongst the Clouds",
  robots: { index: false, follow: false },
};

export default async function ReadPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <ReadPageClient token={token} />;
}
