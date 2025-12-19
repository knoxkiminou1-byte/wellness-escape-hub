import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import {
  BookOpen,
  MessageSquare,
  Play,
  LogOut,
  User,
  Sparkles,
  Phone,
  X,
  CheckCircle,
  Lock,
  ArrowRight,
  Flame,
} from "lucide-react";
import {
  VITALITY_RESET_PROGRAM,
  FIVE_PILLARS,
} from "@/lib/vitality-reset-content";
import { BottomNav } from "@/components/BottomNav";
import { safeStorage } from "@/lib/safeStorage";

const ClientDashboard = () => {
  const { user, signOut } = useAuth();
  const [showOrientation, setShowOrientation] = useState(false);
  const hasAccess = user?.hasAccess ?? false;

  useEffect(() => {
    if (hasAccess) {
      const hasSeenOrientation = safeStorage.getItem("hasSeenOrientation");
      if (!hasSeenOrientation) {
        setShowOrientation(true);
      }
    }
  }, [hasAccess]);

  const dismissOrientation = () => {
    safeStorage.setItem("hasSeenOrientation", "true");
    setShowOrientation(false);
  };

  const displayName =
    user?.name || (user?.email ? user.email.split("@")[0] : "Guest");

  return (
    <div className="page-container ocean-gradient">
      <header className="page-header">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/branding/wellness-escape-badge.png" alt="" className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-md" />
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Wellness Escape
              </p>
              <h1 className="text-xl font-semibold" data-testid="text-welcome">
                Welcome back, {displayName}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl"
              asChild
            >
              <Link href="/profile">
                <User className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl"
              onClick={() => signOut()}
              data-testid="button-signout"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="content-container space-y-6">
        {!hasAccess && (
          <Card className="glass-card border-amber-200/50 bg-gradient-to-br from-amber-50/50 to-orange-50/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lock className="w-5 h-5 text-amber-600" />
                Unlock Your Full Program
              </CardTitle>
              <CardDescription>
                You can preview the program outline, but videos and content unlock after purchase.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="rounded-xl">
                <Link href="/purchase">
                  Unlock Vitality Reset <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {hasAccess && showOrientation && (
          <Card className="glass-card border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Welcome to Vitality Reset!
                  </CardTitle>
                  <CardDescription className="mt-2">
                    You made it! Taking this step for yourself is huge. Here's how to get the most from your 4 weeks:
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={dismissOrientation}
                  className="shrink-0 rounded-xl"
                  data-testid="button-dismiss-orientation"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 text-sm">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/50">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0">1</span>
                  <div>
                    <p className="font-medium">Watch the video lessons in order</p>
                    <p className="text-muted-foreground text-xs">Each week builds on the last.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/50">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0">2</span>
                  <div>
                    <p className="font-medium">Complete your Progressive Assignments</p>
                    <p className="text-muted-foreground text-xs">These prepare you for coaching calls.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/50">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0">3</span>
                  <div>
                    <p className="font-medium">Book your coaching calls</p>
                    <p className="text-muted-foreground text-xs">One private call per week with Marti.</p>
                  </div>
                </div>
              </div>
              <Button onClick={dismissOrientation} className="w-full rounded-xl" data-testid="button-get-started">
                Got it — Let's Get Started
              </Button>
            </CardContent>
          </Card>
        )}

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="w-5 h-5 text-primary" />
              Your Wellness Journey
            </CardTitle>
            <CardDescription>
              Built on the 5 Pillars that create lasting change.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {FIVE_PILLARS.map((pillar) => (
                <div
                  key={pillar.id}
                  className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium"
                >
                  {pillar.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center text-lg gap-2">
                <Play className="w-5 h-5 text-primary" />
                {VITALITY_RESET_PROGRAM.title}
              </CardTitle>
              <CardDescription>
                {VITALITY_RESET_PROGRAM.shortDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Your progress</span>
                  <span>Week 1 of 4</span>
                </div>
                <Progress value={10} className="h-2" />
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="w-3 h-3" />
                <span>Includes 4 private coaching calls</span>
              </div>

              <Button asChild className="w-full rounded-xl" data-testid="button-vitality-reset">
                <Link href="/program">
                  {hasAccess ? "Continue Vitality Reset" : "Preview Program"}
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full rounded-xl"
                asChild
              >
                <Link href="/how-it-works" data-testid="link-how-it-works">
                  How this program works
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center text-lg gap-2">
                <Flame className="w-5 h-5 text-primary" />
                Progressive Assignments
              </CardTitle>
              <CardDescription>
                Weekly assignments and accountability tracking.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Action steps, journaling prompts, and check-ins that create real change.
              </p>
              <Button asChild variant="outline" className="w-full rounded-xl">
                <Link href="/work-it">
                  {hasAccess ? "Open Assignments" : "Preview Assignments"}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/journal">
            <Card className="glass-card premium-card-hover h-full">
              <CardHeader>
                <CardTitle className="flex items-center text-lg gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  My Journal
                </CardTitle>
                <CardDescription>
                  Capture reflections and track how your body responds.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Start with a short entry after each lesson
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/community">
            <Card className="glass-card premium-card-hover h-full">
              <CardHeader>
                <CardTitle className="flex items-center text-lg gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Community
                </CardTitle>
                <CardDescription>
                  Celebrate breakthroughs, navigate challenges, and build friendships that last beyond the reset.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You don't have to do this alone
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <Card className="premium-card bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <blockquote className="text-center space-y-2">
              <p className="text-lg italic text-foreground/80">
                "You're not starting from scratch — you're starting from
                experience. Everything you've learned about yourself up until
                now is going to serve you."
              </p>
              <footer className="text-sm font-medium text-primary">
                — Marti Shaw
              </footer>
            </blockquote>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default ClientDashboard;
