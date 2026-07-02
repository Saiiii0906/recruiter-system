import { FileText } from "lucide-react";

interface Props {
  candidateName: string;
}

export default function ReportHeader({ candidateName }: Props) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Candidate Report
        </h1>

        <p className="text-muted-foreground">
          {candidateName}
        </p>
      </div>

      <FileText className="h-10 w-10 text-primary" />
    </div>
  );
}