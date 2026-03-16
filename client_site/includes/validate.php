<!-- Marvens Sainterlien
3/14/2026
validate.php includen for review form  -->

<?php

// Check that text length is within a specified range
function validateText(string $value, int $min, int $max): bool {
    $length = strlen(trim($value));
    return $length >= $min && $length <= $max;
}

// Check that a number is numeric and within a valid range
function validateNumber(mixed $value, int $min, int $max): bool {
    return is_numeric($value) && $value >= $min && $value <= $max;
}

// Check that a selected option exists in an allowed list
function validateOption(string $value, array $allowed): bool {
    return in_array($value, $allowed);
}

?>