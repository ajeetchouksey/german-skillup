import type { ElementType } from 'react';

export const BADGE_VARIANTS = { // eslint-disable-line react-refresh/only-export-components
  gold:    'bg-yellow-500/15 text-yellow-300 border-yellow-500/30',
  red:     'bg-red-500/15 text-red-300 border-red-500/30',
  violet:  'bg-violet-500/15 text-violet-300 border-violet-500/30',
  blue:    'bg-blue-500/15 text-blue-300 border-blue-500/30',
  emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  amber:   'bg-amber-500/15 text-amber-300 border-amber-500/30',
  rose:    'bg-rose-500/15 text-rose-300 border-rose-500/30',
  slate:   'bg-slate-800 text-slate-400 border-slate-700/60',
  green:   'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  yellow:  'bg-yellow-500/15 text-yellow-300 border-yellow-500/30',
} as const;

export type BadgeVariant = keyof typeof BADGE_VARIANTS;

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'xs' | 'sm';
  icon?: ElementType;
  className?: string;
  uppercase?: boolean;
}

export function Badge({
  label,
  variant = 'slate',
  size = 'sm',
  icon: Icon,
  className = '',
  uppercase = false,
}: BadgeProps) {
  const sizeClass = size === 'xs' ? 'px-1.5 py-0.5 text-[9px]' : 'px-2 py-0.5 text-[10px]';

  return (
    <span
      className={[
        'inline-flex items-center gap-1 rounded border font-medium',
        sizeClass,
        BADGE_VARIANTS[variant],
        uppercase ? 'uppercase tracking-wider' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {Icon && <Icon size={size === 'xs' ? 8 : 10} />}
      {label}
    </span>
  );
}

export function NewBadge({ className = '' }: { className?: string }) {
  return <Badge label="NEW" variant="green" size="xs" uppercase className={`font-bold tracking-widest ${className}`} />;
}
