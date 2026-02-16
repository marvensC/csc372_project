// Create review modal
function createReviewModal() {
  const modalHTML = `
    <div id="reviewModal" class="modal">
      <div class="modal-content">
        <span class="close-review">&times;</span>
        <h2>Leave a Review</h2>
        <form id="reviewForm">
          <label for="reviewName">Name:</label>
          <input type="text" id="reviewName" name="name" required>
         
          <label for="reviewEmail">Email:</label>
          <input type="email" id="reviewEmail" name="email" required>
         
          <label for="reviewText">Review:</label>
          <textarea id="reviewText" name="review" rows="5" required></textarea>
         
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  `;
 
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}


// Initialize review modal
function initReviewModal() {
  createReviewModal();
 
  const reviewModal = document.getElementById('reviewModal');
  const reviewBtn = document.getElementById('review-nav');
  const closeBtn = document.querySelector('.close-review');
  const reviewForm = document.getElementById('reviewForm');
 
  // Open modal
  reviewBtn.addEventListener('click', function(e) {
    e.preventDefault();
    reviewModal.style.display = 'block';
  });
 
  // Close modal when X is clicked
  closeBtn.addEventListener('click', function() {
    reviewModal.style.display = 'none';
  });
 
  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === reviewModal) {
      reviewModal.style.display = 'none';
    }
  });
 
  // Handle form submission
  reviewForm.addEventListener('submit', function(e) {
    e.preventDefault();
   
    const name = document.getElementById('reviewName').value;
    const email = document.getElementById('reviewEmail').value;
    const review = document.getElementById('reviewText').value;
   
    console.log('Review submitted:', { name, email, review });
    alert('Thank you for your review!');
   
    reviewForm.reset();
    reviewModal.style.display = 'none';
  });
}
