import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: text().primaryKey(),
  name: text().notNull(),
  avatar: text(),
  email: text().notNull().unique(),
  location: text(),
  phone: text(),
  about: text(),
  speciality: text(),
  credit: int().notNull().default(0),
});

export const jobsTable = sqliteTable("jobs_table", {
  id: text().primaryKey(),
  title: text().notNull(),
  desc: text().notNull(),
  category: text().notNull(),
  offers: int().notNull(),
  createdAt: int("created_at", { mode: "timestamp" }).notNull(),
  anonym: int().notNull().default(0),
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

export const paymentsTable = sqliteTable("payments_table", {
  id: text().primaryKey(),
  invoiceId: text().notNull(),
  amount: int().notNull(),
  createdAt: int("created_at", { mode: "timestamp" }).notNull(),
  buyerId: text()
    .notNull()
    .references(() => usersTable.id),
});
