"use server"

import { db } from "@/db";
import { InsertChatMessage } from "@/db/db/types";
import { chatMessages } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { z } from "zod";

const chatMessageSchema = z.object({
  fileId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1),
});

export async function saveChatMessage(data: InsertChatMessage) {
  const parsed = chatMessageSchema.safeParse(data);

  if (!parsed.success) {
    console.error("Validation failed:", parsed.error.flatten());
    return;
  }

  try {
    await db.insert(chatMessages).values(parsed.data);
  } catch (err) {
    console.error("❌ Failed to insert chat message:", err);
  }
}


export async function getChatMessages(fileId: string) {
  if (!fileId) return [];

  try {
    const messages = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.fileId, fileId))
      .orderBy(asc(chatMessages.createdAt));

    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
}