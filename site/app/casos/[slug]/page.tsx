import { CASES } from "../data";
import CaseView from "./case-view";

// Genera /casos/exwood y /casos/forestal-foresol al compilar (static export).
export function generateStaticParams() {
  return Object.keys(CASES).map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CaseView slug={slug} />;
}
