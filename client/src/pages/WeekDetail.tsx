import { Link, useParams, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Phone, ClipboardList, Sparkles, Lock } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { WorkoutTimer } from "@/components/WorkoutTimer";
import {
  VITALITY_RESET_PROGRAM,
  FIVE_PILLARS,
  getWeeksForProgram,
} from "@/lib/vitality-reset-content";

const PROGRAMS = [
  {
    id: "vitality-reset",
    title: VITALITY_RESET_PROGRAM.title,
  },
];

const WeekDetail = () => {
  const params = useParams<{ weekId: string }>();
  const weekId = params.weekId;
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const hasAccess = user?.hasAccess ?? false;

  if (!hasAccess) {
    return (
      <div className="page-container ocean-gradient">
        <header className="page-header">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <img src="/branding/wellness-escape-badge.png" alt="" className="w-14 h-14 object-contain drop-shadow-sm" />
            <Button variant="ghost" size="sm" onClick={() => setLocation("/app")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to program
            </Button>
          </div>
        </header>
        <main className="content-container flex items-center justify-center py-12">
          <Card className="glass-card max-w-md text-center">
            <CardHeader>
              <Lock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <CardTitle>Premium Content Locked</CardTitle>
              <CardDescription>Purchase the Vitality Reset program to access week details and video lessons.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => setLocation("/purchase")}>
                Unlock Full Access
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const program = PROGRAMS[0]; // Single program: Vitality Reset
  const weeksForProgram = getWeeksForProgram("vitality-reset");

  const week =
    weeksForProgram.find((w) => w.id === weekId) ?? weeksForProgram[0];

  const getPillarInfo = (pillarId: string) => {
    return FIVE_PILLARS.find((p) => p.id === pillarId);
  };

  return (
    <div className="page-container ocean-gradient">
      <header className="page-header">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <img src="/branding/wellness-escape-badge.png" alt="" className="w-14 h-14 object-contain drop-shadow-sm" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/program")}
            data-testid="button-back-program"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to program
          </Button>
          <div className="text-sm text-muted-foreground">{program.title}</div>
        </div>
      </header>

      <main className="content-container">
        <section>
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="text-base">Movement Library</CardTitle>
              <CardDescription>
                Use these as quick references for the core moves. Timer included.
                <span className="block mt-1 text-xs opacity-80">
                  Movement demos coming soon (video or photo guidance).
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card p-4">
                  <img src="/movement/plank.svg" alt="Plank" className="h-20 w-full object-contain" />
                  <div className="mt-2 font-medium text-sm">Plank</div>
                  <div className="text-xs text-muted-foreground">Keep ribs down, breathe, steady core.</div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4">
                  <img src="/movement/pushup.svg" alt="Push up" className="h-20 w-full object-contain" />
                  <div className="mt-2 font-medium text-sm">Push ups</div>
                  <div className="text-xs text-muted-foreground">Tight body line, chest to floor, controlled tempo.</div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4">
                  <img src="/movement/squat.svg" alt="Squat" className="h-20 w-full object-contain" />
                  <div className="mt-2 font-medium text-sm">Squats</div>
                  <div className="text-xs text-muted-foreground">Sit back, knees track, drive through the floor.</div>
                </div>
              </div>
              <WorkoutTimer presetsSeconds={[30, 45, 60, 90]} />
            </CardContent>
          </Card>
        </section>
        <section>
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <h1 className="text-2xl font-semibold" data-testid="text-week-title">
              Week {week.weekNumber}: {week.title}
            </h1>
            {week.pillars.map((pillarId) => {
              const pillar = getPillarInfo(pillarId);
              return pillar ? (
                <Badge key={pillarId} variant="secondary" className="text-xs">
                  {pillar.name}
                </Badge>
              ) : null;
            })}
          </div>
          <p className="text-sm text-muted-foreground">{week.summary}</p>
        </section>

        {week.pillars.length > 0 && (
          <section>
            <Card className="wellness-card bg-wellness-sage/5 border-wellness-sage/20">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-wellness-sage" />
                  This Week's Focus
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {week.pillars.map((pillarId) => {
                  const pillar = getPillarInfo(pillarId);
                  return pillar ? (
                    <div key={pillarId}>
                      <p className="font-medium text-sm">{pillar.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {pillar.description}
                      </p>
                    </div>
                  ) : null;
                })}
              </CardContent>
            </Card>
          </section>
        )}

        <section>
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="text-base">This Week's Lessons</CardTitle>
              <CardDescription>
                Open each lesson, watch the video, and complete the progression
                assignments before you move on.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {week.sessions.map((session, index) => (
                <div
                  key={session.id}
                  className="border border-border rounded-lg p-4 space-y-3"
                  data-testid={`session-card-${session.id}`}
                >
                  <div className="flex items-center justify-between gap-4">
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
                    <Button
                      size="sm"
                      asChild
                      className="shrink-0"
                      data-testid={`button-start-session-${session.id}`}
                    >
                      <Link href={`/session/${session.id}`}>
                        <Play className="w-3 h-3 mr-1" />
                        Start
                      </Link>
                    </Button>
                  </div>

                  {session.progressionAssignments.length > 0 && (
                    <div className="ml-8 space-y-2">
                      <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <ClipboardList className="w-3 h-3" />
                        Progressive Assignments
                      </p>
                      {session.progressionAssignments.map((assignment) => (
                        <div
                          key={assignment.id}
                          className="bg-muted/50 rounded p-2 text-xs"
                        >
                          <p className="font-medium">{assignment.title}</p>
                          {assignment.estimatedMinutes && (
                            <p className="text-muted-foreground">
                              ~{assignment.estimatedMinutes} min
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {week.coachingSession && (
          <section>
            <Card className="wellness-card border-wellness-sage/30">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Phone className="w-4 h-4 text-wellness-sage" />
                  {week.coachingSession.title}
                </CardTitle>
                <CardDescription>
                  {week.coachingSession.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">What to bring:</p>
                  <ul className="space-y-1">
                    {week.coachingSession.whatToBring.map((item, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-wellness-sage">-</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-muted-foreground">
                  Duration: {week.coachingSession.duration}
                </p>
                <Button variant="outline" className="w-full">
                  <Link href="/schedule">Schedule your coaching call</Link>
                </Button>
              </CardContent>
            </Card>
          </section>
        )}

        <section>
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="text-base">Community and Support</CardTitle>
              <CardDescription>
                Share wins, questions, and check in with other participants in
                this week's community thread.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setLocation(`/community?week=${week.id}`)}
                data-testid="button-community"
              >
                View community thread for this week
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default WeekDetail;
