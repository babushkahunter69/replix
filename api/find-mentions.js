export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { query, num = 10 } = req.body || {};
  if (!query) return res.status(400).json({ error: "Missing query" });

  const key = process.env.SERPAPI_KEY;
  if (!key) return res.status(500).json({ error: "SERPAPI_KEY not configured" });

  try {
    const sites  = "site:reddit.com OR site:quora.com OR site:tripadvisor.com OR site:trustpilot.com";
    const fullQ  = `${query} (${sites})`;
    const url    = `https://serpapi.com/search.json?q=${encodeURIComponent(fullQ)}&num=${Math.min(Number(num),50)}&tbs=qdr:y&api_key=${key}`;

    const r = await fetch(url);
    const d = await r.json();

    if (d.error) return res.status(502).json({ error: d.error });

    const now = new Date();

    const results = (d.organic_results || [])
      .filter(item => {
        const url   = (item.link    || "").toLowerCase();
        const text  = (item.snippet || "").toLowerCase();
        const title = (item.title   || "").toLowerCase();

        // Must be a valid source
        const valid = url.includes("reddit.com") || url.includes("quora.com") ||
                      url.includes("tripadvisor.com") || url.includes("trustpilot.com");
        if (!valid) return false;

        // Skip subreddit/topic homepages — must be a specific post/thread
        if (url.includes("reddit.com") && !url.includes("/comments/")) return false;
        if (url.includes("quora.com") && url.split("/").length < 5) return false;

        // Skip archived or locked threads
        if (text.includes("archived") || text.includes("locked") ||
            title.includes("archived") || title.includes("locked")) return false;

        // Must have a meaningful snippet (not just a site description)
        if ((item.snippet || "").length < 60) return false;

        // Skip if older than 12 months (based on SerpApi date field)
        if (item.date) {
          const posted = new Date(item.date);
          if (!isNaN(posted)) {
            const monthsOld = (now - posted) / (1000 * 60 * 60 * 24 * 30);
            if (monthsOld > 12) return false;
          }
        }

        return true;
      })
      .map((item, i) => {
        const domain = (() => {
          try { return new URL(item.link).hostname.replace("www.", ""); } catch { return ""; }
        })();

        let source = "Forum";
        if (domain.includes("reddit"))          source = "Reddit";
        else if (domain.includes("quora"))      source = "Quora";
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
