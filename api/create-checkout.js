import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { plan, uid, email } = req.body || {};
  if (!plan || !uid || !email) return res.status(400).json({ error: "Missing required fields" });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const prices = {
    pro:    process.env.STRIPE_PRO_PRICE_ID,
    agency: process.env.STRIPE_AGENCY_PRICE_ID,
  };

  if (!prices[plan]) return res.status(400).json({ error: "Invalid plan" });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [{ price: prices[plan], quantity: 1 }],
    metadata: { uid, plan },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true`,
    cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
  });

  res.status(200).json({ url: session.url });
}
