import { Volume2, VolumeX } from "lucide-react";
import { useSpeech } from "@/lib/useSpeech";

interface SpeakButtonProps {
  text: string;
  size?: "xs" | "sm";
  className?: string;
}

export function SpeakButton({ text, size = "xs", className = "" }: SpeakButtonProps) {
  const { speak, stop, speaking } = useSpeech();

  const iconSize = size === "xs" ? 12 : 14;
  const btnSize  = size === "xs" ? "w-6 h-6" : "w-7 h-7";

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    speaking ? stop() : speak(text);
  };

  return (
    <button
      onClick={handleClick}
      title={speaking ? "Stop" : `Listen: "${text}"`}
      aria-label={speaking ? "Stop audio" : `Speak in German: ${text}`}
      className={`inline-flex items-center justify-center rounded-full border transition-all shrink-0 ${btnSize} ${
        speaking
          ? "border-violet-400/60 bg-violet-400/10 text-violet-300 animate-pulse"
          : "border-slate-700/50 bg-bg-alt text-slate-500 hover:border-violet-400/40 hover:text-violet-300 hover:bg-violet-400/8"
      } ${className}`}
    >
      {speaking ? <VolumeX size={iconSize} /> : <Volume2 size={iconSize} />}
    </button>
  );
}
