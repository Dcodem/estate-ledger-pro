import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href: string };
  actions?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumb,
  actions,
}: PageHeaderProps) {
  return (
    <div className="mb-6">
      {breadcrumb && (
        <Link
          href={breadcrumb.href}
          className="inline-flex items-center gap-1 text-[13px] text-primary hover:underline mb-3"
        >
          <ChevronLeft size={14} />
          {breadcrumb.label}
        </Link>
      )}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-text-primary">{title}</h1>
          {subtitle && (
            <p className="text-sm text-text-muted mt-1">{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}
