# GHOSTWIRE

**Threat Intelligence, Told As Narrative.**

GhostWire is an independent threat intelligence publication focused on original, long-form investigations into cyber operations, threat actor infrastructure, attribution problems, and undocumented threat clusters.

**Live site → [ghostwireintel.page](https://ghostwireintel.page)**

---

## What This Is

Each GhostWire issue is a deep-dive investigation into a single subject — a threat actor, a campaign, an infrastructure ecosystem — written with full technical depth but structured as narrative. The format is closer to an intelligence assessment than a blog post.

GhostWire is **not** a cybersecurity blog, a personal portfolio, a newsletter, or a content marketing site.

## Published Issues

| # | Title | Subject | Date |
|---|---|---|---|
| 002 | [The Wrong Tenant](https://ghostwireintel.page/report.html?id=002) | APT36 / Transparent Tribe | June 2026 |
| 001 | [The Army That Fights Without Shoulders](https://ghostwireintel.page/report.html?id=001) | Sandworm / APT44 | May 2026 |

## Research Philosophy

- **Evidence-First** — Every claim backed by observable, verifiable evidence
- **Confidence-Calibrated** — Explicit confidence levels on every assessment (HIGH / MODERATE / LOW / INCONCLUSIVE)
- **Narrative-Driven** — Technical depth without unreadable prose
- **Independent** — No corporate parent, no vendor affiliations, no advertising

## Publishing Workflow

GhostWire is PDF-first. Reports are the product. The website archives and distributes them.

To publish a new issue:

1. Add the PDF to `assets/reports/`
2. Add cover art to `assets/images/`
3. Add a metadata entry to `js/data.js`
4. Push to `main`

The report page, archive card, homepage feature, citation block, and share links auto-generate from the metadata.

## Architecture

Pure static site — HTML, CSS, vanilla JavaScript. No frameworks, no build step, no dependencies.

```
├── index.html              # Home
├── archive.html            # Intelligence Archive
├── report.html             # Report page (metadata-driven)
├── research-notes.html     # Research Notes listing
├── note.html               # Individual note (metadata-driven)
├── about.html              # About GhostWire
├── contact.html            # Contact (Formspree)
├── css/                    # Design system
│   ├── variables.css       # Design tokens
│   ├── reset.css           # CSS reset
│   ├── base.css            # Typography, layout, animations
│   ├── components.css      # UI components
│   ├── torn-paper.css      # Torn paper / dossier effects
│   ├── home.css            # Home page
│   ├── archive.css         # Archive page
│   ├── report.css          # Report page
│   ├── notes.css           # Notes / About / Contact
│   └── responsive.css      # Breakpoints
├── js/
│   ├── data.js             # Report & note metadata + site config
│   ├── components.js       # Shared rendering functions
│   ├── home.js             # Home page logic
│   ├── archive.js          # Archive with tag filtering
│   ├── report.js           # Report page generator
│   ├── notes.js            # Research notes logic
│   └── contact.js          # Contact form (Formspree)
└── assets/
    ├── images/             # Cover art
    └── reports/            # PDF reports
```

## Deployment

Hosted on GitHub Pages with a custom domain. No CI/CD — push to `main` and it's live.

## License

All report content, analysis, and research notes are © GhostWire. The website source code is provided as-is.

---

`// GHOSTWIRE — UNCLASSIFIED — OPEN SOURCE INTELLIGENCE //`
