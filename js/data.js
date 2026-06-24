/* ============================================
   GHOSTWIRE — Data Layer
   Report metadata, research notes, site config.
   
   PUBLISHING WORKFLOW:
   1. Add PDF to assets/reports/
   2. Add cover image to assets/images/
   3. Add metadata object to REPORTS array below
   4. Deploy
   ============================================ */

const SITE_CONFIG = {
  name: 'GHOSTWIRE',
  tagline: 'Threat Intelligence, Told As Narrative.',
  subtitle: 'Independent investigations into cyber operations, infrastructure ecosystems, and threat actor activity.',
  classification: '// GHOSTWIRE — UNCLASSIFIED — OPEN SOURCE INTELLIGENCE //',
  domain: 'ghostwireintel.page',
  twitter: '@GhostWireCTI',
  twitterUrl: 'https://x.com/GhostWireCTI',
  linkedinUrl: 'https://www.linkedin.com/in/bornov-shyam-kalita/',
  githubUrl: 'https://github.com/WizardBornov',
  formspreeId: 'mrevjqpb',
  email: 'bornovofficial@gmail.com',
  year: new Date().getFullYear()
};

// ---- Reports ----
// Add new reports at the TOP of this array (newest first).
// Each report auto-generates its archive card, report page, and citations.

const REPORTS = [
  {
    id: '002',
    issue: 2,
    title: 'The Wrong Tenant',
    subtitle: 'Hunting APT36 and Finding Infrastructure That Doesn\'t Fit',
    date: '2026-06-01',
    displayDate: 'JUNE 2026',
    threatActor: 'APT36 / Transparent Tribe',
    primaryTarget: 'India — Gov, Defense, Professional Services',
    classification: 'UNCLASSIFIED',
    status: 'Published',
    summary: 'An infrastructure pivot from a confirmed APT36 C2 produced a five-node credential harvesting cluster operating across three hosting providers under two domain namespaces — one a lookalike of a real Mexican company. The cluster has been in continuous operation since at least May 2023. None of it appears in any prior threat intelligence report. The operational discipline documented here is inconsistent with publicly attributed APT36 capability.',
    executiveSummary: 'There is a particular kind of unease that comes from pulling a thread and finding that it leads somewhere you didn\'t expect. You start with a confirmed malware campaign, a known threat actor, a documented command-and-control server. You expect to find more of the same — maybe a second C2, maybe a staging server, maybe a domain registered the same week with the same sloppy WHOIS. What you don\'t expect to find is a multi-persona credential harvesting operation running across five VPS nodes, three hosting providers, two domains, and a fresh FRP reverse proxy deployment that went live while you were looking at it.\n\nThat\'s what this investigation produced. What follows is the full account of how it happened, what was found, and why it matters — including the part where the infrastructure stopped fitting the threat actor it was supposedly associated with.',
    keyFindings: [
      'Post-publication active analysis confirmed live CompuMark (Clarivate) credential portal, revealed a third TSplus node invisible to passive OSINT, and established a two-frontend one-backend cluster architecture — see Active Analysis Addendum (RN-004)',
      'Five-node credential harvesting cluster identified across three hosting providers (Database Mart LLC, AWS, Psychz Networks)',
      'Infrastructure active since at least May 2023 — 22 months of continuous, undocumented operation',
      'Domain namespaces include a lookalike of a legitimate Mexican company, suggesting targeted social engineering',
      'Operational discipline inconsistent with publicly attributed APT36 capability — raises attribution questions',
      'FRP reverse proxy deployment observed going live during active investigation'
    ],
    coverImage: 'assets/images/issue-002-cover.jpg',
    pdfFile: 'assets/reports/ghostwire-issue-002.pdf',
    tags: ['APT36', 'Transparent Tribe', 'credential harvesting', 'infrastructure analysis', 'India', 'attribution'],
    metadata: {
      subject: 'APT36 / Transparent Tribe',
      primaryTarget: 'India — Gov, Defense, Professional Services',
      nodes: '5 confirmed',
      providers: 'Database Mart LLC, AWS, Psychz Networks',
      activeSince: 'May 2023',
      threatLevel: 'ACTIVE'
    },
    stats: [
      { value: '5 NODES' },
      { value: '3 PROVIDERS' },
      { value: '22 MONTHS' },
      { value: 'JUNE 2026' }
    ],
    featured: true,
    relatedNotes: ['rn-004']
  },
  {
    id: '001',
    issue: 1,
    title: 'The Army That Fights Without Shoulders',
    subtitle: 'The Most Destructive Cyberattack in History Didn\'t Come From Nowhere',
    date: '2026-05-01',
    displayDate: 'MAY 2026',
    threatActor: 'Sandworm Team (APT44)',
    primaryTarget: 'Ukraine — Critical Infrastructure',
    classification: 'UNCLASSIFIED',
    status: 'Published',
    summary: 'On June 27, 2017, a piece of malware disguised as ransomware detonated across Ukrainian networks and escaped into the global economy. The damage bill would reach $10 billion. The weapon was NotPetya. The operators were Sandworm — and they\'d been rehearsing for years.',
    executiveSummary: 'On June 27, 2017, a piece of software disguised as ransomware detonated across Ukrainian networks and escaped into the global economy. Within hours, the world\'s largest shipping company couldn\'t move cargo. A pharmaceutical giant couldn\'t manufacture drugs. A logistics conglomerate\'s European operations went dark. The ransom demands were fake. The payment instructions were theater. There was never a decryption key, because recovery was never the point.\n\nThe weapon was NotPetya — formally tracked as Win32/Diskcoder.C — and it caused an estimated $10 billion in damage, making it the most destructive cyberattack in recorded history. By a significant margin. But NotPetya is not the story. NotPetya is the headline. The story is the organisation that built it, deployed it, and has been operating against Ukraine and the broader world for over a decade before and since.\n\nThe story is Sandworm.',
    keyFindings: [
      'Sandworm (APT44) attributed to GRU Unit 74455, the Main Centre for Special Technologies (GTsST)',
      'NotPetya caused an estimated $10 billion in damage — the most destructive cyberattack in recorded history',
      'Six specifically-named officers indicted by a US federal grand jury in October 2020',
      'Sandworm operates across espionage, destructive attack, and information operations simultaneously',
      'Continuous operations against Ukrainian critical infrastructure from 2014 to present'
    ],
    coverImage: 'assets/images/issue-001-cover.jpg',
    pdfFile: 'assets/reports/ghostwire-issue-001.pdf',
    tags: ['Sandworm', 'APT44', 'NotPetya', 'GRU', 'Ukraine', 'destructive attack', 'critical infrastructure'],
    metadata: {
      subject: 'Sandworm Team (APT44)',
      primaryTarget: 'Ukraine — Critical Infrastructure',
      attribution: 'GRU Unit 74455',
      primaryWeapon: 'Win32/Diskcoder.C (NotPetya)',
      activeSince: '2014',
      threatLevel: '2014 — Present'
    },
    stats: [
      { value: '$10B' },
      { value: '2009' },
      { value: '6 GRU' },
      { value: 'APT44' }
    ],
    featured: false
  }
];

