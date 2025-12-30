CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50),
    email VARCHAR(100)
);

CREATE TABLE prayer_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    date DATE NOT NULL, -- Format: YYYY-MM-DD
    fajr_status ENUM('NONE', 'PRAYED', 'MISSED') DEFAULT 'NONE',
    dhuhr_status ENUM('NONE', 'PRAYED', 'MISSED') DEFAULT 'NONE',
    asr_status ENUM('NONE', 'PRAYED', 'MISSED') DEFAULT 'NONE',
    maghrib_status ENUM('NONE', 'PRAYED', 'MISSED') DEFAULT 'NONE',
    isha_status ENUM('NONE', 'PRAYED', 'MISSED') DEFAULT 'NONE',
    tahajjud_status ENUM('NONE', 'PRAYED', 'MISSED') DEFAULT 'NONE',
    last_synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_daily_log (user_id, date)
);
