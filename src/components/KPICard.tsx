interface KPICardProps {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
}

export default function KPICard({ label, value, trend, trendUp }: KPICardProps) {
  return (
    <div className="bg-card rounded-xl shadow-sm p-6 flex-1">
      <div className="text-xs font-medium uppercase tracking-wider text-text-muted mb-2">
        {label}
      </div>
      <div className="text-[32px] font-bold text-text-primary leading-tight">
        {value}
      </div>
      {trend && (
        <div
          className={`text-sm font-semibold mt-1 ${
            trendUp ? "text-success" : "text-error"
          }`}
        >
          {trend}
        </div>
      )}
    </div>
  );
}
