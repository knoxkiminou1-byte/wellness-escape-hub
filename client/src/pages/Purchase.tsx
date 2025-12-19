import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Lock, Calendar, CreditCard, CheckCircle, Sparkles, Phone, Play, Flame } from "lucide-react";
import { safeStorage } from "@/lib/safeStorage";

const DEFAULT_CALENDLY_URL = "https://calendly.com/wellnessescapecoach-info";

export default function Purchase() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [startingCheckout, setStartingCheckout] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calendlyUrl = useMemo(() => {
    const envUrl = import.meta.env.VITE_CALENDLY_URL as string | undefined;
    return envUrl || DEFAULT_CALENDLY_URL;
  }, []);

  useEffect(() => {
    if (!user?.hasAccess) return;
    const seen = safeStorage.getItem("postPurchaseWelcomeSeen");
    setLocation(seen ? "/app" : "/welcome");
  }, [user?.hasAccess, setLocation]);

  useEffect(() => {
    // Handle post-checkout redirect back from Stripe.
    // Stripe webhooks can take a moment, and auth data is cached, so we refresh a few times.
    const params = new URLSearchParams(window.location.search);
    const isSuccess = params.get("success") === "1";
    if (!isSuccess) return;

    setCheckingPayment(true);

    let attempts = 0;
    const interval = window.setInterval(async () => {
      attempts += 1;
      try {
        await queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
        await queryClient.refetchQueries({ queryKey: ["/api/auth/user"] });
      } catch {
        // ignore
      }
      if (attempts >= 15) {
        window.clearInterval(interval);
        setCheckingPayment(false);
      }
    }, 1500);

    return () => window.clearInterval(interval);
  }, []);


  const startCheckout = async () => {
    setError(null);
    setStartingCheckout(true);
    try {
      const res = await apiRequest("POST", "/api/billing/create-checkout-session", {});
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "Failed to start checkout");
      }
      if (!data?.url) throw new Error("Checkout URL missing");
      window.location.href = data.url;
    } catch (e: any) {
      setError(e?.message || "Failed to start checkout");
      setStartingCheckout(false);
    }
  };

  const features = [
    { icon: Play, text: "8 video lessons across 4 weeks" },
    { icon: Phone, text: "4 private 30-minute coaching calls" },
    { icon: Flame, text: "Weekly Work It assignments" },
    { icon: Calendar, text: "Calendly scheduling included" },
  ];

  return (
    <div className="min-h-screen ocean-gradient-hero flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-4">
          <div className="mx-auto w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-lg overflow-hidden">
            <img src="/branding/wellness-escape-logo.png" alt="Wellness Escape" className="w-16 h-16 object-contain" />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Lock className="w-3.5 h-3.5" />
              Premium Program
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-display">Vitality Reset</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              4 weeks of guided wellness coaching designed for women over 40 who want sustainable change.
            </p>
          </div>
        </div>

        <Card className="glass-card">
          <CardHeader className="text-center pb-2">
            <CardTitle className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              What's Included
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/50 border border-border/50">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="ocean-divider" />

            <div className="text-center space-y-1">
              <div className="text-4xl font-bold text-foreground">$497</div>
              <div className="text-sm text-muted-foreground">One-time payment • Lifetime access</div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <Button
              className="w-full rounded-xl h-14 text-lg"
              size="lg"
              onClick={startCheckout}
              disabled={startingCheckout}
            >
              {startingCheckout ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Redirecting to secure checkout...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Unlock Vitality Reset
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
              <span>Secure payment powered by Stripe</span>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card bg-white/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="font-medium">Preview: Schedule Your Sessions</div>
                <p className="text-sm text-muted-foreground">
                  After purchase, you'll book your 4 private coaching calls through Calendly. Zoom details are handled automatically.
                </p>
                <Button variant="outline" size="sm" className="rounded-xl" asChild>
                  <a href={calendlyUrl} target="_blank" rel="noreferrer">
                    View Calendly
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground px-4">
          Questions? Email us anytime. Already purchased and can't access? Sign out and sign back in to refresh your account.
        </p>
      </div>
    </div>
  );
}
