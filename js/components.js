/* ============================================
   GHOSTWIRE — Component Renderers
   Shared HTML-generating functions used across pages.
   ============================================ */

// ---- Classification Bar ---- 
function renderClassificationBar() {
  return `
    <div class="classification-bar" id="classification-bar">
      <span>//</span> GHOSTWIRE — UNCLASSIFIED — OPEN SOURCE INTELLIGENCE <span>//</span>
    </div>`;
}

// ---- Navigation ----
function renderNavigation(activePage) {
  const links = [
    { label: 'Issues', href: 'archive.html', id: 'issues' },
    { label: 'Research Notes', href: 'research-notes.html', id: 'notes' },
    { label: 'About', href: 'about.html', id: 'about' },
    { label: 'Contact', href: 'contact.html', id: 'contact' }
  ];

  const linkHTML = links.map(link => 
    `<a href="${link.href}" class="nav-link${activePage === link.id ? ' active' : ''}">${link.label}</a>`
  ).join('');

  return `
    <nav class="main-nav" id="main-nav">
      <a href="index.html" class="nav-brand">GHOSTWIRE</a>
      <div class="nav-links" id="nav-links">
        ${linkHTML}
      </div>
      <div class="nav-toggle" id="nav-toggle" onclick="toggleNav()">
        <span></span><span></span><span></span>
      </div>
    </nav>`;
}

function toggleNav() {
  const links = document.getElementById('nav-links');
  const toggle = document.getElementById('nav-toggle');
  links.classList.toggle('open');
  toggle.classList.toggle('open');
}

// ---- Dossier Card ----
function renderDossierCard(report, featured = false) {
  const statusClass = report.status ? report.status.toLowerCase() : 'published';
  const tags = renderTags(report.tags.slice(0, 4));
  const cardClass = featured ? 'dossier-card dossier-card--featured' : 'dossier-card';

  return `
    <article class="${cardClass}" onclick="window.location.href='report.html?id=${report.id}'">
      <img 
        class="dossier-card-image" 
        src="${report.coverImage}" 
        alt="${report.title}"
        onerror="this.style.background='var(--bg-tertiary)'; this.style.display='flex'; this.alt='Cover unavailable'"
      />
      <div class="dossier-card-content">
        <div class="dossier-card-meta">
          <span class="dossier-card-issue">#ISSUE ${String(report.issue).padStart(3, '0')}</span>
          <span class="dossier-card-date">${report.displayDate}</span>
          ${report.status ? `<span class="dossier-card-status dossier-card-status--${statusClass}">${report.status}</span>` : ''}
        </div>
        <h3 class="dossier-card-title">${report.title}</h3>
        <p class="dossier-card-subtitle">${report.subtitle}</p>
        <p class="dossier-card-summary">${report.summary}</p>
        <div class="dossier-card-tags">${tags}</div>
      </div>
    </article>`;
}

// ---- Metadata Panel ----
function renderMetadataPanel(report) {
  const meta = report.metadata;
  if (!meta) return '';

  const rows = Object.entries(meta).map(([key, value]) => {
    const label = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, s => s.toUpperCase())
      .trim();
    return `
      <div class="metadata-row">
        <span class="metadata-label">${label}:</span>
        <span class="metadata-value">${value}</span>
      </div>`;
  }).join('');

  return `
    <div class="metadata-panel">
      <div class="metadata-panel-header">
        // INTELLIGENCE FILE — GW-${report.id}-INF //
      </div>
      ${rows}
    </div>`;
}

// ---- Stat Row ----
function renderStatRow(stats) {
  if (!stats || stats.length === 0) return '';
  
  const items = stats.map(stat => `
    <div class="stat-item">
      ${stat.value}
      ${stat.label ? `<span class="stat-item-label">${stat.label}</span>` : ''}
    </div>
  `).join('');

  return `<div class="stat-row">${items}</div>`;
}

// ---- Tags ----
function renderTags(tags) {
  if (!tags || tags.length === 0) return '';
  return tags.map(tag => `<span class="tag">${tag}</span>`).join('');
}

// ---- Executive Summary ----
function renderExecutiveSummary(text) {
  if (!text) return '';
  const paragraphs = text.split('\n\n').map(p => `<p>${p}</p>`).join('');
  return `
    <div class="executive-summary">
      ${paragraphs}
    </div>`;
}

