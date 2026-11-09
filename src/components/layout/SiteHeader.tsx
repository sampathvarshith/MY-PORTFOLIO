"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navItems } from "@/content/site";
import { VTLogo } from "@/components/brand/VTMonogram";
import { QuoteLink } from "@/components/ui/QuoteLink";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a")?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      // Keep focus inside the menu (toggle + panel links) while it's open.
      const focusables = [toggleRef.current, ...panel.querySelectorAll<HTMLElement>("a")].filter(Boolean) as HTMLElement[];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <a
        href="#main"
        className="sr-only rounded-full bg-violet px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70]"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-3 py-2 pl-4 transition-[background-color,box-shadow,border-color] duration-500 sm:pl-5 ${
          scrolled || open
            ? "border border-white/10 bg-ink/80 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "border border-transparent"
        }`}
      >
        <Link href="/" aria-label="Varshith Triparna — home" className="rounded-full" onClick={() => setOpen(false)}>
          <VTLogo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-chrome/85 transition-colors hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <QuoteLink variant="primary" className="!min-h-10 !px-5">
              Start a Project <ArrowUpRight className="h-4 w-4" aria-hidden />
            </QuoteLink>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="mx-auto mt-2 max-w-7xl rounded-3xl border border-white/10 bg-ink/95 p-3 backdrop-blur-xl lg:hidden"
      >
        <ul className="grid gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center rounded-2xl px-4 font-display text-sm tracking-[0.18em] text-white hover:bg-violet/10"
              >
                {item.label.toUpperCase()}
              </Link>
            </li>
          ))}
          <li className="mt-2">
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-deep to-violet font-semibold text-white"
            >
              Start a Project <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
