import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import photo from "./AIGoatman.jpg";
import rAItify1 from "./rAI1.png";
import rAItify2 from "./rAI2.png";
import rAItify3 from "./rAI3.png";
emailjs.init("vNfhSk7yAHwtaMihM");

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
  Skills: [
    { name: "Web Development" },
    { name: "KALI Linux" },
    { name: "Wireshark" },
    { name: "Nmap - Zenmap" },
    { name: "XAMPP" },
    { name: "ADOBE", tag: "Illustrator" },
    { name: "Clerical Ability" },
  ],
};

const CERTS = [
  { title: "Databases", org: "Certiport — A Pearson VUE Business", year: "2025", status: "Active" },
  { title: "Network Security", org: "Certiport — A Pearson VUE Business", year: "2026", status: "Active" },
  { title: "Certified in Cybersecurity (CC)", org: "ISC2", year: "2026", status: "Active" },
];

const PROJECTS = [
  {
    title: "rAItify v1",
    desc: "A Browser Extension that Detects A.I Contents",
    tech: "JS Vanilla · Chrome Extension (Manifest V3) · Groq API Llama4 Scout · Node.js · Git + GitHub · MutationObserver · Chrome Storage · Fetch API · Canvas API",
    imgs: [rAItify1, rAItify2, rAItify3],
  },
  {
    title: "Project Title Two",
    desc: "A short description of what this project does and the problem it solves.",
    tech: "Python · AWS · TypeScript",
    imgs: [],
  },
  {
    title: "Project Title Three",
    desc: "A short description of what this project does and the problem it solves.",
    tech: "PHP · MSSQL · Tailwind CSS",
    imgs: [],
  },
];

const NAV = ["About", "Projects", "Certificates", "Stack", "Contact"];

