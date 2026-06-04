import { useState } from "react";

const S = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#faf9f6}
.mn{min-height:100vh;background:#faf9f6;font-family:'DM Sans',sans-serif;color:#0f0e0c;-webkit-font-smoothing:antialiased;padding:40px 24px 80px}
.mn-inner{max-width:900px;margin:0 auto}
.mn-title{font-family:'DM Serif Display',serif;font-size:28px;font-weight:400;margin-bottom:4px}
.mn-sub{font-size:14px;color:#9a9590;margin-bottom:8px}
.mn-note{font-size:12px;color:#c8c3bb;margin-bottom:28px;background:#f2efe9;border:1px solid #e8e4de;border-radius:8px;padding:10px 14px;}
.search-row{display:flex;gap:10px;margin-bottom:24px;flex-wrap:wrap}
.mn-input{flex:1;min-width:180px;font-family:'DM Sans',sans-serif;font-size:14px;color:#0f0e0c;background:#fff;border:1px solid #e8e4de;border-radius:8px;padding:10px 14px;outline:none;transition:border-color .15s}
.mn-input:focus{border-color:#b0aba3}
.mn-btn{background:#0f0e0c;color:#fff;border:none;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:10px 20px;cursor:pointer;white-space:nowrap}
.mn-btn:disabled{opacity:.5;cursor:not-allowed}
.mn-btn-ghost{background:#fff;color:#4a4740;border:1px solid #e8e4de;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;padding:7px 14px;cursor:pointer;transition:all .15s}
.mn-btn-ghost:hover{border-color:#b0aba3;color:#0f0e0c}
.spin{display:inline-block;width:14px;height:14px;border:1.5px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:rot .65s linear infinite;vertical-align:middle;margin-right:6px}
@keyframes rot{to{transform:rotate(360deg)}}
.err{font-size:13px;color:#991b1b;background:#fef2f2;border:1px solid #fecaca;border-radius:7px;padding:10px 14px;margin-bottom:20px}
.filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}
.filter-btn{font-size:12px;font-weight:500;padding:5px 12px;border-radius:20px;border:1px solid #e8e4de;background:#fff;color:#6b6760;cursor:pointer;transition:all .15s}
.filter-btn.on{background:#0f0e0c;color:#fff;border-color:#0f0e0c}
.results-count{font-size:13px;color:#9a9590;margin-bottom:16px}
.opp-grid{display:flex;flex-direction:column;gap:14px}
.opp-card{background:#fff;border:1px solid #e8e4de;border-radius:14px;padding:22px 24px}
.opp-header{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:10px;flex-wrap:wrap}
.opp-title{font-size:15px;font-weight:500;color:#0f0e0c;line-height:1.4;text-decoration:none;flex:1}
.opp-title:hover{text-decoration:underline}
.opp-meta{font-size:12px;color:#9a9590;margin-bottom:10px;display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.opp-source{font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;padding:2px 8px;border-radius:20px;border:1px solid}
.src-reddit{color:#e24b4a;border-color:#fecaca;background:#fef2f2}
.src-quora{color:#b84f00;border-color:#fed7aa;background:#fff7ed}
.src-forum{color:#1a6644;border-color:#b6e4cc;background:#edf7f1}
.src-google{color:#1a56b0;border-color:#bfdbfe;background:#eff6ff}
.opp-snippet{font-size:13px;color:#4a4740;line-height:1.6;margin-bottom:14px;font-style:italic}
.reply-box{background:#f8f7f4;border:1px solid #e8e4de;border-radius:10px;padding:16px}
.reply-label{font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#9a9590;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center}
.reply-text{font-size:13px;color:#0f0e0c;line-height:1.7;white-space:pre-wrap}
.copy-btn{background:#fff;border:1px solid #e8e4de;border-radius:6px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;color:#4a4740;padding:4px 10px;cursor:pointer}
.copy-btn:hover{border-color:#b0aba3}
.score-badge{font-size:11px;color:#6b6760;display:flex;align-items:center;gap:4px}
.preset-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}
.preset-btn{font-size:12px;padding:5px 12px;border-radius:20px;border:1px solid #e8e4de;background:#f2efe9;color:#4a4740;cursor:pointer;transition:all .15s}
.preset-btn:hover{background:#e8e4de}
`;

const PRESETS = [
  "how to respond to google reviews",
  "negative review response",
  "bad review hurting my business",
  "google review management tool",
  "respond to yelp reviews",
  "customer review response software",
];

const REPLY_PROMPT = (opp) => `You are Juliet, founder of Rply (rply.space) — an AI tool that writes polished Google and Yelp review responses in under 2 seconds.

Someone posted this online:
Title: "${opp.title}"
Content: "${opp.snippet}"
Platform: ${opp.source}

Write a short, helpful reply (under 100 words) that:
- Genuinely answers their question or addresses their pain
- Naturally mentions Rply as something that might help, without being pushy
- Includes rply.space as a casual mention, not a hard sell
- Sounds like a real person, not a marketer
- No em dashes
- No bullet points, just natural prose

Return only the reply text, no labels.`;

export default function Mentions() {
  const [query,   setQuery]   = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [err,     setErr]     = useState("");
  const [filter,  setFilter]  = useState("all");
  const [replies, setReplies] = useState({});
  const [genning, setGenning] = useState({});
  const [copied,  setCopied]  = useState({});
  const [done,    setDone]    = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('rply_mentions_done') || '[]')); }
    catch { return new Set(); }
  });
  const [num,     setNum]     = useState(10);

  const markDone = (id) => {
    setDone(d => {
      const next = new Set(d);
      next.add(id);
      localStorage.setItem('rply_mentions_done', JSON.stringify([...next]));
      return next;
    });
  };

  const unmarkDone = (id) => {
    setDone(d => {
      const next = new Set(d);
      next.delete(id);
      localStorage.setItem('rply_mentions_done', JSON.stringify([...next]));
      return next;
    });
  };

  const search = async (q) => {
    const searchQ = q || query;
    if (!searchQ.trim()) { setErr("Please enter a search query."); return; }
    setErr(""); setLoading(true); setResults([]);

    try {
      const res  = await fetch("/api/find-mentions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQ.trim(), num }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Search failed");
      setResults(data.results || []);
      if (!data.results?.length) setErr("No opportunities found. Try a different query.");
    } catch(e) {
      setErr(e.message);
    }
    setLoading(false);
  };

  const generateReply = async (opp) => {
    setGenning(g => ({...g, [opp.id]: true}));
    try {
      const res  = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: REPLY_PROMPT(opp) }),
      });
      const data = await res.json();
      setReplies(r => ({...r, [opp.id]: data.text}));
    } catch {
      setReplies(r => ({...r, [opp.id]: "Failed to generate. Try again."}));
    }
    setGenning(g => ({...g, [opp.id]: false}));
  };

  const copy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopied(c => ({...c, [id]: true}));
    setTimeout(() => setCopied(c => ({...c, [id]: false})), 2000);
  };

  const filtered = filter === "all" ? results
    : filter === "done" ? results.filter(r => done.has(r.id))
    : results.filter(r => r.source.toLowerCase() === filter && !done.has(r.id));
  const sources  = [...new Set(results.map(r => r.source.toLowerCase()))];

  return (
    <>
      <style>{S}</style>
      <div className="mn">
        <div className="mn-inner">
          <div className="mn-title">Mention Finder</div>
          <p className="mn-sub">Find people asking about review management — jump in and mention Rply.</p>
          <div className="mn-note">
            Searches Reddit, Quora, and forums via Google. Results are real posts where you can leave a helpful reply with a link to rply.space.
          </div>

          <div className="search-row">
            <input className="mn-input" placeholder='e.g. "how to respond to bad google reviews"' value={query}
              onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key==="Enter" && search()} />
            <select value={num} onChange={e=>setNum(Number(e.target.value))} style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#0f0e0c",background:"#fff",border:"1px solid #e8e4de",borderRadius:8,padding:"10px 14px",outline:"none",cursor:"pointer"}}>
              <option value={10}>10 results</option>
              <option value={20}>20 results</option>
              <option value={50}>50 results</option>
            </select>
            <button className="mn-btn" onClick={() => search()} disabled={loading}>
              {loading ? <><span className="spin"/>Searching...</> : "Find opportunities"}
            </button>
          </div>

          <div className="preset-row">
            {PRESETS.map(p => (
              <button key={p} className="preset-btn" onClick={() => { setQuery(p); search(p); }}>
                {p}
              </button>
            ))}
          </div>

          {err && <div className="err">{err}</div>}

          {results.length > 0 && (
            <>
              <div className="filters">
                <button className={`filter-btn ${filter==="all"?"on":""}`} onClick={()=>setFilter("all")}>
                  All ({results.length})
                </button>
                {sources.map(s => (
                  <button key={s} className={`filter-btn ${filter===s?"on":""}`} onClick={()=>setFilter(s)}>
                    {s.charAt(0).toUpperCase()+s.slice(1)} ({results.filter(r=>r.source.toLowerCase()===s).length})
                  </button>
                ))}
              </div>

              <div className="results-count">{filtered.length} opportunities found</div>

              <div className="opp-grid">
                {filtered.map(opp => (
                  <div key={opp.id} className="opp-card" style={{opacity: done.has(opp.id) ? 0.5 : 1, transition:"opacity .2s"}}>
                    <div className="opp-header">
                      <a className="opp-title" href={opp.url} target="_blank" rel="noreferrer">{opp.title}</a>
                      <div style={{display:"flex",gap:8}}>
                        <button className="mn-btn-ghost" onClick={() => generateReply(opp)} disabled={genning[opp.id]}>
                          {genning[opp.id] ? <><span className="spin" style={{borderTopColor:"#0f0e0c"}}/>Writing...</> : "Write reply"}
                        </button>
                        <button className="mn-btn-ghost" onClick={() => done.has(opp.id) ? unmarkDone(opp.id) : markDone(opp.id)}
                          style={{color: done.has(opp.id) ? "#1a6644" : "#9a9590", borderColor: done.has(opp.id) ? "#b6e4cc" : "#e8e4de", background: done.has(opp.id) ? "#edf7f1" : "#fff"}}>
                          {done.has(opp.id) ? "✓ Done" : "Mark done"}
                        </button>
                      </div>
                    </div>

                    <div className="opp-meta">
                      <span className={`opp-source src-${opp.source.toLowerCase()}`}>{opp.source}</span>
                      {opp.date && <span>{opp.date}</span>}
                      {opp.score && <span className="score-badge">↑ {opp.score}</span>}
                    </div>

                    <p className="opp-snippet">"{opp.snippet}"</p>

                    {replies[opp.id] && (
                      <div className="reply-box">
                        <div className="reply-label">
                          <span>Suggested reply</span>
                          <button className="copy-btn" onClick={() => copy(opp.id, replies[opp.id])}>
                            {copied[opp.id] ? "Copied!" : "Copy"}
                          </button>
                        </div>
                        <div className="reply-text">{replies[opp.id]}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
