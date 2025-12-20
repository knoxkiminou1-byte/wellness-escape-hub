import { useMemo, useState } from "react";
import { useParams, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Check, Share2, FileText, ClipboardList, BookOpen, Lock } from "lucide-react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { InteractiveWorksheet } from "@/components/InteractiveWorksheet";
import { BottomNav } from "@/components/BottomNav";
import { WorkoutTimer } from "@/components/WorkoutTimer";
import { WORKSHEET_DATA } from "@/data/worksheetData";
import { safeStorage } from "@/lib/safeStorage";
import {
  getSessionById,
  getWeekBySessionId,
  VITALITY_RESET_WEEKS,
  type SessionContent,
} from "@/lib/vitality-reset-content";

const getAllSessions = (): SessionContent[] => {
  const sessions: SessionContent[] = [];
  for (const week of VITALITY_RESET_WEEKS) {
    sessions.push(...week.sessions);
  }
  return sessions;
};

const SessionDetail = () => {
  const params = useParams<{ sessionId: string }>();
  const sessionId = params.sessionId;
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const hasAccess = user?.hasAccess ?? false;

  if (!hasAccess) {
    return (
      <div className="page-container ocean-gradient">
        <main className="content-container flex items-center justify-center py-12">
          <Card className="glass-card max-w-md text-center">
            <CardHeader>
              <Lock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <CardTitle>Premium Content Locked</CardTitle>
              <CardDescription>Purchase the Vitality Reset program to access all lessons and videos.</CardDescription>
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

  const [showWorksheet, setShowWorksheet] = useState(false);
  const [showAssignments, setShowAssignments] = useState(false);
  const [completedSessions, setCompletedSessions] = useState<Set<string>>(() => {
    const saved = safeStorage.getItem("completedSessions");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const allSessions = useMemo(() => getAllSessions(), []);

  const session = useMemo(() => {
    if (!sessionId) return allSessions[0];
    const found = getSessionById(sessionId);
    return found ?? allSessions[0];
  }, [sessionId, allSessions]);

  const week = useMemo(() => {
    if (!sessionId) return null;
    return getWeekBySessionId(sessionId);
  }, [sessionId]);

  const isVideoLocked = useMemo(() => {
    if (session.id === "1") return false;
    const currentIndex = allSessions.findIndex((s) => s.id === session.id);
    if (currentIndex <= 0) return false;
    const previousSession = allSessions[currentIndex - 1];
    return !completedSessions.has(previousSession.id);
  }, [session, allSessions, completedSessions]);

  const isCurrentComplete = completedSessions.has(session.id);
  const worksheetData = WORKSHEET_DATA[session.id as keyof typeof WORKSHEET_DATA];

  const handleMarkComplete = () => {
    if (isCurrentComplete) {
      return;
    }
    const updated = new Set([...completedSessions, session.id]);
    setCompletedSessions(updated);
    safeStorage.setItem("completedSessions", JSON.stringify([...updated]));
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: session.title,
          text: session.subtitle,
          url,
        });
      } catch {
        // User cancelled share
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard copy failed
    }
  };

  const handleJournalClick = () => {
    const prompt = encodeURIComponent(session.journalPrompt || "");
    setLocation(`/journal?prompt=${prompt}&session=${session.id}`);
  };

  return (
    <div className="page-container ocean-gradient">
      <header className="page-header">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/branding/wellness-escape-badge.png" alt="" className="w-14 h-14 object-contain drop-shadow-sm" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.back()}
              className="rounded-full"
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-foreground" data-testid="text-session-title">
                {session.title}
              </h1>
              {session.subtitle && (
                <p className="text-sm text-muted-foreground">{session.subtitle}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {week && `Week ${week.weekNumber} · `}
                Approx. {session.durationMinutes} minutes
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={handleShare}
            data-testid="button-share"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <main className="content-container">
        {session.description && (
          <Card className="wellness-card">
            <CardContent className="pt-4">
              <p className="text-muted-foreground">{session.description}</p>
            </CardContent>
          </Card>
        )}

        <VideoPlayer videoUrl={session.videoUrl} isLocked={isVideoLocked} />

        <WorkoutTimer presetsSeconds={[30, 45, 60, 90]} />

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Check
                  className={`w-4 h-4 ${isCurrentComplete ? "text-emerald-500" : "text-muted-foreground"}`}
                />
                Lesson Status
              </CardTitle>
              <CardDescription>
                {isCurrentComplete
                  ? "You've completed this lesson!"
                  : "Mark this lesson complete when you finish the video and assignments."}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button
                className="w-full"
                onClick={handleMarkComplete}
                disabled={isCurrentComplete}
                data-testid="button-mark-complete"
              >
                {isCurrentComplete ? "Lesson complete" : "Mark lesson complete"}
              </Button>
            </CardContent>
          </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" /> Movement Guides
            </CardTitle>
            <CardDescription>Quick visual references for the core movements in this program.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            <div className="premium-card p-4 text-center">
              <img src="/movement/plank.svg" alt="Plank" className="mx-auto h-20 w-20" />
              <p className="mt-3 font-medium">Plank</p>
            </div>
            <div className="premium-card p-4 text-center">
              <img src="/movement/pushup.svg" alt="Pushup" className="mx-auto h-20 w-20" />
              <p className="mt-3 font-medium">Pushups</p>
            </div>
            <div className="premium-card p-4 text-center">
              <img src="/movement/squat.svg" alt="Squat" className="mx-auto h-20 w-20" />
              <p className="mt-3 font-medium">Squats</p>
            </div>
          </CardContent>
        </Card>


          {worksheetData && (
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="w-4 h-4" />
                  Progression Assignment Worksheet
                </CardTitle>
                <CardDescription>
                  {showWorksheet
                    ? "Complete the worksheet questions below."
                    : "Open the interactive worksheet for this lesson."}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowWorksheet(!showWorksheet)}
                  data-testid="button-worksheet"
                >
                  {showWorksheet ? "Hide worksheet" : "Open worksheet"}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {showWorksheet && worksheetData && (
          <InteractiveWorksheet
            lessonId={session.id}
            title={worksheetData.title}
            questions={worksheetData.questions}
          />
        )}

        {session.progressionAssignments.length > 0 && (
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ClipboardList className="w-4 h-4" />
                Progressive Assignments
              </CardTitle>
              <CardDescription>
                Complete these assignments to get the most out of this lesson.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowAssignments(!showAssignments)}
                data-testid="button-show-assignments"
              >
                {showAssignments ? "Hide assignments" : "View assignments"}
              </Button>

              {showAssignments && (
                <div className="space-y-4">
                  {session.progressionAssignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="border border-border rounded-lg p-4 space-y-3"
                    >
                      <div>
                        <h4 className="font-medium">{assignment.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {assignment.description}
                        </p>
                        {assignment.estimatedMinutes && (
                          <p className="text-xs text-muted-foreground mt-1">
                            ~{assignment.estimatedMinutes} minutes
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Steps:</p>
                        <ol className="space-y-2 list-decimal list-inside">
                          {assignment.steps.map((step, index) => (
                            <li
                              key={index}
                              className="text-sm text-muted-foreground"
                            >
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>

                      {assignment.bringToCall && assignment.bringToCall.length > 0 && (
                        <div className="bg-wellness-sage/10 rounded p-3">
                          <p className="text-xs font-medium text-wellness-sage mb-1">
                            Bring to your coaching call:
                          </p>
                          <ul className="space-y-1">
                            {assignment.bringToCall.map((item, index) => (
                              <li
                                key={index}
                                className="text-xs text-muted-foreground"
                              >
                                - {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {session.journalPrompt && (
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="w-4 h-4" />
                Journal Prompt
              </CardTitle>
              <CardDescription>
                Take a few minutes to write after you finish the video.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground italic">
                "{session.journalPrompt}"
              </p>
              <Button
                className="w-full"
                onClick={handleJournalClick}
                data-testid="button-journal"
              >
                Write in journal
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default SessionDetail;