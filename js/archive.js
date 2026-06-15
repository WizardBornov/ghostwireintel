/* ============================================
   GHOSTWIRE — Archive Page Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPage('issues');
  renderArchiveHeader();
  renderFilterBar();
  renderArchiveGrid();
});

let activeFilter = null;

function renderArchiveHeader() {
  const header = document.getElementById('archive-header');
  if (!header) return;
  header.innerHTML = `
    <h1>Intelligence Archive</h1>
    <p>All published GhostWire investigations and threat intelligence reports.</p>
  `;
}

function renderFilterBar() {
  const container = document.getElementById('archive-filters');
  if (!container) return;

  const tags = getAllTags();
  container.innerHTML = `
    <span class="filter-label">Filter:</span>
    <span class="filter-tag active" data-tag="all" onclick="filterReports(null, this)">All</span>
    ${tags.map(tag => `<span class="filter-tag" data-tag="${tag}" onclick="filterReports('${tag}', this)">${tag}</span>`).join('')}
  `;
}

function filterReports(tag, clickedEl) {
  activeFilter = tag;

  // Update active filter styling
  document.querySelectorAll('.filter-tag').forEach(el => el.classList.remove('active'));
  if (clickedEl) clickedEl.classList.add('active');

  renderArchiveGrid();
}

function renderArchiveGrid() {
  const container = document.getElementById('archive-grid');
  if (!container) return;

  const reports = activeFilter ? getReportsByTag(activeFilter) : REPORTS;

  if (reports.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p class="empty-state-text">No reports found matching "${activeFilter}"</p>
      </div>
    `;
    updateCount(0);
    return;
  }

  container.innerHTML = reports.map(r => renderDossierCard(r)).join('');
  updateCount(reports.length);

  // Apply fade-in
  container.querySelectorAll('.dossier-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.animation = `fadeInUp 0.4s ease ${i * 0.08}s forwards`;
  });
}

function updateCount(count) {
  const countEl = document.getElementById('archive-count');
  if (countEl) {
    countEl.innerHTML = `<span>${count}</span> ${count === 1 ? 'report' : 'reports'} ${activeFilter ? `tagged "${activeFilter}"` : 'in archive'}`;
  }
}
