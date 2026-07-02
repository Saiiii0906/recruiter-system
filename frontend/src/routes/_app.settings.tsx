import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { PageTransition } from "@/components/common/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — SharanAI" },
      { name: "description", content: "Workspace and preference settings." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <PageTransition>
      <PageHeader title="Settings" description="Configure your workspace and preferences." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Workspace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="ws-name">Workspace name</Label>
              <Input id="ws-name" placeholder="Acme Talent" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ws-domain">Primary domain</Label>
              <Input id="ws-domain" placeholder="acme.com" />
            </div>
            <Separator />
            <Button className="bg-aurora text-primary-foreground hover:opacity-90">Save</Button>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              ["New ranking completed", "Get notified when AI ranking finishes."],
              ["Candidate activity", "Updates when candidates respond."],
              ["Weekly digest", "Hiring summary every Monday."],
            ].map(([t, d]) => (
              <div key={t} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{t}</p>
                  <p className="text-xs text-muted-foreground">{d}</p>
                </div>
                <Switch />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
