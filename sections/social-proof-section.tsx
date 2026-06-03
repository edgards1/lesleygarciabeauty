"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { socialPosts } from "@/constants/social";

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SocialProofSection() {
  return (
    <section
      id="social"
      className="relative w-full overflow-hidden border-t border-black/10 bg-white py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <FadeUp>
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-10 bg-[#0a0a0a]" />
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]">
                  06 — Social
                </span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-serif text-4xl font-light leading-[1.02] tracking-[-0.035em] text-[#0a0a0a] sm:text-6xl lg:text-7xl">
                Sígueme en
                <br />
                <span className="italic">@lesleygarciabeauty</span>
              </h2>
            </FadeUp>
          </div>
          <div className="lg:col-span-5 lg:pt-12">
            <FadeUp delay={0.2}>
              <p className="max-w-md text-[15px] leading-relaxed text-[#0a0a0a]/70 sm:text-base">
                Tutoriales, behind the scenes, looks editoriales y proyectos
                UGC. Mi Instagram y TikTok son una ventana directa a mi
                proceso creativo.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <a
                href="https://www.instagram.com/lesleygarciabeauty"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center text-[11px] font-medium uppercase tracking-[0.25em] text-[#0a0a0a] transition-opacity hover:opacity-60"
              >
                Abrir Instagram
                <span className="ml-3 inline-block h-px w-7 bg-current transition-all duration-500 group-hover:w-12" />
              </a>
            </FadeUp>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:mt-20 sm:gap-4 lg:grid-cols-4">
          {socialPosts.map((post, i) => (
            <FadeUp key={post.id} delay={i * 0.08}>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden bg-stone-100"
                aria-label={`${post.platform} — ${post.title}`}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                  quality={82}
                />
                <div className="absolute inset-0 flex flex-col justify-between p-4 text-white sm:p-5">
                  <div className="flex items-start justify-between">
                    <span className="text-[9px] font-medium uppercase tracking-[0.3em]">
                      {post.platform}
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </div>
                  <div className="opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <p className="text-[10px] font-medium uppercase tracking-[0.25em]">
                      {post.metric}
                    </p>
                    <p className="mt-1 font-serif text-base font-light italic sm:text-lg">
                      {post.title}
                    </p>
                  </div>
                </div>
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
