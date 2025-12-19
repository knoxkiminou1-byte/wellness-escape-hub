import { useState, useMemo } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Flame, Lock, CheckCircle, ArrowRight, Save, Sparkles } from "lucide-react";
import { WORK_IT_WEEKS, type WorkItWeek } from "@/lib/workItContent";
import { safeStorage } from "@/lib/safeStorage";
import { toast } from "sonner";

function getStorageKey(weekId: string) {
  return `workIt:${weekId}`;
}

interface WeekProgress {
  completedSteps: number[];
  journalEntry: string;
  isComplete: boolean;
}

function loadWeekProgress(weekId: string): WeekProgress {
  return safeStorage.getJSON<WeekProgress>(getStorageKey(weekId), {
    completedSteps: [],
    journalEntry: "",
    isComplete: false,
  });
}

function saveWeekProgress(weekId: string, progress: WeekProgress) {
  safeStorage.setJSON(getStorageKey(weekId), progress);
}

export default function WorkIt() {
  const { user } = useAuth();
  const hasAccess = user?.hasAccess ?? false;

  const [activeWeek, setActiveWeek] = useState<number>(1);
  const week = useMemo(() => WORK_IT_WEEKS.find((w) => w.weekNumber === activeWeek), [activeWeek]);

  const [progress, setProgress] = useState<WeekProgress>(() =>
    loadWeekProgress(week?.id ?? "work-it-1")
  );

  const switchWeek = (weekNum: number) => {
    const newWeek = WORK_IT_WEEKS.find((w) => w.weekNumber === weekNum);
    if (newWeek) {
      setActiveWeek(weekNum);
      setProgress(loadWeekProgress(newWeek.id));
    }
  };

  const toggleStep = (index: number) => {
    const updated = progress.completedSteps.includes(index)
      ? progress.completedSteps.filter((i) => i !== index)
      : [...progress.completedSteps, index];
    const newProgress = { ...progress, completedSteps: updated };
    setProgress(newProgress);
    if (week) saveWeekProgress(week.id, newProgress);
  };

  const updateJournal = (value: string) => {
    const newProgress = { ...progress, journalEntry: value };
    setProgress(newProgress);
  };

  const handleSave = () => {
    if (week) {
      saveWeekProgress(week.id, progress);
      toast.success("Progress saved!");
    }
  };

  const markComplete = () => {
    if (week) {
      const newProgress = { ...progress, isComplete: true };
      setProgress(newProgress);
      saveWeekProgress(week.id, newProgress);
      toast.success("Week marked complete!");
    }
  };

  const stepProgress = week ? Math.round((progress.completedSteps.length / week.actionSteps.length) * 100) : 0;

  if (!hasAccess) {
    return (
      <div className="page-container ocean-gradient">
        <header className="page-header">
          <div className="container mx-auto px-4 py-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Wellness Escape</p>
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              <Flame className="h-5 w-5 text-primary" /> Work It
            </h1>
          </div>
        </header>

        <main className="content-container">
          <Card className="glass-card text-center py-12">
            <CardContent className="space-y-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-muted flex items-center justify-center">
                <Lock className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Work It is locked</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Purchase Vitality Reset to unlock your weekly assignments, journaling prompts, and accountability tracking.
                </p>
              </div>

              <div className="premium-card p-4 max-w-sm mx-auto text-left">
                <p className="text-sm font-medium mb-2">Week 1 Preview</p>
                <p className="text-sm text-muted-foreground">
                  "{WORK_IT_WEEKS[0].reflectionPrompt}"
                </p>
              </div>

              <Button asChild className="rounded-xl">
                <Link href="/purchase">
                  Unlock Vitality Reset <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </main>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="page-container ocean-gradient">
      <header className="page-header">
        <div className="container mx-auto px-4 py-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Wellness Escape</p>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" /> Work It
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your weekly assignments and accountability tracker
          </p>
        </div>
      </header>

      <main className="content-container space-y-6">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Select Week
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {WORK_IT_WEEKS.map((w) => {
              const wProgress = loadWeekProgress(w.id);
              return (
                <Button
                  key={w.id}
                  variant={w.weekNumber === activeWeek ? "default" : "outline"}
                  className="rounded-xl relative"
                  onClick={() => switchWeek(w.weekNumber)}
                >
                  Week {w.weekNumber}
                  {wProgress.isComplete && (
                    <CheckCircle className="h-3 w-3 ml-1.5 text-green-500" />
                  )}
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {week && (
          <>
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">
                      Week {week.weekNumber}: {week.title}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {week.objective}
                    </CardDescription>
                  </div>
                  {progress.isComplete && (
                    <div className="badge-included flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> Complete
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="ocean-accent-border">
                  <p className="text-sm font-medium text-primary mb-1">Why it matters</p>
                  <p className="text-sm text-muted-foreground">{week.whyItMatters}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  <span>Action Steps</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {progress.completedSteps.length}/{week.actionSteps.length}
                  </span>
                </CardTitle>
                <Progress value={stepProgress} className="h-2" />
              </CardHeader>
              <CardContent className="space-y-3">
                {week.actionSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 rounded-xl border p-4 transition-all ${
                      progress.completedSteps.includes(idx)
                        ? "bg-primary/5 border-primary/20"
                        : "bg-card border-border"
                    }`}
                  >
                    <Checkbox
                      checked={progress.completedSteps.includes(idx)}
                      onCheckedChange={() => toggleStep(idx)}
                      className="mt-0.5"
                    />
                    <span className={progress.completedSteps.includes(idx) ? "line-through text-muted-foreground" : ""}>
                      {step}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-base">Reflection Prompt</CardTitle>
                <CardDescription>{week.reflectionPrompt}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Write your reflection here..."
                  value={progress.journalEntry}
                  onChange={(e) => updateJournal(e.target.value)}
                  rows={5}
                  className="rounded-xl resize-none"
                />
                <div className="flex gap-3">
                  <Button onClick={handleSave} className="rounded-xl">
                    <Save className="h-4 w-4 mr-2" /> Save Progress
                  </Button>
                  {!progress.isComplete && (
                    <Button variant="outline" onClick={markComplete} className="rounded-xl">
                      <CheckCircle className="h-4 w-4 mr-2" /> Mark Week Complete
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-base">Journal Prompts</CardTitle>
                <CardDescription>
                  Use these in your physical journal or just think through them.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {week.journalPrompts.map((prompt, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-0.5">•</span>
                      <span className="text-muted-foreground">{prompt}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
