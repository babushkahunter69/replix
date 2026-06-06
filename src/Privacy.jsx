const S = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
.pv{font-family:'DM Sans',sans-serif;color:#0f0e0c;-webkit-font-smoothing:antialiased;max-width:680px;margin:0 auto;padding:60px 24px 100px}
.pv h1{font-family:'DM Serif Display',serif;font-size:36px;font-weight:400;margin-bottom:8px}
.pv .updated{font-size:13px;color:#9a9590;margin-bottom:48px}
.pv h2{font-family:'DM Serif Display',serif;font-size:20px;font-weight:400;margin:36px 0 12px}
.pv p{font-size:15px;color:#4a4740;line-height:1.8;margin-bottom:14px;font-weight:300}
.pv ul{padding-left:20px;margin-bottom:14px}
.pv ul li{font-size:15px;color:#4a4740;line-height:1.8;font-weight:300;margin-bottom:6px}
.pv a{color:#0f0e0c;text-decoration:underline}
.pv .divider{height:1px;background:#e8e4de;margin:40px 0}
.pv .contact-box{background:#f8f7f4;border:1px solid #e8e4de;border-radius:12px;padding:24px;margin-top:40px}
.pv .contact-box p{margin:0;font-size:14px}
`;

export default function Privacy({ goTo }) {
  return (
    <>
      <style>{S}</style>
      <div className="pv">
        <p style={{fontSize:13,color:"#9a9590",marginBottom:24,cursor:"pointer"}} onClick={()=>goTo("home")}>
          ← rply.space
        </p>
        <h1>Privacy Policy</h1>
        <p className="updated">Last updated: June 4, 2026</p>

        <p>
          Rply ("we", "our", or "us") is a software service. This Privacy Policy explains how we collect, use, and protect your information when you use rply.space (the "Service").
        </p>
        <p>
          By using Rply, you agree to the collection and use of information in accordance with this policy.
        </p>

        <div className="divider" />

        <h2>Information we collect</h2>
        <p>We collect the following information when you use Rply:</p>
        <ul>
          <li><strong>Account information:</strong> Your email address and password when you create an account.</li>
          <li><strong>Business profile data:</strong> Business name, type, location, owner name, and brand voice preferences you provide to personalize your responses.</li>
          <li><strong>Review content:</strong> The customer reviews you paste into Rply to generate responses. These are processed by our AI and stored in your response history.</li>
          <li><strong>Generated responses:</strong> The AI-generated responses we create for you, stored so you can access your history.</li>
          <li><strong>Payment information:</strong> Billing is handled by Stripe. We do not store your card details. We store your Stripe customer ID and subscription status.</li>
          <li><strong>Usage data:</strong> How many responses you have generated, your plan type, and when you signed up.</li>
        </ul>

        <h2>How we use your information</h2>
        <ul>
          <li>To generate AI-powered review responses tailored to your business</li>
          <li>To save your response history and brand voice settings</li>
          <li>To process payments and manage your subscription</li>
          <li>To improve the quality and accuracy of our service</li>
          <li>To send you important service updates (we do not send marketing emails without your consent)</li>
        </ul>

        <h2>AI processing</h2>
        <p>
          Rply uses Anthropic's Claude AI to generate review responses. When you submit a review, the text is sent to Anthropic's API along with your brand voice settings to generate a response. Anthropic processes this data according to their own privacy policy at <a href="https://www.anthropic.com/privacy" target="_blank" rel="noreferrer">anthropic.com/privacy</a>.
        </p>
        <p>
          We do not use your review content or generated responses to train AI models.
        </p>

        <h2>Data storage</h2>
        <p>
          Your data is stored securely using Google Firebase (Firestore), which is hosted on Google Cloud infrastructure. Data is encrypted in transit and at rest. We retain your data for as long as your account is active. You can request deletion of your data at any time by contacting us.
        </p>

        <h2>Data sharing</h2>
        <p>We do not sell your data. We do not share your data with third parties except:</p>
        <ul>
          <li><strong>Anthropic</strong> — to process review content and generate responses</li>
          <li><strong>Stripe</strong> — to process payments securely</li>
          <li><strong>Google Firebase</strong> — to store and authenticate your account</li>
          <li><strong>Vercel</strong> — to host and serve the application</li>
        </ul>
        <p>All third-party providers are required to protect your data in accordance with applicable privacy laws.</p>

        <h2>Cookies</h2>
        <p>
          Rply uses minimal cookies required for authentication (keeping you logged in). We do not use tracking cookies or third-party advertising cookies.
        </p>

        <h2>Your rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your account and all associated data</li>
          <li>Export your data in a readable format</li>
          <li>Withdraw consent at any time by cancelling your account</li>
        </ul>
        <p>To exercise any of these rights, contact us at the email below.</p>

        <h2>Children's privacy</h2>
        <p>
          Rply is not intended for use by anyone under the age of 16. We do not knowingly collect personal information from children.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date. Continued use of Rply after changes constitutes acceptance of the updated policy.
        </p>

        <div className="divider" />

        <div className="contact-box">
          <p style={{fontWeight:500,marginBottom:8}}>Contact us</p>
          <p>
            If you have any questions about this Privacy Policy or how we handle your data, please contact us at:<br/>
            <a href="mailto:hello@rply.space">hello@rply.space</a>
          </p>
        </div>
      </div>
    </>
  );
}
