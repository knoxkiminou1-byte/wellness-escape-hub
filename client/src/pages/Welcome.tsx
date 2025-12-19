import { useEffect, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Calendar, Dumbbell, BookOpen, Flame, ArrowRight, Sparkles } from "lucide-react";
import { safeStorage } from "@/lib/safeStorage";

const DEFAULT_CALENDLY_URL = "https://calendly.com/wellnessescapecoach-info";

export default function Welcome() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const calendlyUrl = useMemo(() => {
    const envUrl = import.meta.env.VITE_CALENDLY_URL as string | undefined;
    return envUrl || DEFAULT_CALENDLY_URL;
  }, []);

  useEffect(() => {
    if (user && !user.hasAccess) setLocation("/purchase");
  }, [user, setLocation]);

  useEffect(() => {
    safeStorage.setItem("postPurchaseWelcomeSeen", "true");
  }, []);

  return (
    <div className="page-container ocean-gradient-hero">
      <header className="page-header">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-md overflow-hidden">
              <img src="/branding/wellness-escape-logo.png" alt="" className="w-12 h-12 object-contain" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Wellness Escape</p>
              <h1 className="text-2xl font-semibold">You're In!</h1>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Welcome to Vitality Reset. Let's get you set up for success.
          </p>
        </div>
      </header>

      <main className="content-container space-y-6">
        <Card className="glass-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-primary" />
              Your Weekly Flow
            </CardTitle>
            <CardDescription>
              Keep it simple. This is the rhythm that makes the 4 weeks work.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/50 border border-border/50">
                <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-semibold shrink-0">1</div>
                <div>
                  <p className="font-medium flex items-center gap-2">
                    <Dumbbell className="h-4 w-4 text-primary" />
                    Watch the Week's Content
                  </p>
                  <p className="text-sm text-muted-foreground">Start with Week 1 video lessons. Each week builds on the last.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/50 border border-border/50">
                <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-semibold shrink-0">2</div>
                <div>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Book Your One on One
                  </p>
                  <p className="text-sm text-muted-foreground">Schedule through Calendly. Zoom details come automatically.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/50 border border-border/50">
                <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-semibold shrink-0">3</div>
                <div>
                  <p className="font-medium flex items-center gap-2">
                    <Flame className="h-4 w-4 text-primary" />
                    Complete Your Work It Assignment
                  </p>
                  <p className="text-sm text-muted-foreground">Weekly action steps and journaling that create real change.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/50 border border-border/50">
                <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-semibold shrink-0">4</div>
                <div>
                  <p className="font-medium flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Track Your Habits
                  </p>
                  <p className="text-sm text-muted-foreground">Use the habit tracker to stay accountable week to week.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button size="lg" className="rounded-xl h-14" asChild>
            <Link href="/programs/vitality-reset">
              Start Week 1 <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-xl h-14" asChild>
            <a href={calendlyUrl} target="_blank" rel="noreferrer">
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Session
            </a>
          </Button>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Week 2 Note
            </CardTitle>
            <CardDescription>
              Week 2 is where momentum builds. If you feel "behind," you're not.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Just do the next lesson and book your call. Keep your call focused: bring 1 win, 1 struggle, and 1 question. That's how you get the most out of 30 minutes.
            </p>
          </CardContent>
        </Card>

        <Card className="premium-card bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <blockquote className="text-center space-y-3">
              <p className="text-lg italic text-foreground/80">
                "You're not starting from scratch—you're starting from experience. Everything you've learned about yourself up until now is going to serve you."
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
}
