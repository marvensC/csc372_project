<!-- Marvens Sainterlien
3/14/2026
review.php - Review form page -->

<?php
session_start();
require_once 'includes/validate.php';
require_once 'includes/db.php';

$servicesStmt = pdo($pdo, 'SELECT service_id, name FROM services');
$allowedServices = $servicesStmt->fetchAll();
$allowedServiceNames = array_column($allowedServices, 'name');
 
$values = [
    'name'    => '',
    'email'   => '',
    'review'  => '',
    'rating'  => '',
    'service' => '',
];

$errors = [
    'name'    => '',
    'email'   => '',
    'review'  => '',
    'rating'  => '',
    'service' => '',
];

$message = '';
$editReview = null;

//delete 
if (isset($_GET['delete'])) {
    $deleteId = $_GET['delete'];
 
    if (!filter_var($deleteId, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]])) {
        $message = 'Invalid review ID.';
    } else {
        pdo($pdo, 'DELETE FROM reviews WHERE review_id = ?', [(int)$deleteId]);
        $message = 'Review deleted successfully.';
    }
}

//edit
if (isset($_GET['edit'])) {
    $editId = $_GET['edit'];
 
    if (!filter_var($editId, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]])) {
        $message = 'Invalid review ID.';
    } else {
        $editStmt  = pdo($pdo, 'SELECT * FROM reviews WHERE review_id = ?', [(int)$editId]);
        $editReview = $editStmt->fetch();
 
        if ($editReview) {
            $values['name']       = $editReview['reviewer_name'];
            $values['email']      = $editReview['email'];
            $values['review']     = $editReview['review_text'];
            $values['rating']     = $editReview['rating'];
            $values['service_id'] = $editReview['service_id'];
        } else {
            $message = 'Review not found.';
        }
    }
}

//insert/update
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
 
    $values['name']       = $_POST['name']       ?? '';
    $values['email']      = $_POST['email']       ?? '';
    $values['review']     = $_POST['review']      ?? '';
    $values['rating']     = $_POST['rating']      ?? '';
    $values['service_id'] = $_POST['service_id']  ?? '';
 
    $editId = isset($_POST['review_id']) && filter_var($_POST['review_id'], FILTER_VALIDATE_INT) 
              ? (int)$_POST['review_id'] 
              : null;
 
    // Validate
    if (!validateText($values['name'], 2, 50)) {
        $errors['name'] = 'Name must be between 2 and 50 characters.';
    }
    if (!validateText($values['email'], 5, 100)) {
        $errors['email'] = 'Please enter a valid email.';
    }
    if ($values['review'] !== '' && !validateText($values['review'], 10, 500)) {
        $errors['review'] = 'Review must be between 10 and 500 characters.';
    }
    if (!validateNumber($values['rating'], 1, 5)) {
        $errors['rating'] = 'Rating must be a number between 1 and 5.';
    }
    if (!filter_var($values['service_id'], FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]])) {
        $errors['service_id'] = 'Please select a valid service.';
    }
 
    $errorSummary = implode('', $errors);
 
    if ($errorSummary === '') {
 
        if ($editId) {
            // UPDATE existing review
            pdo($pdo,
                'UPDATE reviews SET service_id = ?, reviewer_name = ?, email = ?, rating = ?, review_text = ? WHERE review_id = ?',
                [(int)$values['service_id'], $values['name'], $values['email'], (int)$values['rating'], $values['review'], $editId]
            );
            $message = 'Review updated successfully!';
        } else {
            // INSERT new review
            pdo($pdo,
                'INSERT INTO reviews (service_id, reviewer_name, email, rating, review_text) VALUES (?, ?, ?, ?, ?)',
                [(int)$values['service_id'], $values['name'], $values['email'], (int)$values['rating'], $values['review']]
            );
            $message = 'Thank you for your review, ' . htmlspecialchars($values['name']) . '!';
            setcookie('reviewer_name', $values['name'], time() + (30 * 24 * 60 * 60), '/');
            $_SESSION['reviewer_name'] = $values['name'];
            $_SESSION['reviewed']      = true;
        }
 
        // Reset form
        $values   = ['name' => '', 'email' => '', 'review' => '', 'rating' => '', 'service_id' => ''];
        $editReview = null;
    } else {
        $message = 'Please correct the errors below.';
    }
}
 
// Pre-fill name from cookie if empty
if (empty($values['name']) && isset($_COOKIE['reviewer_name'])) {
    $values['name'] = $_COOKIE['reviewer_name'];
}

