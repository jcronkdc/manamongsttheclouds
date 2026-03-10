import ReadPageClient from "./ReadPageClient";

export default async function ReadPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <ReadPageClient token={token} />;
}
