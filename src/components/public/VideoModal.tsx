"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
}

export function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isYouTube = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");
  const isVimeo = videoUrl.includes("vimeo.com");

  let embedUrl = videoUrl;
  if (isYouTube) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = videoUrl.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : "";
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  } else if (isVimeo) {
    const vimeoId = videoUrl.split("/").pop();
    embedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-amber-400 hover:text-black transition-colors duration-200"
          aria-label="Close video modal"
        >
          <X size={22} />
        </button>

        <div
          className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {isYouTube || isVimeo ? (
            <iframe
              src={embedUrl}
              title={title || "Video Player"}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

