export const config = { runtime: "edge" };

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  const { prompt } = await req.json();

  if (!prompt || typeof prompt !== "string" || prompt.length > 4000) {
    return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Server misconfigured" }), { status: 500 });
  }

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "AI request failed" }), { status: 502 });
  }

  const text = data.content?.map(b => b.text || "").join("") || "";

  return new Response(JSON.stringify({ text: text.trim() }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
