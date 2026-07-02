import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Sparkles,
  Users,
  FileText,
  BarChart3,
  Settings,
  UserCircle,
  Zap,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const main = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Candidate Ranking", url: "/ranking", icon: Sparkles },
  { title: "Candidates", url: "/candidates", icon: Users },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

const system = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Account", url: "/account", icon: UserCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (url: string) =>
    url === "/" ? pathname === "/" : pathname === url || pathname.startsWith(url + "/");

  const renderItem = (item: (typeof main)[number]) => {
    const active = isActive(item.url);
    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
          <Link
            to={item.url}
            className={cn(
              "group relative flex items-center rounded-md transition-colors",
              collapsed ? "justify-center" : "gap-3",
              active
                ? "bg-aurora-soft text-foreground font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-accent",
            )}
          >
            {active && (
              <span
                aria-hidden
                className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r bg-aurora"
              />
            )}
            <item.icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="truncate">{item.title}</span>}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="h-[72px] flex-row items-center border-b border-sidebar-border px-3 py-0">
        <Link to="/" className={cn("flex items-center", collapsed ? "justify-center w-full" : "gap-2.5")}>
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-aurora shadow-aurora">
            <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          {!collapsed && (
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="font-display text-sm font-bold tracking-tight">
                SharanAI
              </span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Recruitment Intelligence
              </span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Main
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className={cn("gap-0.5", collapsed && "items-center")}>{main.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          {!collapsed && (
            <SidebarGroupLabel className="px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              System
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className={cn("gap-0.5", collapsed && "items-center")}>{system.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        {!collapsed ? (
          <div className="rounded-lg bg-aurora-soft p-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-aurora-violet" />
              <span className="text-xs font-semibold">Aurora AI</span>
            </div>
            <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
              Smarter ranking, powered by intelligent matching.
            </p>
          </div>
        ) : (
          <div className="grid h-8 w-8 mx-auto place-items-center rounded-md bg-aurora-soft">
            <Sparkles className="h-3.5 w-3.5 text-aurora-violet" />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
