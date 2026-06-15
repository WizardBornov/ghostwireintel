/* ============================================
   GHOSTWIRE — Research Notes Logic
   Handles both listing page and individual note page.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;

  if (page === 'notes-list') {
    initPage('notes');
    renderNotesListing();
  } else if (page === 'note-single') {
    initPage('notes');
    renderSingleNote();
  }
});

// ---- Notes Listing ----
function renderNotesListing() {
  const container = document.getElementById('notes-list');
  if (!container) return;

  if (RESEARCH_NOTES.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p class="empty-state-text">No research notes published yet.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="notes-grid">
      ${RESEARCH_NOTES.map(n => renderNoteCard(n)).join('')}
    </div>
  `;

  // Apply staggered animations
  container.querySelectorAll('.note-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.animation = `fadeInUp 0.4s ease ${i * 0.1}s forwards`;
  });
}

// ---- Single Note Page ----
function renderSingleNote() {
  const params = new URLSearchParams(window.location.search);
  const noteId = params.get('id');

  if (!noteId) {
    showNoteError('No research note specified.');
    return;
  }

  const note = getNoteById(noteId);
  if (!note) {
    showNoteError(`Research note "${noteId}" not found.`);
    return;
  }

  // Update page title
  document.title = `${note.title} — GhostWire Research Notes`;

  const container = document.getElementById('note-content');
  if (!container) return;

  container.innerHTML = `
    <div class="container">
      <a href="research-notes.html" class="back-nav">
        <span class="back-nav-arrow">←</span> Back to Research Notes
      </a>
    </div>

    <div class="note-page-header container">
      <div class="note-page-classification">// ${note.classification} //</div>
      <div class="note-page-date">${note.displayDate}</div>
      <h1 class="note-page-title">${note.title}</h1>
      <div class="report-tags">
        ${renderTags(note.tags)}
      </div>
    </div>

    <div class="note-page-body container container--narrow">
      ${renderMarkdown(note.content)}
    </div>

    <div class="container container--narrow" style="margin-top: var(--space-3xl); padding-top: var(--space-2xl); border-top: 1px solid var(--border-subtle);">
      ${renderSectionLabel('OTHER NOTES')}
      <div class="notes-grid">
        ${RESEARCH_NOTES.filter(n => n.id !== noteId).slice(0, 3).map(n => renderNoteCard(n)).join('')}
      </div>
    </div>
  `;
}

function showNoteError(message) {
  const container = document.getElementById('note-content');
  if (container) {
    container.innerHTML = `
      <div class="container" style="padding: var(--space-4xl) 0; text-align: center;">
        <h1 style="font-size: var(--text-3xl); margin-bottom: var(--space-lg);">Note Not Found</h1>
        <p style="color: var(--text-muted); margin-bottom: var(--space-xl);">${message}</p>
        <a href="research-notes.html" class="btn btn-outline">← Return to Research Notes</a>
      </div>
    `;
  }
}
