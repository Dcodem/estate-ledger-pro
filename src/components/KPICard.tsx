interface KPICardProps {
  label: string;
  value: string;
  icon: string;
  iconBg?: string;
  iconColor?: string;
  trend?: string;
  trendUp?: boolean;
}

export default function KPICard({ label, value, icon, iconBg = "bg-primary-fixed-dim", iconColor = "text-primary", trend, trendUp }: KPICardProps) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl card-shadow transition-transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 ${iconBg} rounded-lg ${iconColor}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        {trend && (
          <span className={`text-[11px] font-bold flex items-center gap-0.5 ${trendUp ? "text-green-600" : "text-error"}`}>
            <span className="material-symbols-outlined text-[14px]">
              {trendUp ? "trending_up" : "trending_down"}
            </span>
            {trend}
          </span>
        )}
      </div>
      <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider">{label}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  );
}
