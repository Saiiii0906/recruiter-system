import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Sparkles,
  Search,
  Users,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  FileText,
  Loader2,
  ClipboardPaste,
  Trash2,
  FileCode,
  Lightbulb,
  Download,
  GitCompare,
  CheckSquare,
  Square,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { PageTransition } from "@/components/common/PageTransition";
import { EmptyState } from "@/components/common/EmptyState";
import { ScoreBadge } from "@/components/common/ScoreBadge";
import { StatusBadge, RecommendationBadge } from "@/components/common/StatusBadge";
import { RankingPipeline } from "@/components/common/RankingPipeline";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SAMPLE_JD } from "@/data/mockCandidates";
import { rankingService } from "@/services/ranking.service";
import type { RankingResult } from "@/types";

const MAX = 5000;
const PAGE_SIZE = 8;

const SUGGESTED_REQUIRED = ["TypeScript", "React", "Kubernetes", "AWS", "PostgreSQL"];
const SUGGESTED_PREFERRED = ["Go", "Terraform", "GraphQL", "OpenTelemetry", "Vector DBs"];

export const Route = createFileRoute("/_app/ranking")({
  head: () => ({
    meta: [
      { title: "Candidate Ranking — SharanAI" },
      {
        name: "description",
        content: "Paste a job description and let Aurora AI rank your candidate pool.",
      },
    ],
  }),
  component: RankingPage,
});

type SortKey = "match" | "experience" | "name";

