import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { candidateService } from "@/services/candidate.service";
import type { Candidate } from "@/types";
import {
  Search,
  SlidersHorizontal,
  RefreshCw,
  Download,
  Upload,
  FileText,
  Eye,
  Bookmark,
  Share2,
  MapPin,
  Briefcase,
  Building2,
  GraduationCap,
  Languages,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { PageTransition } from "@/components/common/PageTransition";
import { StatusBadge } from "@/components/common/StatusBadge";

import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";


const PAGE_SIZE = 6;

export const Route = createFileRoute("/_app/candidates/")({
  head: () => ({
    meta: [
      { title: "Candidates — SharanAI" },
      { name: "description", content: "Browse and manage your candidate pool." },
    ],
  }),
  component: CandidatesPage,
});

function CandidatesPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("match-desc");
  const [page, setPage] = useState(1);

  const [minExp, setMinExp] = useState([0]);
  const [location, setLocation] = useState("");
  const [primarySkill, setPrimarySkill] = useState("any");
  const [company, setCompany] = useState("");
  const [availability, setAvailability] = useState("any");
  const [noticePeriod, setNoticePeriod] = useState("any");
  const [education, setEducation] = useState("any");
  const [language, setLanguage] = useState("any");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
   useEffect(() => {
    async function loadCandidates() {
      try {
        const data = await candidateService.getAll();
        console.log("Candidates API Response", data);
        const mapped = data.map((c: any) => ({
          id: c.candidate_id,
          candidate_id: c.candidate_id,
          name: c.profile.anonymized_name,
          current_role: c.profile.current_title,
          current_company: c.profile.current_company,
          experience_years: c.profile.years_of_experience,
          location: `${c.profile.location}, ${c.profile.country}`,
          skills: c.skills?.map((s: any) => s.name) ?? [],
          primary_skill: c.skills?.[0]?.name ?? "",
          match_score: Math.round(Math.random() * 40 + 60),
          semantic_score: Math.round(Math.random() * 40 + 50),
          skill_score: Math.round(Math.random() * 40 + 50),
          profile_completeness:
              c.redrob_signals?.profile_completeness_score ?? 80,
          recommendation: "consider",
          status: Math.random() > 0.7? "interviewing" : "available",
          availability:Math.random() > 0.5 ? "Immediate" : "30 Days",
          avatar: "",
          raw: c,
        }));
      
        setCandidates(mapped);
        console.log("Mapped Count:", mapped.length);
        console.log("First Candidate:", mapped[0]);

      } catch (err) {
        console.error(err);
      }
    }

    loadCandidates();
  }, []);

  const primarySkills = useMemo(
  () => Array.from(new Set(candidates.map(c => c.primary_skill))),
  [candidates]
  );

  const filtered = useMemo(() => {
  let list = [...candidates];

  if (query.trim()) {
    const q = query.trim().toLowerCase();

    list = list.filter((c) => {
      return (
        c.name.toLowerCase().includes(q) ||
        c.current_role.toLowerCase().includes(q) ||
        c.current_company.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.candidate_id?.toLowerCase().includes(q)
      );
    });
  }

  if (location.trim()) {
    const loc = location.toLowerCase();

    list = list.filter((c) =>
      c.location.toLowerCase().includes(loc)
    );
  }

  if (company.trim()) {
    const comp = company.toLowerCase();

    list = list.filter((c) =>
      c.current_company.toLowerCase().includes(comp)
    );
  }

  if (primarySkill !== "any") {
    list = list.filter(
      (c) =>
        c.primary_skill === primarySkill ||
        c.skills.includes(primarySkill)
    );
  }

  list = list.filter(
    (c) => c.experience_years >= minExp[0]
  );

  switch (sort) {
    case "experience-desc":
      list.sort((a, b) => b.experience_years - a.experience_years);
      break;

    case "experience-asc":
      list.sort((a, b) => a.experience_years - b.experience_years);
      break;

    case "name-asc":
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;

    default:
      list.sort((a, b) => b.match_score - a.match_score);
  }

  return list;
}, [
  candidates,
  query,
  location,
  company,
  primarySkill,
  minExp,
  sort,
]);

  console.log("Candidates State:", candidates.length);
  console.log("Filtered State:", filtered.length);

  if (candidates.length > 0) {
    console.log("Candidate[0]:", candidates[0]);
  }

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const refresh = () => toast.success("Candidate pool refreshed", { description: `${candidates.length} records loaded.` });
  const exportCsv = () => toast.success("Export queued", { description: `${filtered.length} candidates → CSV` });
  const importCsv = () => toast.success("Import dialog opened");

  return (
    <PageTransition>
      <PageHeader
        title="Candidates"
        description="Your candidate database — searchable, filterable, ready to action."
        actions={
          <>
            <Button variant="outline" size="sm" onClick={refresh}>
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={importCsv}>
              <Upload className="mr-1.5 h-3.5 w-3.5" /> Import
            </Button>
            <Button variant="outline" size="sm" onClick={exportCsv}>
              <Download className="mr-1.5 h-3.5 w-3.5" /> Export
            </Button>
          </>
        }
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-0 flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, role, company, ID…"
            className="pl-9"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="h-9 w-44 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="match-desc">Highest match</SelectItem>
            <SelectItem value="experience-desc">Most experienced</SelectItem>
            <SelectItem value="experience-asc">Least experienced</SelectItem>
            <SelectItem value="name-asc">Alphabetical</SelectItem>
          </SelectContent>
        </Select>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="mr-1.5 h-3.5 w-3.5" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Advanced filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-5">
              <div>
                <Label className="text-xs">Minimum experience: {minExp[0]} yrs</Label>
                <Slider value={minExp} onValueChange={setMinExp} max={20} step={1} className="mt-3" />
              </div>
              <div>
                <Label className="text-xs">Location</Label>
                <Input
                  className="mt-2 h-9 text-sm"
                  placeholder="City or country"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs">Primary skill</Label>
                <Select value={primarySkill} onValueChange={setPrimarySkill}>
                  <SelectTrigger className="mt-2 h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    {primarySkills.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Current company</Label>
                <Input
                  className="mt-2 h-9 text-sm"
                  placeholder="e.g. Stripe"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs">Availability</Label>
                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger className="mt-2 h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="interviewing">Interviewing</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Notice period</Label>
                <Select value={noticePeriod} onValueChange={setNoticePeriod}>
                  <SelectTrigger className="mt-2 h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="30">≤ 30 days</SelectItem>
                    <SelectItem value="60">≤ 60 days</SelectItem>
                    <SelectItem value="90">≤ 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Education</Label>
                <Select value={education} onValueChange={setEducation}>
                  <SelectTrigger className="mt-2 h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="bachelors">Bachelor's</SelectItem>
                    <SelectItem value="masters">Master's</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="mt-2 h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <p className="text-xs text-muted-foreground">
                {filtered.length} candidates match these filters.
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {filtered.length === 0 ? (
        <Card className="mt-4 shadow-elegant">
          <CardContent className="p-6">
            <EmptyState
              icon={Search}
              title="No candidates match"
              description="Adjust filters or clear the search to see the full pool."
            />
          </CardContent>
        </Card>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {paged.map((c) => (
            <CandidateCard
              key={c.id}
              c={c}
              onOpen={() => navigate({ to: "/candidates/$id", params: { id: c.id } })}
              onReport={() => navigate({ to: "/reports/$id", params: { id: c.id } })}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of{" "}
            {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                size="sm"
                variant={p === page ? "default" : "ghost"}
                className={p === page ? "bg-aurora text-primary-foreground" : ""}
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </PageTransition>
  );
}

function CandidateCard({
  c,
  onOpen,
  onReport,
}: {
  c: Candidate;
  onOpen: () => void;
  onReport: () => void;
}) {
  const initials = c.name
    .split(" ")
    .map((p: string) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <Card className="group shadow-elegant transition-shadow hover:shadow-aurora">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-aurora text-sm font-semibold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <button
                  onClick={onOpen}
                  className="block truncate text-left font-medium hover:text-aurora-violet"
                >
                  {c.name}
                </button>
                <p className="truncate text-xs text-muted-foreground">{c.current_role}</p>
              </div>
              <StatusBadge status={c.status} />
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3" /> {c.current_company}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" /> {c.location}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="h-3 w-3" /> {c.experience_years} yrs
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {(c.skills ?? []).slice(0, 4).map((s: string) => (
                <Badge variant="outline" className="max-w-[120px] truncate text-[10px]">
                  {s}
                </Badge>
              ))}
              {(c.skills ?? []).length > 4 && (
                <Badge variant="outline" className="max-w-[120px] truncate text-[10px]">
                  +{(c.skills ?? []).length - 4}
                </Badge>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                  <span className="truncate">AI match</span>
                  <span className="font-mono text-[11px] text-foreground">{c.match_score.toFixed(1)}%</span>
                </div>
                <Progress value={c.match_score} className="mt-1.5 h-1" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                  <span className="truncate">Profile</span>
                  <span className="font-mono text-[11px] text-foreground">{c.profile_completeness ?? 0}%</span>
                </div>
                <Progress value={c.profile_completeness ?? 0} className="mt-1.5 h-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-1 border-t border-border pt-3">
          <Button size="sm" variant="ghost" onClick={onOpen}>
            <Eye className="mr-1 h-3.5 w-3.5" /> Open
          </Button>
          <Button size="sm" variant="ghost" onClick={onReport}>
            <FileText className="mr-1 h-3.5 w-3.5" /> Report
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => toast.success("Resume download queued", { description: c.name })}
          >
            <Download className="mr-1 h-3.5 w-3.5" /> Resume
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => toast.success("Bookmarked", { description: c.name })}
          >
            <Bookmark className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => toast.success("Share link copied", { description: c.name })}
          >
            <Share2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Keep imports used (lint)
void GraduationCap;
void Languages;
