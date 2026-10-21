import type { Part } from "@/lib/guides";

export function PartsTable({ parts }: { parts: Part[] }) {
  const required = parts.filter((p) => !p.optional);
  const optional = parts.filter((p) => p.optional);
  const Rows = ({ list }: { list: Part[] }) => (
    <>
      {list.map((p) => (
        <tr key={p.name} className="border-t border-line transition-colors hover:bg-ink-800/60">
          <td className="py-3.5 pl-5 pr-3 font-medium text-fg">
            {p.name}
            {p.optional && <span className="ml-2 rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fg-subtle">optional</span>}
          </td>
          <td className="px-3 py-3.5 text-right font-mono tabular-nums text-accent">×{p.qty}</td>
          <td className="px-3 py-3.5 font-mono text-xs text-fg-muted">{p.spec}</td>
          <td className="py-3.5 pl-3 pr-5 text-fg-muted">{p.role}</td>
        </tr>
      ))}
    </>
  );
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-ink-900">
      <table className="w-full min-w-[640px] text-left text-sm">
        <caption className="sr-only">Parts list</caption>
        <thead className="bg-ink-850 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-subtle">
          <tr>
            <th scope="col" className="py-3 pl-5 pr-3 font-medium">Part</th>
            <th scope="col" className="px-3 py-3 text-right font-medium">Qty</th>
            <th scope="col" className="px-3 py-3 font-medium">Spec</th>
            <th scope="col" className="py-3 pl-3 pr-5 font-medium">Role</th>
          </tr>
        </thead>
        <tbody><Rows list={required} /><Rows list={optional} /></tbody>
      </table>
    </div>
  );
}
