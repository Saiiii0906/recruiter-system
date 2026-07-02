import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { PageTransition } from "@/components/common/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/_app/account")({
  head: () => ({
    meta: [
      { title: "Account — SharanAI" },
      { name: "description", content: "Manage your account and profile." },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  return (
    <PageTransition>
      <PageHeader title="Account" description="Your personal profile and security." />
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="bg-aurora text-white font-semibold">SA</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-display text-base font-semibold">Sharan Admin</p>
              <p className="text-xs text-muted-foreground">admin@sharan.ai</p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">Change photo</Button>
          </div>
          <Separator />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="first">First name</Label>
              <Input id="first" defaultValue="Sharan" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last">Last name</Label>
              <Input id="last" defaultValue="Admin" />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="admin@sharan.ai" />
            </div>
          </div>
          <Separator />
          <Button className="bg-aurora text-primary-foreground hover:opacity-90">Save changes</Button>
        </CardContent>
      </Card>
    </PageTransition>
  );
}
