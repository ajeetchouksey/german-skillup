import { useEffect, useId, useState } from "react";
import type { GrammarDiagram as GrammarDiagramData } from "@/types";
import { GlassCard } from "./ui";

interface GrammarDiagramProps {
  data: GrammarDiagramData;
}

// mermaid is lazy-loaded (dynamic import) so it never inlines into the main
// bundle — only fetched when a lesson with a grammarDiagram actually renders.
export function GrammarDiagram({ data }: GrammarDiagramProps) {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setSvg(null);
    setError(null);

    import("mermaid").then(async ({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          primaryColor: "#5b4bd6",
          primaryTextColor: "#f1f5f9",
          primaryBorderColor: "#a99bff",
          lineColor: "#a99bff",
          background: "#111c2e",
          mainBkg: "#111c2e",
          textColor: "#f1f5f9",
        },
      });
      try {
        const { svg: rendered } = await mermaid.render(`grammar-diagram-${id}`, data.mermaid);
        if (!cancelled) setSvg(rendered);
      } catch {
        if (!cancelled) setError("Diagram could not be rendered.");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [id, data.mermaid]);

  return (
    <GlassCard className="p-4" rounded="lg">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">{data.caption}</p>
      {error ? (
        <p className="text-sm text-error">{error}</p>
      ) : svg ? (
        <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <div className="h-24 animate-pulse rounded-md bg-bg-alt" />
      )}
    </GlassCard>
  );
}
