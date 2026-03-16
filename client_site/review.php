<!-- Marvens Sainterlien
3/14/2026
review.php - Review form page -->

<?php
session_start();
require_once 'includes/validate.php';

$allowedServices = ['Braids', 'Cornrows', 'Locs', 'Twists', 'Natural Hair'];

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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $values['name']    = $_POST['name']    ?? '';
    $values['email']   = $_POST['email']   ?? '';
    $values['review']  = $_POST['review']  ?? '';
    $values['rating']  = $_POST['rating']  ?? '';
    $values['service'] = $_POST['service'] ?? '';

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
    if (!validateOption($values['service'], $allowedServices)) {
        $errors['service'] = 'Please select a valid service.';
    }

    $errorSummary = implode('', $errors);

    if ($errorSummary === '') {
        $message = 'Thank you for your review, ' . htmlspecialchars($values['name']) . '!';
        setcookie('reviewer_name', $values['name'], time() + (30 * 24 * 60 * 60), '/');
        $_SESSION['reviewer_name'] = $values['name'];
        $_SESSION['reviewed'] = true;
    } else {
        $message = 'Please correct the errors below.';
    }
}

if (empty($values['name']) && isset($_COOKIE['reviewer_name'])) {
    $values['name'] = $_COOKIE['reviewer_name'];
}
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

        <h2>Leave a Review</h2>

        <?php if ($message !== ''): ?>
          <p class="form-message <?php echo (implode('', $errors) !== '') ? 'error' : ''; ?>">
            <?php echo htmlspecialchars($message); ?>
          </p>
        <?php endif; ?>

        <form action="review.php" method="POST" id="reviewForm">

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
          <select id="reviewService" name="service">
            <option value="">-- Select a service --</option>
            <?php foreach ($allowedServices as $s): ?>
              <option value="<?php echo $s; ?>"
                <?php echo ($values['service'] === $s) ? 'selected' : ''; ?>>
                <?php echo $s; ?>
              </option>
            <?php endforeach; ?>
          </select>
          <?php if ($errors['service'] !== ''): ?>
            <span class="error"><?php echo $errors['service']; ?></span>
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

          <button type="submit">Submit Review</button>

        </form>
      </div>
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