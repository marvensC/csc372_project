<!-- Marvens Sainterlien
3/7/2026
service.php page -->




<?php 
require_once 'includes/db.php';

$selectedService = null;
$queryStringError = '';
 
if (isset($_GET['id'])) {
    $id = $_GET['id'];
 
    // Validate: must be a positive integer
    if (!filter_var($id, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]])) {
        $queryStringError = 'Invalid service ID.';
    } else {
        // Prepared statement with placeholder
        $statement = pdo($pdo, 'SELECT * FROM services WHERE service_id = ?', [$id]);
        $selectedService = $statement->fetch();
 
        if (!$selectedService) {
            $queryStringError = 'Service not found.';
        }
    }
}

$statement = pdo($pdo, 'SELECT * FROM services');
$services  = $statement->fetchAll();

?>
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <meta http-equiv='X-UA-Compatible' content='IE=edge'>
  <title>Saintly Beauty</title>
  <meta name='viewport' content='width=device-width, initial-scale=1'>
  <link rel='stylesheet' type='text/css' media='screen' href='css/style.css'>
</head>
<body>
 
  <div class="header">
    <img id='logo' src="images/logosvg.svg" alt=" logo">
    <div class="nav">
      <a href="home.php" title="Home">Home</a>
      <a href="services.php" class="active" title="services">Services</a>
      <a href="appointment.html" title="Book Now">Book Now</a>
      <a href="portfolio.html" title="portfolio">Portfolio</a>
      <a href="review.php" title="Leave a review">Leave a review</a>
      <a href="#" id="contact-nav" title="Contact">Contact us</a>
    </div>
  </div>
 
  <div class="content">
    <h1>Services</h1>
 
    <?php if ($queryStringError !== ''): ?>
      <!-- Query string error message -->
      <p class="error"><?php echo htmlspecialchars($queryStringError); ?></p>
 
    <?php elseif ($selectedService !== null): ?>
      <!-- Single service detail view (query string) -->
      <div class="service-detail">
        <a href="services.php" title="Back to all services">← Back to Services</a>
        <h2><?php echo htmlspecialchars($selectedService['name']); ?></h2>
        <p><?php echo htmlspecialchars($selectedService['description']); ?></p>
        <p><strong>Starting at:</strong> $<?php echo number_format($selectedService['price'], 2); ?></p>
        <p><strong>Duration:</strong> <?php
          $h = intdiv($selectedService['duration_minutes'], 60);
          $m = $selectedService['duration_minutes'] % 60;
          if ($h > 0 && $m > 0)      echo $h . ' hr' . ($h > 1 ? 's' : '') . ' ' . $m . ' min';
          elseif ($h > 0)            echo $h . ' hr' . ($h > 1 ? 's' : '');
          else                       echo $m . ' min';
        ?></p>
        <a href="appointment.html" title="Book Now">Book This Service</a>
      </div>
 
    <?php else: ?>
      <!-- All services display -->
      <?php if (empty($services)): ?>
        <p>No services found.</p>
      <?php else: ?>
        <div class="service-cards">
          <?php foreach ($services as $service): ?>
            <div class="service-card <?php echo ($service['name'] === 'Braids') ? 'active' : ''; ?>"
                 data-search="<?php echo htmlspecialchars($service['search_term']); ?>"
                 onclick="selectService(this, <?php echo (int)$service['service_id']; ?>)">
              <h3><?php echo htmlspecialchars($service['name']); ?></h3>
              <div class="price">Starting at $<?php echo number_format($service['price'], 2); ?></div>
              <div class="duration">⏱
                <?php
                  $h = intdiv($service['duration_minutes'], 60);
                  $m = $service['duration_minutes'] % 60;
                  if ($h > 0 && $m > 0)      echo $h . ' hr' . ($h > 1 ? 's' : '') . ' ' . $m . ' min';
                  elseif ($h > 0)            echo $h . ' hr' . ($h > 1 ? 's' : '');
                  else                       echo $m . ' min';
                ?>
              </div>
              <div class="desc"><?php echo htmlspecialchars($service['description']); ?></div>
              <a href="services.php?id=<?php echo (int)$service['service_id']; ?>" title="View details">View Details</a>
            </div>
          <?php endforeach; ?>
        </div>
 
        <div class="gallery-frame">
          <div id="gallery"></div>
        </div>
      <?php endif; ?>
    <?php endif; ?>
 
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
  <script src='js/api.js'></script>
 
  <script>
    function selectService(card, id) {
      document.querySelectorAll('.service-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      getImages(card.dataset.search);
    }
 
    // Load default gallery for Braids on page load
    window.addEventListener('DOMContentLoaded', () => {
      const firstCard = document.querySelector('.service-card.active');
      if (firstCard) getImages(firstCard.dataset.search);
    });
  </script>
 
</body>
</html>