// ---- Research Notes ----
// Analyst notebook entries. Lightweight, quick to publish.

const RESEARCH_NOTES = [
  {
    id: 'rn-004',
    title: 'Active Analysis Addendum: The Wrong Tenant',
    date: '2026-06-24',
    displayDate: 'June 24, 2026',
    classification: 'UNCLASSIFIED',
    status: 'Published',
    tags: ['APT36', 'Transparent Tribe', 'active analysis', 'TSplus', 'infrastructure', 'credential harvesting'],
    excerpt: 'Post-publication active analysis of the Issue 002 cluster confirmed a live CompuMark credential portal, uncovered a third TSplus node invisible to passive OSINT, and established a revised two-frontend, one-backend cluster architecture with FRP as the permanent backbone.',
    content: `## Context

Issue 002 — "The Wrong Tenant" — was published June 2026 based entirely on passive OSINT: Shodan, Censys, VirusTotal, crt.sh, and WHOIS. Following publication, active analysis of the five cluster nodes was conducted via urlscan.io, VirusTotal relationship graphs, and direct probing from an isolated Whonix/Tor environment. This note documents what passive methods could not see.

## What Passive OSINT Missed

**1. A third TSplus portal — lagerhaus node (108.181.174.67)**

In passive collection, lagerhaus appeared as an unconfigured IIS default page on ports 80 and 443. Active analysis sent HEAD requests to ports 8443 and 8080 — the same non-standard ports used by the other TSplus nodes. Both returned HTTP 200 with \`Content-Length: 55569\` and \`Last-Modified: Fri, 12 Jun 2026\`. A live TSplus Web Access portal, standing since June 12, 2026 — the same day the lagerhaus TLS cert was issued and the subdomain first resolved in DNS. Fully operational. Entirely invisible to passive collection.

This is a direct demonstration of passive OSINT's ceiling: the portal was there the whole time. Urlscan checked ports 80 and 443, not 8443.

**2. CompuMark credential portal — confirmed live and operational**

The compumark node (35.86.103.233) serves the authentic CompuMark logo — a trademark research platform owned by Clarivate Analytics — and presents a fully Spanish-language TSplus login interface: \`Inicio Sesion\`, \`Nombre Usuario:\`, \`Contraseña:\`.

The TEMPLATEVALUES configuration embedded in the portal's HTML confirms the portal title is operator-set to \`Web Access CompuMark\`. A POST to the credential endpoint returned a five-byte server response, confirming the portal evaluates submitted credentials server-side.

Post-authentication, the portal redirects to \`index_applications.html\` — a fake "Remote Applications Portal" landing page. Victims who enter credentials see a branded portal experience before the connection fails. The deception runs past the login screen.

**3. Revised cluster architecture**

Passive analysis treated the cluster as five largely independent nodes. TEMPLATEVALUES extraction across all accessible TSplus portals revealed a different picture. All credential capture ultimately routes to a single backend — the primary node at 93.127.128.229 — via two separate paths:

\`\`\`
CompuMark (35.86.103.233)  → localhost:3389 → FRP:7000 → operator RDP
Lagerhaus (108.181.174.67) → localhost:1097 → FRP tunnel → primary node
\`\`\`

FRP, running on port 7000 with a deliberately blank-subject, 10-year-validity TLS cert, is the permanent backbone of the cluster. The two TSplus frontends are ingress surfaces. The primary node at 93.127.128.229 is the single point of failure for the entire operation.

## Additional Findings

- **FRP dashboard (port 7500):** Auth-locked with non-default credentials. Seven common defaults tested — all 401. Dashboard internet-exposed but not accessible via defaults — partial OPSEC.
- **CN=tst cert:** Identical certificate (C=FR, O=common, CN=tst, valid 2012–2112) confirmed on both compumark and lagerhaus across different ASNs. Same certificate file copied to two nodes — strongest co-deployment indicator in the cluster.
- **Port 1097 cert reissued June 21, 2026** — after Issue 002 publication. Infrastructure actively maintained post-publication.
- **TSplus canonical tag not stripped:** \`<link rel="canonical" href="https://dv.tsplus.net">\` present in portal HTML, identifying the installation to any crawler reading canonical tags.
- **DNS stable post-publication:** All five subdomains resolve to original IPs as of June 24, 2026. No operator reaction to publication in 3+ weeks.
- **IKConsulting (184.72.115.35):** Only cluster node with vendor detections — Fortinet: Malware; Chong Lua Dao: Malicious. WordPress brute force documented June 2022 and June 2024. In BadIPs malware network lists since November 2025.

## Methodology

All active probing conducted from Whonix Workstation (KVM) via verified Tor SOCKS5 proxy. No automated credential attacks were used — FRP dashboard testing was limited to seven known defaults. TEMPLATEVALUES extraction used plain curl against internet-exposed web portals. SSL cert extraction used openssl s_client on publicly listening ports.

## Assessment

Active analysis confirmed and materially extended Issue 002's core finding. CompuMark impersonation is live, dressed, and operational. The revised architecture collapses what appeared to be a distributed five-node cluster into a single-backend operation with two credential-capture frontends. The lagerhaus portal's invisibility to passive OSINT was not an anomaly — it was a consequence of checking expected ports only. The operator chose 8443 and 8080 because those are TSplus defaults, not web defaults.

**Confidence:** All findings assessed HIGH from direct active extraction, with the exception of the lagerhaus FRP tunnel inference (MEDIUM-HIGH — based on port 1097 matching the primary node's non-standard RDP port).`
  },
  {
    id: 'rn-003',
    title: 'Certificate Reuse Across Unrelated Campaigns',
    date: '2026-06-12',
    displayDate: 'June 12, 2026',
    classification: 'UNCLASSIFIED',
    status: 'Published',
    tags: ['certificates', 'TLS', 'methodology', 'infrastructure'],
    excerpt: 'Identified three distinct campaigns sharing a single self-signed TLS certificate across different hosting providers. The certificate was generated with default OpenSSL parameters and a conspicuously generic common name.',
    content: `## Observation

During routine infrastructure hunting, I identified three distinct campaigns sharing a single self-signed TLS certificate across different hosting providers. The certificate was generated with default OpenSSL parameters and a conspicuously generic common name: \`localhost\`.

## Details

The certificate (SHA-256: \`a4f8c2...3d91\`) was observed on the following IPs:

- \`185.220.101.xx\` — Hosted on DataWeb Global, Netherlands
- \`91.215.85.xx\` — Hosted on Stark Industries, Moldova  
- \`45.153.240.xx\` — Hosted on YISP B.V., Netherlands

Each IP is associated with different malware families and targeting profiles. The certificate overlap does not necessarily indicate shared operators — it may reflect shared infrastructure procurement or a common builder toolkit.

## Assessment

**Confidence: LOW-MODERATE**

Certificate reuse across apparently unrelated campaigns suggests one of three possibilities:

1. Shared infrastructure broker or bulletproof hosting arrangement
2. Common malware builder that embeds the same certificate
3. Coincidental use of identical default generation parameters

Further investigation into the hosting providers' registration patterns may clarify the relationship.

## Methodology Note

This finding was produced through Censys certificate search, pivoting on the SHA-256 hash after an initial discovery during separate infrastructure mapping work.`
  },
  {
    id: 'rn-002',
    title: 'ASN Enumeration as a Pivot Strategy',
    date: '2026-06-05',
    displayDate: 'June 5, 2026',
    classification: 'UNCLASSIFIED',
    status: 'Published',
    tags: ['ASN', 'methodology', 'threat hunting', 'infrastructure'],
    excerpt: 'When you find a C2 server, the natural instinct is to pivot on domains, WHOIS records, or passive DNS. But one of the most underused pivoting strategies is ASN-level enumeration — mapping the full IP range and looking for neighbours.',
    content: `## The Technique

When you find a C2 server, the natural instinct is to pivot on domains, WHOIS records, or passive DNS. But one of the most underused pivoting strategies is ASN-level enumeration — mapping the full IP range of the hosting provider's allocation and looking for neighbours.

## Why It Works

Threat actors tend to be creatures of habit. They find a hosting provider that doesn't ask questions, and they come back. Sometimes the entire /24 or /20 block is worth examining.

In the GhostWire Issue 002 investigation, the initial C2 IP at \`93.127.130.89\` resolved to AS401479 — Database Mart LLC, Kansas City, Missouri. The block was \`93.127.128.0/20\`.

Enumerating that block produced multiple additional IPs running services consistent with credential harvesting infrastructure. The key insight: the \`/20\` block had been allocated in February 2025 — the same month the documented campaign was active.

## Practical Application

1. Identify the ASN and parent IP block for any confirmed C2
2. Enumerate the full block using Censys, Shodan, or similar
3. Look for services matching the same ports, TLS certificates, or HTTP fingerprints
4. Cross-reference allocation dates with campaign timelines

## Limitations

High false-positive rate on shared hosting. Works best with VPS providers and smaller ASNs where the actor may control multiple IPs in the same allocation.`
  },
  {
    id: 'rn-001',
    title: 'On Confidence Calibration in Threat Attribution',
    date: '2026-05-20',
    displayDate: 'May 20, 2026',
    classification: 'UNCLASSIFIED',
    status: 'Published',
    tags: ['methodology', 'attribution', 'tradecraft', 'analysis'],
    excerpt: 'Attribution is the hardest problem in threat intelligence. Not because the technical evidence is insufficient, but because the analytical frameworks we use to process that evidence are often poorly calibrated.',
    content: `## The Problem

Attribution is the hardest problem in threat intelligence. Not because the technical evidence is insufficient, but because the analytical frameworks we use to process that evidence are often poorly calibrated.

The industry has a habit of treating attribution as binary: either a campaign "is" APT-X, or it's unknown. The reality is that attribution exists on a spectrum of confidence, and that spectrum matters enormously.

## GhostWire's Approach

Every GhostWire assessment includes an explicit confidence level drawn from a modified version of the intelligence community's standard framework:

- **HIGH** — Multiple independent sources corroborate. Alternative explanations considered and found insufficient.
- **MODERATE** — Supported by credible evidence but with gaps. Alternative explanations are possible but less likely.
- **LOW** — Based on limited or single-source evidence. Alternative explanations are plausible.
- **INCONCLUSIVE** — Evidence is ambiguous or contradictory. No reliable assessment is possible.

## Why This Matters

A LOW-confidence attribution is not a failure. It's an honest assessment of evidential limitations. Publishing LOW-confidence assessments — clearly labeled — is more valuable than withholding them entirely or inflating them to MODERATE.

The danger is in the middle: assessments that are quietly treated as HIGH-confidence because the analyst didn't want to admit uncertainty. GhostWire would rather publish a well-documented LOW than an unsupported HIGH.

## Practical Example

In Issue 002, the infrastructure overlap with known APT36 C2 was confirmed. But the operational sophistication of the credential harvesting cluster exceeded publicly documented APT36 capabilities. The assessment was published as LOW-MODERATE confidence specifically because of this discrepancy.

That discrepancy IS the finding. The attribution question is part of the story, not an obstacle to publishing it.`
  }
];

// ---- Helper Functions ----

function getReportById(id) {
  return REPORTS.find(r => r.id === id) || null;
}

function getFeaturedReport() {
  return REPORTS.find(r => r.featured) || REPORTS[0] || null;
}

function getRecentReports(count = 4) {
  return REPORTS.slice(0, count);
}

function getRecentNotes(count = 3) {
  return RESEARCH_NOTES.slice(0, count);
}

function getNoteById(id) {
  return RESEARCH_NOTES.find(n => n.id === id) || null;
}

function getAllTags() {
  const tagSet = new Set();
  REPORTS.forEach(r => r.tags.forEach(t => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

function getReportsByTag(tag) {
  return REPORTS.filter(r => r.tags.includes(tag));
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
