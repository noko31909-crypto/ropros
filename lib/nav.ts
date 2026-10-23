import type { LucideIcon } from "lucide-react";
import { Bot, Boxes, CircuitBoard, Cpu, Layers, MessagesSquare, Radio, Sparkles, Users } from "lucide-react";
import type { common } from "@/lib/i18n/messages/common";

type T = (typeof common)["en"];
export type NavLink = { label: string; href: string; description?: string; icon?: LucideIcon };
export type NavItem =
  | { key: string; label: string; href: string; icon: LucideIcon; badge?: string }
  | { key: string; label: string; icon: LucideIcon; children: NavLink[] };

/** Single source of truth for header, mobile sheet and footer, in the current language. */
export function buildNav(t: T): NavItem[] {
  return [
    { key: "projects", label: t.nav.hub, icon: CircuitBoard, children: [
      { label: t.nav.allBuilds, href: "/projects", description: t.nav.allBuildsDesc, icon: Layers },
      { label: t.nav.robotics, href: "/projects?category=robotics", description: t.nav.roboticsDesc, icon: Bot },
      { label: "Arduino", href: "/projects?board=arduino", description: t.nav.arduinoDesc, icon: Cpu },
      { label: "ESP32", href: "/projects?board=esp32", description: t.nav.esp32Desc, icon: Radio },
    ]},
    { key: "components", label: t.nav.components, href: "/components", icon: Boxes },
    { key: "ai", label: t.nav.ai, icon: Sparkles, children: [
      { label: t.nav.finder, href: "/ai/finder", description: t.nav.finderDesc, icon: Sparkles },
      { label: t.nav.assistant, href: "/ai/assistant", description: t.nav.assistantDesc, icon: MessagesSquare },
    ]},
    { key: "community", label: t.nav.community, href: "/community", icon: Users, badge: t.nav.new },
  ];
}

export function buildFooter(t: T): { title: string; links: NavLink[] }[] {
  return [
    { title: t.footer.build, links: [
      { label: t.nav.hub, href: "/projects" },
      { label: t.nav.robotics, href: "/projects?category=robotics" },
      { label: t.nav.components, href: "/components" },
    ]},
    { title: t.footer.aiTools, links: [
      { label: t.nav.finder, href: "/ai/finder" },
      { label: t.nav.assistant, href: "/ai/assistant" },
    ]},
    { title: t.footer.community, links: [
      { label: t.footer.buildLogs, href: "/community" },
      { label: t.footer.guides, href: "/projects/obstacle-avoiding-robot" },
    ]},
  ];
}

/** Which top-level section a pathname belongs to (header underline + tab bar). */
export function sectionOf(pathname: string): string {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/profile")) return "profile";
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/components")) return "components";
  if (pathname.startsWith("/ai")) return "ai";
  if (pathname.startsWith("/community")) return "community";
  return "";
}
