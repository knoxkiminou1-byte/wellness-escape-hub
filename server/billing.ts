import type { Express, Request, Response } from "express";
import Stripe from "stripe";
import { storage } from "./storage";

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2024-06-20" });
}

async function getOrCreatePriceId(stripe: Stripe, productIdOrPriceId: string): Promise<string> {
  if (productIdOrPriceId.startsWith("price_")) {
    return productIdOrPriceId;
  }

  if (productIdOrPriceId.startsWith("prod_")) {
    const prices = await stripe.prices.list({
      product: productIdOrPriceId,
      active: true,
      limit: 1,
    });

    if (prices.data.length > 0) {
      return prices.data[0].id;
    }

    const newPrice = await stripe.prices.create({
      product: productIdOrPriceId,
      unit_amount: 49700,
      currency: "usd",
    });

    return newPrice.id;
  }

  throw new Error("STRIPE_PRICE_ID must start with 'price_' or 'prod_'");
}

export function registerBillingRoutes(app: Express) {
  app.post("/api/billing/create-checkout-session", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const stripe = getStripe();
      if (!stripe) {
        return res.status(503).json({
          error: "Payment processing is not configured yet. Please contact support.",
        });
      }

      const productIdOrPriceId = process.env.STRIPE_PRICE_ID;
      if (!productIdOrPriceId) {
        return res.status(503).json({
          error: "Product pricing is not configured yet. Please contact support.",
        });
      }

      const priceId = await getOrCreatePriceId(stripe, productIdOrPriceId);

      const appUrl = process.env.APP_URL || `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co` || "http://localhost:5000";
      const successUrl = `${appUrl}/purchase?success=1&session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${appUrl}/purchase?canceled=1`;

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [{ price: priceId, quantity: 1 }],
        customer_email: req.user!.email,
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          userId: String(req.user!.id),
        },
      });

      return res.json({ url: session.url });
    } catch (error: any) {
      console.error("create-checkout-session error", error);
      return res.status(500).json({ error: error?.message || "Failed to create checkout session" });
    }
  });

  app.get("/api/billing/status", async (req, res) => {
    const stripe = getStripe();
    const configured = !!stripe && !!process.env.STRIPE_PRICE_ID;
    return res.json({ configured });
  });
}

export async function stripeWebhookHandler(req: Request, res: Response) {
  const stripe = getStripe();
  if (!stripe) {
    return res.status(503).send("Stripe not configured");
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return res.status(500).send("Missing STRIPE_WEBHOOK_SECRET");
  }

  const sig = req.headers["stripe-signature"];
  if (!sig || typeof sig !== "string") {
    return res.status(400).send("Missing stripe-signature header");
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err?.message);
    return res.status(400).send(`Webhook Error: ${err?.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = Number(session.metadata?.userId);
      if (userId) {
        await storage.grantUserAccess(userId);
        await storage.createPurchase({
          userId,
          stripeCheckoutSessionId: session.id,
          stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : null,
          amountTotal: session.amount_total ?? null,
          currency: session.currency ?? null,
          status: "paid",
        });
      }
    }
    return res.json({ received: true });
  } catch (err: any) {
    console.error("Webhook handler error", err);
    return res.status(500).send("Webhook handler failed");
  }
}
