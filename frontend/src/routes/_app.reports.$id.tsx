import type { ReactNode } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { ArrowLeft, Download, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { reportService } from "@/services/report.service";
import type { Report } from "@/types";

export const Route = createFileRoute("/_app/reports/$id")({
  component: ReportDetailsPage,
});

function ReportDetailsPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<Report | null>(null);
  useEffect(() => {
    async function load() {
      try {
        const data = await reportService.getById(id);
        console.log("REPORT:", data);
        setReport(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Loading Report...
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Report not found.
      </div>
    );
  }

  return (
  <div className="container mx-auto max-w-7xl space-y-6 p-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate({ to: "/reports" })}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <h1 className="mt-4 text-4xl font-bold">
          Candidate Report
        </h1>

        <p className="mt-1 text-muted-foreground">
          Recruiter AI Generated Report
        </p>

      </div>

      <div className="flex gap-2">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>

        <Button variant="outline">
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
      </div>
    </div>

    <Separator />
    {/* Candidate */}
    <Card>
      <CardContent className="space-y-6 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              {report.name}
            </h2>

            <p className="text-lg text-muted-foreground">
              {report.headline}
            </p>
          </div>
          <Badge className="px-4 py-2 text-base">
            {report.profile_score}%
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <InfoCard
            title="Current Role"
            value={report.current_role}
          />
          <InfoCard
            title="Company"
            value={report.company}
          />

          <InfoCard
            title="Experience"
            value={`${report.experience} Years`}
          />

          <InfoCard
            title="Country"
            value={report.country}
          />

        </div>
      </CardContent>
    </Card>
        {/* Summary */}

    <Card>
      <CardContent className="p-6">
        <h2 className="mb-4 text-2xl font-semibold">
          Professional Summary
        </h2>

        <p className="leading-8 text-muted-foreground">
          {report.summary}
        </p>
      </CardContent>
    </Card>

    {/* Skills */}
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-5 text-2xl font-semibold">
          Technical Skills
        </h2>

        <div className="flex flex-wrap gap-3">
          {report.skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="px-4 py-2"
            >
              {skill}
            </Badge>
          ))}

        </div>
      </CardContent>
    </Card>

    {/* Recommendation */}
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-4 text-2xl font-semibold">
          Recruiter Recommendation
        </h2>

        <p className="rounded-lg border bg-muted/40 p-4 leading-7">
          {report.recommendation}
        </p>
      </CardContent>
    </Card>

    <Card>
      <CardContent className="p-6">
        <h2 className="mb-5 text-2xl font-semibold">
          Career History
        </h2>

    <div className="space-y-6">
      {report.career_history.map((job: any, index: number) => (
        <div
          key={`${job.company}-${job.title}-${index}`}
          className="border-l-2 border-primary pl-4"
        >
          <h3 className="font-semibold text-lg">
            {job.title}
          </h3>

          <p className="text-muted-foreground">
            {job.company}
          </p>

          <p className="text-sm text-muted-foreground mt-1">
            {job.start_date}
            {" — "}
            {job.end_date ?? "Present"}
          </p>

          <p className="mt-3 text-sm leading-7">
            {job.description}
          </p>
        </div>
      ))}
    </div>
  </CardContent>
</Card>

<div className="grid gap-6 md:grid-cols-2">

  <Card>
    <CardContent className="p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Education
      </h2>

      {report.education.map((edu, index) => (
        <div
          key={`${edu.institution}-${index}`}
          className="mb-4"
        >
          <p className="font-medium">
            {edu.degree}
          </p>

          <p className="text-muted-foreground">
            {edu.institution}
          </p>

          {edu.year && (
            <p className="text-sm text-muted-foreground">
              {edu.year}
            </p>
          )}
        </div>
      ))}
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Languages
      </h2>

      <div className="flex flex-wrap gap-2">
        {report.languages.map((language) => (
          <Badge
            key={language}
            variant="outline"
          >
            {language}
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>

    </div>
  </div>
  );
}

function InfoCard({title, value,}: {title: string; value: ReactNode;}) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">
          {title}
        </p>

        <h3 className="mt-2 text-lg font-semibold">
          {value}
        </h3>
      </CardContent>
    </Card>
  );
}
