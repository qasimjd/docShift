import { boolean, index, integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    clerkId: varchar("clerk_id", { length: 256 }).notNull().unique(),
    email: varchar("email", { length: 256 }).notNull(),
    fullName: varchar("full_name", { length: 256 }),
    imageUrl: text("image_url"),
    plan: varchar("plan", { length: 50 }).default("free"),
    stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
    stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
    stripePriceId: varchar("stripe_price_id", { length: 255 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const pdfFilesTable = pgTable("pdf_files", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    fileUrl: text("file_url").notNull(),
    fileSize: integer("file_size").notNull(),
    fileData: text("file_data").notNull(),
    summary: text("summary"),
    hasSummary: boolean("has_summary").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
    id: uuid("id").defaultRandom().primaryKey(),
    fileId: uuid("file_id").notNull().references(() => pdfFilesTable.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
    role: text("role", { enum: ["user", "assistant"] }).notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
}, (table) => ({
    fileIndex: index("file_id_idx").on(table.fileId),
    userIndex: index("user_id_idx").on(table.userId),
}));

export const subscriptions = pgTable('subscriptions', {
    userId: uuid("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
    subscriptionId: text('subscription_id').notNull().primaryKey(),
    status: text('status').notNull(),
    priceId: text('price_id'),
    cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull(),
    currentPeriodStart: timestamp('current_period_start').notNull(),
    currentPeriodEnd: timestamp('current_period_end').notNull(),
});