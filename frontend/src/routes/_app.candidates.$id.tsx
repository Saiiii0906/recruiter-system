import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Languages,
  Award,
  Sparkles,
  FileText,
  ArrowLeft,
  Download,
  GitCompare,
  CheckCircle2,
  XCircle,
  Calendar,
  Building2,
  Clock,
  DollarSign,
  Activity,
  AlertTriangle,
  ShieldCheck,
  Heart,
} from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "@/components/common/PageTransition";
import { ErrorCard } from "@/components/common/ErrorCard";
import { ScoreRing } from "@/components/common/ScoreRing";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { candidateService } from "@/services/candidate.service";
import type { Candidate } from "@/types";

export const Route = createFileRoute("/_app/candidates/$id")({
  head: () => ({
    meta: [
      { title: "Candidate profile — SharanAI" },
      { name: "description", content: "Full candidate profile with AI summary and recruiter actions." },
    ],
  }),
  component: CandidateProfile,
});

function CandidateProfile() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadCandidate() {
        try {
            const data = await candidateService.getById(id);
            console.log("Candidate API:", data);
            console.log(data);

            setCandidate({
                id: data.candidate_id,

                name: data.profile.anonymized_name,

                headline: data.profile.headline,

                current_role: data.profile.current_title,

                current_company: data.profile.current_company,

                location:
                    `${data.profile.location}, ${data.profile.country}`,

                experience_years:
                    data.profile.years_of_experience,

                skills:
                    data.skills?.map((s:any)=>s.name) ?? [],

                certifications:
                    data.certifications ?? [],

                education:
                    data.education ?? [],

                languages:
                    data.languages?.map((l:any)=>l.language) ?? [],

                summary:
                    data.profile.summary,

                profile_score:
                    data.redrob_signals?.profile_completeness_score ?? 80,

                status:"available",

                availability:"Immediate",

                match_score:94
            });

        } finally {

            setLoading(false);

        }
    }

    loadCandidate();

},[id]);

  if (loading) {
    return (
        <PageTransition>
            Loading...
        </PageTransition>
    );
  }
  
  if (!candidate) {
    return (
      <PageTransition>
        <ErrorCard
          title="Candidate not found"
          message={`We couldn't find a candidate with ID ${id}.`}
          onRetry={() => navigate({ to: "/candidates" })}
        />
      </PageTransition>
    );
  }

  const initials = candidate.name
    .split(" ")
    .map((p: any) => (p[0]))
    .slice(0, 2)
    .join("");

  return (
    <PageTransition>
      {/* Top nav */}
      <div className="mb-4 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/candidates" })}>
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to candidates
        </Button>
        <div className="flex flex-wrap items-center gap-1.5">
          <Button
            size="sm"
            variant="outline"
            onClick={() => toast.success("Resume download queued")}
          >
            <Download className="mr-1.5 h-3.5 w-3.5" /> Resume
          </Button>
          <Button size="sm" variant="outline" onClick={() => toast.success("Added to compare")}>
            <GitCompare className="mr-1.5 h-3.5 w-3.5" /> Compare
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => toast.success("Shortlisted", { description: candidate.name })}
          >
            <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Shortlist
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => toast.error("Rejected", { description: candidate.name })}
          >
            <XCircle className="mr-1.5 h-3.5 w-3.5" /> Reject
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => toast.success("Interview scheduler opened")}
          >
            <Calendar className="mr-1.5 h-3.5 w-3.5" /> Interview
          </Button>
          <Button asChild size="sm" className="bg-aurora text-primary-foreground hover:opacity-90">
            <Link to="/reports/$id" params={{ id: candidate.id }}>
              <FileText className="mr-1.5 h-3.5 w-3.5" /> Generate report
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero */}
      <Card className="overflow-hidden shadow-elegant">
        <div className="relative h-28 bg-aurora">
          <div className="absolute inset-0 bg-aurora-soft opacity-40" />
        </div>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="-mt-16 flex flex-col items-start gap-4 sm:flex-row sm:items-end">
              <Avatar className="h-24 w-24 ring-4 ring-background">
                <AvatarFallback className="bg-aurora text-xl font-semibold text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                    {candidate.name}
                  </h1>
                  <StatusBadge status={candidate.status} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{candidate.headline}</p>
                <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-1.5 text-xs text-muted-foreground sm:flex sm:flex-wrap sm:items-center">
                  <HeroMeta icon={Building2} label={candidate.current_company} />
                  <HeroMeta icon={MapPin} label={candidate.location} />
                  <HeroMeta icon={Briefcase} label={`${candidate.experience_years} yrs experience`} />
                  <HeroMeta icon={DollarSign} label={`Expected ${candidate.expected_salary}`} />
                  <HeroMeta icon={Clock} label={`Notice ${candidate.notice_period}`} />
                  <HeroMeta icon={Activity} label={`Availability ${candidate.availability}`} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 self-start rounded-xl border border-border bg-card p-4 shadow-elegant lg:self-end">
              <ScoreRing value={candidate.match_score} label="AI match" />
              <ScoreRing value={candidate.profile_completion} label="Profile" tone="success" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Body */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Left col */}
        <div className="space-y-4 lg:col-span-2">
          <SectionCard title="Professional summary">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {candidate.professional_summary}
            </p>
          </SectionCard>

          <Card className="overflow-hidden shadow-elegant">
            <div className="h-1 bg-aurora" />
            <CardHeader className="pb-2">
              <Badge className="w-fit bg-aurora-soft text-aurora-violet border-transparent">
                <Sparkles className="mr-1 h-3 w-3" /> Aurora AI summary
              </Badge>
              <CardTitle className="mt-2 font-display text-base font-semibold">
                Intelligence brief
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <AISection
                icon={CheckCircle2}
                tone="success"
                title="Key strengths"
                items={candidate.strengths ?? []}
              />
              <AISection
                icon={AlertTriangle}
                tone="warning"
                title="Potential concerns"
                items={candidate.concerns ?? []}
              />
              <AISection
                icon={Calendar}
                tone="aurora"
                title="Interview recommendations"
                items={candidate.interview_recommendations ?? []}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <NarrativeBlock
                  icon={Heart}
                  title="Culture fit"
                  body="Based on the candidate's experience and technical skills, they appear to be a good fit for collaborative engineering teams."
                />

                <NarrativeBlock
                  icon={ShieldCheck}
                  title="Risk assessment"
                  body="No major risks detected. Additional evaluation should be performed during the interview."
                />
              </div>
            </CardContent>
          </Card>

          <SectionCard title="Experience" icon={Briefcase}>
            <Timeline items={candidate.career_history ?? []} />
          </SectionCard>

          <SectionCard title="Education" icon={GraduationCap}>
            <EducationTimeline items={candidate.education} />
          </SectionCard>
        </div>

        {/* Right col */}
        <div className="space-y-4">
          <SectionCard title="Skills">
  <div className="space-y-4">
    <div className="flex flex-wrap gap-2">
      {(candidate.skills ?? []).map((skill: any) => (
        <Badge
          key={typeof skill === "string" ? skill : skill.name}
          variant="outline"
          className="bg-surface text-[11px]"
        >
          {typeof skill === "string" ? skill : skill.name}
        </Badge>
      ))}
    </div>
  </div>
