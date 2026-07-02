import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  Briefcase,
  Download,
  Globe2,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { PageTransition } from "@/components/common/PageTransition";
import { ChartCard } from "@/components/common/ChartCard";
import { InsightCard } from "@/components/common/InsightCard";
import { StatCard } from "@/components/common/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MOCK_ANALYTICS } from "@/data/mockAnalytics";
import { ScoreBadge } from "@/components/common/ScoreBadge";

export const Route = createFileRoute("/_app/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — SharanAI" },
      { name: "description", content: "Executive hiring intelligence and pipeline analytics." },
    ],
  }),
  component: AnalyticsPage,
});

const AURORA = ["#7C3AED", "#6366F1", "#3B82F6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#EC4899", "#8B5CF6"];

const tipStyle = {
  background: "var(--card)",
  color: "var(--foreground)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  fontSize: 12,
  boxShadow: "var(--shadow-elegant, 0 8px 24px rgba(0,0,0,0.08))",
};
const tipLabelStyle = { color: "var(--foreground)" };
const tipItemStyle = { color: "var(--foreground)" };

function AnalyticsPage() {
  const a = MOCK_ANALYTICS;

  return (
    <PageTransition>
      <PageHeader
        title="Analytics"
        description="Executive overview of pipeline health, hiring velocity, and AI-surfaced insights."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-1.5 h-3.5 w-3.5" /> Export
            </Button>
            <Button size="sm" className="bg-aurora text-primary-foreground hover:opacity-90">
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Refresh
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total candidates" value={a.totals.total_candidates.toLocaleString()} icon={Users} delta={{ value: "+8.2%", positive: true }} />
        <StatCard label="Avg. match score" value={`${a.totals.avg_match_score}%`} icon={Sparkles} delta={{ value: "+1.6pt", positive: true }} />
        <StatCard label="Reports generated" value={a.totals.reports_generated.toLocaleString()} icon={Activity} delta={{ value: "+24 this week", positive: true }} />
        <StatCard label="Active rankings" value={String(a.totals.active_rankings)} icon={Briefcase} delta={{ value: "+3", positive: true }} />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard title="Hiring funnel" description="Pipeline conversion across stages" className="lg:col-span-2">
          <div className="h-72">
            <ResponsiveContainer>
              <FunnelChart>
                <Tooltip contentStyle={tipStyle} labelStyle={tipLabelStyle} itemStyle={tipItemStyle} cursor={{ fill: "var(--accent)", opacity: 0.3 }} />
                <Funnel dataKey="count" data={a.hiring_funnel} isAnimationActive>
                  {a.hiring_funnel.map((_, i) => (
                    <Cell key={i} fill={AURORA[i % AURORA.length]} />
                  ))}
                  <LabelList position="right" fill="var(--foreground)" dataKey="stage" style={{ fontSize: 11 }} />
                  <LabelList position="left" fill="var(--muted-foreground)" dataKey="count" style={{ fontSize: 11 }} />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Avg. match score trend" description="Last 90 days · Aurora AI">
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={a.match_score_trend}>
                <defs>
                  <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[60, 90]} />
                <Tooltip contentStyle={tipStyle} labelStyle={tipLabelStyle} itemStyle={tipItemStyle} cursor={{ fill: "var(--accent)", opacity: 0.3 }} />
                <Area type="monotone" dataKey="score" stroke="#7C3AED" strokeWidth={2} fill="url(#scoreFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Top skills" description="Across active candidate pool">
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={a.top_skills.slice(0, 8)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={tipStyle} labelStyle={tipLabelStyle} itemStyle={tipItemStyle} cursor={{ fill: "var(--accent)", opacity: 0.3 }} />
                <Bar dataKey="count" fill="#7C3AED" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Top companies" description="Where candidates are coming from">
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={a.top_companies} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={tipStyle} labelStyle={tipLabelStyle} itemStyle={tipItemStyle} cursor={{ fill: "var(--accent)", opacity: 0.3 }} />
                <Bar dataKey="count" fill="#06B6D4" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Country distribution" description="Geographic reach of pipeline">
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                <Tooltip contentStyle={tipStyle} labelStyle={tipLabelStyle} itemStyle={tipItemStyle} />
                <Legend
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
                />
                <Pie
                  data={a.country_distribution}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="42%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                >
                  {a.country_distribution.map((_, i) => (
                    <Cell key={i} fill={AURORA[i % AURORA.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Experience distribution" description="Years of experience across pool">
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={a.experience_distribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="bucket" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip contentStyle={tipStyle} labelStyle={tipLabelStyle} itemStyle={tipItemStyle} cursor={{ fill: "var(--accent)", opacity: 0.3 }} />
                <Bar dataKey="count" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Profile score distribution" description="Aurora AI completeness scores">
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={a.profile_score_distribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="bucket" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip contentStyle={tipStyle} labelStyle={tipLabelStyle} itemStyle={tipItemStyle} cursor={{ fill: "var(--accent)", opacity: 0.3 }} />
                <Line type="monotone" dataKey="count" stroke="#06B6D4" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Hiring velocity"
          description="Weekly rankings, reports, and shortlists"
          className="lg:col-span-3"
        >
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={a.hiring_velocity}>
                <defs>
                  <linearGradient id="vR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="vP" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="vS" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip contentStyle={tipStyle} labelStyle={tipLabelStyle} itemStyle={tipItemStyle} cursor={{ fill: "var(--accent)", opacity: 0.3 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="rankings" stroke="#7C3AED" strokeWidth={2} fill="url(#vR)" />
                <Area type="monotone" dataKey="reports" stroke="#06B6D4" strokeWidth={2} fill="url(#vP)" />
                <Area type="monotone" dataKey="shortlisted" stroke="#10B981" strokeWidth={2} fill="url(#vS)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Ranking history */}
      <Card className="mt-5 shadow-elegant">
        <div className="flex items-center justify-between border-b border-border/60 p-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-aurora-soft text-aurora-violet">
              <BarChart3 className="h-3.5 w-3.5" />
            </span>
            <p className="font-display text-sm font-semibold tracking-tight">Recent ranking sessions</p>
          </div>
          <Button variant="ghost" size="sm" className="text-xs">
            View all
          </Button>
        </div>
        <CardContent className="p-0">
          <ul className="divide-y divide-border/60">
            {a.ranking_history.map((r) => (
              <li
                key={r.id}
                className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-accent/30"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{r.job}</p>
                  <p className="text-[11px] text-muted-foreground">
                    <span className="font-mono">{r.id}</span> · {r.candidates} candidates · {r.generated}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">Top score</span>
                  <ScoreBadge value={r.top_score} />
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Insights */}
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Badge className="bg-aurora text-primary-foreground border-transparent">
            <Sparkles className="mr-1 h-3 w-3" /> Aurora AI Insights
          </Badge>
          <p className="text-xs text-muted-foreground">Auto-generated from your hiring data</p>
        </div>
        <div className="hidden items-center gap-1.5 text-xs text-muted-foreground md:flex">
          <Globe2 className="h-3.5 w-3.5" /> Updated 2 minutes ago
        </div>
      </div>
      <Separator className="mt-3" />
      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {a.insights.map((i) => (
          <InsightCard key={i.id} insight={i} />
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <TrendingUp className="h-3.5 w-3.5" /> Insights refresh hourly · powered by Aurora AI
      </div>
    </PageTransition>
  );
}
