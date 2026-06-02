import { useState, useEffect } from "react";
import Landing from "./Landing";
import {
  signUp, signIn, signInWithGoogle, signOutUser,
  onAuthChange, getUserData, incrementUsage, saveBizName,
} from "./firebase";

const FREE_LIMIT = 3;

const TONES = [
  { id: "professional", label: "Professional", desc: "Formal and trustworthy" },
  { id: "friendly",     label: "Friendly",     desc: "Warm and approachable" },
  { id: "apologetic",   label: "Apologetic",   desc: "Empathetic and sorry" },
  { id: "grateful",     label: "Grateful",     desc: "Thankful and positive" },
];
const STAR_LABELS = ["", "Terrible", "Poor", "Average", "Good", "Excellent"];

const S = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300&family=Geist:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --ink:#0f0e0c;--ink2:#4a4740;--ink3:#9a9590;
  --rule:#e8e4de;--rule2:#f2efe9;--surface:#faf9f6;--white:#ffffff;
  --green:#1a6644;--green-bg:#edf7f1;--amber:#92400e;--amber-bg:#fef3c7;
  --red:#991b1b;--red-bg:#fef2f2;
}
body{background:var(--surface)}
.root{min-height:100vh;background:var(--surface);font-family:'Geist',sans-serif;color:var(--ink);-webkit-font-smoothing:antialiased}
.nav{display:flex;justify-content:space-between;align-items:center;height:60px;padding:0 32px;background:var(--white);border-bottom:1px solid var(--rule);position:sticky;top:0;z-index:50}
.wordmark{font-family:'Fraunces',serif;font-size:20px;font-weight:400;letter-spacing:-0.3px;color:var(--ink);cursor:pointer}
.wordmark em{font-style:italic;font-weight:300;color:var(--ink3)}
.wordmark span{font-style:normal;font-weight:500;color:var(--ink)}
.nav-actions{display:flex;align-items:center;gap:10px}
.btn{display:inline-flex;align-items:center;gap:6px;font-family:'Geist',sans-serif;font-size:13px;font-weight:500;border-radius:6px;padding:8px 16px;cursor:pointer;transition:background .15s,color .15s,border-color .15s;border:1px solid transparent;line-height:1;letter-spacing:-.01em}
.btn:disabled{opacity:.45;cursor:not-allowed}
.btn-default{background:var(--white);color:var(--ink2);border-color:var(--rule)}
.btn-default:hover:not(:disabled){background:var(--rule2);color:var(--ink)}
.btn-primary{background:var(--ink);color:var(--white);border-color:var(--ink)}
.btn-primary:hover:not(:disabled){background:#2c2a26}
.btn-lg{font-size:14px;padding:12px 24px;border-radius:8px;width:100%;justify-content:center;letter-spacing:-.02em}
.page{max-width:480px;margin:0 auto;padding:56px 20px 80px}
.page-wide{max-width:860px;margin:0 auto;padding:48px 24px 80px}
.label{display:block;font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ink3);margin-bottom:8px}
.input,.textarea{width:100%;font-family:'Geist',sans-serif;font-size:14px;font-weight:400;color:var(--ink);background:var(--white);border:1px solid var(--rule);border-radius:8px;padding:10px 14px;outline:none;transition:border-color .15s;-webkit-appearance:none}
.input:focus,.textarea:focus{border-color:#b0aba3}
.input::placeholder,.textarea::placeholder{color:var(--ink3)}
.textarea{resize:none;line-height:1.6}
.field{margin-bottom:18px}
.card{background:var(--white);border:1px solid var(--rule);border-radius:12px;padding:22px 24px}
.auth-toggle{display:flex;background:var(--rule2);border-radius:8px;padding:3px;margin-bottom:24px;gap:3px}
.auth-btn{flex:1;background:none;border:none;font-family:'Geist',sans-serif;font-size:13px;font-weight:500;color:var(--ink3);padding:8px;border-radius:6px;cursor:pointer;transition:all .15s;letter-spacing:-.01em}
.auth-btn.on{background:var(--white);color:var(--ink);box-shadow:0 1px 3px rgba(0,0,0,.08)}
.plan-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:44px}
@media(max-width:680px){.plan-grid{grid-template-columns:1fr}}
.plan-card{background:var(--white);border:1px solid var(--rule);border-radius:14px;padding:28px 24px;position:relative;display:flex;flex-direction:column}
.plan-card.highlighted{border-color:var(--ink);border-width:1.5px}
.plan-badge{position:absolute;top:-11px;left:50%;transform:translateX(-50%);background:var(--ink);color:var(--white);font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;padding:3px 12px;border-radius:20px;white-space:nowrap}
.plan-tier{font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ink3)}
.plan-price{font-family:'Fraunces',serif;font-size:44px;font-weight:400;line-height:1;color:var(--ink);margin:12px 0 4px}
.plan-cadence{font-size:13px;color:var(--ink3);margin-bottom:22px}
.feat-list{list-style:none;flex:1;margin-bottom:24px}
.feat-list li{font-size:13px;color:var(--ink2);padding:6px 0;border-bottom:1px solid var(--rule2);display:flex;align-items:center;gap:10px;line-height:1.4}
.feat-list li:last-child{border-bottom:none}
.feat-yes{color:var(--green);font-size:15px;flex-shrink:0}
.feat-no{color:#ccc;font-size:15px;flex-shrink:0}
.tone-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
@media(max-width:420px){.tone-grid{grid-template-columns:1fr}}
.tone-option{background:var(--white);border:1px solid var(--rule);border-radius:8px;padding:12px 14px;cursor:pointer;text-align:left;font-family:'Geist',sans-serif;transition:border-color .15s,background .15s}
.tone-option:hover{border-color:#c8c3bb}
.tone-option.on{border-color:var(--ink);background:var(--rule2)}
.tone-name{font-size:13px;font-weight:500;color:var(--ink);display:block}
.tone-desc{font-size:12px;color:var(--ink3);display:block;margin-top:1px}
.star-row{display:flex;gap:4px;align-items:center}
.star-btn{background:none;border:none;cursor:pointer;font-size:22px;padding:2px;line-height:1;opacity:.2;transition:opacity .12s,transform .12s}
.star-btn.lit{opacity:1}
.star-btn:hover{transform:scale(1.15)}
.star-label{font-size:12px;color:var(--ink3);margin-left:6px}
.result{background:var(--white);border:1px solid var(--rule);border-top:3px solid var(--ink);border-radius:12px;padding:22px 24px;margin-top:14px;animation:up .3s ease}
@keyframes up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.result-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.result-label{font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ink3)}
.result-text{font-size:15px;line-height:1.75;color:var(--ink);font-weight:300}
.track{height:3px;background:var(--rule);border-radius:2px;margin-top:6px;overflow:hidden}
.track-fill{height:100%;background:var(--ink);border-radius:2px;transition:width .5s ease}
.pill{display:inline-flex;align-items:center;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;padding:3px 10px;border-radius:20px;border:1px solid}
.pill-free{color:var(--ink3);border-color:var(--rule);background:var(--rule2)}
.pill-pro{color:var(--green);border-color:#b6e4cc;background:var(--green-bg)}
.msg{font-size:13px;padding:10px 14px;border-radius:7px;margin-top:10px;border:1px solid}
.msg-err{color:var(--red);background:var(--red-bg);border-color:#fecaca}
.msg-ok{color:var(--green);background:var(--green-bg);border-color:#b6e4cc}
.overlay{position:fixed;inset:0;background:rgba(15,14,12,.55);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn .18s ease}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.modal{background:var(--white);border-radius:16px;border:1px solid var(--rule);padding:36px;max-width:420px;width:100%;animation:slideUp .22s ease}
@keyframes slideUp{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
.modal-title{font-family:'Fraunces',serif;font-size:22px;font-weight:400;margin-bottom:4px}
.modal-sub{font-size:13px;color:var(--ink3);margin-bottom:24px}
.spin{display:inline-block;width:14px;height:14px;border:1.5px solid rgba(255,255,255,.3);border-top-color:white;border-radius:50%;animation:rot .65s linear infinite;vertical-align:middle}
.spin-dark{border-color:rgba(0,0,0,.12);border-top-color:var(--ink)}
@keyframes rot{to{transform:rotate(360deg)}}
.or{display:flex;align-items:center;gap:12px;color:var(--ink3);font-size:12px;margin:18px 0}
.or::before,.or::after{content:'';flex:1;height:1px;background:var(--rule)}
.hist-item{padding:12px 0;border-bottom:1px solid var(--rule2)}
.hist-item:last-child{border-bottom:none}
.hist-meta{font-size:11px;color:var(--ink3);margin-bottom:3px}
.hist-snip{font-size:12px;color:var(--ink2);line-height:1.4}
.sh{font-family:'Fraunces',serif;font-weight:400;font-size:32px;letter-spacing:-.02em;margin-bottom:6px}
.ss{font-size:15px;color:var(--ink3);font-weight:300}
.stripe-note{margin-top:32px;padding:16px 20px;background:var(--rule2);border:1px solid var(--rule);border-radius:10px;font-size:12px;color:var(--ink3);line-height:1.7;text-align:center}
code{font-family:monospace;background:var(--rule);padding:1px 5px;border-radius:4px;font-size:11px;color:var(--ink2)}
.loading-screen{display:flex;align-items:center;justify-content:center;min-height:60vh;font-size:14px;color:var(--ink3)}
@media(max-width:600px){.nav{padding:0 16px}.page-wide{padding:32px 16px 60px}}
`;

const PLANS = [
  { id:"free", tier:"Free", price:"$0", cadence:"forever", cta:"Start for free", ctaStyle:"btn-default",
    feats:[[true,"3 responses / month"],[true,"All 4 tone styles"],[true,"Star-rating detection"],[false,"Unlimited responses"],[false,"Business name memory"],[false,"Response history"],[false,"Priority support"]] },
  { id:"pro", tier:"Pro", price:"$49", cadence:"/ month", featured:true, cta:"Start Pro →", ctaStyle:"btn-primary",
    feats:[[true,"Unlimited responses"],[true,"All 4 tone styles"],[true,"Star-rating detection"],[true,"Business name memory"],[true,"Response history (30 days)"],[true,"Priority email support"],[true,"Cancel anytime"]] },
  { id:"agency", tier:"Agency", price:"$199", cadence:"/ month", cta:"Start Agency →", ctaStyle:"btn-default",
    feats:[[true,"Everything in Pro"],[true,"25 business profiles"],[true,"5 team seats"],[true,"Google Business API sync"],[true,"White-label exports"],[true,"Dedicated Slack channel"],[true,"Custom tone training"]] },
];

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── Star Picker ───────────────────────────────────────────────────────────────
function StarPicker({ value, onChange }) {
  const [hov, setHov] = useState(0);
  return (
    <div className="star-row">
      {[1,2,3,4,5].map(n => (
        <button key={n} className={`star-btn ${(hov||value)>=n?"lit":""}`}
          onClick={()=>onChange(n)} onMouseEnter={()=>setHov(n)} onMouseLeave={()=>setHov(0)}>★</button>
      ))}
      {(hov||value)>0 && <span className="star-label">{STAR_LABELS[hov||value]}</span>}
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav({ user, onLogout, goTo }) {
  return (
    <nav className="nav">
      <div className="wordmark" onClick={()=>goTo("home")}><em>re</em><span>plix</span></div>
      <div className="nav-actions">
        {user ? (
          <>
            <span className={`pill ${user.isPro?"pill-pro":"pill-free"}`}>
              {user.isPro ? "Pro" : `${user.usageCount}/${FREE_LIMIT}`}
            </span>
            {!user.isPro && <button className="btn btn-primary" onClick={()=>goTo("pricing")}>Upgrade</button>}
            <button className="btn btn-default" onClick={onLogout}>Sign out</button>
          </>
        ) : (
          <>
            <button className="btn btn-default" onClick={()=>goTo("auth")}>Sign in</button>
            <button className="btn btn-primary" onClick={()=>goTo("pricing")}>Get started</button>
          </>
        )}
      </div>
    </nav>
  );
}

// ── Auth Page ─────────────────────────────────────────────────────────────────
function AuthPage({ onAuth }) {
  const [tab, setTab]         = useState("login");
  const [email, setEmail]     = useState("");
  const [password, setPass]   = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr]         = useState("");

  const submit = async () => {
    if (!email || !password) { setErr("Please fill in all fields."); return; }
    if (password.length < 6) { setErr("Password must be at least 6 characters."); return; }
    setErr(""); setLoading(true);
    try {
      if (tab === "signup") {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      // onAuthChange in root will pick up the new user automatically
    } catch(e) {
      setErr(e.message.replace("Firebase: ", "").replace(/ \(auth\/.*\)/, ""));
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setErr(""); setLoading(true);
    try {
      await signInWithGoogle();
    } catch(e) {
      setErr(e.message.replace("Firebase: ", "").replace(/ \(auth\/.*\)/, ""));
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <div style={{marginBottom:36}}>
        <div className="sh">{tab==="login"?"Welcome back":"Create your account"}</div>
        <p className="ss">{tab==="login"?"Sign in to Rply":"Free plan, no credit card needed"}</p>
      </div>
      <div className="card">
        <div className="auth-toggle">
          <button className={`auth-btn ${tab==="login"?"on":""}`} onClick={()=>{setTab("login");setErr("");}}>Sign in</button>
          <button className={`auth-btn ${tab==="signup"?"on":""}`} onClick={()=>{setTab("signup");setErr("");}}>Create account</button>
        </div>
        <div className="field">
          <label className="label">Email address</label>
          <input className="input" type="email" placeholder="you@yourbusiness.com" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="field" style={{marginBottom:0}}>
          <label className="label">Password</label>
          <input className="input" type="password" placeholder="••••••••" value={password}
            onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} />
        </div>
        {err && <div className="msg msg-err">{err}</div>}
        <button className="btn btn-primary btn-lg" style={{marginTop:20}} onClick={submit} disabled={loading}>
          {loading ? <><span className="spin"/>Processing…</> : tab==="login" ? "Sign in →" : "Create account →"}
        </button>
        <div className="or">or</div>
        <button className="btn btn-default btn-lg" onClick={handleGoogle} disabled={loading}>
          Continue with Google
        </button>
      </div>
    </div>
  );
}

// ── Pricing Page ──────────────────────────────────────────────────────────────
function PricingPage({ user, onSelect }) {
  const [loading, setLoading] = useState(null);

  const pick = async (plan) => {
    if (plan === "free") { onSelect("free"); return; }
    setLoading(plan);
    await delay(1100);
    setLoading(null);
    onSelect(plan);
  };

  return (
    <div className="page-wide">
      <div style={{textAlign:"center"}}>
        <div className="sh">Simple, transparent pricing</div>
        <p className="ss">Start free. Upgrade when you're ready to scale.</p>
      </div>
      <div className="plan-grid">
        {PLANS.map(p => (
          <div key={p.id} className={`plan-card ${p.featured?"highlighted":""}`}>
            {p.featured && <div className="plan-badge">Most popular</div>}
            <div className="plan-tier">{p.tier}</div>
            <div className="plan-price">{p.price}</div>
            <div className="plan-cadence">{p.cadence}</div>
            <ul className="feat-list">
              {p.feats.map(([yes,txt],i) => (
                <li key={i}>
                  <span className={yes?"feat-yes":"feat-no"}>{yes?"✓":"✕"}</span>
                  <span style={{color:yes?"var(--ink2)":"var(--ink3)"}}>{txt}</span>
                </li>
              ))}
            </ul>
            <button className={`btn ${p.ctaStyle} btn-lg`} onClick={()=>pick(p.id)}
              disabled={loading===p.id||(user?.isPro&&p.id==="pro")}>
              {loading===p.id ? <><span className={`spin ${p.ctaStyle==="btn-default"?"spin-dark":""}`}/>Redirecting…</> :
               user?.isPro&&p.id==="pro" ? "Current plan" : p.cta}
            </button>
          </div>
        ))}
      </div>
      <div className="stripe-note">
        🔒 Payments secured by <strong style={{color:"var(--ink2)"}}>Stripe</strong> — PCI DSS compliant, encrypted in transit.
      </div>
    </div>
  );
}

// ── Stripe Modal ──────────────────────────────────────────────────────────────
function StripeModal({ plan, onDone, onClose }) {
  const [card, setCard]       = useState("4242 4242 4242 4242");
  const [exp, setExp]         = useState("12/27");
  const [cvc, setCvc]         = useState("123");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const pay = async () => {
    setLoading(true);
    await delay(1700);
    setSuccess(true);
    await delay(900);
    onDone();
  };

  const label = plan==="agency" ? "Agency" : "Pro";
  const price = plan==="agency" ? "$199" : "$49";

  return (
    <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        {success ? (
          <div style={{textAlign:"center",padding:"16px 0"}}>
            <div style={{fontSize:44,marginBottom:16,lineHeight:1}}>✓</div>
            <div className="modal-title" style={{marginBottom:8}}>Payment confirmed</div>
            <p style={{fontSize:14,color:"var(--ink3)"}}>You're now on the {label} plan.</p>
          </div>
        ) : (
          <>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
              <div>
                <div className="modal-title">Stripe checkout</div>
                <div className="modal-sub">Rply {label} — {price}/month</div>
              </div>
              <button style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:"var(--ink3)",lineHeight:1,padding:4}} onClick={onClose}>✕</button>
            </div>
            <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:7,padding:"9px 13px",marginBottom:20,fontSize:12,color:"#1e40af"}}>
              Test mode — use card <strong>4242 4242 4242 4242</strong>
            </div>
            <div className="field">
              <label className="label">Card number</label>
              <input className="input" value={card} onChange={e=>setCard(e.target.value)} />
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div className="field"><label className="label">Expiry</label><input className="input" value={exp} onChange={e=>setExp(e.target.value)} /></div>
              <div className="field"><label className="label">CVC</label><input className="input" value={cvc} onChange={e=>setCvc(e.target.value)} /></div>
            </div>
            <button className="btn btn-primary btn-lg" style={{marginTop:4}} onClick={pay} disabled={loading}>
              {loading ? <><span className="spin"/>Processing payment…</> : `Pay ${price} →`}
            </button>
            <p style={{textAlign:"center",marginTop:12,fontSize:11,color:"var(--ink3)"}}>Secured by Stripe · SSL encrypted · Cancel anytime</p>
          </>
        )}
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ user, onUsage, goTo }) {
  const [review,  setReview]  = useState("");
  const [tone,    setTone]    = useState("friendly");
  const [stars,   setStars]   = useState(0);
  const [biz,     setBiz]     = useState(user.savedBiz||"");
  const [result,  setResult]  = useState("");
  const [loading, setLoading] = useState(false);
  const [copied,  setCopied]  = useState(false);
  const [err,     setErr]     = useState("");
  const [history, setHistory] = useState([]);

  const locked = !user.isPro && user.usageCount >= FREE_LIMIT;
  const pct    = Math.min(100, (user.usageCount / FREE_LIMIT) * 100);

  const generate = async () => {
    if (!review.trim()) { setErr("Please paste a review to respond to."); return; }
    if (!stars)         { setErr("Please select a star rating."); return; }
    if (locked)         { setErr("You've used all 3 free responses. Upgrade to continue."); return; }
    setErr(""); setLoading(true); setResult("");

    const prompt = `You are a professional reputation manager for local businesses.

A customer left this ${stars}-star review${biz ? ` for "${biz}"` : ""}:

"${review}"

Write a ${tone} response from the business owner. Rules:
— Under 100 words
— Acknowledge specific feedback mentioned
— Sound like a real human business owner, not a template
— ${stars <= 2 ? "Apologize sincerely and offer to make it right" : "Thank them warmly and invite them back"}
— Do NOT open with "Thank you for your review"
— End with a natural sign-off like "Warm regards, The Team" — never use placeholder text like [Business Owner Name]

Return ONLY the response. No preamble, no labels.`;

    try {
      const res  = await fetch("/api/generate", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({prompt}) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      const out = data.text || "";
      setResult(out);
      if (user.isPro && out) {
        setHistory(h => [{snip:review.slice(0,55)+(review.length>55?"…":""),stars,tone,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}, ...h.slice(0,4)]);
      }
      await onUsage(biz);
    } catch(e) {
      setErr(e.message || "Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const copy = () => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(()=>setCopied(false), 2000); };

  return (
    <div className="page-wide">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:36,flexWrap:"wrap",gap:16}}>
        <div>
          <div className="sh">Generate a response</div>
          <p className="ss">Paste any review, set the tone, get a reply in seconds.</p>
        </div>
        <div className="card" style={{padding:"16px 20px",minWidth:210,flexShrink:0}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:user.isPro?0:8}}>
            <span className="label" style={{margin:0}}>Usage</span>
            <span className={`pill ${user.isPro?"pill-pro":"pill-free"}`}>{user.isPro?"Pro":"Free"}</span>
          </div>
          {user.isPro ? (
            <div style={{fontSize:13,color:"var(--green)",marginTop:8,fontWeight:500}}>Unlimited responses</div>
          ) : (
            <>
              <div style={{fontSize:22,fontFamily:"'Fraunces',serif",fontWeight:400,marginTop:4}}>
                {user.usageCount} <span style={{fontSize:13,color:"var(--ink3)",fontWeight:400}}>of {FREE_LIMIT} used</span>
              </div>
              <div className="track"><div className="track-fill" style={{width:`${pct}%`}} /></div>
              {locked && (
                <button className="btn btn-primary" style={{width:"100%",marginTop:12,justifyContent:"center",fontSize:12}} onClick={()=>goTo("pricing")}>
                  Upgrade for unlimited →
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:user.isPro&&history.length?"1fr 260px":"1fr",gap:20,alignItems:"start"}}>
        <div>
          {user.isPro && (
            <div className="card" style={{marginBottom:14}}>
              <label className="label">Business name</label>
              <input className="input" placeholder="e.g. Tony's Pizza, Bloom Hair Studio…" value={biz} onChange={e=>setBiz(e.target.value)} />
              <div style={{fontSize:11,color:"var(--ink3)",marginTop:6}}>Saved to your account automatically</div>
            </div>
          )}
          <div className="card" style={{marginBottom:14}}>
            <label className="label">Star rating</label>
            <StarPicker value={stars} onChange={setStars} />
          </div>
          <div className="card" style={{marginBottom:14}}>
            <label className="label">Customer review</label>
            <textarea className="textarea" rows={5} placeholder={`Paste the review here…`} value={review} onChange={e=>setReview(e.target.value)} />
            <div style={{textAlign:"right",fontSize:11,color:"var(--ink3)",marginTop:5}}>{review.length} chars</div>
          </div>
          <div className="card" style={{marginBottom:14}}>
            <label className="label">Tone</label>
            <div className="tone-grid">
              {TONES.map(t => (
                <button key={t.id} className={`tone-option ${tone===t.id?"on":""}`} onClick={()=>setTone(t.id)}>
                  <span className="tone-name">{t.label}</span>
                  <span className="tone-desc">{t.desc}</span>
                </button>
              ))}
            </div>
          </div>
          <button className="btn btn-primary btn-lg" onClick={generate} disabled={loading||locked}>
            {loading ? <><span className="spin"/>Generating response…</> : locked ? "Upgrade to generate more" : "Generate response →"}
          </button>
          {err && <div className="msg msg-err">{err}</div>}
          {result && (
            <div className="result">
              <div className="result-header">
                <span className="result-label">Response</span>
                <button className="btn btn-default" style={{padding:"5px 12px",fontSize:12}} onClick={copy}>
                  {copied?"Copied ✓":"Copy"}
                </button>
              </div>
              <p className="result-text">{result}</p>
            </div>
          )}
        </div>

        {user.isPro && history.length > 0 && (
          <div className="card" style={{position:"sticky",top:76}}>
            <div style={{fontWeight:500,fontSize:14,marginBottom:2}}>Recent</div>
            <div style={{fontSize:12,color:"var(--ink3)",marginBottom:16}}>Last {history.length} generated</div>
            {history.map((h,i) => (
              <div key={i} className="hist-item">
                <div className="hist-meta">{"★".repeat(h.stars)} · {h.tone} · {h.time}</div>
                <div className="hist-snip">{h.snip}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Landing moved to Landing.jsx

// ── Root ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [view,    setView]    = useState("home");
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true); // wait for Firebase auth check
  const [stripe,  setStripe]  = useState(null);
  const [banner,  setBanner]  = useState(false);

  useEffect(() => {
    const unsub = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        const data = await getUserData(firebaseUser.uid);
        setUser(data);
        setView("dashboard");
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleLogout = async () => {
    await signOutUser();
    setUser(null);
    setView("home");
  };

  const handleSelectPlan = async (plan) => {
    if (plan === "free") { setView(user ? "dashboard" : "auth"); return; }
    if (!user) { setView("auth"); return; }
    // Real Stripe checkout
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, uid: user.uid, email: user.email }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch(e) {
      // Fallback to mock modal if Stripe not configured yet
      setStripe(plan);
    }
  };

  const handlePayment = () => {
    // TODO: real Stripe webhook sets isPro in Firestore
    setUser(u => ({...u, isPro:true}));
    setStripe(null);
    setBanner(true);
    setTimeout(() => setBanner(false), 4000);
    setView("dashboard");
  };

  const handleUsage = async (biz) => {
    if (!user) return;
    if (user.isPro) {
      if (biz && biz !== user.savedBiz) {
        await saveBizName(user.uid, biz);
        setUser(u => ({...u, savedBiz:biz}));
      }
    } else {
      await incrementUsage(user.uid);
      setUser(u => ({...u, usageCount: u.usageCount + 1}));
    }
  };

  if (loading) {
    return (
      <div className="root">
        <style>{S}</style>
        <div className="loading-screen">Loading…</div>
      </div>
    );
  }

  return (
    <div className="root">
      <style>{S}</style>
      <Nav user={user} onLogout={handleLogout} goTo={setView} />

      {banner && (
        <div style={{textAlign:"center",padding:"11px",background:"var(--green-bg)",borderBottom:"1px solid #b6e4cc",fontSize:13,color:"var(--green)",fontWeight:500}}>
          You're now on Pro — unlimited responses unlocked.
        </div>
      )}

      {view==="home"      && <Landing goTo={setView} />}
      {view==="auth"      && <AuthPage onAuth={()=>setView("dashboard")} />}
      {view==="pricing"   && <PricingPage user={user} onSelect={handleSelectPlan} />}
      {view==="dashboard" && user && <Dashboard user={user} onUsage={handleUsage} goTo={setView} />}
      {view==="dashboard" && !user && <AuthPage onAuth={()=>setView("dashboard")} />}

      {stripe && <StripeModal plan={stripe} onDone={handlePayment} onClose={()=>setStripe(null)} />}
    </div>
  );
}
