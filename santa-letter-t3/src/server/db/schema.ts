import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const letters = pgTable("letters", {
  id: serial("id").primaryKey(),
  childLetterText: text("child_letter_text"),
  santaResponseText: text("santa_response_text"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
