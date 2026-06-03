import { useState } from "react";

const S = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#faf9f6}
.leads{min-height:100vh;background:#faf9f6;font-family:'DM Sans',sans-serif;color:#0f0e0c;-webkit-font-smoothing:antialiased;padding:40px 24px 80px}
.leads-inner{max-width:900px;margin:0 auto}
.leads-title{font-family:'DM Serif Display',serif;font-size:28px;font-weight:400;margin-bottom:4px}
.leads-sub{font-size:14px;color:#9a9590;margin-bottom:32px}
.search-row{display:flex;gap:10px;margin-bottom:32px;flex-wrap:wrap}
.leads-input{flex:1;min-width:180px;font-family:'DM Sans',sans-serif;font-size:14px;color:#0f0e0c;background:#fff;border:1px solid #e8e4de;border-radius:8px;padding:10px 14px;outline:none;transition:border-color .15s}
.leads-input:focus{border-color:#b0aba3}
.leads-input::placeholder{color:#9a9590}
.leads-btn{background:#0f0e0c;color:#fff;border:none;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:10px 20px;cursor:pointer;transition:background .15s;white-space:nowrap}
.leads-btn:hover:not(:disabled){background:#2c2a26}
.leads-btn:disabled{opacity:.5;cursor:not-allowed}
.leads-btn-ghost{background:#fff;color:#4a4740;border:1px solid #e8e4de;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;padding:7px 14px;cursor:pointer;transition:all .15s}
.leads-btn-ghost:hover{border-color:#b0aba3;color:#0f0e0c}
.spin{display:inline-block;width:14px;height:14px;border:1.5px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:rot .65s linear infinite;vertical-align:middle;margin-right:6px}
@keyframes rot{to{transform:rotate(360deg)}}
.err{font-size:13px;color:#991b1b;background:#fef2f2;border:1px solid #fecaca;border-radius:7px;padding:10px 14px;margin-bottom:20px}
.biz-grid{display:flex;flex-direction:column;gap:16px}
.biz-card{background:#fff;border:1px solid #e8e4de;border-radius:14px;padding:24px}
.biz-header{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:12px;flex-wrap:wrap}
.biz-name{font-size:16px;font-weight:600;color:#0f0e0c;letter-spacing:-.01em}
.biz-meta{font-size:12px;color:#9a9590;margin-top:2px}
.biz-badges{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}
.badge{font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;padding:3px 9px;border-radius:20px;border:1px solid}
.badge-warn{color:#92400e;background:#fef3c7;border-color:#fcd7a0}
.badge-ok{color:#1a6644;background:#edf7f1;border-color:#b6e4cc}
.badge-stars{color:#78350f;background:#fffbeb;border-color:#fde68a}
.unanswered-label{font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#9a9590;margin-bottom:8px}
.review-item{background:#faf9f6;border:1px solid #f2efe9;border-radius:8px;padding:12px 14px;margin-bottom:8px}
.review-item:last-child{margin-bottom:0}
.review-stars{font-size:12px;color:#f59e0b;margin-bottom:4px}
.review-text{font-size:13px;color:#4a4740;line-height:1.6;font-style:italic}
.review-date{font-size:11px;color:#c8c3bb;margin-top:4px}
.email-box{margin-top:16px;background:#f8f7f4;border:1px solid #e8e4de;border-radius:10px;padding:16px}
.email-label{font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#9a9590;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center}
.email-text{font-size:13px;color:#0f0e0c;line-height:1.7;white-space:pre-wrap}
.copy-btn{background:#fff;border:1px solid #e8e4de;border-radius:6px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;color:#4a4740;padding:4px 10px;cursor:pointer;transition:all .15s}
.copy-btn:hover{border-color:#b0aba3;color:#0f0e0c}
.no-results{text-align:center;padding:60px 20px;color:#9a9590;font-size:14px}
.biz-links{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
.biz-link{font-size:12px;font-weight:500;color:#4a4740;background:#f2efe9;border:1px solid #e8e4de;border-radius:6px;padding:4px 10px;text-decoration:none;transition:all .15s}
.biz-link:hover{background:#e8e4de;color:#0f0e0c}
.results-count{font-size:13px;color:#9a9590;margin-bottom:16px}
`;

const PROMPT = (biz, reviews) => `You are writing a short, personalized cold outreach email to the owner of "${biz.name}", a ${biz.type} located at ${biz.address}.

They have ${reviews.length} unanswered Google review(s). Here is one example:
"${reviews[0]?.text || "Great place!"}" (${reviews[0]?.rating} stars, ${reviews[0]?.time})

Write a short, friendly cold email (under 120 words) from Juliet, founder of Rply (rply.space) — an AI tool that writes polished Google review responses in under 2 seconds.

Rules:
- Open with something specific about their business or the unanswered review
- Don't be salesy or pushy
- Mention the free plan at rply.space
- Sign off as Juliet, Founder of Rply
- No em dashes
- Sound like a real human, not a marketing email
- Subject line on first line as "Subject: ..."

Return only the email text.`;

export default function Leads() {
  const [query,    setQuery]    = useState("");
  const [city,     setCity]     = useState("");
  const [loading,  setLoading]  = useState(false);
  const [results,  setResults]  = useState([]);
  const [err,      setErr]      = useState("");
  const [emails,   setEmails]   = useState({});
  const [genning,  setGenning]  = useState({});
  const [copied,   setCopied]   = useState({});
  const [nextToken, setNextToken] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMore = async () => {
    if (!nextToken) return;
    setLoadingMore(true);
    try {
      const res  = await fetch("/api/find-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim(), city: city.trim(), pageToken: nextToken }),
      });
      const data = await res.json();
      setResults(r => [...r, ...(data.businesses || [])]);
      setNextToken(data.nextPageToken || null);
    } catch(e) { setErr(e.message); }
    setLoadingMore(false);
  };

  const search = async () => {
    if (!query.trim() || !city.trim()) { setErr("Please enter both a business type and city."); return; }
    setErr(""); setLoading(true); setResults([]); setNextToken(null);

    try {
      const res  = await fetch("/api/find-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim(), city: city.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Search failed");
      setResults(data.businesses || []);
      setNextToken(data.nextPageToken || null);
      if (!data.businesses?.length) setErr("No businesses found. Try a different search.");
    } catch(e) {
      setErr(e.message);
    }
    setLoading(false);
  };

  const generateEmail = async (biz) => {
    setGenning(g => ({ ...g, [biz.place_id]: true }));
    const unanswered = biz.reviews?.filter(r => !r.owner_reply) || [];
    try {
      const res  = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: PROMPT(biz, unanswered.length ? unanswered : biz.reviews) }),
      });
      const data = await res.json();
      setEmails(e => ({ ...e, [biz.place_id]: data.text }));
    } catch(e) {
      setEmails(e => ({ ...e, [biz.place_id]: "Failed to generate. Try again." }));
    }
    setGenning(g => ({ ...g, [biz.place_id]: false }));
  };

  const copy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopied(c => ({ ...c, [id]: true }));
    setTimeout(() => setCopied(c => ({ ...c, [id]: false })), 2000);
  };

  return (
    <>
      <style>{S}</style>
      <div className="leads">
        <div className="leads-inner">
          <div className="leads-title">Lead Finder</div>
          <p className="leads-sub">Find local businesses with unanswered Google reviews to pitch Rply.</p>

          <div className="search-row">
            <input className="leads-input" placeholder="Business type (e.g. restaurant, salon, gym)" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && search()} />
            <input className="leads-input" placeholder="City (e.g. Manila, Cebu)" value={city} onChange={e => setCity(e.target.value)} onKeyDown={e => e.key === "Enter" && search()} />
            <button className="leads-btn" onClick={search} disabled={loading}>
              {loading ? <><span className="spin"/>Searching...</> : "Find leads"}
            </button>
          </div>

          {err && <div className="err">{err}</div>}

          {results.length > 0 && (
            <>
              <div className="results-count">{results.length} businesses found — {results.filter(b => b.reviews?.some(r => !r.owner_reply)).length} with unanswered reviews</div>
              <div className="biz-grid">
                {results.map(biz => {
                  const unanswered = biz.reviews?.filter(r => !r.owner_reply) || [];
                  const hasUnanswered = unanswered.length > 0;
                  return (
                    <div key={biz.place_id} className="biz-card">
                      <div className="biz-header">
                        <div>
                          <div className="biz-name">{biz.name}</div>
                          <div className="biz-meta">{biz.address}</div>
                        </div>
                        <button className="leads-btn-ghost" onClick={() => generateEmail(biz)} disabled={genning[biz.place_id]}>
                          {genning[biz.place_id] ? <><span className="spin" style={{borderTopColor:"#0f0e0c"}}/>Writing...</> : "Write pitch email"}
                        </button>
                      </div>

                      {(biz.website || biz.phone || biz.google_url) && (
                        <div className="biz-links">
                          {biz.website && <a className="biz-link" href={biz.website} target="_blank" rel="noreferrer">🌐 Website</a>}
                          {biz.phone && <a className="biz-link" href={`tel:${biz.phone}`}>📞 {biz.phone}</a>}
                          {biz.google_url && <a className="biz-link" href={biz.google_url} target="_blank" rel="noreferrer">📍 Google Maps</a>}
                        </div>
                      )}
                      <div className="biz-badges">
                        {biz.rating && <span className="badge badge-stars">{"★"} {biz.rating} ({biz.user_ratings_total || 0} reviews)</span>}
                        {hasUnanswered
                          ? <span className="badge badge-warn">{unanswered.length} unanswered review{unanswered.length > 1 ? "s" : ""}</span>
                          : <span className="badge badge-ok">All reviews answered</span>}
                      </div>

                      {hasUnanswered && (
                        <>
                          <div className="unanswered-label">Unanswered reviews</div>
                          {unanswered.slice(0, 2).map((r, i) => (
                            <div key={i} className="review-item">
                              <div className="review-stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                              <div className="review-text">"{r.text}"</div>
                              <div className="review-date">{r.time}</div>
                            </div>
                          ))}
                        </>
                      )}

                      {emails[biz.place_id] && (
                        <div className="email-box">
                          <div className="email-label">
                            <span>Pitch email</span>
                            <button className="copy-btn" onClick={() => copy(biz.place_id, emails[biz.place_id])}>
                              {copied[biz.place_id] ? "Copied!" : "Copy"}
                            </button>
                          </div>
                          <div className="email-text">{emails[biz.place_id]}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {nextToken && (
                <div style={{textAlign:"center",marginTop:24}}>
                  <button className="leads-btn-ghost" onClick={loadMore} disabled={loadingMore} style={{padding:"10px 24px",fontSize:14}}>
                    {loadingMore ? <><span className="spin" style={{borderTopColor:"#0f0e0c"}}/>Loading...</> : "Load more results"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
