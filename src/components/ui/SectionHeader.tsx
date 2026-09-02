import type { ElementType } from 'react';
import { Badge } from './Badge';
import type { BadgeVariant } from './Badge';

interface SectionHeaderProps {
  title: string;
  icon?: ElementType;
  subtitle?: string;
  badge?: string;
  badgeVariant?: BadgeVariant;
  className?: string;
  as?: 'h1' | 'h2';
  iconColor?: string;
}

export function SectionHeader({
  title,
  icon: Icon,
  subtitle,
  badge,
  badgeVariant = 'gold',
  className = '',
  as: Tag = 'h1',
  iconColor = 'text-yellow-400',
}: SectionHeaderProps) {
  const titleSize = Tag === 'h1' ? 'text-xl font-bold' : 'text-lg font-semibold';

  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-center gap-2 mb-1">
        {Icon && <Icon size={Tag === 'h1' ? 20 : 16} className={iconColor} />}
        <Tag className={`${titleSize} text-white`}>{title}</Tag>
        {badge && <Badge label={badge} variant={badgeVariant} />}
      </div>
      {subtitle && <p className="text-sm text-slate-400 max-w-xl">{subtitle}</p>}
    </div>
  );
}
