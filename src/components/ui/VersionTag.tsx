import { Tag } from 'lucide-react';

interface VersionTagProps {
  version: string;
  highlight?: boolean;
  className?: string;
}

export function VersionTag({ version, highlight = false, className = '' }: VersionTagProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold',
        highlight
          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
          : 'bg-slate-800 text-slate-400 border border-slate-700/60',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Tag size={8} />
      {version}
    </span>
  );
}
