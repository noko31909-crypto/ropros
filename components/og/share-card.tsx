/**
 * The 1200×630 picture shown when a ropros link is shared (Telegram, WhatsApp, Instagram stories, search results).
 * Rendered by next/og (Satori): flex layout only, inline styles, no client code, no remote images or fonts.
 */
export const SHARE_SIZE = { width: 1200, height: 630 } as const;

export type ShareChip = { label: string; color?: string };

const INK = "#07090c", FG = "#E9EEF3", MUTED = "#8B98A9", ACCENT = "#FF7A1A", BRAND = "#EFB3A3";

export function ShareCard({ eyebrow, title, subtitle, chips }: { eyebrow: string; title: string; subtitle: string; chips: ShareChip[] }) {
  const clipped = subtitle.length > 150 ? `${subtitle.slice(0, 147).trimEnd()}…` : subtitle;
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 72px", position: "relative",
      backgroundColor: INK, backgroundImage: "radial-gradient(circle at 88% 8%, rgba(255,122,26,0.24), rgba(7,9,12,0) 48%)" }}>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 8, display: "flex", backgroundImage: `linear-gradient(90deg, ${BRAND}, #A5A57A)` }} />
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ fontSize: 44, fontWeight: 700, color: BRAND, letterSpacing: -1 }}>ropros</div>
        <div style={{ width: 2, height: 30, background: "#202834", display: "flex" }} />
        <div style={{ fontSize: 26, color: MUTED }}>{eyebrow}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1000 }}>
        <div style={{ fontSize: title.length > 44 ? 62 : 74, fontWeight: 700, color: FG, lineHeight: 1.06, letterSpacing: -2 }}>{title}</div>
        <div style={{ fontSize: 29, color: MUTED, lineHeight: 1.4 }}>{clipped}</div>
      </div>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        {chips.map((c) => (
          <div key={c.label} style={{ display: "flex", padding: "10px 22px", borderRadius: 9999, border: `2px solid ${c.color ?? "#202834"}`, color: c.color ?? FG, fontSize: 25 }}>{c.label}</div>
        ))}
        <div style={{ display: "flex", marginLeft: "auto", alignItems: "center", color: ACCENT, fontSize: 25 }}>Wiring · Code · Parts</div>
      </div>
    </div>
  );
}

/** Pill colours of the platforms (the same as the cards on the site). */
export const PLATFORM_COLOR = { arduino: "#2EE6C9", esp32: "#FF7A1A", raspberry_pi: "#ff7dbb" } as const;
