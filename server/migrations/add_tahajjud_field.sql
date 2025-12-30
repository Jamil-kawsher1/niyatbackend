-- Migration to add tahajjud_status field to prayer_logs table
-- Run this on existing databases to add the new field

ALTER TABLE prayer_logs 
ADD COLUMN tahajjud_status ENUM('NONE', 'PRAYED', 'MISSED') DEFAULT 'NONE' 
AFTER isha_status;