</SectionCard>

          <SectionCard title="Languages" icon={Languages}>
            <div className="space-y-2">
              {(candidate.languages ?? []).map((l: any) => (
                <div
                  key={l.language}
                  className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2"
                >
                  <span className="text-sm font-medium">{l.language}</span>
                  <Badge variant="outline" className="text-[10px]">
                    {l.proficiency}
                  </Badge>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Certifications" icon={Award}>
            <div className="space-y-2">
              {candidate.certifications.map((c: any) => (
                <div
                  key={c.name}
                  className="rounded-lg border border-border bg-surface p-3"
                >
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {c.issuer} · {c.year}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Activity" icon={Activity}>
            <div className="rounded-lg border border-border p-6 text-center text-muted-foreground">
                No activity available yet.
            </div>
          </SectionCard>
        </div>
      </div>
    </PageTransition>
  );
}

function HeroMeta({ icon: Icon, label }: { icon: typeof MapPin; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <Icon className="h-3 w-3" /> {label}
    </span>
  );
}

function SectionCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: typeof Briefcase;
  children: React.ReactNode;
}) {
  return (
    <Card className="shadow-elegant">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function AISection({icon: Icon, tone, title, items,}: {
  icon: typeof CheckCircle2;
  tone: "success" | "warning" | "aurora";
  title: string;
  items: string[];
}) {
  const toneCls =
    tone === "success"
      ? "text-success bg-success/10"
      : tone === "warning"
        ? "text-amber-600 dark:text-amber-400 bg-amber-500/10"
        : "text-aurora-violet bg-aurora-soft";
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className={"grid h-7 w-7 place-items-center rounded-md " + toneCls}>
          <Icon className="h-3.5 w-3.5" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
      </div>
      <ul className="mt-2 space-y-1.5 pl-9 text-sm text-muted-foreground">
        {items.map((it) => (
          <li key={it} className="list-disc">
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function NarrativeBlock({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Heart;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-aurora-violet" />
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function Timeline({items = [],}: {items?: Candidate["career_history"];}){
  return (
    <ol className="relative space-y-6 border-l border-border pl-5">
      {items.map((e: any, i: number) => (
        <li key={i} className="relative">
          <span className="absolute -left-[26px] top-1.5 grid h-4 w-4 place-items-center rounded-full bg-aurora ring-4 ring-background" />

          <div className="flex flex-wrap items-baseline gap-x-2">
            <p className="text-sm font-semibold">{e.title}</p>
            <p className="text-sm text-muted-foreground">
              · {e.company}
            </p>
          </div>

          <p className="text-xs text-muted-foreground">
            {e.start_date} — {e.end_date ?? "Present"}
          </p>

          <p className="mt-1.5 text-sm text-muted-foreground">
            {e.description}
          </p>

          {i < items.length - 1 && (
            <Separator className="mt-5" />
          )}
        </li>
      ))}
    </ol>
  );
}

function EducationTimeline({ items = [] }: { items?: Candidate["education"] }) {
  return (
    <ol className="relative space-y-5 border-l border-border pl-5">
      {(items ?? []).map((e: any, i: number) => (
        <li key={i} className="relative">
          <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-aurora" />
          <p className="text-sm font-semibold">{e.degree}</p>
          <p className="text-xs text-muted-foreground">
            {e.institution} · {e.start} – {e.end}
          </p>
          {e.notes && <p className="mt-1 text-xs text-muted-foreground">{e.notes}</p>}
        </li>
      ))}
    </ol>
  );
}

function ActivityList({ items }: { items: any[] }) {
  return (
    <ol className="space-y-3">
      {items.map((a, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-aurora-violet" />
          <div className="min-w-0 flex-1">
            <p className="text-sm">{a.message}</p>
            <p className="text-[11px] text-muted-foreground">{a.timestamp}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
