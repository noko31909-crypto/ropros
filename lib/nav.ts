import type { LucideIcon } from "lucide-react";
import { Bot, Boxes, CircuitBoard, Cpu, Radio, Sparkles, Users, Layers, BookOpen, MessagesSquare } from "lucide-react";

export type NavLink = { label: string; href: string; description?: string; icon?: LucideIcon };
export type NavItem =
  | { label: string; href: string; icon: LucideIcon }
  | { label: string; icon: LucideIcon; children: NavLink[] };

/** Single source of truth for header, mobile sheet and footer. */
export const NAV: NavItem[] = [
  {
    label: "Project Hub",
    icon: CircuitBoard,
    children: [
      { label: "All builds", href: "/projects", description: "166 Arduino, ESP32 and Raspberry Pi builds", icon: Layers },
      { label: "Robotics guides", href: "/projects?category=robotics", description: "40 full guides: rovers, arms, walkers", icon: Bot },
      { label: "Arduino", href: "/projects?board=arduino", description: "Uno, Nano and Mega", icon: Cpu },
      { label: "ESP32", href: "/projects?board=esp32", description: "Wi-Fi, Bluetooth and camera builds", icon: Radio },
    ],
  },
  { label: "Components", href: "/components", icon: Boxes },
  {
    label: "AI Tools",
    icon: Sparkles,
    children: [
      { label: "Project Finder", href: "/ai/finder", description: "Tell it your parts, get buildable projects", icon: Sparkles },
      { label: "Build Assistant", href: "/ai/assistant", description: "Ask about wiring, code and debugging", icon: MessagesSquare },
    ],
  },
  { label: "Community", href: "/community", icon: Users },
];

export const FOOTER_LINKS: { title: string; links: NavLink[] }[] = [
  { title: "Build", links: [
    { label: "Project Hub", href: "/projects" },
    { label: "Robotics guides", href: "/projects?category=robotics" },
    { label: "Components", href: "/components" },
  ]},
  { title: "AI Tools", links: [
    { label: "Project Finder", href: "/ai/finder" },
    { label: "Build Assistant", href: "/ai/assistant" },
  ]},
  { title: "Community", links: [
    { label: "Build logs", href: "/community" },
    { label: "Guides", href: "/projects", icon: BookOpen },
  ]},
];
