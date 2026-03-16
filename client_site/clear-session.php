<?php
session_start();
session_destroy();
setcookie('reviewer_name', '', time() - 3600, '/');
header('Location: home.php');
exit;
?>