export default function Portfolio() {
  const [active, setActive] = useState("About");
  const [proj, setProj] = useState(0);
  const [slide, setSlide] = useState(0);
  const [form, setForm] = useState({ from_name: "", from_email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  const goProj = (n) => {
    setProj((n + PROJECTS.length) % PROJECTS.length);
    setSlide(0);
  };

  const currentProj = PROJECTS[proj];
  const imgs = currentProj.imgs || [];
  const hasImgs = imgs.length > 0;
  const multiImg = imgs.length > 1;

  const goSlide = (n) => setSlide((n + imgs.length) % imgs.length);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setStatus(null);
  };

  const handleSubmit = async () => {
    const { from_name, from_email, message } = form;
    if (!from_name.trim() || !from_email.trim() || !message.trim()) {
      setStatus({ type: "error", text: "Please fill in name, email, and message." });
      return;
    }
    setSending(true);
    setStatus(null);
    try {
      await emailjs.send("service_7bd4reo", "template_exv8jjo", form);
      setStatus({ type: "success", text: "Message sent. I'll get back to you soon." });
      setForm({ from_name: "", from_email: "", subject: "", message: "" });
    } catch {
      setStatus({ type: "error", text: "Something went wrong. Please email me directly." });
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{
      fontFamily: "'EB Garamond', 'Garamond', 'Times New Roman', serif",
      background: "#faf9f7",
      color: "#1a1a1a",
      minHeight: "100vh",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #faf9f7; }

        .nav-item {
          font-family: 'EB Garamond', serif;
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          color: #888;
          transition: color 0.2s;
          background: none;
          border: none;
          padding: 0;
        }
        .nav-item:hover { color: #1a1a1a; }
        .nav-item.active { color: #1a1a1a; }

        .rule { border: none; border-top: 1px solid #1a1a1a; margin: 0; }
        .rule-thin { border: none; border-top: 1px solid #ddd; margin: 0; }

        .skill-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
          font-size: 15px;
        }
        .skill-row:last-child { border-bottom: none; }

        .cert-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 16px;
          align-items: baseline;
          padding: 14px 0;
          border-bottom: 1px solid #eee;
        }
        .cert-row:last-child { border-bottom: none; }

        .contact-link {
          color: #1a1a1a;
          text-decoration: none;
          border-bottom: 1px solid #1a1a1a;
          transition: opacity 0.2s;
        }
        .contact-link:hover { opacity: 0.5; }

        .form-input {
          font-family: 'EB Garamond', serif;
          font-size: 15px;
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #ccc;
          padding: 8px 0;
          color: #1a1a1a;
          outline: none;
          transition: border-color 0.2s;
          border-radius: 0;
        }
        .form-input:focus { border-bottom-color: #1a1a1a; }
        .form-input::placeholder { color: #bbb; }
        textarea.form-input { resize: none; min-height: 90px; }

        .send-btn {
          font-family: 'EB Garamond', serif;
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: none;
          border: 1px solid #1a1a1a;
          color: #1a1a1a;
          padding: 10px 28px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .send-btn:hover:not(:disabled) { background: #1a1a1a; color: #faf9f7; }
        .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .nav-btn {
          font-family: 'EB Garamond', serif;
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: none;
          border: 1px solid #1a1a1a;
          color: #1a1a1a;
          padding: 7px 18px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .nav-btn:hover { background: #1a1a1a; color: #faf9f7; }

        .dot-btn {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          border: 1px solid #1a1a1a;
          background: transparent;
          cursor: pointer;
          padding: 0;
          transition: background 0.2s;
        }
        .dot-btn.dot-active { background: #1a1a1a; }

        .slide-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          border: 1px solid #999;
          background: transparent;
          cursor: pointer;
          padding: 0;
          transition: background 0.2s, border-color 0.2s;
        }
        .slide-dot.slide-dot-active { background: #555; border-color: #555; }

        @media (max-width: 640px) {
          .two-col { grid-template-columns: 1fr !important; }
          .hide-mobile { display: none !important; }
          .about-header { flex-direction: column !important; align-items: center !important; text-align: center !important; }
          .about-header .info-links { justify-content: center !important; }
          .about-header .info-titles { justify-content: center !important; }
          .form-two-col { grid-template-columns: 1fr !important; }
          .carousel-footer { flex-direction: column !important; gap: 12px !important; }
          .ctrl-bar { flex-wrap: wrap !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#faf9f7",
        borderBottom: "1px solid #1a1a1a",
        padding: "14px 0",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}>
            Bryan Miguel Bagaporo
          </span>
          <div style={{ display: "flex", gap: 32 }}>
            {NAV.map(n => (
              <button key={n} className={`nav-item${active === n ? " active" : ""}`} onClick={() => scrollTo(n)}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "0 40px 80px" }}>

        {/* ABOUT */}
        <section id="About" style={{ paddingTop: 72, paddingBottom: 64 }}>
          <div
            className="about-header"
            style={{
              display: "flex",
              gap: 32,
              alignItems: "flex-start",
              marginBottom: 40,
              paddingBottom: 28,
              borderBottom: "2px solid #1a1a1a",
            }}
          >
            <img
              src={photo}
              alt="Bryan Miguel Bagaporo"
              style={{
                width: 140,
                height: 140,
                objectFit: "cover",
                borderRadius: 4,
                flexShrink: 0,
                border: "1px solid #ddd",
              }}
            />
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: 30, fontWeight: 500, letterSpacing: "0.04em", marginBottom: 10, lineHeight: 1.15 }}>
                Bryan Miguel Bagaporo, CC
              </h1>
              <div
                className="info-titles"
                style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: "#555", marginBottom: 12, display: "flex", flexWrap: "wrap", gap: "0 18px" }}
              >
                <span>Manila, Philippines</span>
                <span style={{ color: "#bbb" }}>·</span>
                <span>BSIT Student</span>
                <span style={{ color: "#bbb" }}>·</span>
                <span>Cybersecurity</span>
                <span style={{ color: "#bbb" }}>·</span>
                <span>Civil Service Professional</span>
              </div>
              <div
                className="info-links"
                style={{ fontSize: 13, color: "#555", display: "flex", flexWrap: "wrap", gap: "0 18px" }}
              >
                <a href="mailto:bryanmiguelbagaporoclouds@gmail.com" className="contact-link">
                  bryanmiguelbagaporoclouds@gmail.com
                </a>
                <span style={{ color: "#bbb" }}>·</span>
                <a href="https://linkedin.com/in/bryan-miguel-bagaporo" target="_blank" rel="noreferrer" className="contact-link">
                  LinkedIn
                </a>
                <span style={{ color: "#bbb" }}>·</span>
                <a href="https://github.com/microinstancesmiguel" target="_blank" rel="noreferrer" className="contact-link">
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Education */}
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10, fontWeight: 500 }}>
              Education
            </h2>
            <hr className="rule" style={{ marginBottom: 16 }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "baseline" }}>
              <div>
                <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 3 }}>Adamson University</p>
                <p style={{ fontSize: 14, color: "#555", fontStyle: "italic", marginBottom: 3 }}>
                  Bachelor of Science in Information Technology
                </p>
                <p style={{ fontSize: 13, color: "#888" }}>
                  Network Infrastructure &amp; Data Security · College of Computing and Information Technology
                </p>
              </div>
              <div style={{ textAlign: "right", fontSize: 13, color: "#555", whiteSpace: "nowrap" }}>
                <p>Manila, PH</p>
                <p style={{ color: "#888", marginTop: 3 }}>1st Year - 4th Year · 2022–2027</p>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "baseline", marginTop: 16 }}>
              <div>
                <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 3 }}>Adamson University Senior High School</p>
                <p style={{ fontSize: 14, color: "#555", fontStyle: "italic", marginBottom: 3 }}>
                  Science, Technology, Engineering &amp; Mathematics
                </p>
                <p style={{ fontSize: 13, color: "#888" }}>STEM Engineering, BED</p>
              </div>
              <div style={{ textAlign: "right", fontSize: 13, color: "#555", whiteSpace: "nowrap" }}>
                <p>Manila, PH</p>
                <p style={{ color: "#888", marginTop: 3 }}>Grade 11–12 · 2020–2022</p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10, fontWeight: 500 }}>
              Summary
            </h2>
            <hr className="rule" style={{ marginBottom: 16 }} />
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "#333" }}>
              BSIT student at Adamson University specializing in network infrastructure and data security.
              Pursuing a career in cloud engineering and architecture with hands-on experience across AWS,
              full-stack web development, and cybersecurity. Certified in cybersecurity (CC) BY ISC2.

              VALORANT GOD (Duelist), Counter-Strike (Entry Fragger), League of Legends (Thrower) & Comic Nerd.
            </p>
          </div>
        </section>

        <hr className="rule" />

        {/* PROJECTS */}
        <section id="Projects" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <h2 style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10, fontWeight: 500 }}>
            Projects
          </h2>
          <hr className="rule" style={{ marginBottom: 24 }} />

          {/* Image stage — no arrows inside */}
          <div style={{
            background: "#f0ede8",
            border: "1px solid #ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 340,
            overflow: "hidden",
          }}>
            {hasImgs ? (
              <img
                key={`${proj}-${slide}`}
                src={imgs[slide]}
                alt={`${currentProj.title} screenshot ${slide + 1}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: 420,
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                  padding: "24px 32px",
                }}
              />
            ) : (
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                height: 340,
                color: "#bbb",
                fontStyle: "italic",
                fontSize: 14,
              }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span>Add your project images</span>
              </div>
            )}
          </div>

          {/* ── Control bar below the image ── */}
          <div className="ctrl-bar" style={{
            borderBottom: "1px solid #eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "10px 0",
          }}>
            {/* Left: project prev/next */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button className="nav-btn" onClick={() => goProj(proj - 1)} aria-label="Previous project">← Prev</button>
              <button className="nav-btn" onClick={() => goProj(proj + 1)} aria-label="Next project">Next →</button>
            </div>

            {/* Center: screenshot dots (only when multiple) */}
            {multiImg && (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {imgs.map((_, i) => (
                  <button
                    key={i}
                    className={`slide-dot${i === slide ? " slide-dot-active" : ""}`}
                    onClick={() => setSlide(i)}
                    aria-label={`Screenshot ${i + 1}`}
                  />
                ))}
                <span style={{ fontSize: 11, color: "#bbb", letterSpacing: "0.08em", marginLeft: 4 }}>
                  {slide + 1}/{imgs.length}
                </span>
              </div>
            )}

            {/* Right: screenshot prev/next (only when multiple) */}
            {multiImg ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button className="nav-btn" onClick={() => goSlide(slide - 1)} aria-label="Previous screenshot">‹ Shot</button>
                <button className="nav-btn" onClick={() => goSlide(slide + 1)} aria-label="Next screenshot">Shot ›</button>
              </div>
            ) : (
              /* spacer so left buttons don't drift when no screenshot nav */
              <div />
            )}
          </div>

          {/* Project info + project dots */}
          <div className="carousel-footer" style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: 18,
            gap: 16,
          }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 18, fontWeight: 500, marginBottom: 5 }}>{currentProj.title}</p>
              <p style={{ fontSize: 14, color: "#555", fontStyle: "italic", lineHeight: 1.65 }}>{currentProj.desc}</p>
              <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", marginTop: 8 }}>
                {currentProj.tech}
              </p>
            </div>

            {/* Project dots + counter */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, paddingBottom: 4 }}>
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  className={`dot-btn${i === proj ? " dot-active" : ""}`}
                  onClick={() => goProj(i)}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
              <span style={{ fontSize: 12, color: "#aaa", letterSpacing: "0.08em", marginLeft: 6 }}>
                {proj + 1} / {PROJECTS.length}
              </span>
            </div>
          </div>
        </section>

        <hr className="rule" />

        {/* CERTIFICATES */}
        <section id="Certificates" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <h2 style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10, fontWeight: 500 }}>
            Certifications
          </h2>
          <hr className="rule" style={{ marginBottom: 0 }} />
          <div style={{ marginTop: 4 }}>
            {CERTS.map((c) => (
              <div key={c.title} className="cert-row">
                <div>
                  <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 3 }}>{c.title}</p>
                  <p style={{ fontSize: 13, color: "#888", fontStyle: "italic" }}>{c.org}</p>
                </div>
                <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                  <p style={{ fontSize: 13, color: "#555", marginBottom: 3 }}>{c.year}</p>
                  <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888" }}>{c.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STACK */}
        <section id="Stack" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <h2 style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10, fontWeight: 500 }}>
            Technical Stack
          </h2>
          <hr className="rule" style={{ marginBottom: 0 }} />
          {Object.entries(SKILLS).map(([cat, skills]) => (
            <div key={cat} style={{ marginTop: 28 }}>
              <p style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#888", marginBottom: 8 }}>
                {cat}
              </p>
              <div>
                {skills.map((s) => (
                  <div key={s.name} className="skill-row">
                    <span style={{ color: "#1a1a1a" }}>{s.name}</span>
                    <span style={{ fontSize: 13, color: "#888", fontStyle: "italic" }}>{s.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <hr className="rule" />

        {/* CONTACT */}
        <section id="Contact" style={{ paddingTop: 56, paddingBottom: 32 }}>
          <h2 style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10, fontWeight: 500 }}>
            Contact
          </h2>
          <hr className="rule" style={{ marginBottom: 32 }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, marginBottom: 40 }} className="two-col">
            {[
              { label: "Email", val: "bryanmiguelbagaporoclouds@gmail.com", href: "mailto:bryanmiguelbagaporoclouds@gmail.com" },
              { label: "LinkedIn", val: "in/bryan-miguel-bagaporo", href: "https://linkedin.com/in/bryan-miguel-bagaporo" },
              { label: "GitHub", val: "github.com/microinstancesmiguel", href: "https://github.com/microinstancesmiguel" },
              { label: "Location", val: "Manila, Philippines", href: null },
            ].map((row, i) => (
              <div key={row.label} style={{
                padding: "18px 0",
                borderBottom: i < 3 ? "1px solid #eee" : "none",
                paddingRight: i % 2 === 0 ? 40 : 0,
                paddingLeft: i % 2 === 1 ? 40 : 0,
                borderLeft: i % 2 === 1 ? "1px solid #eee" : "none",
              }}>
                <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#888", marginBottom: 6 }}>{row.label}</p>
                {row.href ? (
                  <a href={row.href} target={row.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="contact-link" style={{ fontSize: 14 }}>
                    {row.val}
                  </a>
                ) : (
                  <p style={{ fontSize: 14 }}>{row.val}</p>
                )}
              </div>
            ))}
          </div>

          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 24, color: "#888" }}>
              Send a Message
            </p>

            <div className="form-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px", marginBottom: 22 }}>
              <div>
                <label style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: 7 }}>Name</label>
                <input className="form-input" name="from_name" type="text" placeholder="Your name" value={form.from_name} onChange={handleChange} />
              </div>
              <div>
                <label style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: 7 }}>Email</label>
                <input className="form-input" name="from_email" type="email" placeholder="your@email.com" value={form.from_email} onChange={handleChange} />
              </div>
            </div>

            <div style={{ marginBottom: 22 }}>
              <label style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: 7 }}>Subject</label>
              <input className="form-input" name="subject" type="text" placeholder="What's this about?" value={form.subject} onChange={handleChange} />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: 7 }}>Message</label>
              <textarea className="form-input" name="message" placeholder="Your message..." value={form.message} onChange={handleChange} />
            </div>

            <button className="send-btn" onClick={handleSubmit} disabled={sending}>
              {sending ? "Sending..." : "Send Message"}
            </button>

            {status && (
              <p style={{ fontSize: 13, marginTop: 14, fontStyle: "italic", color: status.type === "success" ? "#2d6a4f" : "#9b2226" }}>
                {status.text}
              </p>
            )}
          </div>
        </section>
      </main>

      <footer style={{ borderTop: "1px solid #1a1a1a", padding: "18px 40px", maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#aaa", letterSpacing: "0.06em" }}>
          <span>Bryan Miguel Bagaporo · Manila, PH</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}