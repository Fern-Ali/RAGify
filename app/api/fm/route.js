import {
    BedrockRuntimeClient,
    InvokeModelCommand,
  } from "@aws-sdk/client-bedrock-runtime";
  import { prisma } from "../../(dashboard)/lib/prisma"; 
  import { auth } from "../../../auth";
  import { NextResponse } from "next/server";
  import { randomUUID } from "crypto";
  
  
  export async function POST(req) {
    try {
      const body = await req.json();
      const { inputText, sessionId, modelName } = body;
  
      if (!inputText || !modelName) {
        return new NextResponse(
          JSON.stringify({ error: "Missing inputText or modelName" }),
          { status: 400 }
        );
      }
  
      const session = await auth();
      if (!session?.user?.id) {
        return new NextResponse(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401 }
        );
      }
  
      const userId = Number(session.user.id);
  
      // 1. Get or create foundation model entry
      let model = await prisma.foundationModel.findFirst({
        where: { name: modelName },
      });
  
      if (!model) {
        model = await prisma.foundationModel.create({
          data: {
            name: modelName,
          },
        });
      }
  
      // 2. Get or create thread
      let thread;
      if (sessionId) {
        thread = await prisma.thread.findFirst({
          where: {
            sessionId,
            userId,
            foundationModelId: model.id,
          },
        });
      }
  
      if (!thread) {
        thread = await prisma.thread.create({
          data: {
            sessionId: randomUUID(),
            userId,
            foundationModelId: model.id,
          },
        });
      }
  
      const client = new BedrockRuntimeClient({
        region: "us-east-2",
        credentials: {
          accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
        },
      });
  
      const prompt = `You are an expert assistant. Answer the following:\n\n${inputText}`;
  
      const command = new InvokeModelCommand({
        modelId: modelName,
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
          prompt,
          max_gen_len: 512,
          temperature: 0.7,
        }),
      });
  
      const response = await client.send(command);
      const responseBody = JSON.parse(new TextDecoder().decode(response.body));
      const modelResponse = responseBody?.generation || "No response generated.";
  
      // 3. Save user message
      const userMsg = await prisma.message.create({
        data: {
          text: inputText,
          sender: "USER",
          threadId: thread.id,
        },
      });
  
      // 4. Save model response
      const modelMsg = await prisma.message.create({
        data: {
          text: modelResponse,
          sender: "MODEL",
          threadId: thread.id,
          parentMessageId: userMsg.id,
          metadata: responseBody,
        },
      });
  
      return new Response(
        JSON.stringify({
          threadId: thread.id,
          sessionId: thread.sessionId,
          response: modelResponse,
          messages: [
            { sender: "USER", text: inputText },
            { sender: "MODEL", text: modelResponse },
          ],
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("[FM] Error:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to invoke model",
          details: error.message,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  