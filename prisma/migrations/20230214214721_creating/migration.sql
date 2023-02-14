-- CreateTable
CREATE TABLE `Users` (
    `user_id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `user_email` VARCHAR(500) NOT NULL,
    `user_password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Users_user_email_key`(`user_email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Urls` (
    `url_hash` VARCHAR(191) NOT NULL,
    `url_original` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `expires_at` DATETIME NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`url_hash`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Urls` ADD CONSTRAINT `Urls_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
-- Add Trigger
CREATE TRIGGER `urls_expires_at` BEFORE INSERT ON `Urls` FOR EACH ROW SET new.expires_at = DATE_ADD(now(),interval 2 month);