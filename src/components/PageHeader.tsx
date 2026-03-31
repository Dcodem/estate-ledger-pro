import Link from "next/link";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumb?: { label: string; href: string };
  actions?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  badge,
  breadcrumb,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        {breadcrumb && (
          <Link
            href={breadcrumb.href}
            className="flex items-center gap-1 text-primary text-sm font-medium group"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">
              arrow_back
            </span>
            <span className="tracking-tight">{breadcrumb.label}</span>
          </Link>
        )}
        <div className="flex items-baseline gap-4 mt-2">
          <h2 className="text-[28px] font-extrabold text-on-surface leading-tight">
            {title}
          </h2>
          {badge && (
            <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant text-[11px] font-bold rounded-full uppercase tracking-widest">
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-sm text-on-surface-variant">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
