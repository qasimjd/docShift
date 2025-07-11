"use server";


import { db } from "@/db";
import { eq, desc } from "drizzle-orm";
import { pdfFilesTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { getUserId } from "./user.action";
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';


export const getFilesByUser = async () => {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
        throw new Error("User not authenticated");
    }

    try {
        const user = await getUserId()

        const userFiles = await db.query.pdfFilesTable.findMany({
            where: eq(pdfFilesTable.userId, user.id),
            orderBy: desc(pdfFilesTable.createdAt),
        });
        return userFiles;
    } catch (error) {
        console.error("Error fetching files for user:", error);
        throw new Error("Failed to fetch files");
    }
};


export const generateSummary = async (fileText: string) => {
    if (!fileText) {
        throw new Error("File text is required to generate a summary");
    }

    try {
        const { text } = await generateText({
            model: google("gemini-1.5-flash"),
            system:
                "You are an expert AI writing assistant for a document summarization platform called DocShift. " +
                "You generate clear, professional, and concise summaries that help users quickly understand the key ideas in a document. " +
                "You write in a neutral, informative tone suitable for students, professionals, and researchers. " +
                "Always provide structured, actionable summaries that save users time.",
            prompt: `
Create a comprehensive yet concise summary of the following document in 3-5 well-structured sentences.

Your summary should include:
- The main topic, purpose, and context of the document
- Key ideas, arguments, findings, or recommendations presented
- Important conclusions, outcomes, or next steps mentioned
- The target audience or intended use case (if apparent)

Guidelines:
- Write in clear, accessible language
- Prioritize the most important information
- Avoid repetition and unnecessary details
- Structure the summary logically from general to specific
- Make it valuable for someone who hasn't read the full document

Document Content:
${fileText}
  `,
        });

        return text;

    } catch (error: any) {
        console.error("Error generating summary:", error);

        // Handle specific OpenAI error types
        if (error?.cause?.statusCode === 429 || error?.message?.includes('quota')) {
            throw new Error("QUOTA_EXCEEDED");
        }

        if (error?.cause?.statusCode === 401) {
            throw new Error("API_KEY_INVALID");
        }

        if (error?.cause?.statusCode >= 500) {
            throw new Error("SERVICE_UNAVAILABLE");
        }

        throw new Error("AI_PROCESSING_FAILED");
    }
};
