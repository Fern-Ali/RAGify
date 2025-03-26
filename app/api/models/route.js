// /app/api/models/route.js
import {
    BedrockClient,
    ListFoundationModelsCommand,
  } from "@aws-sdk/client-bedrock";
  import { NextResponse } from "next/server";
  
  export async function GET() {
    try {
      const client = new BedrockClient({
        region: "us-east-2",
        credentials: {
          accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
        },
      });
  
      const command = new ListFoundationModelsCommand({});
      const response = await client.send(command);
      console.log(response.modelSummaries)
      return NextResponse.json(response.modelSummaries);
    } catch (error) {
      console.error("[ListFoundationModels] Error:", error);
      return NextResponse.json(
        { error: "Failed to fetch foundation models", details: error.message },
        { status: 500 }
      );
    }
  }