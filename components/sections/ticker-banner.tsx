export function TickerBanner() {
  const items = [
    "Agenda tu fecha de novia 2026",
    "Disponible para UGC Creator",
    "Maquillaje Profesional en Guayaquil",
  ];

  return (
    <div className="relative z-10 border-b border-ink-black/10 bg-bone-white overflow-hidden">
      <div className="flex whitespace-nowrap py-2 animate-ticker">
        {[0, 1, 2].map((group) => (
          <div
            key={group}
            className="flex items-center gap-6 pr-6 shrink-0 font-label text-[10px] uppercase tracking-[0.25em] text-graphite"
          >
            {items.map((text) => (
              <span key={`${group}-${text}`} className="flex items-center gap-6">
                <span>{text}</span>
                <span className="text-ash">&middot;</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
