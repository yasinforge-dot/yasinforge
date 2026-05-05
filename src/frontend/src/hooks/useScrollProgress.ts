import { useEffect } from "react";
import { create } from "zustand";

interface ScrollStore {
  progress: number;
  scrollY: number;
  setProgress: (progress: number) => void;
  setScrollY: (y: number) => void;
}

export const useScrollStore = create<ScrollStore>((set) => ({
  progress: 0,
  scrollY: 0,
  setProgress: (progress) => set({ progress }),
  setScrollY: (scrollY) => set({ scrollY }),
}));

export function useScrollProgress() {
  const { progress, scrollY, setProgress, setScrollY } = useScrollStore();

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const rawScrollY = window.scrollY;
      const total = el.scrollHeight - el.clientHeight;
      const p = total > 0 ? Math.min(rawScrollY / total, 1) : 0;
      setProgress(p);
      setScrollY(rawScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setProgress, setScrollY]);

  return { progress, scrollY };
}
