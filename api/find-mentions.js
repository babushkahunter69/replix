export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { query } = req.body || {};
  if (!query) return res.status(400).json({ error: "Missing query" });

  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return res.status(500).json({ error: "Search API key not configured" });

  // Search multiple platforms via Google Custom Search
  const searchKey = process.env.GOOGLE_SEARCH_API_KEY || key;
  const cx        = process.env.GOOGLE_SEARCH_CX;

  if (!cx) return res.status(500).json({ error: "Google Search CX not configured. Add GOOGLE_SEARCH_CX to env vars." });

  try {
    const sites   = "site:reddit.com OR site:quora.com OR site:tripadvisor.com OR site:trustpilot.com OR site:yelp.com/talk";
    const fullQ   = `${query} (${sites})`;

    const url = `https://www.googleapis.com/customsearch/v1?key=${searchKey}&cx=${cx}&q=${encodeURIComponent(fullQ)}&num=10`;
    const r   = await fetch(url);
    const d   = await r.json();

    if (d.error) return res.status(502).json({ error: d.error.message });

    const results = (d.items || []).map((item, i) => {
      const domain = new URL(item.link).hostname.replace("www.","");
      let source = "Forum";
      if (domain.includes("reddit"))      source = "Reddit";
      else if (domain.includes("quora"))  source = "Quora";
      else if (domain.includes("tripadvisor")) source = "TripAdvisor";
      else if (domain.includes("yelp"))   source = "Yelp";
      else if (domain.includes("trustpilot")) source = "Trustpilot";

      return {
        id: `result-${i}`,
        title:   item.title,
        url:     item.link,
        snippet: item.snippet?.slice(0, 300) || "",
        source,
        date:    item.snippet?.match(/\w+ \d+, \d{4}/)?.[0] || null,
      };
    });

    res.status(200).json({ results });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
