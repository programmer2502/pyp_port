"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "action">("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer fine devices and when not prefers-reduced-motion
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) {
      return;
    }

    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor") || "";
        setCursorText(text);
        setCursorVariant("action");
        return;
      }

      const isClickable = target.closest("a, button, [role='button'], input, textarea, select");
      if (isClickable) {
        setCursorText("");
        setCursorVariant("hover");
        return;
      }

      setCursorText("");
      setCursorVariant("default");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    >
      {cursorVariant === "action" ? (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 350 }}
          className="bg-amber-400 text-black px-3.5 py-1.5 rounded-full shadow-lg shadow-amber-500/25 flex items-center justify-center font-mono text-[11px] font-bold tracking-widest uppercase pointer-events-none whitespace-nowrap"
        >
          {cursorText}
        </motion.div>
      ) : cursorVariant === "hover" ? (
        <motion.div
          animate={{ scale: 2.2, opacity: 0.5 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="w-4 h-4 rounded-full bg-amber-400 pointer-events-none blur-[1px]"
        />
      ) : (
        <div className="w-2.5 h-2.5 rounded-full bg-white/70 pointer-events-none shadow-sm" />
      )}
    </motion.div>
  );
}
