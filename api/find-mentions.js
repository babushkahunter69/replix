export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { query } = req.body || {};
  if (!query) return res.status(400).json({ error: "Missing query" });

  const key = process.env.SERPAPI_KEY;
  if (!key) return res.status(500).json({ error: "SERPAPI_KEY not configured" });

  try {
    const sites  = "site:reddit.com OR site:quora.com OR site:tripadvisor.com OR site:trustpilot.com";
    const fullQ  = `${query} (${sites})`;
    const url    = `https://serpapi.com/search.json?q=${encodeURIComponent(fullQ)}&num=10&api_key=${key}`;

    const r = await fetch(url);
    const d = await r.json();

    if (d.error) return res.status(502).json({ error: d.error });

    const results = (d.organic_results || []).map((item, i) => {
      const domain = (() => {
        try { return new URL(item.link).hostname.replace("www.", ""); } catch { return ""; }
      })();

      let source = "Forum";
      if (domain.includes("reddit"))       source = "Reddit";
      else if (domain.includes("quora"))   source = "Quora";
      else if (domain.includes("tripadvisor")) source = "TripAdvisor";
      else if (domain.includes("trustpilot")) source = "Trustpilot";

      return {
        id:      `result-${i}`,
        title:   item.title   || "",
        url:     item.link    || "",
        snippet: (item.snippet || "").slice(0, 300),
        source,
        date:    item.date    || null,
      };
    });

    res.status(200).json({ results });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
