"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { Bookmark, Cpu, Layers, Sparkles, Users } from "lucide-react";
import { sectionOf } from "@/lib/nav";
import { common } from "@/lib/i18n/messages/common";
import { useMessages } from "@/components/i18n/locale-provider";
import { useAuth } from "@/components/auth/auth-provider";
import { Avatar } from "@/components/auth/avatar";

/** Bottom navigation on phones and tablets (hidden on lg+). */
export function TabBar() {
  const t = useMessages(common);
  const section = sectionOf(usePathname());
  const { profile, openAuth } = useAuth();
  const tabs = [
    { id: "home", href: "/", label: t.tabs.home, Icon: Cpu },
    { id: "projects", href: "/projects", label: t.tabs.projects, Icon: Layers },
    { id: "ai", href: "/ai/finder", label: t.tabs.finder, Icon: Sparkles },
    { id: "community", href: "/community", label: t.tabs.community, Icon: Users },
  ];
  const item = "relative flex h-full flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors";
  return (
    <nav aria-label={t.nav.main} className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink-950/90 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur-xl lg:hidden">
      <ul className="mx-auto grid h-16 max-w-lg grid-cols-5">
        {tabs.map(({ id, href, label, Icon }) => {
          const on = section === id;
          return (
            <li key={id}>
              <Link href={href} aria-current={on ? "page" : undefined} className={clsx(item, on ? "text-fg" : "text-fg-subtle")}>
                {on && <span className="absolute top-0 h-0.5 w-8 rounded-full bg-accent" />}
                <Icon className={clsx("h-[22px] w-[22px]", on && (id === "ai" ? "text-signal" : "text-accent"))} aria-hidden />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
        <li>
          {profile ? (
            <Link href="/profile" aria-current={section === "profile" ? "page" : undefined} className={clsx(item, section === "profile" ? "text-fg" : "text-fg-subtle")}>
              {section === "profile" && <span className="absolute top-0 h-0.5 w-8 rounded-full bg-accent" />}
              <span className="-my-1 scale-[.72]"><Avatar name={profile.name} /></span><span>{t.tabs.profile}</span>
            </Link>
          ) : (
            <button type="button" onClick={() => openAuth()} className={clsx(item, "w-full text-fg-subtle")}>
              <Bookmark className="h-[22px] w-[22px]" aria-hidden /><span>{t.tabs.signIn}</span>
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
