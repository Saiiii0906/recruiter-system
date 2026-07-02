import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Monitor,
  Moon,
  Sparkles,
  Sun,
  Users,
  Settings as SettingsIcon,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "@/contexts/ThemeProvider";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GlobalSearch({ open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setTheme } = useTheme();
  const [value, setValue] = useState("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  const close = () => {
    onOpenChange(false);
    setValue("");
  };
  const go = (to: string) => {
    close();
    navigate({ to });
  };

  const trimmed = value.trim();
  const looksLikeId = trimmed.length > 0 && /^[A-Za-z0-9_\-]+$/.test(trimmed);

  // Pull cached ranking results, if any
  const cachedRanking =
    (queryClient.getQueryData(["ranking-last"]) as Array<{ candidate_id: string; name?: string }> | undefined) ??
    [];
  const candidateMatches = trimmed
    ? cachedRanking
        .filter(
          (c) =>
            String(c.candidate_id).toLowerCase().includes(trimmed.toLowerCase()) ||
            c.name?.toLowerCase().includes(trimmed.toLowerCase()),
        )
        .slice(0, 5)
    : [];

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search candidates, reports, commands…"
        value={value}
        onValueChange={setValue}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {looksLikeId && (
          <>
            <CommandGroup heading="Open by ID">
              <CommandItem onSelect={() => go(`/candidates/${trimmed}`)}>
                <Users className="mr-2 h-4 w-4" /> Open candidate{" "}
                <span className="ml-1 font-mono text-xs text-muted-foreground">
                  {trimmed}
                </span>
              </CommandItem>
              <CommandItem onSelect={() => go(`/reports/${trimmed}`)}>
                <FileText className="mr-2 h-4 w-4" /> Open report{" "}
                <span className="ml-1 font-mono text-xs text-muted-foreground">
                  {trimmed}
                </span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {candidateMatches.length > 0 && (
          <>
            <CommandGroup heading="Recent candidates">
              {candidateMatches.map((c) => (
                <CommandItem
                  key={c.candidate_id}
                  onSelect={() => go(`/candidates/${c.candidate_id}`)}
                >
                  <Users className="mr-2 h-4 w-4" />
                  {c.name ?? `Candidate ${c.candidate_id}`}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => go("/")}>
            <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
          </CommandItem>
          <CommandItem onSelect={() => go("/ranking")}>
            <Sparkles className="mr-2 h-4 w-4" /> Candidate Ranking
          </CommandItem>
          <CommandItem onSelect={() => go("/candidates")}>
            <Users className="mr-2 h-4 w-4" /> Candidates
          </CommandItem>
          <CommandItem onSelect={() => go("/reports")}>
            <FileText className="mr-2 h-4 w-4" /> Reports
          </CommandItem>
          <CommandItem onSelect={() => go("/analytics")}>
            <BarChart3 className="mr-2 h-4 w-4" /> Analytics
          </CommandItem>
          <CommandItem onSelect={() => go("/settings")}>
            <SettingsIcon className="mr-2 h-4 w-4" /> Settings
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => go("/ranking")}>
            <Sparkles className="mr-2 h-4 w-4" /> Generate new report
          </CommandItem>
          <CommandItem
            onSelect={() => {
              queryClient.invalidateQueries();
              toast.success("Refreshed all data");
              close();
            }}
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh all data
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading="Theme">
          <CommandItem
            onSelect={() => {
              setTheme("light");
              toast.success("Light theme");
              close();
            }}
          >
            <Sun className="mr-2 h-4 w-4" /> Light
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setTheme("dark");
              toast.success("Dark theme");
              close();
            }}
          >
            <Moon className="mr-2 h-4 w-4" /> Dark
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setTheme("system");
              toast.success("System theme");
              close();
            }}
          >
            <Monitor className="mr-2 h-4 w-4" /> System
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
