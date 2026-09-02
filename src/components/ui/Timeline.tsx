import { PackageCheck } from 'lucide-react';

export interface TimelineEntry {
  version: string;
  label: string;
  type: 'major' | 'minor' | 'patch';
}

interface TimelineProps {
  entries: TimelineEntry[];
  accentColor?: string;
  className?: string;
  showHeader?: boolean;
}

function TimelineDot({ type }: { type: TimelineEntry['type'] }) {
  const color = type === 'major' ? 'bg-white' : type === 'minor' ? 'bg-slate-400' : 'bg-slate-600';
  return <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1 ${color}`} />;
}

export function Timeline({
  entries,
  accentColor = 'text-yellow-400',
  className = '',
  showHeader = true,
}: TimelineProps) {
  return (
    <div className={className}>
      {showHeader && (
        <div className="flex items-center gap-1.5 mb-2">
          <PackageCheck size={11} className="text-slate-500" />
          <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">
            Major Deliveries
          </span>
        </div>
      )}
      <div className="space-y-1.5">
        {entries.map((entry) => (
          <div key={entry.version} className="flex items-start gap-2">
            <TimelineDot type={entry.type} />
            <span className={`text-[9px] font-mono font-bold shrink-0 ${accentColor}`}>{entry.version}</span>
            <span className="text-[10px] text-slate-400 leading-tight">{entry.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
