import { useScrollProgress } from "@/hooks/useScrollProgress";
import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

interface LayoutProps {
  children: ReactNode;
  /** Hide footer for full-screen pages like admin */
  hideFooter?: boolean;
  /** Hide the scroll-progress bar */
  hideProgress?: boolean;
}

export function Layout({
  children,
  hideFooter = false,
  hideProgress = false,
}: LayoutProps) {
  const { progress } = useScrollProgress();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Scroll progress indicator */}
      {!hideProgress && (
        <div
          className="fixed top-0 left-0 z-[60] h-0.5 bg-gradient-to-r from-primary via-primary to-secondary transition-all duration-75"
          style={{ width: `${progress * 100}%` }}
        />
      )}

      <Navigation />

      <main className="flex-1 pt-16">{children}</main>

      {!hideFooter && <Footer />}
    </div>
  );
}
