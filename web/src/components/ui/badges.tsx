import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function RiskBadge({ level }: { level: string }) {
  const isHigh = level.toLowerCase() === "high" || level.toLowerCase() === "critical";
  const isMedium = level.toLowerCase() === "medium";
  const isLow = level.toLowerCase() === "low";

  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded text-xs font-medium uppercase tracking-wider",
        isHigh && "bg-red/10 text-red",
        isMedium && "bg-amber/10 text-amber",
        isLow && "bg-teal/10 text-teal"
      )}
    >
      {level}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const isComplete = status.toLowerCase() === "completed" || status.toLowerCase() === "active";
  const isProgress = status.toLowerCase() === "in progress" || status.toLowerCase() === "action required";
  const isPending = status.toLowerCase() === "pending" || status.toLowerCase() === "open";
  const isInReview = status.toLowerCase() === "in review";

  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded text-xs font-medium tracking-wider",
        isComplete && "bg-teal/10 text-teal",
        isProgress && "bg-indigo/10 text-indigo",
        isPending && "bg-amber/10 text-amber",
        isInReview && "bg-purple-100 text-purple-700",
        !isComplete && !isProgress && !isPending && !isInReview && "bg-muted text-muted-foreground"
      )}
    >
      {status}
    </span>
  );
}

export function Metric({ label, value, trend, isPositive }: { label: string, value: string | number, trend?: string, isPositive?: boolean }) {
  return (
    <div className="bg-card border border-border p-5 rounded-lg flex flex-col gap-1">
      <div className="text-3xl font-semibold">{value}</div>
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      {trend && (
        <div className={cn("text-xs font-medium mt-1", isPositive ? "text-teal" : "text-red")}>
          {isPositive ? "?" : "?"} {trend}
        </div>
      )}
    </div>
  );
}
