import { prisma } from "../../../../(dashboard)/lib/prisma"; 
import { NextResponse } from "next/server";


export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const numericUserId = parseInt(userId, 10);

  if (isNaN(numericUserId)) {
    return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
  }

  try {
    const thread = await prisma.thread.findFirst({
      where: { userId: numericUserId },
      orderBy: {
        createdAt: 'desc', // Get the most recently created thread
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc', // Messages sorted in chronological order
          },
        },
      },
    });

    return NextResponse.json({ sessionId: thread?.sessionId || null });
  } catch (error) {
    console.error("Error fetching session:", error);
    return NextResponse.json(
      { error: "Failed to fetch sessionId" },
      { status: 500 }
    );
  }
}
