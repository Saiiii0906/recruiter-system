import { Card, CardContent } from "@/components/ui/card";

interface Props {
  title: string;
  value: string;
}

export default function ReportCard({
  title,
  value,
}: Props) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-2 font-semibold">
          {title}
        </h3>

        <p className="text-muted-foreground whitespace-pre-wrap">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}