"use server";

import { db } from "@/db";
import { pdfFilesTable, usersTable } from "@/db/schema";
import { fetchAndExtractPdf } from "@/lib/langchain";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
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
        }).returning();
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

        if (pdfText.data) saveFileToDatabase(pdfFile, pdfText.data);

    } catch (error) {
        console.error("Error generating PDF summary:", error);
        return {
            success: false,
            message: "Failed to generate PDF summary",
            data: null,
        };
    }
};
