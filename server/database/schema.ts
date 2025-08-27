import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: text().primaryKey(),
  name: text().notNull(),
  avatar: text(),
  email: text().notNull().unique(),
  nik: int(),
  location: text(),
  phone: text(),
  about: text(),
  speciality: text(),
  credit: int().notNull().default(0),
});

export const jobsTable = sqliteTable("jobs_table", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  desc: text().notNull(),
  category: text().notNull(),
  location: text().notNull(),
  offers: int().notNull(),
  createdAt: int("created_at", { mode: "timestamp" }).notNull(),
  expiredAt: int("expired_at", { mode: "timestamp" }).notNull(),
  owner: text()
    .notNull()
    .references(() => usersTable.id),
});

export const ratingsTable = sqliteTable("ratings_table", {
  id: int().primaryKey({ autoIncrement: true }),
  raterId: text()
    .notNull()
    .references(() => usersTable.id),
  rating: int().notNull(),
  review: text(),
  createdAt: int("created_at", { mode: "timestamp" }).notNull(),
});
