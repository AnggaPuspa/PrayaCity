"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

type Phase = "idle" | "covering" | "holding" | "revealing";

const MIN_COVER_MS = 520;
const REVEAL_MS = 640;
const MAX_HOLD_MS = 4200;

function isModifiedClick(event: MouseEvent) {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

function isInternalNavigation(anchor: HTMLAnchorElement) {
  if (anchor.hasAttribute("download")) return false;
  if (anchor.target && anchor.target !== "_self") return false;

  const href = anchor.getAttribute("href");
  if (!href) return false;
  if (
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("javascript:")
  ) {
    return false;
  }

  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) return false;

  const current = new URL(window.location.href);
  if (url.pathname === current.pathname && url.search === current.search) {
    return false;
  }

  // Keep admin CMS snappy — no cinematic curtain there.
  if (url.pathname.includes("/admin")) return false;

  return true;
}

/**
 * Award-style route curtain for marketing pages.
 *
 * SEO-safe: does not replace server HTML. It only paints a fixed overlay
 * during client navigations, then reveals the already-rendered destination.
 */
export function PageTransition() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [visible, setVisible] = useState(false);

  const phaseRef = useRef<Phase>("idle");
  const prevPathRef = useRef(pathname);
  const coverStartedAtRef = useRef(0);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (revealTimerRef.current) {
      clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }
  }, []);

  const setPhaseSafe = useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const finishToReveal = useCallback(() => {
    if (phaseRef.current === "idle" || phaseRef.current === "revealing") return;

    const elapsed = performance.now() - coverStartedAtRef.current;
    const wait = Math.max(0, MIN_COVER_MS - elapsed);

    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (revealTimerRef.current) {
      clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }

    holdTimerRef.current = setTimeout(() => {
      setPhaseSafe("revealing");
      revealTimerRef.current = setTimeout(() => {
        setPhaseSafe("idle");
        setVisible(false);
      }, REVEAL_MS);
    }, wait);
  }, [setPhaseSafe]);

  const beginCover = useCallback(() => {
    if (phaseRef.current !== "idle") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    clearTimers();
    coverStartedAtRef.current = performance.now();
    setVisible(true);
    setPhaseSafe("covering");

    // Never leave the curtain stuck if navigation stalls.
    safetyTimerRef.current = setTimeout(() => {
      if (phaseRef.current !== "idle") {
        finishToReveal();
      }
    }, MAX_HOLD_MS);
  }, [clearTimers, finishToReveal, setPhaseSafe]);

  // After cover animation, enter a short hold until the route commits.
  useEffect(() => {
    if (phase !== "covering") return;

    const timer = setTimeout(() => {
      if (phaseRef.current === "covering") {
        setPhaseSafe("holding");
      }
    }, 480);

    return () => clearTimeout(timer);
  }, [phase, setPhaseSafe]);

  // Route committed → reveal destination.
  useEffect(() => {
    if (pathname === prevPathRef.current) return;
    prevPathRef.current = pathname;

    if (phaseRef.current === "idle") return;
    finishToReveal();
  }, [pathname, finishToReveal]);

  // Intercept internal link clicks early so the curtain leads the fetch.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event)) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (!isInternalNavigation(anchor)) return;

      // Skip admin shell entirely.
      if (pathname.startsWith("/admin")) return;

      beginCover();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [beginCover, pathname]);

  // Back / forward.
  useEffect(() => {
    const onPopState = () => {
      if (pathname.startsWith("/admin")) return;
      beginCover();
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [beginCover, pathname]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "page-transition",
        phase === "covering" && "page-transition--cover",
        phase === "holding" && "page-transition--hold",
        phase === "revealing" && "page-transition--reveal",
      )}
      aria-hidden="true"
      role="presentation"
    >
      <div className="page-transition__panel">
        <div className="page-transition__progress" />
        <div className="page-transition__mark">
          <span className="page-transition__eyebrow">Central Lombok</span>
          <span className="page-transition__title">{siteConfig.name}</span>
        </div>
      </div>
    </div>
  );
}
