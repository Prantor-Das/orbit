import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { users } from "@/db/schema";
import { db } from "@/db";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if(!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const defaultImage = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
            session.user.name || session.user.email,
        )}`;
        const result = await db.insert(users).values({
            email: session?.user?.email,
            name: session?.user?.name,
            image: session?.user?.image || defaultImage,
        }).onConflictDoNothing({
            target: users.email,
        }).returning();

        if(!result || result.length === 0) {
            return NextResponse.json({ error: "User already exists" }, { status: 200 });
        }

        return NextResponse.json({ message: "User created successfully", user: result }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
