import Image from "next/image";
import Link from "next/link";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { socialPosts } from "@/constants/social";

export function SocialProofSection() {
  return (
    <SectionShell id="social" className="bg-white">
      <div className="space-y-10">
        <SectionHeading
          title="Presencia en redes"
          subtitle="Contenido consistente en Instagram y TikTok con foco en belleza, skincare y UGC para marcas."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {socialPosts.map((post) => (
            <Link
              key={post.id}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl border border-stone-200 bg-[#F5F5F5] p-5 transition-shadow hover:shadow-[0_20px_40px_rgba(53,60,68,0.12)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {post.platform}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-foreground">
                    {post.title}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">{post.metric}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
