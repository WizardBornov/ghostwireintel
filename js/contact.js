/* ============================================
   GHOSTWIRE — Contact Page Logic
   Formspree integration for static site contact.
   Form ID is read from SITE_CONFIG.formspreeId.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPage('contact');
  populateSocialLinks();
  setupContactForm();
});

function populateSocialLinks() {
  const container = document.getElementById('contact-social-links');
  if (!container) return;

  const links = container.querySelectorAll('.social-link');
  if (links.length >= 3) {
    links[0].href = SITE_CONFIG.twitterUrl;
    links[1].href = SITE_CONFIG.linkedinUrl;
    links[2].href = SITE_CONFIG.githubUrl;
  }
}

function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Set form action from SITE_CONFIG
  const formspreeEndpoint = `https://formspree.io/f/${SITE_CONFIG.formspreeId}`;
  form.action = formspreeEndpoint;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;

    const formData = new FormData(form);

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.style.display = 'none';
        document.querySelector('.form-success').classList.add('show');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      submitBtn.textContent = 'ERROR — TRY AGAIN';
      submitBtn.disabled = false;
      setTimeout(() => {
        submitBtn.textContent = originalText;
      }, 3000);
    }
  });
}
