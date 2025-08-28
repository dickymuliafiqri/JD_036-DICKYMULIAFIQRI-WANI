CREATE TABLE `jobs_table` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`desc` text NOT NULL,
	`category` text NOT NULL,
	`location` text NOT NULL,
	`offers` integer NOT NULL,
	`created_at` integer NOT NULL,
	`expired_at` integer NOT NULL,
	`owner` text NOT NULL,
	FOREIGN KEY (`owner`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ratings_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`raterId` text NOT NULL,
	`rating` integer NOT NULL,
	`review` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`raterId`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`avatar` text,
	`email` text NOT NULL,
	`location` text,
	`phone` text,
	`about` text,
	`speciality` text,
	`credit` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_email_unique` ON `users_table` (`email`);