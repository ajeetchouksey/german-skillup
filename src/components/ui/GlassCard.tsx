import React from 'react';

// ─── Accent token map (gold/red = German product palette; violet/blue = brand) ──
export const ACCENT = { // eslint-disable-line react-refresh/only-export-components
  gold:    'linear-gradient(90deg,#7c3aed,#a78bfa)',
  red:     'linear-gradient(90deg,#9f1239,#c62828)',
  violet:  'linear-gradient(90deg,#7c3aed,#a78bfa)',
  blue:    'linear-gradient(90deg,#1d4ed8,#60a5fa)',
  emerald: 'linear-gradient(90deg,#065f46,#34d399)',
  amber:   'linear-gradient(90deg,#92400e,#fbbf24)',
  rose:    'linear-gradient(90deg,#9f1239,#fb7185)',
  slate:   'linear-gradient(90deg,#334155,#94a3b8)',
} as const;

export type AccentKey = keyof typeof ACCENT;

interface GlassCardProps {
  children: React.ReactNode;
  accent?: AccentKey | string;
  className?: string;
  rounded?: 'lg' | 'xl' | '2xl';
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: React.CSSProperties;
  border?: string;
  shadow?: string;
}

export function GlassCard({
  children,
  accent,
  className = '',
  rounded = 'xl',
  onClick,
  onMouseEnter,
  onMouseLeave,
  style,
  border = 'border-slate-700/40',
  shadow,
}: GlassCardProps) {
  const accentValue = accent ? (ACCENT[accent as AccentKey] ?? accent) : undefined;

  const mergedStyle: React.CSSProperties = {
    ...(accentValue ? ({ '--accent-color': accentValue } as React.CSSProperties) : {}),
    ...style,
  };

  return (
    <div
      className={[
        'glass-card',
        accentValue ? 'card-accent-top' : '',
        `rounded-${rounded}`,
        'border',
        border,
        shadow ?? '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={mergedStyle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
