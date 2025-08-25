CREATE TABLE `jobs_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`desc` text NOT NULL,
	`location` text NOT NULL,
	`offers` integer NOT NULL,
	`created_at` integer NOT NULL,
	`expired_at` integer NOT NULL,
	`owner` text NOT NULL,
	FOREIGN KEY (`owner`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_email_unique` ON `users_table` (`email`);