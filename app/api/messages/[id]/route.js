import { prisma } from "@/app/(dashboard)/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const session = await auth();
  console.log("Received DELETE request with params:", params); // 👀
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  params = await params
  const messageId = Number(params.id);

  try {
    // Only delete if the message belongs to the user
    const message = await prisma.message.findUnique({
      where: { id: messageId },
      include: { thread: true },
    });
    console.log(message)
    if (!message || message.sender !== "USER" || message.thread.userId !== Number(session.user.id)) {
      return NextResponse.json({ error: "Unauthorized or message not found" }, { status: 403 });
    }

    await prisma.message.delete({
      where: { id: messageId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
