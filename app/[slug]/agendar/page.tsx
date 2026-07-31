import { redirect, notFound } from "next/navigation";
import { findByAgendamientoSlug } from "@/lib/database/repositories/tenant.repository";

export default async function TenantBookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = await findByAgendamientoSlug(slug);
  if (!tenant) notFound();
  redirect(`/agendar?tenant=${encodeURIComponent(slug)}`);
}
