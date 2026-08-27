import { redirect, notFound } from "next/navigation";
import { findByAgendamientoSlug } from "@/lib/database/repositories/tenant.repository";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
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