// ---- Key Findings ----
function renderKeyFindings(findings) {
  if (!findings || findings.length === 0) return '';
  const items = findings.map(f => `<li class="key-findings-item">${f}</li>`).join('');
  return `
    <div class="key-findings">
      <div class="section-label"><span>//</span> KEY FINDINGS <span>//</span></div>
      <ul class="key-findings-list">
        ${items}
      </ul>
    </div>`;
}

// ---- Citation Block ----
function renderCitationBlock(report) {
  const dateObj = new Date(report.date);
  const monthYear = dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const url = `https://${SITE_CONFIG.domain}/report.html?id=${report.id}`;
  const citation = `GhostWire. "${report.title}." GhostWire Issue ${String(report.issue).padStart(3, '0')}, ${monthYear}.\nAvailable at: ${url}`;

  return `
    <div class="citation-block">
      <div class="citation-block-label">// CITE THIS REPORT //</div>
      <code>${citation}</code>
      <button class="citation-copy-btn" onclick="copyCitation(this, \`${citation.replace(/`/g, '\\`')}\`)">COPY</button>
    </div>`;
}

function copyCitation(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'COPIED';
    setTimeout(() => { btn.textContent = 'COPY'; }, 2000);
  });
}

// ---- Share Buttons ----
function renderShareButtons(report) {
  const url = encodeURIComponent(`https://${SITE_CONFIG.domain}/report.html?id=${report.id}`);
  const text = encodeURIComponent(`${report.title} — GhostWire Issue ${String(report.issue).padStart(3, '0')}`);

  return `
    <div class="share-buttons">
      <span class="share-label">Share:</span>
      <a href="https://x.com/intent/tweet?text=${text}&url=${url}" target="_blank" rel="noopener" class="share-btn" title="Share on X">𝕏</a>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=${url}" target="_blank" rel="noopener" class="share-btn" title="Share on LinkedIn">in</a>
      <button class="share-btn" title="Copy Link" onclick="copyLink('${decodeURIComponent(url)}')">🔗</button>
    </div>`;
}

function copyLink(url) {
  navigator.clipboard.writeText(url).then(() => {
    alert('Link copied to clipboard.');
  });
}

// ---- Research Note Card ----
function renderNoteCard(note) {
  return `
    <article class="note-card" onclick="window.location.href='note.html?id=${note.id}'">
      <div class="note-card-header">
        <span class="note-card-date">${note.displayDate}</span>
        <span class="note-card-classification">// ${note.classification} //</span>
      </div>
      <h3 class="note-card-title">${note.title}</h3>
      <p class="note-card-excerpt">${note.excerpt}</p>
      <div class="note-card-tags">${renderTags(note.tags.slice(0, 3))}</div>
    </article>`;
}

// ---- PDF Viewer ----
function renderPDFViewer(report) {
  if (!report.pdfFile) return '';
  return `
    <div class="pdf-viewer-container">
      <div class="pdf-viewer-header">
        <span>// FULL REPORT — PDF //</span>
        <a href="${report.pdfFile}" download class="btn btn-ghost" style="padding: 4px 12px; font-size: var(--text-xs);">
          ↓ DOWNLOAD PDF
        </a>
      </div>
      <iframe class="pdf-viewer-frame" src="${report.pdfFile}" title="${report.title} — Full Report PDF">
        <p>Your browser does not support embedded PDFs. <a href="${report.pdfFile}">Download the PDF</a>.</p>
      </iframe>
    </div>`;
}

// ---- Footer ----
function renderFooter() {
  return `
    <footer class="site-footer" id="footer">
      <div class="footer-content">
        <div class="footer-brand">GHOSTWIRE</div>
        <div class="footer-tagline">${SITE_CONFIG.tagline}</div>
        <div class="social-links">
          <a href="${SITE_CONFIG.twitterUrl}" target="_blank" rel="noopener" class="social-link">X / Twitter</a>
          <a href="${SITE_CONFIG.linkedinUrl}" target="_blank" rel="noopener" class="social-link">LinkedIn</a>
          <a href="${SITE_CONFIG.githubUrl}" target="_blank" rel="noopener" class="social-link">GitHub</a>
        </div>
        <div class="footer-links">
          <a href="archive.html" class="footer-link">Archive</a>
          <a href="research-notes.html" class="footer-link">Research Notes</a>
          <a href="about.html" class="footer-link">About</a>
          <a href="contact.html" class="footer-link">Contact</a>
        </div>
        <div class="footer-copyright">© ${SITE_CONFIG.year} GhostWire. Independent research. No affiliations.</div>
        <div class="footer-classification">${SITE_CONFIG.classification}</div>
      </div>
    </footer>`;
}

