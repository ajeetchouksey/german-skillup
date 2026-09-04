import { parseAiFeedbackMarkup } from "@/lib/aiFeedback";

/** Renders AI feedback text, color-coding the [wrong]/[right] German spans
 * the Worker's prompts ask the model to wrap around corrections — everything
 * else renders as plain text, including a reply that used no markup at all. */
export function AiFeedbackText({ text }: { text: string }) {
  return (
    <p className="text-sm text-slate-200 whitespace-pre-wrap">
      {parseAiFeedbackMarkup(text).map((seg, i) => {
        if (seg.type === "wrong") {
          return (
            <span key={i} className="rounded px-1 py-0.5 bg-error/15 text-red-300 font-medium">
              {seg.content}
            </span>
          );
        }
        if (seg.type === "right") {
          return (
            <span key={i} className="rounded px-1 py-0.5 bg-success/15 text-emerald-300 font-medium">
              {seg.content}
            </span>
          );
        }
        return <span key={i}>{seg.content}</span>;
      })}
    </p>
  );
}
