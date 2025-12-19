import { useMemo } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ExternalLink, Info, AlertCircle, Video } from "lucide-react";

const DEFAULT_CALENDLY_URL = "https://calendly.com/wellnessescapecoach-info";

export default function Schedule() {
  const calendlyUrl = useMemo(() => {
    const envUrl = import.meta.env.VITE_CALENDLY_URL as string | undefined;
    return envUrl || DEFAULT_CALENDLY_URL;
  }, []);

  const isConfigured = !!calendlyUrl;

  return (
    <div className="page-container ocean-gradient">
      <header className="page-header">
        <div className="container mx-auto px-4 py-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Wellness Escape</p>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" /> Schedule Your One on One
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Book your 30 minute session. Zoom details will be handled through Calendly.
          </p>
        </div>
      </header>

      <main className="content-container space-y-6">
        <Card className="glass-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" /> How to Use Your Call
            </CardTitle>
            <CardDescription>
              Keep it focused so you get the most out of 30 minutes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="premium-card p-4 text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">1</span>
                </div>
                <p className="font-medium text-sm">One Win</p>
                <p className="text-xs text-muted-foreground">Share something that worked</p>
              </div>
              <div className="premium-card p-4 text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">1</span>
                </div>
                <p className="font-medium text-sm">One Struggle</p>
                <p className="text-xs text-muted-foreground">Where you need support</p>
              </div>
              <div className="premium-card p-4 text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">1</span>
                </div>
                <p className="font-medium text-sm">One Question</p>
                <p className="text-xs text-muted-foreground">Get clarity on something specific</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Video className="h-4 w-4" />
              <span>Zoom details are sent automatically through Calendly</span>
            </div>
          </CardContent>
        </Card>

        {!isConfigured ? (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Scheduling Coming Soon
              </CardTitle>
              <CardDescription>
                We're setting up the booking system. Check back soon to schedule your sessions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                In the meantime, you can email us to schedule your call.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="rounded-xl" asChild>
                <a href={calendlyUrl} target="_blank" rel="noreferrer">
                  Open Calendly <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
              <Button variant="outline" className="rounded-xl" asChild>
                <a href={calendlyUrl} target="_blank" rel="noreferrer">
                  Schedule All 4 Sessions
                </a>
              </Button>
            </div>

            <Card className="glass-card overflow-hidden">
              <CardHeader>
                <CardTitle>Book Inside the App</CardTitle>
                <CardDescription>
                  If the embed looks tight on mobile, use the Open button above.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground mb-3 flex items-start gap-2">
                  <Info className="h-3 w-3 mt-0.5 shrink-0" />
                  <span>
                    Tip: if you see a profile page instead of booking options, the calendar may need a specific event type link.
                  </span>
                </div>
                <div className="rounded-2xl overflow-hidden border border-border bg-white">
                  <iframe
                    title="Calendly"
                    src={calendlyUrl}
                    className="w-full"
                    style={{ height: 700, minHeight: 500 }}
                  />
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
