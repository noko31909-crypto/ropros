"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { Bookmark, ChevronDown, Menu, Search, X } from "lucide-react";
import { NAV, type NavItem } from "@/lib/nav";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";

function isActive(pathname: string, item: NavItem) {
  if ("href" in item) return pathname.startsWith(item.href);
  return item.children.some((c) => pathname.startsWith(c.href.split("?")[0] ?? c.href));
}

/** Accessible dropdown: opens on click, closes on Escape, outside click or route change. */
function NavDropdown({ item, active }: { item: Extract<NavItem, { children: unknown }>; active: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={clsx("inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors",
          active || open ? "text-fg" : "text-fg-muted hover:text-fg")}
      >
        {item.label}
        <ChevronDown className={clsx("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-3 w-[22rem] -translate-x-1/2 rounded-2xl border border-line bg-ink-900/95 p-2 shadow-2xl backdrop-blur-xl">
          {item.children.map(({ label, href, description, icon: Icon }) => (
            <Link key={href} href={href} className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-ink-800">
              {Icon && (
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-ink-850 text-fg-muted group-hover:border-accent/40 group-hover:text-accent">
                  <Icon className="h-[18px] w-[18px]" aria-hidden />
                </span>
              )}
              <span>
                <span className="block text-sm font-semibold text-fg">{label}</span>
                {description && <span className="mt-0.5 block text-[13px] leading-snug text-fg-muted">{description}</span>}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => setMobileOpen(false), [pathname]);

  // The home page renders its own app-shell header with the auth bridge.
  if (pathname === "/") return null;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink-950/75 backdrop-blur-xl supports-[backdrop-filter]:bg-ink-950/60">
      <Container className="flex h-16 items-center gap-6">
        <Logo />

        <nav aria-label="Main" className="ml-4 hidden items-center gap-1 lg:flex">
          {NAV.map((item) =>
            "href" in item ? (
              <Link key={item.label} href={item.href} aria-current={isActive(pathname, item) ? "page" : undefined}
                className={clsx("relative inline-flex h-9 items-center rounded-lg px-3 text-sm font-medium transition-colors",
                  isActive(pathname, item) ? "text-fg after:absolute after:inset-x-3 after:-bottom-[15px] after:h-0.5 after:rounded-full after:bg-accent" : "text-fg-muted hover:text-fg")}>
                {item.label}
              </Link>
            ) : (
              <NavDropdown key={item.label} item={item} active={isActive(pathname, item)} />
            ),
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button type="button" className="hidden h-9 items-center gap-3 rounded-lg border border-line bg-ink-900 pl-3 pr-2 text-sm text-fg-subtle transition-colors hover:border-ink-700 hover:text-fg-muted md:inline-flex"
            aria-label="Search builds and components">
            <Search className="h-4 w-4" aria-hidden />
            <span className="w-44 text-left">Search builds, parts…</span>
            <kbd className="rounded-md border border-line bg-ink-850 px-1.5 py-0.5 font-mono text-[11px] text-fg-muted">⌘K</kbd>
          </button>
          <Link href="/saved" aria-label="Saved builds" className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-ink-800 hover:text-fg">
            <Bookmark className="h-[18px] w-[18px]" aria-hidden />
          </Link>
          <Link href="/sign-in" className="hidden h-9 items-center rounded-lg bg-accent px-4 text-sm font-semibold text-ink-950 transition-colors hover:bg-accent-hover sm:inline-flex">
            Sign in
          </Link>
          <button type="button" onClick={() => setMobileOpen((v) => !v)} aria-expanded={mobileOpen} aria-controls="mobile-nav" aria-label="Open menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-fg lg:hidden">
            {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div id="mobile-nav" className="border-t border-line bg-ink-950 lg:hidden">
          <Container className="space-y-6 py-6">
            {NAV.map((item) => (
              <div key={item.label}>
                {"href" in item ? (
                  <Link href={item.href} className="flex items-center gap-3 text-base font-semibold text-fg">
                    <item.icon className="h-5 w-5 text-accent" aria-hidden />{item.label}
                  </Link>
                ) : (
                  <>
                    <p className="flex items-center gap-3 text-base font-semibold text-fg"><item.icon className="h-5 w-5 text-accent" aria-hidden />{item.label}</p>
                    <ul className="mt-3 space-y-1 border-l border-line pl-4 ml-2.5">
                      {item.children.map((c) => (
                        <li key={c.href}><Link href={c.href} className="block rounded-lg px-3 py-2 text-sm text-fg-muted hover:bg-ink-800 hover:text-fg">{c.label}</Link></li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
            <Link href="/sign-in" className="flex h-11 items-center justify-center rounded-xl bg-accent text-sm font-semibold text-ink-950">Sign in</Link>
          </Container>
        </div>
      )}
    </header>
  );
}
