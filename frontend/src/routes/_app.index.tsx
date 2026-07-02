import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  Sparkles,
  Target,
  Clock,
  ArrowUpRight,
  FileText,
  BarChart3,
  Plus,
  Award,
  Languages as LanguagesIcon,
  RefreshCw,
} from "lucide-react";
import { PageTransition } from "@/components/common/PageTransition";
import { StatCard } from "@/components/common/StatCard";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorCard } from "@/components/common/ErrorCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnalytics } from "@/hooks/useAnalytics";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: "Dashboard — SharanAI" },
      {
        name: "description",
        content:
          "Overview of hiring metrics, AI insights, and recent candidate ranking sessions.",
      },
    ],
  }),
  component: DashboardPage,
});

const fmtNum = (n?: number, digits = 0) =>
  n === undefined || n === null || Number.isNaN(n) ? "—" : Number(n).toFixed(digits);

function DashboardPage() {
  const { data, isLoading, isError, error, refetch, isFetching } = useAnalytics();

  return (
    <PageTransition>
      <section className="relative overflow-hidden rounded-2xl border border-border bg-aurora-soft px-6 py-7 md:px-8 md:py-9">
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
          className="absolute right-4 top-4 z-10 bg-background/60 backdrop-blur"
        >
          <RefreshCw className={`mr-1.5 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </Button>
        <div className="relative z-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-aurora">
            Welcome back
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
            Smarter hiring starts here.
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Rank candidates with Aurora AI, surface hiring signals, and turn intent
            into offers — all in one workspace.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild className="bg-aurora text-primary-foreground shadow-aurora hover:opacity-90">
              <Link to="/ranking">
                <Sparkles className="mr-1.5 h-4 w-4" /> New ranking
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/analytics">View analytics</Link>
            </Button>
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-aurora opacity-20 blur-3xl"
        />
      </section>

      {isError ? (
        <div className="mt-6">
          <ErrorCard message={(error as { message?: string })?.message} onRetry={() => refetch()} />
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Total candidates"
              value={fmtNum(data?.total_candidates)}
              icon={Users}
              loading={isLoading}
            />
            <StatCard
              label="Avg. experience (yrs)"
              value={fmtNum(data?.average_experience, 1)}
              icon={Clock}
              loading={isLoading}
            />
            <StatCard
              label="Avg. profile score"
              value={fmtNum(data?.average_profile_score, 1)}
              icon={Target}
              loading={isLoading}
            />
            <StatCard
              label="Avg. languages"
              value={fmtNum(data?.average_languages, 1)}
              icon={LanguagesIcon}
              loading={isLoading}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2 shadow-elegant">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Top skills</CardTitle>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Most matched skills across your candidate pool.
                  </p>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-xs">
                  <Link to="/analytics">
                    View all <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-56 w-full" />
                ) : data?.top_skills && data.top_skills.length > 0 ? (
                  <div className="h-56 w-full">
                    <ResponsiveContainer>
                      <BarChart data={data.top_skills.slice(0, 8)}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                        <Tooltip
                          cursor={{ fill: "var(--accent)", opacity: 0.4 }}
                          contentStyle={{
                            background: "var(--card)",
                            color: "var(--foreground)",
                            border: "1px solid var(--border)",
                            borderRadius: 8,
                            fontSize: 12,
                          }}
                          labelStyle={{ color: "var(--foreground)" }}
                          itemStyle={{ color: "var(--foreground)" }}
                        />
                        <Bar dataKey="count" fill="url(#auroraBar)" radius={[6, 6, 0, 0]} />
                        <defs>
                          <linearGradient id="auroraBar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="hsl(262 83% 62%)" />
                            <stop offset="100%" stopColor="hsl(199 89% 55%)" />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <EmptyState
                    icon={Target}
                    title="No skill data yet"
                    description="Rank candidates to populate this chart."
                  />
                )}
              </CardContent>
            </Card>

            <Card className="shadow-elegant">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge className="bg-aurora-soft text-aurora-violet border-transparent">
                    Aurora AI
                  </Badge>
                </div>
                <CardTitle className="mt-2 text-base font-semibold">Recent activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-3 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  ))
                ) : data?.recent_activity && data.recent_activity.length > 0 ? (
                  data.recent_activity.slice(0, 5).map((a) => (
                    <div key={a.id} className="border-l-2 border-aurora pl-3">
                      <p className="text-sm font-medium">{a.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(a.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recent activity yet.</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <StatCard
              label="Avg. certifications"
              value={fmtNum(data?.average_certifications, 1)}
              icon={Award}
              loading={isLoading}
            />
            <Card className="shadow-elegant lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Quick actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 sm:grid-cols-2">
                <Button asChild variant="outline" className="justify-start">
                  <Link to="/ranking">
                    <Plus className="mr-2 h-4 w-4" /> New ranking
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link to="/candidates">
                    <Users className="mr-2 h-4 w-4" /> Browse candidates
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link to="/analytics">
                    <BarChart3 className="mr-2 h-4 w-4" /> Open analytics
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link to="/reports">
                    <FileText className="mr-2 h-4 w-4" /> View reports
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </PageTransition>
  );
}
