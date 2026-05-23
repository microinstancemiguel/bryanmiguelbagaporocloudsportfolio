import { useState, useEffect, useRef } from "react";

const SKILLS = {
  Frontend: [
    { name: "JavaScript", tag: "ES2024" },
    { name: "TypeScript", tag: "v5" },
    { name: "React", tag: "v18" },
    { name: "Tailwind CSS", tag: "v3" },
  ],
  Backend: [
    { name: "Node.js", tag: "LTS" },
    { name: "Python", tag: "3.12" },
    { name: "PHP", tag: "8.3" },
    { name: "MySQL", tag: "8.0" },
    { name: "MSSQL", tag: "2022" },
  ],
  Cloud: [
    { name: "AWS", tag: "Multi-Region" },
  ],
};

const CERTS = [
  { title: "Databases", org: "Certiport - A Pearson VUE Business", year: "2025", status: "ACTIVE" },
  { title: "Network Security", org: "Certiport - A Pearson VUE Business", year: "2026", status: "ACTIVE" },
  { title: "Certified in Cybersecurity (CC)", org: "ISC2", year: "2026", status: "ACTIVE" },
];

const NAV = ["About", "Stack", "Certificates", "Contact"];

const BOT_SYSTEM = `chatbot sample.`;

const STATUS_ITEMS = [
  { label: "API Gateway", status: "OPERATIONAL" },
  { label: "CDN Edge", status: "OPERATIONAL" },
  { label: "DB Cluster", status: "OPERATIONAL" },
];

const REGION = "ap-southeast-1";

function CloudIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  );
}

