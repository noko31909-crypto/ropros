import { Container } from "@/components/ui/container";

/** Shown the moment a guide link is tapped, until the guide page arrives, so the tap always gets a visible response. */
export default function GuideLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <header className="border-b border-line">
        <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="space-y-5">
            <div className="h-4 w-40 animate-pulse rounded bg-ink-800 motion-reduce:animate-none" />
            <div className="h-10 w-4/5 animate-pulse rounded-xl bg-ink-800 motion-reduce:animate-none" />
            <div className="h-5 w-full max-w-xl animate-pulse rounded bg-ink-800 motion-reduce:animate-none" />
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((i) => <div key={i} className="h-8 w-24 animate-pulse rounded-full bg-ink-800 motion-reduce:animate-none" />)}
            </div>
          </div>
          <div className="aspect-[4/3] w-full animate-pulse rounded-[28px] bg-ink-850 motion-reduce:animate-none" />
        </Container>
      </header>
      <Container className="py-10">
        <div className="h-12 w-full animate-pulse rounded-2xl bg-ink-850 motion-reduce:animate-none" />
        <div className="mt-6 h-64 w-full animate-pulse rounded-2xl bg-ink-850 motion-reduce:animate-none" />
      </Container>
    </div>
  );
}
