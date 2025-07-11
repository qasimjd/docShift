"use server";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

interface User {
    clerkId: string;
    email: string;
    fullName: string;
    username?: string;
    photo?: string;
}

export async function createUser(user: User) {

    const existingUser = await db.query.usersTable.findFirst({
        where: eq(usersTable.email, user.email),
    });
    if (existingUser) return existingUser;

    const [newUser] = await db.insert(usersTable).values({
        clerkId: user.clerkId,
        email: user.email,
        fullName: user.fullName,
        imageUrl: user.photo || "",
    }).returning();
    return newUser;
}

export async function updateUser(clerkId: string, user: User) {
    const [updatedUser] = await db.update(usersTable)
        .set({
            fullName: user.fullName,
            email: user.email,
            imageUrl: user.photo,
            updatedAt: sql`now()`,
        })
        .where(eq(usersTable.clerkId, clerkId))
        .returning();
    return updatedUser;
}

export async function deleteUser(clerkId: string) {
    const [deletedUser] = await db.delete(usersTable)
        .where(eq(usersTable.clerkId, clerkId))
        .returning();
    return deletedUser;
}