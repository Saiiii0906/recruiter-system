import { Bell, CheckCheck, FileText, Sparkles, UserCheck, Download, Activity } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type NotifType = "ranking" | "report" | "candidate" | "export" | "system";

interface Notif {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

const ICONS: Record<NotifType, typeof Bell> = {
  ranking: Sparkles,
  report: FileText,
  candidate: UserCheck,
  export: Download,
  system: Activity,
};

const TONES: Record<NotifType, string> = {
  ranking: "bg-aurora-soft text-aurora-violet",
  report: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  candidate: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  export: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  system: "bg-muted text-muted-foreground",
};

const SEED: Notif[] = [
  {
    id: "n1",
    type: "ranking",
    title: "Ranking completed",
    body: "142 candidates ranked for Senior Platform Engineer.",
    time: "2 min ago",
    unread: true,
  },
  {
    id: "n2",
    type: "report",
    title: "Report generated",
    body: "AI report ready for Aarav Mehta (CAND-1001).",
    time: "12 min ago",
    unread: true,
  },
  {
    id: "n3",
    type: "candidate",
    title: "Candidate updated",
    body: "Priya Subramanian moved to Interviewing.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: "n4",
    type: "export",
    title: "Export ready",
    body: "Pipeline export (CSV) is ready to download.",
    time: "3 hours ago",
    unread: false,
  },
  {
    id: "n5",
    type: "system",
    title: "All systems operational",
    body: "Aurora AI services are running at full capacity.",
    time: "Yesterday",
    unread: false,
  },
];

export function NotificationPanel() {
  const [items, setItems] = useState<Notif[]>(SEED);
  const unread = items.filter((i) => i.unread).length;

  const markAllRead = () => setItems((prev) => prev.map((i) => ({ ...i, unread: false })));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="h-4 w-4" />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-aurora px-1 text-[9px] font-bold text-primary-foreground">
              {unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[360px] p-0">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="font-display text-sm font-semibold">Notifications</p>
            <p className="text-xs text-muted-foreground">
              {unread > 0 ? `${unread} unread` : "You're all caught up"}
            </p>
          </div>
          {unread > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1 text-xs"
              onClick={markAllRead}
            >
              <CheckCheck className="h-3.5 w-3.5" /> Mark all read
            </Button>
          )}
        </div>
        <Separator />
        <ul className="max-h-[420px] overflow-y-auto">
          {items.map((n) => {
            const Icon = ICONS[n.type];
            return (
              <li
                key={n.id}
                className={cn(
                  "flex items-start gap-3 border-b border-border/50 px-4 py-3 transition-colors last:border-0 hover:bg-accent/40",
                  n.unread && "bg-aurora-soft/30",
                )}
              >
                <div className={cn("mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg", TONES[n.type])}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium">{n.title}</p>
                    <span className="shrink-0 text-[10px] text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{n.body}</p>
                </div>
                {n.unread && (
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aurora" aria-label="unread" />
                )}
              </li>
            );
          })}
        </ul>
        <Separator />
        <div className="px-4 py-2.5">
          <Button variant="ghost" size="sm" className="h-8 w-full text-xs">
            View all activity
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
