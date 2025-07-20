import { InferInsertModel } from "drizzle-orm";
import { chatMessages } from "../schema";

export type InsertChatMessage = InferInsertModel<typeof chatMessages>;
