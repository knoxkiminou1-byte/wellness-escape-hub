import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Sparkles, Heart, Zap, Sun, Star, Play, Phone, Flame, CheckCircle } from "lucide-react";
import { FIVE_PILLARS, VITALITY_RESET_PROGRAM } from "@/lib/vitality-reset-content";

const brandLogo = "/branding/wellness-escape-logo.png";

const PILLAR_ICONS = [Sparkles, Heart, Zap, Sun, Star];

const Landing = () => {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  const handleEnter = () => {
    if (user) {
      setLocation("/app");
    } else {
      setLocation("/auth/signin");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="ocean-gradient-hero py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-8 relative">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 bg-primary/10 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-xl overflow-hidden border border-primary/20">
              <img src={brandLogo} alt="Wellness Escape" className="w-24 h-24 object-contain" />
            </div>
          </div>

          <div className="space-y-4">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight text-display"
              data-testid="text-hero-title"
            >
              Vitality Reset
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground/90">
              {VITALITY_RESET_PROGRAM.tagline}
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real Change for Real Women Over 40
            </p>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleEnter}
              size="lg"
              className="text-lg px-10 py-7 rounded-2xl shadow-xl transition-all hover:scale-105"
              data-testid="button-enter"
            >
              Begin Your Transformation
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-display">This Isn't About Perfection</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              It's about progress that actually fits YOUR life. No extreme
              diets. No punishing workouts. No all-or-nothing thinking. Just smart,
              sustainable strategies designed specifically for women over 40.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="glass-card text-center">
              <CardContent className="pt-6 space-y-2">
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">8</div>
                <p className="text-sm text-muted-foreground">
                  Video lessons across 4 weeks
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card text-center">
              <CardContent className="pt-6 space-y-2">
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">4</div>
                <p className="text-sm text-muted-foreground">
                  Private 1:1 coaching calls
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card text-center">
              <CardContent className="pt-6 space-y-2">
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">4</div>
                <p className="text-sm text-muted-foreground">
                  Work It weekly assignments
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 ocean-gradient-subtle">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-display">
              The 5 Pillars You'll Master
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FIVE_PILLARS.map((pillar, index) => {
              const Icon = PILLAR_ICONS[index % PILLAR_ICONS.length];
              return (
                <Card
                  key={pillar.id}
                  className="glass-card premium-card-hover"
                  data-testid={`pillar-card-${pillar.id}`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg">{pillar.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-display">This Is For You If:</h2>
          </div>

          <div className="space-y-3">
            {[
              "You're over 40 and tired of programs designed for 25-year-olds",
              "You want to lose weight, gain energy, and feel strong—without extremes",
              "You're done with all-or-nothing approaches that don't last",
              "You're ready to invest in yourself and make real, lasting change",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 glass-card p-4 rounded-xl"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
                <p className="text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 ocean-gradient-subtle">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-display">Meet Your Guide</h2>
          <p className="text-lg text-muted-foreground">
            I'm Marti Shaw, and I've spent over 30 years in the fitness and
            wellness industry helping women transform their health. As a
            Certified Personal Trainer, Wellness Coach, Life Coach, and Pilates
            Instructor, I understand what works for women over 40—because I've
            been coaching them for decades.
          </p>
          <p className="text-muted-foreground">
            This program is everything I've learned, distilled into 4 powerful
            weeks.
          </p>
          <p className="text-lg font-medium text-primary">
            Let's do this together.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 ocean-gradient-hero">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-display">Ready to Begin?</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A month from now, you could be waking up with more energy, feeling
            strong in your body, and showing up as the best version of yourself.
          </p>
          <p className="text-muted-foreground">
            Or you could be exactly where you are right now.
          </p>
          <p className="font-medium text-lg">The choice is yours.</p>

          <Button
            onClick={handleEnter}
            size="lg"
            className="text-lg px-10 py-7 rounded-2xl shadow-xl mt-4 transition-all hover:scale-105"
            data-testid="button-enter-bottom"
          >
            Start Your Vitality Reset
          </Button>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border bg-white">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>
            Questions? Email{" "}
            <a
              href="mailto:info@wellnessescapecoach.com"
              className="text-primary hover:underline"
            >
              info@wellnessescapecoach.com
            </a>
          </p>
          <p className="mt-2">Wellness Escape by Marti Shaw</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
