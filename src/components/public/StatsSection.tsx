"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { StatItem } from "@/types/database";

interface StatsSectionProps {
  stats: StatItem[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="w-full py-20 sm:py-28 lg:py-32 px-5 sm:px-8 lg:px-12 bg-[#09090B] border-b border-white/[0.08] relative">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <StatCard key={stat.id} stat={stat} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = stat.value;
    const duration = 1800; // ms
    const incrementTime = 25;
    const step = Math.ceil(end / (duration / incrementTime));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:from-white/[0.07] hover:to-white/[0.02] border border-white/[0.08] hover:border-amber-400/40 rounded-2xl p-7 sm:p-9 transition-all duration-300 group shadow-lg flex flex-col justify-between"
    >
      <div
        className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.03em] text-white group-hover:text-amber-300 transition-colors flex items-baseline"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {stat.prefix}
        <span>{count}</span>
        {stat.suffix && (
          <span className="text-amber-400 ml-1 text-4xl sm:text-5xl font-bold">
            {stat.suffix}
          </span>
        )}
      </div>
      <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
        <p className="font-mono text-xs sm:text-[13px] text-zinc-400 uppercase tracking-[0.16em] font-medium">
          {stat.label}
        </p>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
      </div>
    </motion.div>
  );
}
