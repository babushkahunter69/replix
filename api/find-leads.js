export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { query, city } = req.body || {};
  if (!query || !city) return res.status(400).json({ error: "Missing query or city" });

  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return res.status(500).json({ error: "Google Places API key not configured" });

  try {
    // Step 1: Text search for businesses
    const searchRes = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(`${query} in ${city}`)}&key=${key}`
    );
    const searchData = await searchRes.json();

    if (searchData.status !== "OK" && searchData.status !== "ZERO_RESULTS") {
      return res.status(502).json({ error: `Google Places error: ${searchData.status} - ${searchData.error_message || ""}` });
    }

    const places = (searchData.results || []).slice(0, 10);

    // Step 2: For each place, get reviews
    const businesses = await Promise.all(places.map(async (place) => {
      try {
        const detailRes = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,rating,user_ratings_total,reviews&key=${key}`
        );
        const detailData = await detailRes.json();
        const details = detailData.result || {};

        const reviews = (details.reviews || []).map(r => ({
          rating: r.rating,
          text: r.text?.slice(0, 200) || "",
          time: r.relative_time_description,
          owner_reply: r.owner_response || null,
        }));

        return {
          place_id: place.place_id,
          name: place.name,
          address: place.formatted_address,
          type: query,
          rating: details.rating || place.rating,
          user_ratings_total: details.user_ratings_total || place.user_ratings_total,
          reviews,
        };
      } catch {
        return null;
      }
    }));

    const valid = businesses.filter(Boolean);
    // Sort: unanswered first
    valid.sort((a, b) => {
      const aU = a.reviews?.filter(r => !r.owner_reply).length || 0;
      const bU = b.reviews?.filter(r => !r.owner_reply).length || 0;
      return bU - aU;
    });

    res.status(200).json({ businesses: valid });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