function NodeDot({ color = "#22d3ee" }) {
  return (
    <span style={{
      display: "inline-block", width: 6, height: 6, borderRadius: "50%",
      background: color, marginRight: 6, verticalAlign: "middle", flexShrink: 0,
    }} />
  );
}

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("About");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "[INIT] Connected to Bryan's assistant. I can answer questions about his work, schedule a meeting, or help you get in touch. How can I assist?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailForm, setEmailForm] = useState({ name: "", email: "", message: "" });
  const [emailSent, setEmailSent] = useState(false);
  const [timeStr, setTimeStr] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    const update = () => setTimeStr(new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC");
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  const bg      = dark ? "#080c10" : "#f0f2f5";
  const surface = dark ? "#0d1117" : "#ffffff";
  const surfaceAlt = dark ? "#161b22" : "#f6f8fa";
  const border  = dark ? "#21262d" : "#d0d7de";
  const borderB = dark ? "#30363d" : "#c6cdd5";
  const text    = dark ? "#cdd9e5" : "#1c2128";
  const muted   = dark ? "#545d68" : "#868f99";
  const cyan    = "#22d3ee";
  const green   = "#22c55e";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

const sendChat = async () => {
  if (!input.trim() || loading) return;

  const userMsg = { role: "user", content: input };
  const newMsgs = [...messages, userMsg];

  setMessages(newMsgs);
  setInput("");
  setLoading(true);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMsgs }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "API Error");
    }

    const reply =
      data?.choices?.[0]?.message?.content ||
      "No response from assistant.";

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: reply },
    ]);
  } catch (err) {
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "Error: " + err.message },
    ]);
  }

  setLoading(false);
};


  const handleEmail = (e) => {
    e.preventDefault();
    setEmailSent(true);
  };

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh", fontFamily: "'JetBrains Mono','Fira Code','Courier New',monospace", transition: "background 0.3s,color 0.3s", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#30363d;border-radius:2px}
        .nav-link{cursor:pointer;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;opacity:0.45;transition:opacity 0.2s,color 0.2s;font-family:inherit}
        .nav-link:hover{opacity:0.8}
        .nav-link.on{opacity:1;color:#22d3ee}
        .skill-pill{display:inline-flex;align-items:center;gap:8px;border:1px solid;padding:7px 14px;font-size:11px;letter-spacing:0.07em;border-radius:3px;transition:border-color 0.2s,background 0.2s;cursor:default}
        .skill-pill:hover{border-color:#22d3ee!important;background:#22d3ee10!important}
        .cert-card{border:1px solid;padding:20px 24px;border-radius:4px;transition:border-color 0.2s}
        .cert-card:hover{border-color:#22d3ee!important}
        .btn{cursor:pointer;font-family:inherit;letter-spacing:0.12em;text-transform:uppercase;font-size:11px;padding:11px 22px;border-radius:3px;transition:opacity 0.2s}
        .btn:hover{opacity:0.75}
        input,textarea{font-family:inherit;font-size:12px;outline:none;transition:border-color 0.2s}
        input:focus,textarea:focus{border-color:#22d3ee!important}
        .fab{position:fixed;bottom:28px;right:28px;width:46px;height:46px;border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:100;border:1px solid;transition:opacity 0.2s}
        .fab:hover{opacity:0.8}
        .sec{padding:72px 0}
        .wrap{max-width:960px;margin:0 auto;padding:0 32px}
        .hr{height:1px}
        @keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
        .cur{animation:blink 1s step-end infinite}
        @keyframes pdot{0%,100%{opacity:1}50%{opacity:0.3}}
        .ldot{animation:pdot 2s ease-in-out infinite}
        .grid-bg{position:fixed;inset:0;pointer-events:none;z-index:0}
      `}</style>

      {/* Grid bg via inline SVG data URI */}
      <div className="grid-bg" style={{
        backgroundImage: dark
          ? "linear-gradient(rgba(34,211,238,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.03) 1px,transparent 1px)"
          : "linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Top status ticker */}
      <div style={{ borderBottom: `1px solid ${border}`, background: dark ? "#0a0e14" : "#e8edf2", padding: "5px 0", position: "relative", zIndex: 10 }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10, color: muted, letterSpacing: "0.1em" }}>
            <span className="ldot" style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: green }} />
            <span>ALL SYSTEMS OPERATIONAL</span>
            <span style={{ opacity: 0.4, margin: "0 8px" }}>|</span>
            <span>REGION: {REGION}</span>
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 10, color: muted, letterSpacing: "0.1em" }}>
            <span>UPTIME: <span style={{ color: cyan }}>99.97%</span></span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span style={{ color: cyan }}>{timeStr}</span>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: dark ? "#0d1117ee" : "#ffffffee", backdropFilter: "blur(8px)", borderBottom: `1px solid ${border}`, padding: "15px 0" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CloudIcon size={15} color={cyan} />
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", color: cyan }}>
              legendarygoatman<span className="cur" style={{ color: cyan }}>_</span>
            </span>
          </div>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {NAV.map(n => (
              <span key={n} className={`nav-link${active === n ? " on" : ""}`} onClick={() => scrollTo(n)}>
                {active === n && <span style={{ color: cyan, marginRight: 3 }}>›</span>}{n}
              </span>
            ))}
            <button onClick={() => setDark(!dark)} className="btn"
              style={{ background: "transparent", border: `1px solid ${border}`, color: muted, padding: "5px 14px" }}>
              {dark ? "◑ LIGHT" : "◐ DARK"}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="About" className="sec" style={{ position: "relative", zIndex: 1 }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, color: muted, fontSize: 11, letterSpacing: "0.1em" }}>
                <span style={{ color: cyan }}>$</span>
                <span>whoami</span>
                <span style={{ opacity: 0.4, marginLeft: 8 }}>// {REGION}</span>
              </div>
              <h1 style={{ fontSize: "clamp(36px,5vw,58px)", fontWeight: 700, lineHeight: 1.08, marginBottom: 4, letterSpacing: "-0.02em" }}>Bryan Miguel</h1>
              <h1 style={{ fontSize: "clamp(36px,5vw,58px)", fontWeight: 700, lineHeight: 1.08, marginBottom: 28, letterSpacing: "-0.02em", color: cyan }}>Bagaporo</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
                {["Aspiring Cloud Engineer", "Cloud Architect", "Manila, PH"].map((t, i) => (
                  <span key={t} style={{ fontSize: 11, color: i === 2 ? cyan : muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    {i > 0 && <span style={{ color: borderB, marginRight: 10 }}>·</span>}{t}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.9, color: muted, maxWidth: 480, marginBottom: 36 }}>
                BSIT 3rd Year - Network Infrastructure & Data Security  @ Adamson University Manila Under College of Computing and Information Technology // Cl 
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => scrollTo("Contact")} className="btn" style={{ background: cyan, color: "#08090a", border: `1px solid ${cyan}` }}>
                  $ contact --now
                </button>
                <button onClick={() => setChatOpen(true)} className="btn" style={{ background: "transparent", border: `1px solid ${border}`, color: text }}>
                  $ ./chat.sh
                </button>
              </div>
            </div>

            {/* Status panel */}
            <div style={{ minWidth: 210, background: surface, border: `1px solid ${border}`, borderRadius: 4, overflow: "hidden" }}>
              <div style={{ background: surfaceAlt, borderBottom: `1px solid ${border}`, padding: "9px 14px", display: "flex", alignItems: "center", gap: 5 }}>
                {["#f87171","#fbbf24","#22c55e"].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
                <span style={{ fontSize: 10, color: muted, marginLeft: 8, letterSpacing: "0.1em" }}>status.sh</span>
              </div>
              <div style={{ padding: 16 }}>
                {STATUS_ITEMS.map((s, i) => (
                  <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: i < STATUS_ITEMS.length - 1 ? `1px solid ${border}` : "none" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <NodeDot color={cyan} />
                      <span style={{ fontSize: 11, color: muted }}>{s.label}</span>
                    </div>
                    <span style={{ fontSize: 9, color: green, letterSpacing: "0.1em", background: dark ? "#052e16" : "#dcfce7", padding: "2px 6px", borderRadius: 2 }}>{s.status}</span>
                  </div>
                ))}
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${border}` }}>
                  <div style={{ fontSize: 10, color: muted, marginBottom: 6, letterSpacing: "0.08em" }}>OPEN TO WORK</div>
                  <div style={{ fontSize: 11, color: cyan, display: "flex", alignItems: "center", gap: 6 }}>
                    <span className="ldot" style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: cyan }} />
                    Available Now
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, marginTop: 56, border: `1px solid ${border}`, borderRadius: 4, overflow: "hidden", background: border }}>
            {[
              ["0", "Years Experience", "since 2026"],
              ["0+", "Projects Shipped", "prod deployments"],
              ["0+", "AWS Services", "certified use"],
            ].map(([v, l, s]) => (
              <div key={l} style={{ background: surface, padding: "22px 18px" }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: cyan, letterSpacing: "-0.02em", marginBottom: 4 }}>{v}</div>
                <div style={{ fontSize: 10, color: text, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>{l}</div>
                <div style={{ fontSize: 10, color: muted }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="hr" style={{ background: border }} />

      {/* STACK */}
      <section id="Stack" className="sec" style={{ position: "relative", zIndex: 1 }}>
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, color: muted, fontSize: 11 }}>
            <span style={{ color: cyan }}>$</span><span>cat tech-stack.json</span>
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 48, letterSpacing: "-0.01em" }}>
             Stack <span style={{ color: cyan, fontSize: 13, fontWeight: 400, marginLeft: 8 }}>// {Object.values(SKILLS).flat().length} modules loaded</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {Object.entries(SKILLS).map(([cat, skills]) => (
              <div key={cat}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <span style={{ fontSize: 10, color: cyan, letterSpacing: "0.18em", textTransform: "uppercase" }}>{cat}</span>
                  <div style={{ flex: 1, height: "1px", background: border }} />
                  <span style={{ fontSize: 10, color: muted }}>{skills.length} services</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {skills.map(s => (
                    <div key={s.name} className="skill-pill" style={{ borderColor: border, color: text, background: surfaceAlt }}>
                      <NodeDot color={cyan} />
                      <span>{s.name}</span>
                      <span style={{ fontSize: 9, letterSpacing: "0.1em", padding: "2px 6px", borderRadius: 2, fontWeight: 500, background: dark ? "#1c2a1e" : "#f0fdf4", color: dark ? "#4ade80" : "#166534" }}>{s.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="hr" style={{ background: border }} />

      {/* CERTIFICATES */}
      <section id="Certificates" className="sec" style={{ position: "relative", zIndex: 1 }}>
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, color: muted, fontSize: 11 }}>
            <span style={{ color: cyan }}>$</span><span>ls ./certificates/</span>
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 48, letterSpacing: "-0.01em" }}>
            Certificates <span style={{ color: cyan, fontSize: 13, fontWeight: 400, marginLeft: 8 }}>// {CERTS.length} verified</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {CERTS.map(c => (
              <div key={c.id} className="cert-card" style={{ background: surface, borderColor: border }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <span style={{ fontSize: 9, color: muted, letterSpacing: "0.12em" }}>{c.id}</span>
                  <span style={{ fontSize: 9, color: green, letterSpacing: "0.1em", background: dark ? "#052e16" : "#dcfce7", padding: "2px 8px", borderRadius: 2 }}>● {c.status}</span>
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.4, marginBottom: 10 }}>{c.title}</h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: muted }}>{c.org}</span>
                  <span style={{ fontSize: 10, color: cyan, letterSpacing: "0.1em" }}>{c.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="hr" style={{ background: border }} />

      {/* CONTACT */}
      <section id="Contact" className="sec" style={{ position: "relative", zIndex: 1 }}>
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, color: muted, fontSize: 11 }}>
            <span style={{ color: cyan }}>$</span><span>curl --request POST /api/contact</span>
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 48, letterSpacing: "-0.01em" }}>
            Get in Touch <span style={{ color: cyan, fontSize: 13, fontWeight: 400, marginLeft: 8 }}>// response_time &lt; 24h</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div>
              <div style={{ border: `1px solid ${border}`, borderRadius: 4, overflow: "hidden" }}>
                {[
                  { label: "email", val: "bryanmiguelbagaporoclouds@gmail.com", icon: "✉" },
                  { label: "linkedin", val: "in/bryan-miguel-bagaporo", icon: "in" },
                  { label: "github", val: "github.com/microinstancesmiguel", icon: "⌥" },
                  { label: "location", val: "Manila, PH", icon: "◎" },
                ].map((row, i, arr) => (
                  <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 16, padding: "13px 18px", background: i % 2 === 0 ? surface : surfaceAlt, borderBottom: i < arr.length - 1 ? `1px solid ${border}` : "none" }}>
                    <span style={{ fontSize: 11, color: cyan, width: 16, textAlign: "center" }}>{row.icon}</span>
                    <span style={{ fontSize: 10, color: muted, width: 60, letterSpacing: "0.1em" }}>{row.label}</span>
                    <span style={{ fontSize: 12 }}>{row.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 4, overflow: "hidden" }}>
              <div style={{ background: surfaceAlt, borderBottom: `1px solid ${border}`, padding: "9px 14px", display: "flex", alignItems: "center", gap: 5 }}>
                {["#f87171","#fbbf24","#22c55e"].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
                <span style={{ fontSize: 10, color: muted, marginLeft: 8, letterSpacing: "0.1em" }}>message.sh</span>
              </div>
              <div style={{ padding: 24 }}>
                {emailSent ? (
                  <div style={{ textAlign: "center", padding: "28px 0" }}>
                    <div style={{ fontSize: 28, color: green, marginBottom: 10 }}>✓</div>
                    <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Message transmitted.</p>
                    <p style={{ fontSize: 11, color: muted, marginBottom: 22 }}>ACK received. Will respond within 24h.</p>
                    <button onClick={() => setEmailSent(false)} className="btn" style={{ background: cyan, color: "#08090a", border: "none" }}>$ send-another</button>
                  </div>
                ) : (
                  <form onSubmit={handleEmail} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {[
                      { label: "name", key: "name", type: "text", placeholder: "your_name" },
                      { label: "email", key: "email", type: "email", placeholder: "you@example.com" },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={{ display: "flex", gap: 5, fontSize: 10, color: cyan, letterSpacing: "0.12em", marginBottom: 5, alignItems: "center" }}>
                          <span style={{ color: muted }}>--</span>{f.label}
                        </label>
                        <input required type={f.type} placeholder={f.placeholder} value={emailForm[f.key]}
                          onChange={e => setEmailForm(p => ({ ...p, [f.key]: e.target.value }))}
                          style={{ width: "100%", padding: "9px 12px", background: surfaceAlt, border: `1px solid ${border}`, color: text, borderRadius: 3 }} />
                      </div>
                    ))}
                    <div>
                      <label style={{ display: "flex", gap: 5, fontSize: 10, color: cyan, letterSpacing: "0.12em", marginBottom: 5, alignItems: "center" }}>
                        <span style={{ color: muted }}>--</span>message
                      </label>
                      <textarea required rows={4} placeholder="describe_your_project..." value={emailForm.message}
                        onChange={e => setEmailForm(p => ({ ...p, message: e.target.value }))}
                        style={{ width: "100%", padding: "9px 12px", background: surfaceAlt, border: `1px solid ${border}`, color: text, borderRadius: 3, resize: "vertical" }} />
                    </div>
                    <button type="submit" className="btn" style={{ background: cyan, color: "#08090a", border: "none", alignSelf: "flex-start" }}>
                      $ send --payload ›
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${border}`, padding: "22px 0", position: "relative", zIndex: 1 }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, color: muted, letterSpacing: "0.1em" }}>
            <span style={{ color: cyan }}>©</span> 2026 Bryan Miguel Bagaporo
          </span>
          <span style={{ fontSize: 10, color: muted, letterSpacing: "0.1em" }}>
            <span style={{ color: cyan }}>$</span> exit 0
          </span>
        </div>
      </footer>

      {/* CHAT FAB */}
      <button onClick={() => setChatOpen(!chatOpen)} className="fab"
        style={{ background: chatOpen ? surfaceAlt : cyan, borderColor: chatOpen ? borderB : cyan, color: chatOpen ? text : "#08090a" }}>
        {chatOpen ? "✕" : <CloudIcon size={18} color="#08090a" />}
      </button>

      {/* CHAT PANEL */}
      {chatOpen && (
        <div style={{ position: "fixed", bottom: 86, right: 28, width: 355, height: 470, background: surface, border: `1px solid ${border}`, borderRadius: 4, display: "flex", flexDirection: "column", zIndex: 99, overflow: "hidden" }}>
          <div style={{ background: surfaceAlt, borderBottom: `1px solid ${border}`, padding: "9px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {["#f87171","#fbbf24","#22c55e"].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
              <span style={{ fontSize: 10, color: muted, marginLeft: 6, letterSpacing: "0.1em" }}>assistant.sh</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span className="ldot" style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: green }} />
              <span style={{ fontSize: 9, color: green, letterSpacing: "0.1em" }}>LIVE</span>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "14px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "80%", padding: "9px 12px", borderRadius: 3, fontSize: 11, lineHeight: 1.7,
                background: m.role === "user" ? cyan : surfaceAlt,
                color: m.role === "user" ? "#08090a" : text,
                border: m.role === "user" ? "none" : `1px solid ${border}`,
              }}>
                {m.role === "assistant" && <span style={{ color: cyan, marginRight: 5, fontSize: 10 }}>›</span>}
                {m.content}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start", padding: "9px 12px", background: surfaceAlt, border: `1px solid ${border}`, borderRadius: 3, fontSize: 11, color: muted }}>
                <span style={{ color: cyan }}>›</span> processing<span className="cur">_</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div style={{ padding: "10px 12px", borderTop: `1px solid ${border}`, background: surfaceAlt, display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ color: cyan, fontSize: 12 }}>$</span>
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendChat()}
              placeholder="type your query..."
              style={{ flex: 1, padding: "7px 8px", background: surface, border: `1px solid ${border}`, color: text, borderRadius: 3 }} />
            <button onClick={sendChat} disabled={loading}
              style={{ padding: "7px 14px", background: cyan, color: "#08090a", border: "none", cursor: "pointer", fontSize: 13, borderRadius: 3, fontFamily: "inherit" }}>
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}