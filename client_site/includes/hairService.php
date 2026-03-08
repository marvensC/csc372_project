<!-- Marvens Sainterlien
3/7/2026
hairservice.php include -->

<?php


class HairService {

    public string $name;
    public string $searchTerm;       // Used to query Unsplash gallery
    protected float $price;
    protected int $durationMinutes;
    public string $description;

    // Constructor 
    public function __construct(
        string $name,
        string $searchTerm,
        float  $price,
        int    $durationMinutes,
        string $description = 'A professional hair service.'
    ) {
        $this->name            = $name;
        $this->searchTerm      = $searchTerm;
        $this->price           = $price;
        $this->durationMinutes = $durationMinutes;
        $this->description     = $description;
    }

    // Getter for protected price
    public function getPrice(): float {
        return $this->price;
    }

    // Set price
    public function setPrice(float $price): void {
        $this->price = $price;
    }

    // Get duration
    public function getDuration(): int {
        return $this->durationMinutes;
    }

    // Method 1: Returns a formatted price string e.g. "Starting at $80.00"
    public function formatPrice(): string {
        return 'Starting at $' . number_format($this->price, 2);
    }

    // Method 2: Returns a  duration string e.g. "2 hrs 30 min"
    public function formatDuration(): string {
        $hours   = intdiv($this->durationMinutes, 60);
        $minutes = $this->durationMinutes % 60;

        if ($hours > 0 && $minutes > 0) {
            return $hours . ' hr' . ($hours > 1 ? 's' : '') . ' ' . $minutes . ' min';
        } elseif ($hours > 0) {
            return $hours . ' hr' . ($hours > 1 ? 's' : '');
        } else {
            return $minutes . ' min';
        }
    }
}


$services = [
    new HairService('Braids',       'braids',            80.00, 180, 'Classic and creative braiding styles tailored to your length and preference.'),
    new HairService('Cornrows',     'cornrows',           60.00, 120, 'Neat, sleek cornrow patterns customized for any occasion or everyday wear.'),
    new HairService('Locs',         'dreadlocks-black',  100.00, 240, 'Starter locs, retwists, and maintenance to keep your locs healthy and defined.'),
    new HairService('Twists',       'twisted-braid-hair', 75.00, 150, 'Two-strand and passion twists for a beautiful protective style with natural movement.'),
    new HairService('Natural Hair', 'curly hair',         65.00,  90, 'Wash-and-go, twist-outs, and styling that celebrates your natural curl pattern.'),
];

?>