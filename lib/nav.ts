import type { LucideIcon } from "lucide-react";
import { Bot, Boxes, CircuitBoard, Cpu, Layers, PackageSearch, Radio, ShoppingCart, Usb, Users, Wrench } from "lucide-react";
import type { common } from "@/lib/i18n/messages/common";

type T = (typeof common)["en"];
export type NavLink = { label: string; href: string; description?: string; icon?: LucideIcon };
export type NavItem =
  | { key: string; label: string; href: string; icon: LucideIcon; badge?: string }
  | { key: string; label: string; icon: LucideIcon; children: NavLink[]; sections?: string[] };

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
    { key: "tools", label: t.nav.tools, icon: Wrench, sections: ["finder", "serial"], children: [
      { label: t.nav.finder, href: "/finder", description: t.nav.finderDesc, icon: PackageSearch },
      { label: t.nav.shopping, href: "/shopping", description: t.nav.shoppingDesc, icon: ShoppingCart },
      { label: t.nav.serial, href: "/serial", description: t.nav.serialDesc, icon: Usb },
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
    { title: t.nav.tools, links: [
      { label: t.nav.finder, href: "/finder" },
      { label: t.nav.shopping, href: "/shopping" },
      { label: t.nav.serial, href: "/serial" },
    ]},
    { title: t.footer.community, links: [
      { label: t.footer.buildLogs, href: "/community" },
      { label: t.footer.guides, href: "/projects" },
    ]},
  ];
}

/** Which top-level section a pathname belongs to (header underline + tab bar). */
export function sectionOf(pathname: string): string {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/profile")) return "profile";
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/components")) return "components";
  if (pathname.startsWith("/finder") || pathname.startsWith("/shopping")) return "finder";
  if (pathname.startsWith("/serial")) return "serial";
  if (pathname.startsWith("/community")) return "community";
  return "";
}
