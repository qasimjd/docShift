"use server";

import { db } from "@/db";
import { pdfFilesTable, usersTable } from "@/db/schema";
import { fetchAndExtractPdf } from "@/lib/langchain";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { generateSummaryWithGemini } from "./gemini.action";
interface PDFFile {
    uploadedBy: string;
    fileUrl: string;
    fileName: string;
    fileSize: number;
    fileKey: string;
}

export const saveFileToDatabase = async (pdfFile: PDFFile, pdfText: string) => {
    if (!pdfFile || !pdfFile.fileUrl) {
        console.error("Invalid PDF file data:", pdfFile);
        return;
    }

    let existingFile = await db.query.pdfFilesTable.findFirst({
        where: eq(pdfFilesTable.fileUrl, pdfFile.fileUrl),
    });

    if (existingFile) {
        await db.update(pdfFilesTable)
            .set({ updatedAt: new Date() })
            .where(eq(pdfFilesTable.id, existingFile.id));
        existingFile = await db.query.pdfFilesTable.findFirst({
            where: eq(pdfFilesTable.fileUrl, pdfFile.fileUrl),
        });
        revalidatePath("/dashboard");
        return existingFile;
    }
    if (existingFile) return existingFile;

    if (!pdfFile.uploadedBy)
        throw new Error("PDF file must have an uploadedBy field");

    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.clerkId, pdfFile.uploadedBy),
    });

    if (!user) {
        throw new Error(`User not found with Clerk ID: ${pdfFile.uploadedBy}`);
    }

    try {
        const newFile = await db.insert(pdfFilesTable).values({
            userId: user.id,
            title: pdfFile.fileName,
            fileUrl: pdfFile.fileUrl,
            summary: null,
            hasSummary: false,
            fileData: pdfText,
            fileSize: pdfFile.fileSize,
        }).returning();

        revalidatePath("/dashboard");
        return newFile[0];
    } catch (error) {
        console.error("Error saving PDF file to database:", error);
    }
}


export const generatePDFSummary = async (pdfFile: PDFFile) => {

    if (!pdfFile || !pdfFile.fileUrl) {
        return {
            success: false,
            message: "Invalid PDF file data",
            data: null,
        };
    };

    try {
        const pdfText = await fetchAndExtractPdf(pdfFile.fileUrl);
        if (!pdfText || !pdfText.data) {
            return {
                success: false,
                message: "Failed to extract text from PDF",
                data: null,
            };
        }

        const savedFile = await saveFileToDatabase(pdfFile, pdfText.data);

        try {
            const summary = await generateSummaryWithGemini(pdfText.data);

            if (!summary || summary.length === 0) {
                return {
                    success: false,
                    message: "Failed to generate summary but file was saved successfully. You can try regenerating the summary later.",
                    data: { savedFile },
                };
            }

            // Update the saved file with summary
            if (savedFile && summary) {
                await db.update(pdfFilesTable).set({
                    summary,
                    hasSummary: true,
                    updatedAt: new Date()
                }).where(eq(pdfFilesTable.id, savedFile.id));
            }

            return {
                success: true,
                message: "PDF summary generated successfully",
                data: {
                    summary,
                    savedFile: { ...savedFile, summary, hasSummary: true }
                },
            };

        } catch (summaryError: any) {
            // File is already saved, just return it without summary
            console.error("Summary generation failed, but file was saved:", summaryError);

            const errorMessage = summaryError?.message;
            let userMessage = "File uploaded successfully, but summary generation failed.";

            if (errorMessage === "QUOTA_EXCEEDED") {
                userMessage = "File uploaded successfully, but AI quota exceeded. You can regenerate the summary later.";
            } else if (errorMessage === "SERVICE_UNAVAILABLE") {
                userMessage = "File uploaded successfully, but AI service is temporarily unavailable. You can regenerate the summary later.";
            }

            return {
                success: true,
                message: userMessage,
                data: { savedFile, summary: null },
            };
        }

    } catch (error: any) {
        console.error("Error generating PDF summary:", error);

        // Handle specific error types with user-friendly messages
        const errorMessage = error?.message;

        if (errorMessage === "QUOTA_EXCEEDED") {
            return {
                success: false,
                message: "AI service quota exceeded. Please try again later or contact support.",
                data: null,
            };
        }

        if (errorMessage === "API_KEY_INVALID") {
            return {
                success: false,
                message: "AI service configuration error. Please contact support.",
                data: null,
            };
        }

        if (errorMessage === "SERVICE_UNAVAILABLE") {
            return {
                success: false,
                message: "AI service is temporarily unavailable. Please try again in a few minutes.",
                data: null,
            };
        }

        if (errorMessage === "AI_PROCESSING_FAILED") {
            return {
                success: false,
                message: "Failed to process document with AI. Please try again later.",
                data: null,
            };
        }

        return {
            success: false,
            message: "Failed to generate PDF summary. Please try again later.",
            data: null,
        };
    }
};
