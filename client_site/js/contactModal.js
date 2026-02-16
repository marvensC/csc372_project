// Create contact modal
function createContactModal() {
  const modalHTML = `
    <div id="contactModal" class="modal">
      <div class="modal-content">
        <span class="close-contact">&times;</span>
        <h2>Contact Us</h2>
        <form id="contactForm">
          <label for="contactName">Name:</label>
          <input type="text" id="contactName" name="name" required>
         
          <label for="contactEmail">Email:</label>
          <input type="email" id="contactEmail" name="email" required>
         
          <label for="contactMessage">Message:</label>
          <textarea id="contactMessage" name="message" rows="5" required></textarea>
         
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  `;
 
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}


// Initialize contact modal
function initContactModal() {
  createContactModal();
 
  const contactModal = document.getElementById('contactModal');
  const contactBtn = document.getElementById('contact-nav');
  const contactLink = document.getElementById('contact-link');
  const closeBtn = document.querySelector('.close-contact');
  const contactForm = document.getElementById('contactForm');
 
  // Open modal from nav button
  contactBtn.addEventListener('click', function(e) {
    e.preventDefault();
    contactModal.style.display = 'block';
  });
 
  // Open modal from footer links
  contactLink.addEventListener('click', function(e) {
 	e.preventDefault(); 
  	contactModal.style.display = 'block'; 
  });
 
  // Close modal when X is clicked
  closeBtn.addEventListener('click', function() {
    contactModal.style.display = 'none';
  });
 
  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === contactModal) {
      contactModal.style.display = 'none';
    }
  });
 
  // Handle form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
   
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
   
    console.log('Contact submitted:', { name, email, message });
    alert('Thank you for contacting us!');
   
    contactForm.reset();
    contactModal.style.display = 'none';
  });
}
