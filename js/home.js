/* ============================================
   GHOSTWIRE — Home Page Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  try {
    initPage('home');
    renderHero();
    renderFeaturedReport();
    renderRecentReports();
    renderRecentNotes();
    applyScrollAnimations();
  } catch (e) {
    console.error('[GhostWire] Home page initialization error:', e);
  }
});

function renderHero() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  hero.innerHTML = `
    ${renderBarbedWireSVG()}
    <h1 class="hero-title">GHOSTWIRE</h1>
    <p class="hero-tagline">${SITE_CONFIG.tagline}</p>
    <p class="hero-subtitle">${SITE_CONFIG.subtitle}</p>
    <div class="hero-cta">
      <a href="archive.html" class="btn btn-primary">Enter the Archive</a>
      <a href="#featured" class="btn btn-outline">Latest Investigation</a>
    </div>
  `;
}

function renderFeaturedReport() {
  const container = document.getElementById('featured-report');
  if (!container) return;

  const featured = getFeaturedReport();
  if (!featured) {
    container.innerHTML = '<div class="empty-state"><p class="empty-state-text">No featured report available.</p></div>';
    return;
  }

  container.innerHTML = `
    <div class="featured-label">— LATEST INVESTIGATION —</div>
    ${renderDossierCard(featured, true)}
  `;
}

function renderRecentReports() {
  const container = document.getElementById('recent-reports');
  if (!container) return;

  const reports = getRecentReports(4).filter(r => !r.featured);
  if (reports.length === 0) {
    container.style.display = 'none';
    return;
  }

  container.innerHTML = `
    ${renderSectionLabel('ARCHIVE')}
    <h2 class="section-title">Recent Reports</h2>
    <div class="reports-grid">
      ${renderReportList(reports)}
    </div>
    <div style="text-align: center; margin-top: var(--space-2xl);">
      <a href="archive.html" class="btn btn-outline">View Full Archive →</a>
    </div>
  `;
}

function renderRecentNotes() {
  const container = document.getElementById('recent-notes');
  if (!container) return;

  const notes = getRecentNotes(3);
  if (notes.length === 0) {
    container.style.display = 'none';
    return;
  }

  container.innerHTML = `
    ${renderSectionLabel('FIELD NOTES')}
    <h2 class="section-title">Research Notes</h2>
    <div class="notes-preview-grid">
      ${notes.map(n => renderNoteCard(n)).join('')}
    </div>
    <div style="text-align: center; margin-top: var(--space-2xl);">
      <a href="research-notes.html" class="btn btn-outline">All Research Notes →</a>
    </div>
  `;
}

// ---- Scroll Animations ----
// Uses CSS classes instead of inline styles to avoid specificity conflicts.
// .scroll-animate provides the transition, .scroll-hidden sets initial state.
// Removing .scroll-hidden triggers the transition to the element's natural state.
function applyScrollAnimations() {
  requestAnimationFrame(() => {
    const elements = document.querySelectorAll(
      '.dossier-card, .note-card, .torn-paper, .section-title'
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('scroll-hidden');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -30px 0px'
    });

    elements.forEach((el, i) => {
      el.classList.add('scroll-animate', 'scroll-hidden');
      el.style.transitionDelay = `${i * 0.06}s`;
      observer.observe(el);
    });
  });
}
