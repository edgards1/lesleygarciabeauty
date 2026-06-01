import type { PropsWithChildren } from "react";

interface SectionShellProps {
  id?: string;
  className?: string;
}

export function SectionShell({ id, className, children }: PropsWithChildren<SectionShellProps>) {
  return (
    <section id={id} className={`py-20 sm:py-24 ${className ?? ""}`}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