$reviewsStmt = pdo($pdo, '
    SELECT r.review_id, r.reviewer_name, r.rating, r.review_text, r.submitted_at, s.name AS service_name
    FROM reviews r
    JOIN services s ON r.service_id = s.service_id
    ORDER BY r.submitted_at DESC
');
$allReviews = $reviewsStmt->fetchAll();

?>

<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <meta http-equiv='X-UA-Compatible' content='IE=edge'>
  <title>Saintly Beauty - Leave a Review</title>
  <meta name='viewport' content='width=device-width, initial-scale=1'>
  <link rel='stylesheet' type='text/css' media='screen' href='css/style.css'>
</head>
<body>
 
  <div class="header">
    <img id='logo' src="images/logosvg.svg" alt=" logo">
    <div class="nav">
      <a href="home.php" title="Home">Home</a>
      <a href="services.php" title="services">Services</a>
      <a href="appointment.html" title="Book Now">Book Now</a>
      <a href="portfolio.html" title="portfolio">Portfolio</a>
      <a href="review.php" class="active" title="Leave a review">Leave a review</a>
      <a href="#" id="contact-nav" title="Contact">Contact us</a>
    </div>
  </div>
 
  <div class="content">
    <div class="review-page">
      <div class="modal-content">
 
        <h2><?php echo $editReview ? 'Edit Your Review' : 'Leave a Review'; ?></h2>
 
        <?php if ($message !== ''): ?>
          <p class="form-message <?php echo (implode('', $errors) !== '') ? 'error' : ''; ?>">
            <?php echo htmlspecialchars($message); ?>
          </p>
        <?php endif; ?>
 
        <form action="review.php" method="POST" id="reviewForm">
 
          <!-- Hidden field for UPDATE -->
          <?php if ($editReview): ?>
            <input type="hidden" name="review_id" value="<?php echo (int)$editReview['review_id']; ?>">
          <?php endif; ?>
 
          <label for="reviewName">Name:</label>
          <input type="text" id="reviewName" name="name"
                 value="<?php echo htmlspecialchars($values['name']); ?>">
          <?php if ($errors['name'] !== ''): ?>
            <span class="error"><?php echo $errors['name']; ?></span>
          <?php endif; ?>
 
          <label for="reviewEmail">Email:</label>
          <input type="email" id="reviewEmail" name="email"
                 value="<?php echo htmlspecialchars($values['email']); ?>">
          <?php if ($errors['email'] !== ''): ?>
            <span class="error"><?php echo $errors['email']; ?></span>
          <?php endif; ?>
 
          <label for="reviewService">Service Received:</label>
          <select id="reviewService" name="service_id">
            <option value="">-- Select a service --</option>
            <?php foreach ($allowedServices as $s): ?>
              <option value="<?php echo (int)$s['service_id']; ?>"
                <?php echo ((string)$values['service_id'] === (string)$s['service_id']) ? 'selected' : ''; ?>>
                <?php echo htmlspecialchars($s['name']); ?>
              </option>
            <?php endforeach; ?>
          </select>
          <?php if ($errors['service_id'] !== ''): ?>
            <span class="error"><?php echo $errors['service_id']; ?></span>
          <?php endif; ?>
 
          <label for="reviewRating">Rating (1-5):</label>
          <input type="number" id="reviewRating" name="rating" min="1" max="5"
                 value="<?php echo htmlspecialchars($values['rating']); ?>">
          <?php if ($errors['rating'] !== ''): ?>
            <span class="error"><?php echo $errors['rating']; ?></span>
          <?php endif; ?>
 
          <label for="reviewText">Review:</label>
          <textarea id="reviewText" name="review" rows="5"><?php echo htmlspecialchars($values['review']); ?></textarea>
          <?php if ($errors['review'] !== ''): ?>
            <span class="error"><?php echo $errors['review']; ?></span>
          <?php endif; ?>
 
          <button type="submit"><?php echo $editReview ? 'Update Review' : 'Submit Review'; ?></button>
          <?php if ($editReview): ?>
            <a href="review.php" title="Cancel edit">Cancel</a>
          <?php endif; ?>
 
        </form>
      </div>
 
      // options
      <?php if (!empty($allReviews)): ?>
        <div class="reviews-list">
          <h2>Reviews</h2>
          <?php foreach ($allReviews as $review): ?>
            <div class="review-item">
              <strong><?php echo htmlspecialchars($review['reviewer_name']); ?></strong>
              <span> — <?php echo htmlspecialchars($review['service_name']); ?></span>
              <span> | Rating: <?php echo (int)$review['rating']; ?>/5</span>
              <?php if (!empty($review['review_text'])): ?>
                <p><?php echo htmlspecialchars($review['review_text']); ?></p>
              <?php endif; ?>
              <small><?php echo htmlspecialchars($review['submitted_at']); ?></small>
              <div class="review-actions">
                <a href="review.php?edit=<?php echo (int)$review['review_id']; ?>" title="Edit review">Edit</a>
                <a href="review.php?delete=<?php echo (int)$review['review_id']; ?>" 
                   title="Delete review"
                   onclick="return confirm('Are you sure you want to delete this review?')">Delete</a>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      <?php else: ?>
        <p>No reviews yet. Be the first to leave one!</p>
      <?php endif; ?>
 
    </div>
  </div>
 
  <footer class="footer">
    <div class="footer-top">
      <a href="#" id="contact-link" title="Contact Us">Contact Us</a>
      <div class="socials-links">
        <span>Follow Us</span>
        <div class="socials-icons">
          <a href="#" title="Instagram">📷</a>
          <a href="#" title="TikTok">🎵</a>
        </div>
      </div>
    </div>
    <span>&copy; 2025 Saintly Beauty</span>
  </footer>
 
  <script src='js/contactModal.js'></script>
 
</body>
</html>