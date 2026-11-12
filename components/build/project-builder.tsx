"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { clsx } from "clsx";
import { AlertTriangle, ArrowRight, Box, CheckCircle2, CircuitBoard, Code2, ListChecks, Loader2, Package, RotateCcw, ShieldAlert, Sparkles, Wand2 } from "lucide-react";
import { useLocale, useMessages } from "@/components/i18n/locale-provider";
import { useAuth } from "@/components/auth/auth-provider";
import { PlatformPill } from "@/components/cards/project-card";
import { CodeBlock } from "@/components/guide/code-block";
import { AutoDiagram, WIRE_HEX } from "@/components/guide/diagrams/auto-diagram";
import { layoutCircuit, type Layout } from "@/lib/hardware/layout";
import { getComponent } from "@/lib/hardware/components";
import { isComponentId } from "@/lib/hardware/ids";
import type { Issue as CheckIssue } from "@/lib/hardware/check";
import { MAX_IDEA_CHARS, ProjectSchema, SHAPES, type Project, type Shape } from "@/lib/build/schema";
import { autoCad } from "@/lib/build/layout";
import type { Locale } from "@/lib/i18n/config";
import { checkProject } from "@/lib/build/circuit";
import { build } from "@/lib/i18n/messages/build";
import { CadViewer } from "./cad-viewer";

type ErrorKey = keyof (typeof build)["en"]["errors"];
type TabId = "plan" | "cad" | "wiring" | "assembly" | "code";

const STORAGE_KEY = "ropros:last-build";
const lookup = (id: string) => { if (!isComponentId(id)) throw new Error(`Unknown component "${id}"`); return getComponent(id); };

const SHAPE_KEY = "ropros:last-build-shape";

/**
 * The last project is restored from localStorage, which anyone with this browser can edit: validate it again.
 * Its 3D model is rebuilt with the current layout engine, so a project saved before an update never shows a stale model.
 */
