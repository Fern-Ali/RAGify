import { NextResponse } from "next/server";

const MCP_GATEWAY_URL = "http://143.198.108.210:8000/mcp";

// GET - List available tools
export async function GET(req) {
  try {
    // Call MCP gateway to list tools
    const response = await fetch(`${MCP_GATEWAY_URL}/list_tools`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error(`MCP Gateway responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json({
      tools: data.tools || [],
      success: true,
    });
  } catch (error) {
    console.error("[MCP] Error listing tools:", error);
    return NextResponse.json(
      {
        error: "Failed to list tools",
        details: error.message,
        tools: [],
      },
      { status: 500 }
    );
  }
}

// POST - Execute tool calls and handle chat messages
export async function POST(req) {
  try {
    const body = await req.json();
    const { action, message, history, toolName, parameters } = body;

    if (action === "chat") {
      // Handle chat message with potential tool calls
      const response = await fetch(`${MCP_GATEWAY_URL}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          history: history || [],
        }),
      });

      if (!response.ok) {
        throw new Error(`MCP Gateway responded with status: ${response.status}`);
      }

      const data = await response.json();

      return NextResponse.json({
        response: data.response || data.content || "No response received",
        toolCalls: data.toolCalls || [],
        success: true,
      });
    } else if (action === "executeTool") {
      // Execute a specific tool
      if (!toolName) {
        return NextResponse.json(
          { error: "Missing toolName" },
          { status: 400 }
        );
      }

      const response = await fetch(`${MCP_GATEWAY_URL}/call_tool`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: toolName,
          arguments: parameters || {},
        }),
      });

      if (!response.ok) {
        throw new Error(`MCP Gateway responded with status: ${response.status}`);
      }

      const data = await response.json();

      return NextResponse.json({
        result: data.content || data.result || data,
        toolName,
        success: true,
      });
    } else {
      return NextResponse.json(
        { error: "Invalid action. Must be 'chat' or 'executeTool'" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("[MCP] Error:", error);
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
