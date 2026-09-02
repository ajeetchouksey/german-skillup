import { useState } from "react";
import { ClipboardCopy, Eraser } from "lucide-react";
import { Button } from "./ui";

interface WritingPadProps {
  placeholder?: string;
  targetWords?: number;
  label?: string;
}

function countWords(text: string) {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

export function WritingPad({
  placeholder = "Schreiben Sie hier auf Deutsch…",
  targetWords = 30,
  label = "Your answer",
}: WritingPadProps) {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const words = countWords(text);

  const color =
    words === 0
      ? "text-muted"
      : words < Math.floor(targetWords * 0.7)
      ? "text-red-400"
      : words < targetWords
      ? "text-amber-400"
      : words <= targetWords * 1.4
      ? "text-emerald-400"
      : "text-amber-400";

  const copy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="mt-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400">{label}</span>
        <span className={`text-xs font-mono ${color}`}>
          {words} / {targetWords} words
        </span>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        rows={5}
        className="w-full resize-y rounded-lg border border-border bg-bg-alt px-3.5 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-yellow-500/40 transition-colors"
      />

      {/* Word count bar */}
      <div className="h-1 rounded-full bg-border overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${Math.min((words / targetWords) * 100, 100)}%`,
            background:
              words < Math.floor(targetWords * 0.7)
                ? "#c62828"
                : words < targetWords
                ? "#d4a017"
                : "#2fbf71",
          }}
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="xs" icon={Eraser} onClick={() => setText("")} disabled={!text}>
          Clear
        </Button>
        <Button variant="ghost" size="xs" icon={ClipboardCopy} onClick={copy} disabled={!text}>
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  );
}