function loadSaved(locale: Locale): Project | null {
  try {
    const project = ProjectSchema.safeParse(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null"));
    if (!project.success) return null;
    const saved = localStorage.getItem(SHAPE_KEY);
    const shape: Shape = SHAPES.find((s) => s === saved) ?? "auto";
    return { ...project.data, cad: autoCad(project.data, locale, shape) };
  } catch {
    return null;
  }
}

type Question = { id: string; text: string; options: string[] };
type Answers = Record<string, string>;

async function failure(res: Response): Promise<BuildError> {
  const { error } = (await res.json().catch(() => ({}))) as { error?: string };
  if (res.status === 401) return new BuildError("signIn");
  if (res.status === 503) return new BuildError("unavailable");
  if (error === "daily_limit") return new BuildError("dailyLimit");
  if (error === "busy") return new BuildError("busy");
  if (res.status === 429) return new BuildError("rateLimited");
  if (error === "invalid_output") return new BuildError("invalid");
  return new BuildError("error");
}

async function requestQuestions(idea: string, locale: string, signal: AbortSignal): Promise<Question[]> {
  const res = await fetch("/api/build/questions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ locale, idea }), signal });
  if (!res.ok) throw await failure(res);
  const body = (await res.json()) as { questions?: unknown };
  return Array.isArray(body.questions)
    ? (body.questions as Question[]).filter((q) => typeof q?.id === "string" && typeof q.text === "string" && Array.isArray(q.options)).slice(0, 4)
    : [];
}

async function requestProject(body: { idea: string; locale: string; answers: { question: string; answer: string }[]; shape: Shape }, signal: AbortSignal): Promise<Project> {
  const res = await fetch("/api/build", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal });
  if (!res.ok) throw await failure(res);
  const project = ProjectSchema.safeParse(((await res.json()) as { project?: unknown }).project);
  if (!project.success) throw new BuildError("invalid");
  return project.data;
}
class BuildError extends Error { constructor(public key: ErrorKey) { super(key); } }

type Phase = "idea" | "asking" | "questions" | "generating";

export function ProjectBuilder() {
  const t = useMessages(build);
  const { locale } = useLocale();
  const { openAuth } = useAuth();
  const [idea, setIdea] = useState("");
  const [phase, setPhase] = useState<Phase>("idea");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answers>({});
  const [shape, setShape] = useState<Shape>("auto");
  const [stage, setStage] = useState(0);
  const [error, setError] = useState<ErrorKey | null>(null);
  const [result, setResult] = useState<Project | null>(null);
  const abort = useRef<AbortController | null>(null);
  const busy = phase === "asking" || phase === "generating";

  // eslint-disable-next-line react-hooks/exhaustive-deps -- restore once on mount, in the language of that moment
  useEffect(() => { setResult(loadSaved(locale)); return () => abort.current?.abort(); }, []);
  useEffect(() => {
    if (phase !== "generating") return;
    setStage(0);
    const id = setInterval(() => setStage((s) => Math.min(s + 1, t.stages.length - 1)), 9000);
    return () => clearInterval(id);
  }, [phase, t.stages.length]);

  const run = async <T,>(next: Phase, back: Phase, job: (signal: AbortSignal) => Promise<T>): Promise<T | undefined> => {
    abort.current?.abort();
    const ctrl = new AbortController();
    abort.current = ctrl;
    setPhase(next); setError(null);
    try {
      return await job(ctrl.signal);
    } catch (err) {
      if (ctrl.signal.aborted) return undefined;
      const key = err instanceof BuildError ? err.key : "error";
      setError(key);
      if (key === "signIn") openAuth(t.errors.signIn);
      setPhase(back);
      return undefined;
    }
  };

  /** Step 1 → 2: ask the model which details matter for this idea. */
  const ask = async (e?: FormEvent) => {
    e?.preventDefault();
    if (idea.trim().length < 8 || busy) return;
    const qs = await run("asking", "idea", (signal) => requestQuestions(idea.trim(), locale, signal));
    if (!qs) return;
    setQuestions(qs); setAnswers({}); setShape("auto"); setPhase("questions");
  };

  /** Step 2 → result: generate with the answers (or none, when skipped). */
  const generate = async (withAnswers: boolean) => {
    const list = withAnswers
      ? questions.flatMap((q) => (answers[q.id]?.trim() ? [{ question: q.text.slice(0, 160), answer: answers[q.id]!.trim().slice(0, 200) }] : []))
      : [];
    const r = await run("generating", "questions", (signal) => requestProject({ idea: idea.trim(), locale, answers: list, shape: withAnswers ? shape : "auto" }, signal));
    if (!r) return;
    setResult(r); setPhase("idea");
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(r)); localStorage.setItem(SHAPE_KEY, withAnswers ? shape : "auto"); } catch { /* storage full or blocked: keep it in memory only */ }
  };

  const reset = () => { setResult(null); setError(null); setPhase("idea"); try { localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(SHAPE_KEY); } catch { /* ignore */ } };

  if (result && phase === "idea") return <ProjectView result={result} onNew={reset} />;

  const errorBox = error && <p role="alert" className="mt-4 flex items-start gap-2 rounded-xl border border-accent/40 bg-accent/10 p-3 text-sm text-fg"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />{t.errors[error]}</p>;

  return (
    <div className="mx-auto max-w-3xl">
      {(phase === "idea" || phase === "asking") && (
        <form onSubmit={ask} className="rounded-[28px] border border-line bg-ink-850 p-5 sm:p-7">
          <label htmlFor="build-idea" className="text-sm font-semibold text-fg">{t.ideaLabel}</label>
          <textarea id="build-idea" value={idea} onChange={(e) => setIdea(e.target.value.slice(0, MAX_IDEA_CHARS))} disabled={busy}
            onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) void ask(); }}
            rows={4} maxLength={MAX_IDEA_CHARS} placeholder={t.placeholder}
            className="mt-3 w-full resize-y rounded-2xl border border-line bg-ink-900 p-4 text-base sm:text-[15px] leading-relaxed text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none disabled:opacity-60" />
          <div className="mt-2 flex justify-end font-mono text-[11px] text-fg-subtle">{t.chars(idea.length, MAX_IDEA_CHARS)}</div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-fg-subtle">{t.examplesLabel}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {t.examples.map((ex) => (
              <button key={ex} type="button" disabled={busy} onClick={() => setIdea(ex)}
                className="min-h-10 rounded-xl border border-line bg-ink-900 px-3 py-2 text-left text-xs text-fg-muted transition-colors hover:border-signal/50 hover:text-fg disabled:opacity-50">{ex}</button>
            ))}
          </div>
          <button type="submit" disabled={busy || idea.trim().length < 8}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 text-[15px] font-semibold text-ink-950 transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:bg-accent/35 disabled:text-ink-950/70">
            {busy ? <Loader2 className="h-5 w-5 animate-spin motion-reduce:animate-none" aria-hidden /> : <ArrowRight className="h-5 w-5" aria-hidden />}
            {busy ? t.asking : t.next}
          </button>
          {errorBox}
        </form>
      )}

      {phase === "questions" && (
        <div className="rounded-[28px] border border-line bg-ink-850 p-5 sm:p-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-signal"><Sparkles className="h-3.5 w-3.5" aria-hidden />{t.questions.eyebrow}</p>
              <h2 className="mt-2 text-xl font-semibold text-fg">{t.questions.title}</h2>
              <p className="mt-1 line-clamp-2 text-sm text-fg-subtle">{idea}</p>
            </div>
            <button type="button" onClick={() => setPhase("idea")} className="shrink-0 rounded-lg px-2 py-1 text-xs text-fg-subtle hover:text-fg">{t.questions.edit}</button>
          </div>
          <div className="mt-6 space-y-6">
            <QuestionBlock id="shape" text={t.questions.shape} options={SHAPE_OPTIONS.map((v) => ({ value: v, label: t.questions.shapes[v] }))}
              value={shape} onChange={(v) => setShape(v as Shape)} />
            {questions.map((q) => (
              <QuestionBlock key={q.id} id={q.id} text={q.text} options={q.options.map((o) => ({ value: o, label: o }))} other={t.questions.other}
                value={answers[q.id] ?? ""} onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))} />
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={() => void generate(true)}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-accent px-6 text-[15px] font-semibold text-ink-950 hover:bg-accent-hover">
              <Wand2 className="h-5 w-5" aria-hidden />{t.generate}
            </button>
            <button type="button" onClick={() => void generate(false)}
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-line px-5 text-sm text-fg-muted hover:border-fg-subtle hover:text-fg">{t.questions.skip}</button>
          </div>
          {errorBox}
        </div>
      )}

      {phase === "generating" && (
        <div className="rounded-[28px] border border-signal/30 bg-signal-soft p-6" aria-live="polite">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-signal">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal motion-reduce:animate-none" />{t.generating}
          </p>
          <ol className="mt-4 space-y-2">
            {t.stages.map((s, i) => (
              <li key={s} className={clsx("flex items-center gap-2.5 text-sm", i < stage ? "text-fg-muted" : i === stage ? "text-fg" : "text-fg-subtle")}>
                {i < stage ? <CheckCircle2 className="h-4 w-4 text-signal" aria-hidden /> : i === stage ? <Loader2 className="h-4 w-4 animate-spin text-signal motion-reduce:animate-none" aria-hidden /> : <span className="h-4 w-4 rounded-full border border-line" aria-hidden />}
                {s}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-fg-subtle">{t.slowNote}</p>
        </div>
      )}
    </div>
  );
}

const SHAPE_OPTIONS: Shape[] = ["auto", "enclosure", "rover", "open"];

/** One question: tap an option, or type your own answer. */
function QuestionBlock({ id, text, options, value, onChange, other }: {
  id: string; text: string; options: { value: string; label: string }[]; value: string; onChange: (v: string) => void; other?: string;
}) {
  const custom = other !== undefined && value !== "" && !options.some((o) => o.value === value);
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-fg">{text}</legend>
      <div className="mt-2.5 flex flex-wrap gap-2" role="radiogroup" aria-label={text}>
        {options.map((o) => (
          <button key={o.value} type="button" role="radio" aria-checked={value === o.value} onClick={() => onChange(value === o.value && other !== undefined ? "" : o.value)}
            className={clsx("rounded-xl border px-3 py-2 text-left text-sm transition-colors",
              value === o.value ? "border-accent bg-accent/15 text-fg" : "border-line bg-ink-900 text-fg-muted hover:border-fg-subtle hover:text-fg")}>
            {o.label}
          </button>
        ))}
      </div>
      {other !== undefined && (
        <input id={`q-${id}`} type="text" maxLength={200} placeholder={other} value={custom ? value : ""} onChange={(e) => onChange(e.target.value)}
          className="mt-2 h-10 w-full rounded-xl border border-line bg-ink-900 px-3 text-base sm:text-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none" />
      )}
    </fieldset>
  );
}

