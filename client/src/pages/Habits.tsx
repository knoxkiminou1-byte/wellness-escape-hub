import { useMemo, useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { CalendarCheck2, CheckSquare, RotateCcw, Sparkles, Trophy } from "lucide-react";
import { VITALITY_RESET_WEEKS } from "@/lib/vitality-reset-content";
import { safeStorage } from "@/lib/safeStorage";
import { toast } from "sonner";

type HabitKey =
  | "workout_completed"
  | "scheduled_call"
  | "hydration"
  | "mobility"
  | "protein";

type WeekHabits = Record<HabitKey, boolean>;

const HABITS: { key: HabitKey; label: string; hint: string }[] = [
  {
    key: "workout_completed",
    label: "Completed this week's workout",
    hint: "Watch the video and do the assignments.",
  },
  {
    key: "scheduled_call",
    label: "Scheduled my 30 minute one on one",
    hint: "Book through Calendly.",
  },
  {
    key: "hydration",
    label: "Hydration check",
    hint: "Aim for steady water all day.",
  },
  {
    key: "mobility",
    label: "Mobility or stretch session",
    hint: "Even 10 minutes counts.",
  },
  {
    key: "protein",
    label: "Protein focus",
    hint: "Build meals around protein first.",
  },
];

const defaultWeekHabits = (): WeekHabits => ({
  workout_completed: false,
  scheduled_call: false,
  hydration: false,
  mobility: false,
  protein: false,
});

function storageKey(weekId: string) {
  return `habits:${weekId}`;
}

export default function Habits() {
  const weeks = useMemo(() => VITALITY_RESET_WEEKS, []);
  const [activeWeekId, setActiveWeekId] = useState<string>(weeks[0]?.id ?? "week-1");

  const [weekHabits, setWeekHabits] = useState<WeekHabits>(() => {
    return safeStorage.getJSON<WeekHabits>(storageKey(activeWeekId), defaultWeekHabits());
  });

  const switchWeek = (weekId: string) => {
    setActiveWeekId(weekId);
    setWeekHabits(safeStorage.getJSON<WeekHabits>(storageKey(weekId), defaultWeekHabits()));
  };

  const setHabit = (key: HabitKey, value: boolean) => {
    const updated: WeekHabits = { ...weekHabits, [key]: value };
    setWeekHabits(updated);
    safeStorage.setJSON(storageKey(activeWeekId), updated);
    if (value) {
      const done = HABITS.filter((h) => updated[h.key]).length;
      if (done === HABITS.length) {
        toast.success("All habits complete for the week!");
      }
    }
  };

  const resetWeek = () => {
    const blank = defaultWeekHabits();
    setWeekHabits(blank);
    safeStorage.setJSON(storageKey(activeWeekId), blank);
    toast("Week reset");
  };

  const total = HABITS.length;
  const done = HABITS.filter((h) => weekHabits[h.key]).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const activeWeek = weeks.find((w) => w.id === activeWeekId) ?? weeks[0];

  return (
    <div className="page-container ocean-gradient">
      <header className="page-header">
        <div className="container mx-auto px-4 py-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Wellness Escape</p>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-primary" /> Habit Tracker
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Check it off weekly. Consistency beats intensity.
          </p>
        </div>
      </header>

      <main className="content-container space-y-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" /> Choose Your Week
            </CardTitle>
            <CardDescription>
              Track Week 1 through Week 4. Week 2 is where momentum builds.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {weeks.map((w) => (
              <Button
                key={w.id}
                variant={w.id === activeWeekId ? "default" : "outline"}
                className="rounded-xl"
                onClick={() => switchWeek(w.id)}
              >
                Week {w.weekNumber}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2">
                <CalendarCheck2 className="h-5 w-5 text-primary" /> Week {activeWeek.weekNumber}: {activeWeek.title}
              </span>
              <Button variant="outline" size="sm" className="rounded-xl" onClick={resetWeek}>
                <RotateCcw className="h-4 w-4 mr-2" /> Reset
              </Button>
            </CardTitle>
            <CardDescription>{activeWeek.summary}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Weekly progress</span>
                <span className="flex items-center gap-1">
                  {done}/{total}
                  {done === total && <Trophy className="h-3 w-3 text-yellow-500" />}
                </span>
              </div>
              <Progress value={pct} className="h-2" />
            </div>

            <div className="space-y-3">
              {HABITS.map((h) => (
                <div
                  key={h.key}
                  className={`flex items-start gap-3 rounded-2xl border p-4 transition-all ${
                    weekHabits[h.key]
                      ? "bg-primary/5 border-primary/20"
                      : "bg-white/50 border-border"
                  }`}
                >
                  <Checkbox
                    checked={Boolean(weekHabits[h.key])}
                    onCheckedChange={(v) => setHabit(h.key, Boolean(v))}
                    className="mt-0.5"
                  />
                  <div>
                    <div className={`font-medium ${weekHabits[h.key] ? "line-through text-muted-foreground" : ""}`}>
                      {h.label}
                    </div>
                    <div className="text-xs text-muted-foreground">{h.hint}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
}
