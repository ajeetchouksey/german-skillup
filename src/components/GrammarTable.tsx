import type { GrammarTable as GrammarTableData } from "@/types";
import { GlassCard } from "./ui";

interface GrammarTableProps {
  data: GrammarTableData;
}

export function GrammarTable({ data }: GrammarTableProps) {
  return (
    <GlassCard className="overflow-x-auto p-4" rounded="lg">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">{data.caption}</p>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {data.headers.map((h) => (
              <th key={h} className="border-b border-border px-3 py-2 text-left font-semibold text-lilac">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr key={i} className="border-b border-border/60 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 text-slate-200">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </GlassCard>
  );
}
