function createContactModal() {
  const modalHTML = `
    <div id="contactModal" class="modal">
      <div class="modal-content">
        <span class="close-contact">&times;</span>
        <h2>Contact Us</h2>
        <p style="color:#aaa; text-align:center; font-size:14px; margin-bottom:28px;">
          Have a question or want to know more? Reach out directly.
        </p>
        <div class="contact-details">
          <div class="contact-detail">
            <span class="contact-label">Email</span>
            <a href="mailto:sainterlienchristie1907@gmail.com">saintlybeauty@gmail.com</a>
          </div>
          <div class="contact-detail">
            <span class="contact-label">Instagram</span>
            <a href="#" target="_blank">@saintlybeauty</a>
          </div>
          <div class="contact-detail">
            <span class="contact-label">TikTok</span>
            <a href="#" target="_blank">@saintlybeauty</a>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}



function initContactModal() {
  createContactModal();

  const contactModal = document.getElementById('contactModal');
  const contactBtn   = document.getElementById('contact-nav');
  const contactLink  = document.getElementById('contact-link');
  const closeBtn     = document.querySelector('.close-contact');

  contactBtn.addEventListener('click', function(e) {
    e.preventDefault();
    contactModal.style.display = 'block';
  });

  contactLink.addEventListener('click', function(e) {
    e.preventDefault();
    contactModal.style.display = 'block';
  });

  closeBtn.addEventListener('click', function() {
    contactModal.style.display = 'none';
  });

  window.addEventListener('click', function(e) {
    if (e.target === contactModal) {
      contactModal.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initContactModal();
});