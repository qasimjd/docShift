"use server";


import { db } from "@/db";
import { eq, desc, and } from "drizzle-orm";
import { pdfFilesTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { getUserId } from "./user.action";


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

export const getFilesById = async (id: string) => {

    const user = await getUserId()

    try {
        const document = await db.query.pdfFilesTable.findFirst({
            where: and(
                eq(pdfFilesTable.id, id),
                eq(pdfFilesTable.userId, user.id)
            ),
        });
        if (!document) {
            throw new Error("File not found");
        }
        return document;
    } catch (error) {
        console.error("Error fetching file by id:", error);
        throw new Error("Failed to fetch file by id");
    }
};