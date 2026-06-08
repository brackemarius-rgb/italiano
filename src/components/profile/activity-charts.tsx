import type { HeatCell } from "@/lib/data/profile";

export function WeeklyChart({
  data,
}: {
  data: { label: string; value: number }[];
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="rounded-2xl border border-line bg-card px-5 py-5">
      <h2 className="font-serif text-lg text-ink">Diese Woche</h2>
      <div className="mt-4 flex items-end justify-between gap-2" style={{ height: 96 }}>
        {data.map((d, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full flex-1 items-end">
              <div
                className="w-full rounded-md bg-good/80"
                style={{ height: `${Math.max((d.value / max) * 100, d.value > 0 ? 8 : 2)}%` }}
                title={`${d.value} Karten`}
              />
            </div>
            <span className="text-[11px] text-ink-faint">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Heatmap({
  weeks,
  max,
}: {
  weeks: HeatCell[][];
  max: number;
}) {
  function shade(count: number): { backgroundColor: string } {
    if (count <= 0) return { backgroundColor: "var(--line)" };
    const t = max > 0 ? count / max : 0;
    const opacity = 0.3 + 0.7 * t; // 0.3 … 1.0
    return { backgroundColor: `color-mix(in srgb, var(--good) ${Math.round(opacity * 100)}%, transparent)` };
  }

  return (
    <div className="rounded-2xl border border-line bg-card px-5 py-5">
      <h2 className="font-serif text-lg text-ink">Aktivität · 12 Wochen</h2>
      <div className="mt-4 flex gap-1 overflow-x-auto">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((cell, di) => (
              <div
                key={di}
                className="size-3.5 rounded-[3px]"
                style={cell ? shade(cell.count) : { backgroundColor: "transparent" }}
                title={cell ? `${cell.date}: ${cell.count} Karten` : ""}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-end gap-1.5 text-[11px] text-ink-faint">
        <span>weniger</span>
        <span className="size-3 rounded-[3px]" style={{ backgroundColor: "var(--line)" }} />
        <span className="size-3 rounded-[3px]" style={{ backgroundColor: "color-mix(in srgb, var(--good) 45%, transparent)" }} />
        <span className="size-3 rounded-[3px]" style={{ backgroundColor: "color-mix(in srgb, var(--good) 75%, transparent)" }} />
        <span className="size-3 rounded-[3px]" style={{ backgroundColor: "var(--good)" }} />
        <span>mehr</span>
      </div>
    </div>
  );
}
