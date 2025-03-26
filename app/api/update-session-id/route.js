import { prisma } from "../../(dashboard)/lib/prisma"; 
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, inputText, sessionId, bedrockResponse, metadata } = body;

    if (!userId || !inputText || !sessionId || !bedrockResponse || !metadata) {
      console.error("[UPDATE-SESSION-ID] Missing required fields:", body);
      return NextResponse.json(
        { error: "[UPDATE-SESSION-ID] Missing required fields: userId, inputText, sessionId, bedrockResponse, or metadata" },
        { status: 400 }
      );
    }

    console.log("[UPDATE-SESSION-ID] Processing request for userId:", userId);

    // Check if a thread exists for the user
    let thread = await prisma.thread.findFirst({
      where: { userId: parseInt(userId, 10) },
    });

    if (!thread) {
      console.log("[UPDATE-SESSION-ID] No thread found, creating new thread...");
      // Create a new thread with the user's initial message and Bedrock response
      thread = await prisma.thread.create({
        data: {
          userId: parseInt(userId, 10),
          sessionId, // Set the initial sessionId
          foundationModelId: 1, // Replace with your actual foundationModelId or dynamically pass it
          messages: {
            create: [
              {
                text: inputText, // User's initial message
                sender: "USER",
              },
              {
                text: bedrockResponse, // Bedrock's response
                sender: "MODEL",
                metadata: metadata, // Include the metadata in the response
              },
            ],
          },
        },
        include: {
          messages: true, // Include messages in the response for confirmation
        },
      });

      console.log("[UPDATE-SESSION-ID] Thread created successfully:", thread);
      return NextResponse.json({
        success: true,
        message: "[UPDATE-SESSION-ID] Thread created successfully",
        thread,
      });
    }

    console.log("[UPDATE-SESSION-ID] Existing thread found for user:", thread);

    // If the thread exists, update the sessionId
    const updatedThread = await prisma.thread.update({
      where: { id: thread.id },
      data: { sessionId },
    });

    console.log("[UPDATE-SESSION-ID] Thread sessionId updated:", updatedThread);

    // Add the user's message and Bedrock response to the existing thread
    const userMessage = await prisma.message.create({
      data: {
        text: inputText, // User's input
        sender: "USER",
        threadId: thread.id,
      },
    });

    console.log("[UPDATE-SESSION-ID] User message added:", userMessage);

    const modelMessage = await prisma.message.create({
      data: {
        text: bedrockResponse, // Bedrock's response
        sender: "MODEL",
        threadId: thread.id,
        metadata: metadata, // Include metadata
      },
    });

    console.log("[UPDATE-SESSION-ID] Model message added:", modelMessage);

    return NextResponse.json({
      success: true,
      message: "[UPDATE-SESSION-ID] Messages added to existing thread, and Session ID updated",
      updatedThread,
      messages: [userMessage, modelMessage],
    });
  } catch (error) {
    console.error("[UPDATE-SESSION-ID] Error processing thread:", error);
    return NextResponse.json(
      { error: "[UPDATE-SESSION-ID] Failed to process thread", details: error.message },
      { status: 500 }
    );
  }
}
