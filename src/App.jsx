```jsx
import { useState, useEffect } from "react";
import goatman from "./AIGoatman.jpeg";

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
    <div
      style={{
        fontFamily: "'EB Garamond', 'Garamond', 'Times New Roman', serif",
        background: "#faf9f7",
        color: "#1a1a1a",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background: #faf9f7;
        }

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

        .nav-item:hover {
          color: #1a1a1a;
        }

        .nav-item.active {
          color: #1a1a1a;
        }

        .rule {
          border: none;
          border-top: 1px solid #1a1a1a;
          margin: 0;
        }

        .skill-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
          font-size: 15px;
        }

        .skill-row:last-child {
          border-bottom: none;
        }

        .cert-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 16px;
          align-items: baseline;
          padding: 14px 0;
          border-bottom: 1px solid #eee;
        }

        .cert-row:last-child {
          border-bottom: none;
        }

        .contact-link {
          color: #1a1a1a;
          text-decoration: none;
          border-bottom: 1px solid #1a1a1a;
          transition: opacity 0.2s;
        }

        .contact-link:hover {
          opacity: 0.5;
        }

        @media (max-width: 640px) {
          .two-col {
            grid-template-columns: 1fr !important;
          }

          .hide-mobile {
            display: none !important;
          }
        }
      `}</style>

      {/* NAV */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#faf9f7",
          borderBottom: "1px solid #1a1a1a",
          padding: "14px 0",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding: "0 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* LEFT SIDE */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <img
              src={goatman}
              alt="Bryan Miguel Bagaporo"
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid #ddd",
              }}
            />

            <span
              style={{
                fontSize: 13,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Bryan Miguel Bagaporo
            </span>
          </div>

          {/* RIGHT SIDE */}
          <div style={{ display: "flex", gap: 32 }}>
            {NAV.map((n) => (
              <button
                key={n}
                className={`nav-item${active === n ? " active" : ""}`}
                onClick={() => scrollTo(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "0 40px 80px",
        }}
      >
        {/* ABOUT */}
        <section
          id="About"
          style={{
            paddingTop: 72,
            paddingBottom: 64,
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: 40,
              paddingBottom: 28,
              borderBottom: "2px solid #1a1a1a",
            }}
          >
            <h1
              style={{
                fontSize: 34,
                fontWeight: 500,
                letterSpacing: "0.04em",
                marginBottom: 10,
                lineHeight: 1.15,
              }}
            >
              Bryan Miguel Bagaporo
            </h1>

            <div
              style={{
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#555",
                marginBottom: 12,
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "0 18px",
              }}
            >
              <span>Manila, Philippines</span>
              <span style={{ color: "#bbb" }}>·</span>
              <span>Aspiring Cloud Engineer</span>
              <span style={{ color: "#bbb" }}>·</span>
              <span>Cloud Architect</span>
            </div>

            <div
              style={{
                fontSize: 13,
                color: "#555",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "0 18px",
              }}
            >
              <a
                href="mailto:bryanmiguelbagaporoclouds@gmail.com"
                className="contact-link"
              >
                bryanmiguelbagaporoclouds@gmail.com
              </a>

              <span style={{ color: "#bbb" }}>·</span>

              <a
                href="https://linkedin.com/in/bryan-miguel-bagaporo"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                LinkedIn
              </a>

              <span style={{ color: "#bbb" }}>·</span>

              <a
                href="https://github.com/microinstancesmiguel"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1px solid #1a1a1a",
          padding: "18px 40px",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            color: "#aaa",
            letterSpacing: "0.06em",
          }}
        >
          <span>Bryan Miguel Bagaporo · Manila, PH</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
```
