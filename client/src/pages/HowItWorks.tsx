import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "wouter";
import {
  ArrowLeft,
  Play,
  Calendar,
  Phone,
  ClipboardList,
  BookOpen,
  Users,
  Sparkles,
} from "lucide-react";
import {
  VITALITY_RESET_PROGRAM,
  FIVE_PILLARS,
} from "@/lib/vitality-reset-content";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" asChild data-testid="button-back-dashboard">
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl space-y-8">
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-bold" data-testid="text-page-title">
            How Vitality Reset Works
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {VITALITY_RESET_PROGRAM.shortDescription}
          </p>
        </section>

        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-wellness-sage" />
              Who This Is For
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This program is designed for real women over 40 who are done wasting time on things that don't work. You're juggling career, family, relationships, and a million responsibilities. You deserve to feel strong, energized, and confident in your body.
            </p>
            <p className="text-muted-foreground">
              {VITALITY_RESET_PROGRAM.aboutMarti}
            </p>
          </CardContent>
        </Card>

        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Program Structure
            </CardTitle>
            <CardDescription>
              A complete 4 week transformation with everything you need
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-md bg-wellness-sage/10 border border-wellness-sage/20">
              <p className="font-medium text-sm text-wellness-sage">4 Themed Weeks That Build on Each Other</p>
              <p className="text-xs text-muted-foreground mt-1">
                Week 1: Prioritize & Optimize · Week 2: Work It · Week 3: Energize · Week 4: Radiate
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
                <Play className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">8 Video Lessons</p>
                  <p className="text-xs text-muted-foreground">
                    About 2 lessons per week, building on each other
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">4 Private Coaching Calls</p>
                  <p className="text-xs text-muted-foreground">
                    One 30 minute 1:1 session each week with Marti
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
                <ClipboardList className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Progressive Assignments</p>
                  <p className="text-xs text-muted-foreground">
                    Worksheets and action guides for each lesson
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50">
                <BookOpen className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Journaling Prompts</p>
                  <p className="text-xs text-muted-foreground">
                    Reflection questions to track your transformation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50 sm:col-span-2">
                <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Optional Community</p>
                  <p className="text-xs text-muted-foreground">
                    Connect with other women on the same journey
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-wellness-sage" />
              The 5 Pillars
            </CardTitle>
            <CardDescription>
              The framework that guides your transformation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {FIVE_PILLARS.map((pillar, index) => (
                <div
                  key={pillar.id}
                  className="flex items-start gap-3"
                  data-testid={`pillar-${pillar.id}`}
                >
                  <span className="bg-wellness-sage text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium">{pillar.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="pt-4">
          <Button asChild className="w-full" size="lg" data-testid="button-go-to-program">
            <Link href="/program">
              Go to Vitality Reset
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;
