-- ============================================================
-- Saintly Beauty Database Schema
-- Marvens Sainterlien
-- Tables: services, reviews
-- ============================================================

-- Drop tables if they already exist (in order to avoid FK conflicts)
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS services;

-- ============================================================
-- TABLE 1: services
-- Stores each hair service offered by Saintly Beauty.
-- Primary key: service_id
-- ============================================================
CREATE TABLE services (
    service_id      INT             NOT NULL AUTO_INCREMENT,
    name            VARCHAR(50)     NOT NULL,
    search_term     VARCHAR(50)     NOT NULL,
    price           DECIMAL(6,2)    NOT NULL,
    duration_minutes INT            NOT NULL,
    description     VARCHAR(255)    NOT NULL,
    PRIMARY KEY (service_id)
);

-- Seed data (matches hairService.php)
INSERT INTO services (name, search_term, price, duration_minutes, description) VALUES
    ('Braids',       'braids',             80.00, 180, 'Classic and creative braiding styles tailored to your length and preference.'),
    ('Cornrows',     'cornrows',           60.00, 120, 'Neat, sleek cornrow patterns customized for any occasion or everyday wear.'),
    ('Locs',         'dreadlocks-black',  100.00, 240, 'Starter locs, retwists, and maintenance to keep your locs healthy and defined.'),
    ('Twists',       'twisted-braid-hair', 75.00, 150, 'Two-strand and passion twists for a beautiful protective style with natural movement.'),
    ('Natural Hair', 'curly hair',         65.00,  90, 'Wash-and-go, twist-outs, and styling that celebrates your natural curl pattern.');


-- ============================================================
-- TABLE 2: reviews
-- Stores reviews submitted through the review form.
-- Primary key: review_id
-- Foreign key:  service_id → services(service_id)
-- ============================================================
CREATE TABLE reviews (
    review_id       INT             NOT NULL AUTO_INCREMENT,
    service_id      INT             NOT NULL,
    reviewer_name   VARCHAR(50)     NOT NULL,
    email           VARCHAR(100)    NOT NULL,
    rating          TINYINT         NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_text     VARCHAR(500)    DEFAULT NULL,
    submitted_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (review_id),
    FOREIGN KEY (service_id) REFERENCES services(service_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Sample review data
INSERT INTO reviews (service_id, reviewer_name, email, rating, review_text) VALUES
    (1, 'Aaliyah James',   'aaliyah@email.com',  5, 'My braids came out absolutely gorgeous! She was so gentle and the style lasted weeks.'),
    (2, 'Destiny Brown',   'destiny@email.com',  4, 'Loved my cornrows, very neat and clean. Will definitely be coming back for my next appointment.'),
    (3, 'Monique Carter',  'monique@email.com',  5, 'My locs look amazing after my retwist. She really knows how to keep them healthy and defined.'),
    (4, 'Jasmine Okafor',  'jasmine@email.com',  4, 'The twists were done beautifully and held up really well. Great experience overall.'),
    (5, 'Brianna Lewis',   'brianna@email.com',  5, 'She brought my natural curls to life! The wash and go styling was exactly what I wanted.'),
    (1, 'Kezia Thompson',  'kezia@email.com',    3, 'The braids were nice but it took a little longer than expected. Still happy with the results.'),
    (2, 'Rochelle Dupont', 'rochelle@email.com', 5, 'Perfect cornrows every single time. She is so talented and professional.');
