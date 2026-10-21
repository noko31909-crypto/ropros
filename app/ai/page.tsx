import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessagesSquare, Sparkles } from "lucide-react";
import { Container, PageHeader } from "@/components/ui/container";

export const metadata: Metadata = { title: "AI Tools" };

export default function AiPage() {
  const tools = [
    { href: "/ai/finder", title: "Project Finder", body: "Match your parts to buildable projects.", icon: Sparkles },
    { href: "/ai/assistant", title: "Build Assistant", body: "Wiring, code and debugging help in context.", icon: MessagesSquare },
  ];
  return (
    <>
      <PageHeader eyebrowIcon={<Sparkles className="h-5 w-5" aria-hidden />} title="AI Tools" description="Server-side AI that works from the real catalog, so it can’t invent a pin map." />
      <Container className="grid gap-6 py-12 md:grid-cols-2">
        {tools.map(({ href, title, body, icon: Icon }) => (
          <Link key={href} href={href} className="group rounded-3xl border border-line bg-ink-850 p-8 hover:border-signal/40">
            <Icon className="h-6 w-6 text-signal" aria-hidden />
            <h2 className="mt-5 text-2xl font-semibold text-fg">{title}</h2>
            <p className="mt-2 text-fg-muted">{body}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-signal">Open<ArrowRight className="h-4 w-4" aria-hidden /></span>
          </Link>
        ))}
      </Container>
    </>
  );
}
