<!-- Marvens Sainterlien
3/7/2026
service.php page -->




<?php require_once 'includes/hairService.php'; ?>

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
      <a href="review.php"  title="Leave a review">Leave a review</a>
      <a href="#" id="contact-nav" title="Contact">Contact us</a>
    </div>
  </div>

  <div class="content">
    <h1>Services</h1>

    <div class="service-cards">
      <?php foreach ($services as $service): ?>
        <div class="service-card <?php echo ($service->name === 'Braids') ? 'active' : ''; ?>"
             data-search="<?php echo htmlspecialchars($service->searchTerm); ?>"
             onclick="selectService(this)">
          <h3><?php echo htmlspecialchars($service->name); ?></h3>
          <div class="price"><?php echo $service->formatPrice(); ?></div>
          <div class="duration">⏱ <?php echo $service->formatDuration(); ?></div>
          <div class="desc"><?php echo htmlspecialchars($service->description); ?></div>
        </div>
      <?php endforeach; ?>
    </div>

    <div class="gallery-frame">
      <div id="gallery"></div>
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
  <script src='js/api.js'></script>
  
  <script>
    function selectService(card) {
      document.querySelectorAll('.service-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      getImages(card.dataset.search);
    }
  </script>

</body>
</html>