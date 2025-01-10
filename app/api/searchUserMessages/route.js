import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  try {
    const messages = await prisma.message.findMany({
      where: {
        text: {
          contains: query, // Perform a case-insensitive search for the query
          mode: "insensitive",
        },
      },
      include: {
        thread: {
          include: {
            user: true, // Include user details for better context
          },
        },
      },
      orderBy: {
        createdAt: "asc", // Optional: Order messages by creation time
      },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to search messages" },
      { status: 500 }
    );
  }
}