function ProjectView({ result: p, onNew }: { result: Project; onNew: () => void }) {
  const t = useMessages(build);
  const issues = useMemo(() => checkProject(p), [p]);
  const [active, setActive] = useState<TabId>("plan");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const errors = issues.filter((i) => i.level === "error");
  const warnings = issues.filter((i) => i.level === "warning");
  const layout = useMemo<Layout | null>(() => {
    try { return layoutCircuit({ board: p.board, instances: p.instances, connections: p.connections }, lookup); } catch { return null; }
  }, [p]);

  const tabs: { id: TabId; label: string; icon: typeof Package; content: ReactNode }[] = [
    { id: "plan", label: t.tabs.plan, icon: ListChecks, content: <PlanTab p={p} /> },
    { id: "cad", label: t.tabs.cad, icon: Box, content: <CadViewer cad={p.cad} title={p.title} /> },
    { id: "wiring", label: t.tabs.wiring, icon: CircuitBoard, content: <WiringTab p={p} layout={layout} errors={errors} warnings={warnings} /> },
    { id: "assembly", label: t.tabs.assembly, icon: Package, content: (
      <ol className="space-y-3">
        {p.assembly.map((s, i) => (
          <li key={i} className="rounded-2xl border border-line bg-ink-900 p-5">
            <p className="font-mono text-[11px] uppercase tracking-wider text-accent">{t.assembly.step(i + 1)}</p>
            <h3 className="mt-1 text-base font-semibold text-fg">{s.title}</h3>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-fg-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    ) },
    { id: "code", label: t.tabs.code, icon: Code2, content: <CodeBlock files={p.code} /> },
  ];
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = tabs.length;
    const next = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(tabs[next]!.id); refs.current[next]?.focus();
  };
  const board = p.platform === "raspberry_pi" ? "pi" : p.platform;

  return (
    <div>
      <div className="rounded-[28px] border border-line bg-ink-850 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <PlatformPill board={board} />
              <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-fg-muted">{t.meta.difficulty[p.difficulty]}</span>
              <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-fg-muted">{t.meta.hours(p.hours)}</span>
              <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-fg-muted">{t.meta.cost(p.costUsd)}</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-signal/30 bg-signal-soft px-2.5 py-0.5 text-xs text-signal"><Sparkles className="h-3 w-3" aria-hidden />AI</span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-fg sm:text-3xl">{p.title}</h2>
            <p className="mt-2 max-w-3xl text-fg-muted">{p.summary}</p>
          </div>
          <button type="button" onClick={onNew} className="inline-flex h-10 items-center gap-2 rounded-xl border border-line px-4 text-sm text-fg-muted hover:border-fg-subtle hover:text-fg">
            <RotateCcw className="h-4 w-4" aria-hidden />{t.newProject}
          </button>
        </div>
        <p className="mt-5 flex items-start gap-2 rounded-xl border border-line bg-ink-900 p-3 text-xs leading-relaxed text-fg-subtle">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />{t.disclaimer}
        </p>
      </div>

      <div role="tablist" aria-label={p.title} className="mt-6 flex gap-1 overflow-x-auto rounded-2xl border border-line bg-ink-900 p-1 [scrollbar-width:none]">
        {tabs.map((tab, i) => (
          <button key={tab.id} ref={(el) => { refs.current[i] = el; }} type="button" role="tab" id={`build-tab-${tab.id}`} aria-controls={`build-panel-${tab.id}`}
            aria-selected={active === tab.id} tabIndex={active === tab.id ? 0 : -1} onClick={() => setActive(tab.id)} onKeyDown={(e) => onKey(e, i)}
            className={clsx("inline-flex h-10 shrink-0 items-center gap-2 rounded-xl px-4 text-sm transition-colors",
              active === tab.id ? "bg-ink-800 font-semibold text-fg" : "text-fg-subtle hover:text-fg")}>
            <tab.icon className={clsx("h-4 w-4", active === tab.id && "text-accent")} aria-hidden />{tab.label}
            {tab.id === "wiring" && errors.length > 0 && <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div key={tab.id} role="tabpanel" id={`build-panel-${tab.id}`} aria-labelledby={`build-tab-${tab.id}`} hidden={active !== tab.id} className="mt-6">
          {active === tab.id && tab.content}
        </div>
      ))}
      <p className="mt-8 text-center text-xs text-fg-subtle">{t.saved}</p>
    </div>
  );
}

function PlanTab({ p }: { p: Project }) {
  const t = useMessages(build).plan;
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <section>
        <h3 className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">{t.phases}</h3>
        <ol className="mt-3 space-y-3">
          {p.plan.map((ph, i) => (
            <li key={i} className="rounded-2xl border border-line bg-ink-900 p-5">
              <p className="flex items-center gap-2 font-semibold text-fg"><span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-accent/15 font-mono text-xs text-accent">{i + 1}</span>{ph.phase}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-fg-muted">
                {ph.tasks.map((task, j) => <li key={j} className="flex gap-2"><span className="text-fg-subtle" aria-hidden>·</span>{task}</li>)}
              </ul>
            </li>
          ))}
        </ol>
        {p.safety.length > 0 && (
          <div className="mt-4 rounded-2xl border border-accent/30 bg-accent/5 p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-fg"><ShieldAlert className="h-4 w-4 text-accent" aria-hidden />{t.safety}</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-fg-muted">{p.safety.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
        )}
      </section>
      <section>
        <h3 className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">{t.parts}</h3>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink-900 font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
              <tr><th className="px-4 py-2.5 font-normal">{t.part}</th><th className="px-4 py-2.5 font-normal">{t.spec}</th><th className="px-4 py-2.5 text-right font-normal">{t.qty}</th></tr>
            </thead>
            <tbody className="divide-y divide-line">
              {p.parts.map((part, i) => (
                <tr key={i}>
                  <td className="px-4 py-2.5 text-fg">{part.name}</td>
                  <td className="px-4 py-2.5 text-fg-muted">{part.spec}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-fg-muted">{part.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function WiringTab({ p, layout, errors, warnings }: { p: Project; layout: Layout | null; errors: CheckIssue[]; warnings: CheckIssue[] }) {
  const t = useMessages(build).wiring;
  return (
    <div className="space-y-5">
      <div className={clsx("rounded-2xl border p-4 text-sm", errors.length ? "border-accent/40 bg-accent/10" : "border-signal/30 bg-signal-soft")}>
        <p className="flex items-center gap-2 font-semibold text-fg">
          {errors.length ? <AlertTriangle className="h-4 w-4 text-accent" aria-hidden /> : <CheckCircle2 className="h-4 w-4 text-signal" aria-hidden />}
          {errors.length ? t.checkErrors(errors.length) : t.checkOk}
          {warnings.length > 0 && <span className="font-normal text-fg-subtle">· {t.checkWarnings(warnings.length)}</span>}
        </p>
        {(errors.length > 0 || warnings.length > 0) && (
          <>
            <ul className="mt-3 space-y-1.5 text-fg-muted">
              {[...errors, ...warnings].slice(0, 12).map((i, k) => (
                <li key={k} className="flex gap-2"><span className={clsx("mt-0.5 shrink-0 font-mono text-[11px] uppercase", i.level === "error" ? "text-accent" : "text-fg-subtle")}>{i.level}</span><span>{i.message}</span></li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-fg-subtle">{t.checkLanguage}</p>
          </>
        )}
      </div>
      {layout ? (
        <div className="overflow-x-auto rounded-2xl border border-line bg-white p-3">
          <AutoDiagram layout={layout} title={t.diagramLabel} captions={t.captions} className="block h-auto max-h-[620px] w-full min-w-[720px]" />
        </div>
      ) : <p className="text-sm text-fg-subtle">{t.noDiagram}</p>}
      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-900 font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
            <tr><th className="px-4 py-2.5 font-normal">{t.from}</th><th className="px-4 py-2.5 font-normal">{t.to}</th><th className="px-4 py-2.5 font-normal">{t.note}</th></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {p.connections.map((c, i) => (
              <tr key={i}>
                <td className="px-4 py-2.5 font-mono text-xs text-fg"><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle" style={{ background: WIRE_HEX[c.color] }} aria-hidden />{c.from}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-fg">{c.to}</td>
                <td className="px-4 py-2.5 text-fg-muted">{c.note ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
