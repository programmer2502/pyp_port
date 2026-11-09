import type { Category } from "@/types/database";

interface MarqueeProps {
  categories: Category[];
}

export function Marquee({ categories }: MarqueeProps) {
  const items = categories && categories.length > 0 
    ? categories 
    : [
        { id: "1", name: "WEDDINGS" },
        { id: "2", name: "EVENTS" },
        { id: "3", name: "PORTRAITS" },
        { id: "4", name: "COMMERCIAL" },
        { id: "5", name: "FILMS" },
        { id: "6", name: "DRONE" },
      ];

  // Repeat for seamless continuous scrolling
  const stream = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-[#111215] border-y border-white/[0.08] py-4 sm:py-5 overflow-hidden select-none relative z-10 shadow-inner">
      <div className="animate-marquee flex items-center gap-8 sm:gap-12 whitespace-nowrap">
        {stream.map((cat, idx) => (
          <div key={`${cat.id}-${idx}`} className="flex items-center gap-8 sm:gap-12">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.28em] text-zinc-300 hover:text-amber-400 transition-colors uppercase">
              {cat.name}
            </span>
            <span className="text-amber-400/70 text-xs select-none">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
