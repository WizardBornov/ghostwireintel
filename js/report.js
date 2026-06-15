/* ============================================
   GHOSTWIRE — Report Page Logic
   Auto-generates a full report page from metadata.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const reportId = params.get('id');

  if (!reportId) {
    showError('No report specified.');
    return;
  }

  const report = getReportById(reportId);
  if (!report) {
    showError(`Report "${reportId}" not found.`);
    return;
  }

  // Set page title
  document.title = `${report.title} — GhostWire Issue ${String(report.issue).padStart(3, '0')}`;

  // Set meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = report.summary;

  initPage('issues');
  renderReport(report);
});

function renderReport(report) {
  const container = document.getElementById('report-content');
  if (!container) return;

  const statusClass = report.status ? report.status.toLowerCase() : 'published';

  container.innerHTML = `
    <!-- Back Navigation -->
    <div class="container">
      <a href="archive.html" class="back-nav">
        <span class="back-nav-arrow">←</span> Back to Archive
      </a>
    </div>

    <!-- Report Header -->
    <div class="report-header">
      <div class="report-issue-date">
        <span class="report-issue">#ISSUE ${String(report.issue).padStart(3, '0')}</span>
        <span class="report-date">${report.displayDate}</span>
      </div>
      <h1 class="report-title">${report.title}</h1>
      <p class="report-subtitle">${report.subtitle}</p>
      ${report.status ? `<span class="report-status report-status--${statusClass}">${report.status}</span>` : ''}
    </div>

    <!-- Cover Image -->
    ${report.coverImage ? `
      <div class="report-cover container">
        <img src="${report.coverImage}" alt="${report.title}" onerror="this.parentElement.style.display='none'" />
      </div>
    ` : ''}

    <!-- Report Body -->
    <div class="report-body">

      <!-- Metadata Panel -->
      ${renderMetadataPanel(report)}

      <!-- Stats Row -->
      ${renderStatRow(report.stats)}

      <!-- Executive Summary -->
      ${report.executiveSummary ? `
        ${renderSectionLabel('EXECUTIVE SUMMARY')}
        ${renderExecutiveSummary(report.executiveSummary)}
      ` : ''}

      <!-- Key Findings -->
      ${renderKeyFindings(report.keyFindings)}

      <!-- Tags -->
      <div class="report-tags">
        ${renderTags(report.tags)}
      </div>

      <!-- Actions -->
      <div class="report-actions">
        ${report.pdfFile ? `<a href="${report.pdfFile}" download class="btn btn-primary">↓ Download Full Report (PDF)</a>` : ''}
        ${report.pdfFile ? `<a href="${report.pdfFile}" target="_blank" class="btn btn-outline">Open PDF in New Tab</a>` : ''}
      </div>

      <!-- PDF Viewer -->
      ${renderPDFViewer(report)}

      <!-- Citation -->
      ${renderCitationBlock(report)}

      <!-- Share -->
      ${renderShareButtons(report)}
    </div>

    <!-- Related Reports -->
    ${renderRelatedReports(report)}
  `;
}

function renderRelatedReports(currentReport) {
  const related = REPORTS.filter(r => r.id !== currentReport.id).slice(0, 3);
  if (related.length === 0) return '';

  return `
    <div class="related-reports container">
      ${renderSectionLabel('RELATED INVESTIGATIONS')}
      <h2 class="section-title">Other Reports</h2>
      <div class="related-grid">
        ${related.map(r => renderDossierCard(r)).join('')}
      </div>
    </div>
  `;
}

function showError(message) {
  initPage('issues');
  const container = document.getElementById('report-content');
  if (container) {
    container.innerHTML = `
      <div class="container" style="padding: var(--space-4xl) 0; text-align: center;">
        <h1 style="font-size: var(--text-3xl); margin-bottom: var(--space-lg);">Report Not Found</h1>
        <p style="color: var(--text-muted); margin-bottom: var(--space-xl);">${message}</p>
        <a href="archive.html" class="btn btn-outline">← Return to Archive</a>
      </div>
    `;
  }
}