function RankingPage() {
  const navigate = useNavigate();
  const [jd, setJd] = useState("");
  const [editorRows, setEditorRows] = useState(10);

  // Filters
  const [minMatch, setMinMatch] = useState([0]);
  const [minExp, setMinExp] = useState([0]);
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("any");
  const [workMode, setWorkMode] = useState("any");
  const [industry, setIndustry] = useState("any");
  const [companySize, setCompanySize] = useState("any");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [preferredSkills, setPreferredSkills] = useState<string[]>([]);

  // Results state
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("match");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const [running, setRunning] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [results, setResults] = useState<RankingResult[]>([]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setJd(text.slice(0, MAX));
        toast.success("Pasted from clipboard");
      }
    } catch {
      toast.error("Clipboard unavailable", { description: "Grant permission and retry." });
    }
  };

  const toggleSkill = (
    list: string[],
    setList: (next: string[]) => void,
    skill: string,
  ) => {
    setList(list.includes(skill) ? list.filter((s) => s !== skill) : [...list, skill]);
  };

  const runRanking = async () => {
  if (jd.trim().length < 40) {
    toast.error("Job description too short", {
      description: "Add at least 40 characters.",
    });
    return;
  }

  try {
    setRunning(true);
    setSelected(new Set());
    setPage(1);
    const ranked = await rankingService.rank(jd);
    console.log("========== RANKED ==========");
    console.log(ranked);
    console.log("Length:", ranked.length);
    setResults(ranked);
    setHasResults(true);
    toast.success("Ranking completed", {
      description: `${ranked.length} candidates analyzed.`,
    });
  } catch (error) {
    console.error(error);
    toast.error("Ranking failed");
  } finally {
    setRunning(false);
  }
};

  const filtered = useMemo(() => {
    if (!hasResults) return [];
    const q = query.trim().toLowerCase();
    const loc = location.trim().toLowerCase();
    const list = results.filter((c) => {
      const match = c.match_score ?? 0;
      const experience = c.experience_years ?? 0;
      const candidateLocation = (c.location ?? "").toLowerCase();

      if (match < minMatch[0]) return false;
      if (experience < minExp[0]) return false;

      if (loc && !candidateLocation.includes(loc)) {
        return false;
      }

      if(q){
        const hay =
          [
            c.name,
            c.current_role,
            c.current_company,
            ...(c.skills ?? []),
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        if (!hay.includes(q)) return false;
      }

      return true;
    });

    console.log("Results:", results.length);
    console.log("Filtered:", list.length);

    return [...list].sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortKey === "match") {
        return dir * ((a.match_score ?? 0) - (b.match_score ?? 0));
      }
      if (sortKey === "experience") {
        return dir * ((a.experience_years ?? 0) - (b.experience_years ?? 0));
      }
      return dir * (a.name ?? "").localeCompare(b.name ?? "");
  });

  }, [results, hasResults, query, minMatch, minExp, location, sortKey, sortDir]);
  
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  console.log("Paged:", paged.length);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const toggleSort = (k: SortKey) => {
    if (sortKey === k) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(k);
      setSortDir(k === "name" ? "asc" : "desc");
    }
  };

  const sortIcon = (k: SortKey) =>
    sortKey !== k ? (
      <ArrowUpDown className="ml-1 inline h-3 w-3 opacity-50" />
    ) : sortDir === "asc" ? (
      <ArrowUp className="ml-1 inline h-3 w-3" />
    ) : (
      <ArrowDown className="ml-1 inline h-3 w-3" />
    );

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (paged.every((c) => selected.has(c.id))) {
      const next = new Set(selected);
      paged.forEach((c) => next.delete(c.id));
      setSelected(next);
    } else {
      const next = new Set(selected);
      paged.forEach((c) => next.add(c.id));
      setSelected(next);
    }
  };

  const bulkAction = (label: string) => {
    if (selected.size === 0) {
      toast.error("Select at least one candidate");
      return;
    }
    toast.success(`${label} queued`, { description: `${selected.size} candidate(s).` });
  };

  return (
    <PageTransition>
      <PageHeader
        eyebrow="Aurora AI"
        title="Candidate Ranking"
        description="Compose a brief, tune your filters, and let Aurora AI rank your pool by intent-matched fit."
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* Editor */}
        <Card className="shadow-elegant">
          <CardContent className="p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Badge className="bg-aurora-soft text-aurora-violet border-transparent">
                <Sparkles className="mr-1 h-3 w-3" /> Job description
              </Badge>
              <div className="flex items-center gap-1.5">
                <Button variant="ghost" size="sm" onClick={handlePaste} disabled={running}>
                  <ClipboardPaste className="mr-1 h-3.5 w-3.5" /> Paste
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setJd(SAMPLE_JD)}
                  disabled={running}
                >
                  <FileCode className="mr-1 h-3.5 w-3.5" /> Sample JD
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setJd("")}
                  disabled={!jd || running}
                >
                  <Trash2 className="mr-1 h-3.5 w-3.5" /> Clear
                </Button>
              </div>
            </div>

            <Textarea
              value={jd}
              maxLength={MAX}
              onChange={(e) => setJd(e.target.value)}
              rows={editorRows}
              placeholder="Paste a job description — responsibilities, must-have skills, seniority, location preferences…"
              className="mt-3 resize-y border-border bg-surface font-sans text-sm leading-relaxed"
              disabled={running}
            />
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>{jd.length.toLocaleString()} / {MAX.toLocaleString()} characters</span>
              <div className="flex items-center gap-2">
                <span>Editor size</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 px-2 text-[11px]"
                  onClick={() => setEditorRows((r) => Math.max(6, r - 2))}
                >
                  −
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 px-2 text-[11px]"
                  onClick={() => setEditorRows((r) => Math.min(28, r + 2))}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Inline meta filters */}
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label className="text-xs">Minimum experience: {minExp[0]} yrs</Label>
                <Slider
                  className="mt-3"
                  value={minExp}
                  onValueChange={setMinExp}
                  max={20}
                  step={1}
                />
              </div>
              <div>
                <Label className="text-xs">Location</Label>
                <div className="relative mt-2">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="e.g. Bengaluru, Remote"
                    className="h-9 pl-9 text-sm"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              <SelectField
                label="Employment type"
                value={employmentType}
                onChange={setEmploymentType}
                options={[
                  ["any", "Any"],
                  ["full_time", "Full-time"],
                  ["contract", "Contract"],
                  ["part_time", "Part-time"],
                ]}
              />
              <SelectField
                label="Work mode"
                value={workMode}
                onChange={setWorkMode}
                options={[
                  ["any", "Any"],
                  ["remote", "Remote"],
                  ["hybrid", "Hybrid"],
                  ["onsite", "On-site"],
                ]}
              />
              <SelectField
                label="Industry"
                value={industry}
                onChange={setIndustry}
                options={[
                  ["any", "Any"],
                  ["saas", "SaaS"],
                  ["fintech", "Fintech"],
                  ["ai", "AI / ML"],
                  ["commerce", "Commerce"],
                ]}
              />
              <SelectField
                label="Company size"
                value={companySize}
                onChange={setCompanySize}
                options={[
                  ["any", "Any"],
                  ["1-50", "1 – 50"],
                  ["51-250", "51 – 250"],
                  ["251-1000", "251 – 1000"],
                  ["1000+", "1000+"],
                ]}
              />
              <div>
                <Label className="text-xs">Salary range (USD, k)</Label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Min"
                    className="h-9 text-sm"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                  />
                  <Input
                    placeholder="Max"
                    className="h-9 text-sm"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs">Minimum match score: {minMatch[0]}%</Label>
                <Slider
                  className="mt-3"
                  value={minMatch}
                  onValueChange={setMinMatch}
                  max={100}
                  step={5}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-2 border-t border-border pt-4">
              <Button
                className="bg-aurora text-primary-foreground shadow-aurora hover:opacity-90"
                disabled={running}
                onClick={runRanking}
              >
                {running ? (
                  <>
                    <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Running…
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-1.5 h-4 w-4" /> Run AI Ranking
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Tips */}
        <Card className="shadow-elegant">
          <CardContent className="p-5">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-aurora-soft">
                <Lightbulb className="h-4 w-4 text-aurora-violet" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Aurora AI Tips
                </p>
                <h3 className="font-display text-sm font-semibold">Improve your match quality</h3>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
              <li>• Include explicit must-have skills and seniority.</li>
              <li>• Mention scale signals (users, RPS, team size).</li>
              <li>• Note dealbreakers — location, work mode, timezone.</li>
              <li>• Add culture cues for behavioral signal lift.</li>
            </ul>

            <SkillSuggest
              title="Required skills"
              tone="violet"
              all={SUGGESTED_REQUIRED}
              selected={requiredSkills}
              onToggle={(s) => toggleSkill(requiredSkills, setRequiredSkills, s)}
            />
            <SkillSuggest
              title="Preferred skills"
              tone="muted"
              all={SUGGESTED_PREFERRED}
              selected={preferredSkills}
              onToggle={(s) => toggleSkill(preferredSkills, setPreferredSkills, s)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      {hasResults && !running && (
        <div className="mt-8 space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-semibold tracking-tight">
                Ranking results
              </h2>
              <p className="text-xs text-muted-foreground">
                {filtered.length} candidates · sorted by{" "}
                {sortKey === "match" ? "match score" : sortKey}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search results…"
                  className="h-9 w-56 pl-9 text-sm"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
              <Select
                value={`${sortKey}-${sortDir}`}
                onValueChange={(v) => {
                  const [k, d] = v.split("-") as [SortKey, "asc" | "desc"];
                  setSortKey(k);
                  setSortDir(d);
                }}
              >
                <SelectTrigger className="h-9 w-44 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match-desc">Highest score</SelectItem>
                  <SelectItem value="experience-desc">Most experienced</SelectItem>
                  <SelectItem value="match-asc">Recent (lowest first)</SelectItem>
                  <SelectItem value="name-asc">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selected.size > 0 && (
            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-aurora-violet/30 bg-aurora-soft px-3 py-2">
              <span className="text-xs font-medium">
                {selected.size} selected
              </span>
              <div className="ml-auto flex gap-1.5">
                <Button size="sm" variant="ghost" onClick={() => bulkAction("Export")}>
                  <Download className="mr-1 h-3.5 w-3.5" /> Export
                </Button>
                <Button size="sm" variant="ghost" onClick={() => bulkAction("Compare")}>
                  <GitCompare className="mr-1 h-3.5 w-3.5" /> Compare
                </Button>
                <Button size="sm" variant="ghost" onClick={() => bulkAction("Report")}>
                  <FileText className="mr-1 h-3.5 w-3.5" /> Report
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setSelected(new Set())}>
                  Clear
                </Button>
              </div>
            </div>
          )}

          {filtered.length === 0 ? (
            <Card className="shadow-elegant">
              <CardContent className="p-6">
                <EmptyState
                  icon={Users}
                  title="No matches with current filters"
                  description="Loosen filters or re-run with a different brief."
                />
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Desktop */}
              <Card className="hidden overflow-hidden shadow-elegant md:block">
                <CardContent className="p-0">
                  <div className="max-h-[680px] overflow-auto">
                    <Table>
                      <TableHeader className="sticky top-0 z-10 bg-card">
                        <TableRow>
                          <TableHead className="w-10">
                            <button onClick={toggleSelectAll} aria-label="Select all on page">
                              {paged.every((c) => selected.has(c.id)) ? (
                                <CheckSquare className="h-4 w-4 text-aurora-violet" />
                              ) : (
                                <Square className="h-4 w-4 text-muted-foreground" />
                              )}
                            </button>
                          </TableHead>
                          <TableHead className="text-xs uppercase tracking-wider">#</TableHead>
                          <TableHead
                            className="cursor-pointer text-xs uppercase tracking-wider"
                            onClick={() => toggleSort("name")}
                          >
                            Candidate {sortIcon("name")}
                          </TableHead>
                          <TableHead
                            className="cursor-pointer text-xs uppercase tracking-wider"
                            onClick={() => toggleSort("match")}
                          >
                            Match {sortIcon("match")}
                          </TableHead>
                          <TableHead className="text-xs uppercase tracking-wider">Semantic</TableHead>
                          <TableHead className="text-xs uppercase tracking-wider">Skill</TableHead>
                          <TableHead
                            className="cursor-pointer text-xs uppercase tracking-wider"
                            onClick={() => toggleSort("experience")}
                          >
                            Exp. {sortIcon("experience")}
                          </TableHead>
                          <TableHead className="text-xs uppercase tracking-wider">Location</TableHead>
                          <TableHead className="text-xs uppercase tracking-wider">Availability</TableHead>
                          <TableHead className="text-xs uppercase tracking-wider">Recommendation</TableHead>
                          <TableHead className="text-right text-xs uppercase tracking-wider">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paged.map((c, idx) => (
                          <TableRow
                            key={c.id}
                            className="group transition-colors hover:bg-aurora-soft/40"
                          >
                            <TableCell>
                              <Checkbox
                                checked={selected.has(c.id)}
                                onCheckedChange={() => toggleSelect(c.id)}
                                aria-label={`Select ${c.name}`}
                              />
                            </TableCell>
                            <TableCell className="font-mono text-xs text-muted-foreground">
                              {(page - 1) * PAGE_SIZE + idx + 1}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-medium">{c.name}</span>
                                <span className="text-[11px] text-muted-foreground">
                                  {c.current_role} · {c.current_company}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell><ScoreBadge value={c.match_score} /></TableCell>
                            <TableCell><ScoreBadge value={c.semantic_score} /></TableCell>
                            <TableCell><ScoreBadge value={c.skill_score} /></TableCell>
                            <TableCell className="text-xs">{c.experience_years} yrs</TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {c.location}
                            </TableCell>
                            <TableCell className="text-xs">{c.availability}</TableCell>
                            <TableCell>
                              <RecommendationBadge value={c.recommendation} />
                            </TableCell>
                            <TableCell className="text-right">
                              <RowActions
                                candidate={c}
                                onView={() =>
                                  navigate({ to: "/candidates/$id", params: { id: c.id } })
                                }
                                onReport={() =>
                                  navigate({ to: "/reports/$id", params: { id: c.id } })
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Mobile */}
              <div className="space-y-3 md:hidden">
                {paged.map((c) => (
                  <Card key={c.id} className="shadow-elegant">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-medium">{c.name}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {c.current_role} · {c.current_company}
                          </p>
                        </div>
                        <ScoreBadge value={c.match_score} />
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                        <Badge variant="outline">{c.experience_years}y</Badge>
                        <Badge variant="outline">{c.location}</Badge>
                        <Badge variant="outline">{c.availability}</Badge>
                        <RecommendationBadge value={c.recommendation} />
                      </div>
                      <div className="mt-3 flex justify-end">
                        <RowActions
                          candidate={c}
                          onView={() =>
                            navigate({ to: "/candidates/$id", params: { id: c.id } })
                          }
                          onReport={() =>
                            navigate({ to: "/reports/$id", params: { id: c.id } })
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </>
          )}
        </div>
      )}
    </PageTransition>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<[string, string]>;
}) {
  return (
    <div>
      <Label className="text-xs">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="mt-2 h-9 text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(([v, l]) => (
            <SelectItem key={v} value={v}>
              {l}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function SkillSuggest({
  title,
  tone,
  all,
  selected,
  onToggle,
}: {
  title: string;
  tone: "violet" | "muted";
  all: string[];
  selected: string[];
  onToggle: (s: string) => void;
}) {
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {all.map((s) => {
          const active = selected.includes(s);
          return (
            <button
              key={s}
              onClick={() => onToggle(s)}
              className={
                "rounded-full border px-2.5 py-1 text-[11px] transition-colors " +
                (active
                  ? tone === "violet"
                    ? "border-aurora-violet/40 bg-aurora-soft text-aurora-violet"
                    : "border-foreground/30 bg-foreground/10 text-foreground"
                  : "border-border bg-surface text-muted-foreground hover:bg-muted")
              }
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RowActions({
  candidate,
  onView,
  onReport,
}: {
  candidate: RankingResult;
  onView: () => void;
  onReport: () => void;
}) {
  return (
    <div className="flex justify-end gap-1">
      <Button size="sm" variant="ghost" onClick={onView}>
        <Eye className="mr-1 h-3.5 w-3.5" /> View
      </Button>
      <Button size="sm" variant="ghost" onClick={onReport}>
        <FileText className="mr-1 h-3.5 w-3.5" /> Report
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => toast.success("Resume download queued", { description: candidate.name ?? "" })}
      >
        <Download className="mr-1 h-3.5 w-3.5" /> Resume
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => toast.success("Added to compare", { description: candidate.name ?? "" })}
      >
        <GitCompare className="mr-1 h-3.5 w-3.5" /> Compare
      </Button>
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between gap-2 pt-2">
      <p className="text-xs text-muted-foreground">
        Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => onChange(1)}
        >
          First
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => onChange(Math.max(1, page - 1))}
        >
          Prev
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((p) => Math.abs(p - page) <= 2 || p === 1 || p === totalPages)
          .map((p, i, arr) => (
            <span key={p} className="flex items-center">
              {i > 0 && arr[i - 1] !== p - 1 && (
                <span className="px-1 text-xs text-muted-foreground">…</span>
              )}
              <Button
                size="sm"
                variant={p === page ? "default" : "ghost"}
                className={p === page ? "bg-aurora text-primary-foreground" : ""}
                onClick={() => onChange(p)}
              >
                {p}
              </Button>
            </span>
          ))}
        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onChange(Math.min(totalPages, page + 1))}
        >
          Next
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onChange(totalPages)}
        >
          Last
        </Button>
      </div>
    </div>
  );
}