// ---- Barbed Wire SVG ----
function renderBarbedWireSVG() {
  return `
    <svg class="hero-barbed-wire" viewBox="0 0 600 60" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#c41e1e" stroke-width="1.5">
      <!-- Main wire -->
      <path d="M0 30 Q50 25, 100 30 T200 30 T300 30 T400 30 T500 30 T600 30" stroke-opacity="0.6"/>
      <path d="M0 32 Q50 37, 100 32 T200 32 T300 32 T400 32 T500 32 T600 32" stroke-opacity="0.4"/>
      <!-- Barbs -->
      <g stroke-opacity="0.7" stroke-width="1.5">
        <line x1="50" y1="22" x2="40" y2="12"/><line x1="50" y1="22" x2="60" y2="14"/>
        <line x1="100" y1="38" x2="90" y2="48"/><line x1="100" y1="38" x2="110" y2="46"/>
        <line x1="150" y1="22" x2="142" y2="10"/><line x1="150" y1="22" x2="160" y2="12"/>
        <line x1="200" y1="38" x2="190" y2="50"/><line x1="200" y1="38" x2="212" y2="48"/>
        <line x1="250" y1="22" x2="240" y2="10"/><line x1="250" y1="22" x2="262" y2="12"/>
        <line x1="300" y1="38" x2="290" y2="48"/><line x1="300" y1="38" x2="310" y2="46"/>
        <line x1="350" y1="22" x2="340" y2="12"/><line x1="350" y1="22" x2="360" y2="14"/>
        <line x1="400" y1="38" x2="390" y2="50"/><line x1="400" y1="38" x2="412" y2="48"/>
        <line x1="450" y1="22" x2="442" y2="10"/><line x1="450" y1="22" x2="460" y2="12"/>
        <line x1="500" y1="38" x2="490" y2="48"/><line x1="500" y1="38" x2="510" y2="46"/>
        <line x1="550" y1="22" x2="540" y2="12"/><line x1="550" y1="22" x2="560" y2="14"/>
      </g>
      <!-- Barb wraps -->
      <g stroke-opacity="0.5" stroke-width="1">
        <ellipse cx="50" cy="30" rx="6" ry="4" transform="rotate(-15 50 30)"/>
        <ellipse cx="150" cy="30" rx="6" ry="4" transform="rotate(10 150 30)"/>
        <ellipse cx="250" cy="30" rx="6" ry="4" transform="rotate(-12 250 30)"/>
        <ellipse cx="350" cy="30" rx="6" ry="4" transform="rotate(8 350 30)"/>
        <ellipse cx="450" cy="30" rx="6" ry="4" transform="rotate(-10 450 30)"/>
        <ellipse cx="550" cy="30" rx="6" ry="4" transform="rotate(15 550 30)"/>
      </g>
    </svg>`;
}

// ---- Section Label ----
function renderSectionLabel(text) {
  return `<div class="section-label"><span>//</span> ${text} <span>//</span></div>`;
}

// ---- Render Into Page ----
function initPage(activePage) {
  // Red top line
  if (!document.querySelector('.red-line-top')) {
    const redLine = document.createElement('div');
    redLine.className = 'red-line-top';
    document.body.prepend(redLine);
  }

  // Classification bar
  const classBar = document.getElementById('classification-bar');
  if (classBar) {
    classBar.outerHTML = renderClassificationBar();
  }

  // Navigation
  const nav = document.getElementById('main-nav');
  if (nav) {
    nav.outerHTML = renderNavigation(activePage);
  }

  // Footer
  const footer = document.getElementById('footer');
  if (footer) {
    footer.outerHTML = renderFooter();
  }
}

// ---- Simple Markdown Renderer ----
// Handles: headings, bold, italic, code, code blocks, links, lists, paragraphs
function renderMarkdown(md) {
  if (!md) return '';
  
  let html = md;
  
  // Code blocks (``` ... ```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
  });
  
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  
  // Bold & italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
  
  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="link-accent">$1</a>');
  
  // Paragraphs — wrap remaining text blocks
  html = html.replace(/^(?!<[hulop])((?!<).+)$/gm, '<p>$1</p>');
  
  // Clean up extra newlines
  html = html.replace(/\n{2,}/g, '\n');
  
  return html;
}
