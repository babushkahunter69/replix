export default function Landing({ goTo }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .lp * { box-sizing: border-box; margin: 0; padding: 0; }

        .lp {
          font-family: 'DM Sans', sans-serif;
          color: #0f0e0c;
          background: #faf9f6;
          -webkit-font-smoothing: antialiased;
        }

        /* ── HERO ── */
        .hero {
          min-height: 75vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 80px 24px 60px;
          max-width: 860px;
          margin: 0 auto;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #9a9590;
          margin-bottom: 24px;
        }

        .hero-tag::before {
          content: none;
        }

        .hero-h1 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(40px, 6vw, 68px);
          font-weight: 400;
          line-height: 1.0;
          letter-spacing: -0.02em;
          color: #0f0e0c;
          margin-bottom: 24px;
        }

        .hero-h1 em {
          font-style: italic;
          color: #9a9590;
        }

        .hero-sub {
          font-size: 17px;
          color: #6b6760;
          line-height: 1.7;
          font-weight: 400;
          max-width: 520px;
          margin: 0 auto 40px;
        }

        .hero-ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 56px;
        }

        .cta-primary {
          background: #0f0e0c;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          padding: 14px 28px;
          cursor: pointer;
          transition: background 0.15s;
          letter-spacing: -0.01em;
        }
        .cta-primary:hover { background: #2c2a26; }

        .cta-ghost {
          background: none;
          color: #6b6760;
          border: 1px solid #e8e4de;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          padding: 14px 28px;
          cursor: pointer;
          transition: all 0.15s;
          letter-spacing: -0.01em;
        }
        .cta-ghost:hover { border-color: #b0aba3; color: #0f0e0c; }

        .hero-stats {
          display: flex;
          gap: 48px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .stat-item { }
        .stat-num {
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
          font-weight: 400;
          color: #0f0e0c;
          line-height: 1;
          margin-bottom: 4px;
        }
        .stat-lbl { font-size: 13px; color: #9a9590; }

        /* ── MARQUEE ── */
        .marquee-wrap {
          border-top: 1px solid #e8e4de;
          border-bottom: 1px solid #e8e4de;
          padding: 16px 0;
          overflow: hidden;
          background: #fff;
        }

        .marquee-track {
          display: flex;
          gap: 48px;
          animation: marquee 25s linear infinite;
          white-space: nowrap;
        }

        .marquee-item {
          font-size: 13px;
          color: #9a9590;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .marquee-dot {
          color: #d4cfc9;
          margin: 0 8px;
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* ── HOW IT WORKS ── */
        .section {
          max-width: 1080px;
          margin: 0 auto;
          padding: 80px 40px;
        }

        .section-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #9a9590;
          margin-bottom: 16px;
        }

        .section-h2 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(26px, 3.5vw, 38px);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #0f0e0c;
          margin-bottom: 60px;
          max-width: 520px;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: #e8e4de;
          border: 1px solid #e8e4de;
          border-radius: 16px;
          overflow: hidden;
        }

        @media(max-width: 640px) { .steps { grid-template-columns: 1fr; } }

        .step {
          background: #faf9f6;
          padding: 36px 32px;
        }

        .step-num {
          font-family: 'DM Serif Display', serif;
          font-size: 13px;
          font-weight: 400;
          color: #c8c3bb;
          margin-bottom: 20px;
        }

        .step-icon {
          font-size: 28px;
          margin-bottom: 16px;
          display: block;
        }

        .step-title {
          font-size: 16px;
          font-weight: 500;
          color: #0f0e0c;
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }

        .step-body {
          font-size: 14px;
          color: #6b6760;
          line-height: 1.6;
          font-weight: 300;
        }

        /* ── BEFORE/AFTER ── */
        .ba-section {
          background: #fff;
          border-top: 1px solid #e8e4de;
          border-bottom: 1px solid #e8e4de;
        }

        .ba-inner {
          max-width: 1080px;
          margin: 0 auto;
          padding: 80px 40px;
        }

        .ba-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-top: 48px;
        }

        @media(max-width: 640px) { .ba-grid { grid-template-columns: 1fr; } }

        .ba-card {
          border-radius: 16px;
          padding: 32px;
          border: 1px solid;
        }

        .ba-card.before {
          background: #fef2f2;
          border-color: #fecaca;
        }

        .ba-card.after {
          background: #edf7f1;
          border-color: #b6e4cc;
        }

        .ba-badge {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 16px;
          display: block;
        }

        .ba-card.before .ba-badge { color: #991b1b; }
        .ba-card.after  .ba-badge { color: #1a6644; }

        .ba-review {
          font-size: 14px;
          line-height: 1.7;
          font-style: italic;
          color: #4a4740;
          margin-bottom: 20px;
          font-weight: 300;
        }

        .ba-response {
          font-size: 14px;
          line-height: 1.7;
          color: #1a3a2a;
          font-weight: 400;
        }

        .ba-no-response {
          font-size: 14px;
          color: #9a9590;
          font-style: italic;
        }

        .ba-stars { color: #f59e0b; font-size: 13px; margin-bottom: 10px; }

        /* ── TESTIMONIALS ── */
        .testi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 48px;
        }

        @media(max-width: 740px) { .testi-grid { grid-template-columns: 1fr; } }

        .testi-card {
          background: #fff;
          border: 1px solid #e8e4de;
          border-radius: 16px;
          padding: 28px;
        }

        .testi-stars { color: #f59e0b; font-size: 14px; margin-bottom: 16px; }

        .testi-quote {
          font-size: 15px;
          line-height: 1.7;
          color: #4a4740;
          font-weight: 300;
          margin-bottom: 20px;
          font-style: italic;
        }

        .testi-author {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .testi-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #f2efe9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          color: #6b6760;
          flex-shrink: 0;
        }

        .testi-name { font-size: 13px; font-weight: 500; color: #0f0e0c; }
        .testi-biz  { font-size: 12px; color: #9a9590; }

        /* ── PRICING TEASER ── */
        .pricing-teaser {
          background: #0f0e0c;
          padding: 80px 40px;
        }

        .pricing-inner {
          max-width: 720px;
          margin: 0 auto;
          text-align: center;
        }

        .pricing-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #6b6760;
          margin-bottom: 16px;
        }

        .pricing-h2 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(26px, 3.5vw, 38px);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #fff;
          margin-bottom: 16px;
        }

        .pricing-h2 em { font-style: italic; color: #9a9590; }

        .pricing-sub {
          font-size: 16px;
          color: #6b6760;
          font-weight: 300;
          margin-bottom: 48px;
          line-height: 1.6;
        }

        .pricing-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          text-align: left;
          margin-bottom: 32px;
        }

        @media(max-width: 520px) { .pricing-cards { grid-template-columns: 1fr; } }

        .p-card {
          border-radius: 16px;
          padding: 28px;
          border: 1px solid;
        }

        .p-card.free {
          background: #1a1714;
          border-color: #2c2a26;
        }

        .p-card.pro {
          background: #faf9f6;
          border-color: #e8e4de;
        }

        .p-tier { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 12px; }
        .p-card.free .p-tier { color: #6b6760; }
        .p-card.pro  .p-tier { color: #9a9590; }

        .p-price {
          font-family: 'DM Serif Display', serif;
          font-size: 32px;
          font-weight: 400;
          line-height: 1;
          margin-bottom: 4px;
        }
        .p-card.free .p-price { color: #fff; }
        .p-card.pro  .p-price { color: #0f0e0c; }

        .p-cadence { font-size: 13px; margin-bottom: 20px; }
        .p-card.free .p-cadence { color: #6b6760; }
        .p-card.pro  .p-cadence { color: #9a9590; }

        .p-features { list-style: none; }
        .p-features li { font-size: 13px; padding: 5px 0; display: flex; gap: 8px; }
        .p-card.free .p-features li { color: #6b6760; }
        .p-card.pro  .p-features li { color: #4a4740; }
        .p-check-free { color: #4a4740; }
        .p-check-pro  { color: #1a6644; }

        .pricing-cta {
          background: #fff;
          color: #0f0e0c;
          border: none;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          padding: 14px 32px;
          cursor: pointer;
          transition: background 0.15s;
          letter-spacing: -0.01em;
        }
        .pricing-cta:hover { background: #f2efe9; }

        .pricing-note { font-size: 13px; color: #4a4740; margin-top: 14px; }

        /* ── FAQ ── */
        .faq-list { margin-top: 48px; border-top: 1px solid #e8e4de; }

        .faq-item {
          border-bottom: 1px solid #e8e4de;
          padding: 24px 0;
        }

        .faq-q {
          font-size: 16px;
          font-weight: 500;
          color: #0f0e0c;
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }

        .faq-a {
          font-size: 14px;
          color: #6b6760;
          line-height: 1.7;
          font-weight: 300;
        }

        /* ── FOOTER ── */
        .footer {
          border-top: 1px solid #e8e4de;
          padding: 32px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 960px;
          margin: 0 auto;
          flex-wrap: wrap;
          gap: 12px;
        }

        .footer-logo {
          font-family: 'DM Serif Display', serif;
          font-size: 16px;
          font-weight: 400;
        }
        .footer-logo em { font-style: italic; color: #9a9590; }
        .footer-logo span { font-weight: 500; }

        .footer-copy { font-size: 13px; color: #9a9590; }
      `}</style>

      <div className="lp">

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-tag">AI-powered reputation management</div>
          <h1 className="hero-h1">
            Stop ignoring<br/>your reviews.<br/><em>Start winning.</em>
          </h1>
          <p className="hero-sub">
            Rply writes polished, human-sounding responses to your Google and Yelp reviews in under 2 seconds. Build trust, rank higher, convert more customers.
          </p>
          <div className="hero-ctas">
            <button className="cta-primary" onClick={() => goTo("auth")}>Start free, no card needed</button>
            <button className="cta-ghost" onClick={() => goTo("pricing")}>View pricing</button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-num">2s</div>
              <div className="stat-lbl">To generate a response</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">3 free</div>
              <div className="stat-lbl">Responses to start</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">$49</div>
              <div className="stat-lbl">Per month, unlimited</div>
            </div>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...Array(2)].map((_, i) => (
              <span key={i} style={{display:"flex",gap:"48px",flexShrink:0}}>
                {["Restaurants","Hair Salons","Dental Clinics","Gyms","Hotels","Cafés","Auto Shops","Law Firms","Retail Stores","Spas"].map(b => (
                  <span key={b} className="marquee-item">{b}<span className="marquee-dot">·</span></span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <section className="section">
          <div className="section-label">How it works</div>
          <h2 className="section-h2">Three steps to a perfect reply</h2>
          <div className="steps">
            {[
              { n:"01", icon:"📋", title:"Paste the review", body:"Copy any review from Google, Yelp, or TripAdvisor and paste it into Rply." },
              { n:"02", icon:"🎚️", title:"Pick your tone", body:"Choose from Professional, Friendly, Apologetic, or Grateful to match the situation." },
              { n:"03", icon:"✨", title:"Copy and post", body:"Get a polished, human-sounding response in seconds. Copy it and post directly." },
            ].map(s => (
              <div key={s.n} className="step">
                <div className="step-num">{s.n}</div>
                <span className="step-icon">{s.icon}</span>
                <div className="step-title">{s.title}</div>
                <p className="step-body">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── BEFORE / AFTER ── */}
        <div className="ba-section">
          <div className="ba-inner">
            <div className="section-label">Before & after</div>
            <h2 className="section-h2">See the difference a reply makes</h2>
            <div className="ba-grid">
              <div className="ba-card before">
                <span className="ba-badge">Without Rply</span>
                <div className="ba-stars">★★☆☆☆</div>
                <p className="ba-review">"Waited 45 minutes with a reservation. Food was cold and the waiter seemed annoyed we were even there. Won't be returning."</p>
                <p className="ba-no-response">No response from owner. 6 weeks ago.</p>
              </div>
              <div className="ba-card after">
                <span className="ba-badge">With Rply</span>
                <div className="ba-stars">★★☆☆☆</div>
                <p className="ba-review">"Waited 45 minutes with a reservation. Food was cold and the waiter seemed annoyed we were even there. Won't be returning."</p>
                <p className="ba-response">We're truly sorry about your experience. That's not the standard we hold ourselves to. A 45-minute wait with a reservation is unacceptable, and we'd love the chance to make it right. Please reach out to us directly and your next visit is on us. Warm regards, The Team</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── TESTIMONIALS ── */}
        <section className="section">
          <div className="section-label">What owners say</div>
          <h2 className="section-h2">Real businesses, real results</h2>
          <div className="testi-grid">
            {[
              { q:"I used to dread opening Google reviews. Now I respond to every single one in minutes. My rating went from 4.1 to 4.6 in two months.", name:"Maria S.", biz:"Bloom Hair Studio", init:"MS" },
              { q:"As a restaurant owner I don't have time to craft responses. Rply does it for me and honestly sounds more professional than I ever could.", name:"James T.", biz:"The Corner Bistro", init:"JT" },
              { q:"The apologetic tone is incredible. We had a rough patch and the responses Rply wrote actually brought customers back.", name:"Carla M.", biz:"Apex Fitness", init:"CM" },
            ].map(t => (
              <div key={t.name} className="testi-card">
                <div className="testi-stars">★★★★★</div>
                <p className="testi-quote">"{t.q}"</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.init}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-biz">{t.biz}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRICING TEASER ── */}
        <section className="pricing-teaser">
          <div className="pricing-inner">
            <div className="pricing-label">Pricing</div>
            <h2 className="pricing-h2">Start free.<br/><em>Scale when ready.</em></h2>
            <p className="pricing-sub">No contracts, no hidden fees. Cancel anytime.</p>
            <div className="pricing-cards">
              <div className="p-card free">
                <div className="p-tier">Free</div>
                <div className="p-price">$0</div>
                <div className="p-cadence">forever</div>
                <ul className="p-features">
                  {["3 responses / month","All 4 tone styles","Star-rating detection"].map(f => (
                    <li key={f}><span className="p-check-free">✓</span>{f}</li>
                  ))}
                </ul>
              </div>
              <div className="p-card pro">
                <div className="p-tier">Pro</div>
                <div className="p-price">$49</div>
                <div className="p-cadence">/ month</div>
                <ul className="p-features">
                  {["Unlimited responses","Business name memory","Response history","Priority support"].map(f => (
                    <li key={f}><span className="p-check-pro">✓</span>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
            <button className="pricing-cta" onClick={() => goTo("auth")}>
              Get started free →
            </button>
            <p className="pricing-note">3 free responses · No credit card required</p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section">
          <div className="section-label">FAQ</div>
          <h2 className="section-h2">Common questions</h2>
          <div className="faq-list">
            {[
              { q:"Do I need any technical skills?", a:"None. Paste a review, pick a tone, click generate. That's it." },
              { q:"Will responses sound robotic or templated?", a:"No. Rply is powered by Claude AI and is specifically prompted to write like a real business owner, not a customer service template." },
              { q:"What platforms does it work with?", a:"Any platform where you can copy and paste text: Google, Yelp, TripAdvisor, Facebook, and more." },
              { q:"Can I cancel anytime?", a:"Yes, absolutely. No contracts, no cancellation fees. Cancel in one click from your account." },
              { q:"What counts as a 'response' on the free plan?", a:"Each time you click Generate Response, that counts as one. You get 3 per month on the free plan, unlimited on Pro." },
            ].map(f => (
              <div key={f.q} className="faq-item">
                <div className="faq-q">{f.q}</div>
                <p className="faq-a">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer">
          <div className="footer-logo"><em>r</em><span>ply</span></div>
          <div className="footer-copy">© 2026 Rply. Built for local businesses. <span style={{margin:"0 8px",color:"var(--rule)"}}>·</span> <span style={{cursor:"pointer",textDecoration:"underline"}} onClick={()=>goTo("privacy")}>Privacy Policy</span></div>
        </footer>

      </div>
    </>
  );
}
