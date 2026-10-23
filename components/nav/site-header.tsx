"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { Bookmark, ChevronDown, Menu, Search, X } from "lucide-react";
import { buildNav, sectionOf, type NavItem } from "@/lib/nav";
import { common } from "@/lib/i18n/messages/common";
import { useMessages } from "@/components/i18n/locale-provider";
import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { Avatar } from "@/components/auth/avatar";
import { levelBand, useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/components/ui/toast";

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
      <button type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)}
        className={clsx("relative inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors",
          active || open ? "text-fg" : "text-fg-muted hover:text-fg",
          active && "after:absolute after:inset-x-3 after:-bottom-[15px] after:h-0.5 after:rounded-full after:bg-accent")}>
        {item.label}
        <ChevronDown className={clsx("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-3 w-[22rem] -translate-x-1/2 animate-fade-up rounded-2xl border border-line bg-ink-900/95 p-2 shadow-2xl backdrop-blur-xl">
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

function AuthChip() {
  const t = useMessages(common);
  const { profile, ready, openAuth } = useAuth();
  if (!ready) return <span className="h-9 w-20 animate-pulse rounded-lg bg-ink-850" aria-hidden />;
  if (!profile) {
    return (
      <button type="button" onClick={() => openAuth()} className="hidden h-9 items-center rounded-lg bg-accent px-4 text-sm font-semibold text-ink-950 transition-colors hover:bg-accent-hover sm:inline-flex">
        {t.auth.signIn}
      </button>
    );
  }
  const band = levelBand(profile);
  return (
    <Link href="/profile" className="flex items-center gap-3 rounded-xl px-1.5 py-1 transition-colors hover:bg-ink-850" title={`@${profile.name}`}>
      <span className="hidden text-right xl:block">
        <span className="block text-xs font-semibold text-fg">{t.auth.level} {profile.level} • {t.levels[band.idx]}</span>
        <span className="mt-1 flex items-center gap-2">
          <span className="h-1.5 w-24 overflow-hidden rounded-full bg-ink-800">
            <span className="block h-full rounded-full bg-gradient-to-r from-signal to-accent transition-all duration-700" style={{ width: `${band.pct}%` }} />
          </span>
          <span className="font-mono text-[10px] text-fg-subtle">{profile.xp}{band.next !== undefined ? `/${band.next}` : ""} XP</span>
        </span>
      </span>
      <Avatar name={profile.name} level={profile.level} />
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const t = useMessages(common);
  const nav = buildNav(t);
  const section = sectionOf(pathname);
  const { profile, openAuth, signOut } = useAuth();
  const toast = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink-950/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center gap-6">
        <Logo />
        <nav aria-label={t.nav.main} className="ml-4 hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            "href" in item ? (
              <Link key={item.key} href={item.href} aria-current={section === item.key ? "page" : undefined}
                className={clsx("relative inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors",
                  section === item.key ? "text-fg after:absolute after:inset-x-3 after:-bottom-[15px] after:h-0.5 after:rounded-full after:bg-accent" : "text-fg-muted hover:text-fg")}>
                {item.label}
                {item.badge && <span className="rounded-full bg-signal/15 px-1.5 py-px font-mono text-[9px] font-semibold uppercase text-signal">{item.badge}</span>}
              </Link>
            ) : (
              <NavDropdown key={item.key} item={item} active={section === item.key} />
            ),
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link href="/projects" className="hidden h-9 items-center gap-3 rounded-lg border border-line bg-ink-900 pl-3 pr-2 text-sm text-fg-subtle transition-colors hover:border-ink-700 hover:text-fg-muted 2xl:inline-flex" aria-label={t.nav.search}>
            <Search className="h-4 w-4" aria-hidden />
            <span className="w-40 text-left">{t.nav.search}</span>
          </Link>
          <LocaleSwitcher className="hidden sm:inline-flex" />
          <button type="button" aria-label={t.nav.saved} onClick={() => (profile ? toast(t.nav.savedToast) : openAuth())}
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-ink-800 hover:text-fg sm:inline-flex">
            <Bookmark className="h-[18px] w-[18px]" aria-hidden />
          </button>
          <AuthChip />
          <button type="button" onClick={() => setMobileOpen((v) => !v)} aria-expanded={mobileOpen} aria-controls="mobile-nav" aria-label={mobileOpen ? t.nav.close : t.nav.menu}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-fg lg:hidden">
            {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div id="mobile-nav" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-ink-950 lg:hidden">
          <Container className="space-y-6 py-6">
            <LocaleSwitcher />
            {nav.map((item) => (
              <div key={item.key}>
                {"href" in item ? (
                  <Link href={item.href} className="flex items-center gap-3 text-base font-semibold text-fg">
                    <item.icon className="h-5 w-5 text-accent" aria-hidden />{item.label}
                  </Link>
                ) : (
                  <>
                    <p className="flex items-center gap-3 text-base font-semibold text-fg"><item.icon className="h-5 w-5 text-accent" aria-hidden />{item.label}</p>
                    <ul className="ml-2.5 mt-3 space-y-1 border-l border-line pl-4">
                      {item.children.map((c) => (
                        <li key={c.href}><Link href={c.href} className="block rounded-lg px-3 py-2 text-sm text-fg-muted hover:bg-ink-800 hover:text-fg">{c.label}</Link></li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
            {profile ? (
              <div className="flex items-center gap-3 rounded-xl border border-line p-3">
                <Link href="/profile" className="flex flex-1 items-center gap-3">
                  <Avatar name={profile.name} level={profile.level} />
                  <span className="text-sm font-semibold text-fg">@{profile.name}</span>
                </Link>
                <button type="button" onClick={() => void signOut()} className="text-sm text-fg-muted hover:text-fg">{t.auth.signOut}</button>
              </div>
            ) : (
              <button type="button" onClick={() => openAuth()} className="flex h-11 w-full items-center justify-center rounded-xl bg-accent text-sm font-semibold text-ink-950">{t.auth.signIn}</button>
            )}
          </Container>
        </div>
      )}
    </header>
  );
}
