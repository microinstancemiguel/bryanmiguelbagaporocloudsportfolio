import { useState, useEffect } from "react";

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
  { title: "Databases", org: "Certiport — A Pearson VUE Business", year: "2025", status: "Active" },
  { title: "Network Security", org: "Certiport — A Pearson VUE Business", year: "2026", status: "Active" },
  { title: "Certified in Cybersecurity (CC)", org: "ISC2", year: "2026", status: "Active" },
];

const NAV = ["About", "Stack", "Certificates", "Contact"];

export default function Portfolio() {
  const [active, setActive] = useState("About");

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

        @media (max-width: 640px) {
          .two-col { grid-template-columns: 1fr !important; }
          .hide-mobile { display: none !important; }
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
          {/* Header block — Harvard resume style */}
          <div style={{ textAlign: "center", marginBottom: 40, paddingBottom: 28, borderBottom: "2px solid #1a1a1a" }}>
            <h1 style={{ fontSize: 34, fontWeight: 500, letterSpacing: "0.04em", marginBottom: 10, lineHeight: 1.15 }}>
              Bryan Miguel Bagaporo
            </h1>
            <div style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: "#555", marginBottom: 12, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0 18px" }}>
              <span>Manila, Philippines</span>
              <span style={{ color: "#bbb" }}>·</span>
              <span>Aspiring Cloud Engineer</span>
              <span style={{ color: "#bbb" }}>·</span>
              <span>Cloud Architect</span>
            </div>
            <div style={{ fontSize: 13, color: "#555", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0 18px" }}>
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
                <p style={{ color: "#888", marginTop: 3 }}>3rd Year · 2026</p>
              </div>
            </div>
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
                <p style={{ color: "#888", marginTop: 3 }}>3rd Year · 2026</p>
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
              Third-year BSIT student at Adamson University specializing in network infrastructure and data security. 
              Pursuing a career in cloud engineering and architecture with hands-on experience across AWS, 
              full-stack web development, and cybersecurity. Certified in cybersecurity and actively building 
              production-grade systems in the Asia Pacific region.
            </p>
          </div>
        </section>

        <hr className="rule" />

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
              <div style={{ paddingLeft: 0 }}>
                {skills.map((s, i) => (
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

        <hr className="rule" />

        {/* CONTACT */}
        <section id="Contact" style={{ paddingTop: 56, paddingBottom: 32 }}>
          <h2 style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10, fontWeight: 500 }}>
            Contact
          </h2>
          <hr className="rule" style={{ marginBottom: 32 }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }} className="two-col">
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
        </section>

      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1a1a1a", padding: "18px 40px", maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#aaa", letterSpacing: "0.06em" }}>
          <span>Bryan Miguel Bagaporo · Manila, PH</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}