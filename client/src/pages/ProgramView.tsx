import { Link, useParams } from "wouter";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronDown, Play, Phone, Sparkles } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import {
  VITALITY_RESET_PROGRAM,
  FIVE_PILLARS,
  getWeeksForProgram,
} from "@/lib/vitality-reset-content";

const PROGRAMS = [
  {
    id: "vitality-reset",
    ...VITALITY_RESET_PROGRAM,
  },
];

const ProgramView = () => {
  const [, setLocation] = useLocation();

  const { user, isAdmin } = useAuth();
  const hasAccess = Boolean(isAdmin || user?.hasAccess);

  const program = PROGRAMS[0]; // Single program: Vitality Reset
  const weeksForProgram = getWeeksForProgram("vitality-reset");

  const getPillarBadge = (pillarId: string) => {
    const pillar = FIVE_PILLARS.find((p) => p.id === pillarId);
    return pillar?.name || pillarId;
  };

  return (
    <div className="page-container ocean-gradient">
      <header className="page-header">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <img src="/branding/wellness-escape-badge.png" alt="" className="w-14 h-14 object-contain drop-shadow-sm" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/app")}
            data-testid="button-back-dashboard"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to dashboard
          </Button>
        </div>
      </header>

      <main className="content-container">
      {!hasAccess && (
        <Card className="rounded-2xl border-sky-200 bg-sky-50">
          <CardHeader>
            <CardTitle className="text-sky-900">Preview mode</CardTitle>
            <CardDescription>
              You can see the weekly outline, but lessons and videos unlock after purchase.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="text-sm text-sky-900/80">
              Ready to start? Unlock the full program to access each week’s details and videos.
            </div>
            <Button className="rounded-xl" asChild>
              <Link href="/purchase">Unlock now</Link>
            </Button>
          </CardContent>
        </Card>
      )}

        <section>
          <h1 className="text-4xl font-bold mb-3" data-testid="text-program-title">
            {program.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            {program.longDescription || program.shortDescription}
          </p>

          {/* 5 Pillars - Vitality Reset */}
          {(
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">
                The 5 Pillars You'll Master
              </h3>
              <div className="flex flex-wrap gap-2">
                {FIVE_PILLARS.map((pillar) => (
                  <div
                    key={pillar.id}
                    className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2"
                    data-testid={`pillar-${pillar.id}`}
                  >
                    <Sparkles className="w-4 h-4 text-wellness-sage" />
                    <div>
                      <span className="font-medium text-sm">{pillar.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {pillar.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-sm text-muted-foreground mt-4">
            Move through weeks in order, or return to any lesson as a refresh.
            This is your journey - go at your pace.
          </p>
        </section>

        <section className="space-y-4">
          {weeksForProgram.map((week) => (
            <Collapsible
              key={week.id}
              className="border border-border rounded-xl overflow-visible bg-card"
              data-testid={`week-${week.weekNumber}`}
            >
              <Card className="wellness-card border-0 overflow-visible">
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <CardTitle className="text-base">
                        Week {week.weekNumber}: {week.title}
                      </CardTitle>
                      {week.pillars.map((pillarId) => (
                        <Badge
                          key={pillarId}
                          variant="secondary"
                          className="text-xs"
                        >
                          {getPillarBadge(pillarId)}
                        </Badge>
                      ))}
                    </div>
                    <CardDescription>{week.summary}</CardDescription>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>
                        {week.sessions.length} lesson
                        {week.sessions.length > 1 ? "s" : ""}
                      </span>
                      {week.coachingSession && (
                        <span className="flex items-center gap-1 text-wellness-sage">
                          <Phone className="w-3 h-3" />
                          1:1 coaching call
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasAccess ? (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="hidden sm:inline-flex"
                      >
                        <Link href={`/week/${week.id}`}>
                          View week details
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="hidden sm:inline-flex rounded-xl"
                        asChild
                      >
                        <Link href="/purchase">Locked</Link>
                      </Button>
                    )}
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        aria-label="Toggle week lessons"
                        data-testid={`button-toggle-week-${week.weekNumber}`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </CardHeader>

                <CollapsibleContent>
                  <CardContent className="border-t border-border pt-4 space-y-4">
                    <div className="space-y-3">
                      {week.sessions.map((session, index) => (
                        <div
                          key={session.id}
                          className="flex items-center justify-between gap-4 text-sm"
                          data-testid={`session-${session.id}`}
                        >
                          <div>
                            <p className="font-medium flex items-center gap-2">
                              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                                {index + 1}
                              </span>
                              {session.title}
                            </p>
                            {session.subtitle && (
                              <p className="text-xs text-muted-foreground mt-1 ml-8">
                                {session.subtitle}
                              </p>
                            )}
                          </div>
                          {hasAccess ? (
                            <Button
                              size="sm"
                              asChild
                              className="shrink-0"
                              data-testid={`button-start-session-${session.id}`}
                            >
                              <Link href={`/sessions/${session.id}`}>
                                <Play className="w-3 h-3 mr-1" />
                                Start lesson
                              </Link>
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              asChild
                              className="shrink-0 rounded-xl"
                            >
                              <Link href="/purchase">Locked</Link>
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    {week.coachingSession && (
                      <div className="border-t border-border pt-4">
                        <div className="bg-wellness-sage/10 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-wellness-sage mt-0.5" />
                            <div>
                              <h4 className="font-medium text-sm">
                                {week.coachingSession.title}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {week.coachingSession.description}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                Duration: {week.coachingSession.duration}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {hasAccess ? (
                      <Button
                        variant="outline"
                        className="w-full sm:hidden"
                        asChild
                      >
                        <Link href={`/week/${week.id}`}>
                          View week details
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full sm:hidden rounded-xl"
                        asChild
                      >
                        <Link href="/purchase">Locked</Link>
                      </Button>
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default ProgramView;