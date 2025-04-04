import {
  BedrockAgentRuntimeClient,
  RetrieveAndGenerateCommand,
} from "@aws-sdk/client-bedrock-agent-runtime";

import { prisma } from "../../(dashboard)/lib/prisma"; 
import { auth } from "../../../auth";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const body = await req.json();
    console.log("[ BEDROCK ] Request body received:", body);

    const { inputText, sessionId } = body;

    if (!inputText) {
      console.error("[ BEDROCK ] Missing inputText or sessionId:", { inputText, sessionId });
      return new NextResponse(
        JSON.stringify({
          error: "[ BEDROCK ] Missing required fields: inputText or sessionId",
        }),
        { status: 400 }
      );
    }

    const session = await auth();
    console.log("[ BEDROCK ] Session retrieved:", session);

    if (!session?.user?.id) {
      console.error("[ BEDROCK ] Unauthorized request. No valid session.");
      return new NextResponse(
        JSON.stringify({ error: "[ BEDROCK ] Unauthorized" }),
        { status: 401 }
      );
    }

    const userId = Number(session.user.id);
    console.log(`[ BEDROCK ] Processing request for userId: ${userId}`);

    const client = new BedrockAgentRuntimeClient({
      region: "us-east-2",
      credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
      },
    });

    // Function to send a command to Bedrock
    const sendBedrockCommand = async (sessionIdOverride) => {
      const input = {
        sessionId: sessionIdOverride,
        input: {
          text: inputText,
        },
        retrieveAndGenerateConfiguration: {
          type: "KNOWLEDGE_BASE",
          knowledgeBaseConfiguration: {
            knowledgeBaseId: "KVHWFXZFZK",
            modelArn:
              "arn:aws:bedrock:us-east-2::foundation-model/meta.llama3-3-70b-instruct-v1:0",
            retrievalConfiguration: {
              vectorSearchConfiguration: {
                numberOfResults: 5,
                overrideSearchType: "SEMANTIC",
              },
            },
          },
        },
      };

      console.log("[ BEDROCK ] Sending request to Bedrock with input:", input);
      const command = new RetrieveAndGenerateCommand(input);
      return client.send(command);
    };

    let response;
    try {
      response = await sendBedrockCommand(sessionId);
    } catch (error) {
      if (
        error.name === "ValidationException" &&
        error.message.includes("Session with Id")
      ) {
        console.warn(
          "[ BEDROCK ] Invalid session detected, retrying with sessionId = null"
        );
        response = await sendBedrockCommand(null);
      } else {
        throw error;
      }
    }

    console.log("[ BEDROCK ] Response received from Bedrock:", response);

    const newSessionId = response.sessionId;
    const bedrockResponse = response.output?.text;

    try {
      console.log("[ BEDROCK ] Sending data to update session:", {
        userId: session?.user?.id,
        inputText: inputText,
        sessionId: newSessionId,
        bedrockResponse,
        metadata: response,
      });

      const updateRes = await fetch(
        `${process.env.NEXTAUTH_URL}/api/update-session-id`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session?.user?.id,
            inputText: inputText,
            sessionId: newSessionId,
            bedrockResponse,
            metadata: response,
          }),
        }
      );

      if (!updateRes.ok) {
        const errorData = await updateRes.json();
        console.error("[ BEDROCK ] Error response from API:", errorData);
        throw new Error(
          "[ BEDROCK ] Failed to update sessionId in the database"
        );
      }

      const databaseOperation = await updateRes.json();
      console.log("[ BEDROCK ] Database operation response:", databaseOperation);
    } catch (err) {
      console.error("[ BEDROCK ] Error during session update:", err);
    }

    return new Response(
      JSON.stringify({ ...response, updatedSessionId: newSessionId }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("[ BEDROCK ] Error querying Bedrock:", error.message);
    console.error("[ BEDROCK ] Full error details:", error);
    return new Response(
      JSON.stringify({
        error: "[ BEDROCK ] Failed to query Bedrock",
        details: error.message || error,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

    
    // // Compare the new sessionId with the current one in the database
    // const userThread = await prisma.thread.findFirst({
    //   where: { userId },
    // });

    // if (userThread) {
    //   console.log(
    //     `[ BEDROCK ] Existing thread found for user ${userId}:`,
    //     userThread
    //   );

    //   if (userThread.sessionId !== newSessionId) {
    //     console.log(
    //       `[ BEDROCK ] Updating sessionId for user ${userId}: ${newSessionId}`
    //     );
    //     await prisma.thread.update({
    //       where: { id: userThread.id },
    //       data: { sessionId: newSessionId },
    //     });
    //   }
    // } else {
    //   console.log(`[ BEDROCK ] No existing thread found for user ${userId}.`);
    // }

    // Return the updated response to the client
 