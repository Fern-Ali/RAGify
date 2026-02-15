import { NextResponse } from "next/server";
import { auth } from "../../../auth";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("[MCP API] Request body received:", body);

    const { method, params = {} } = body;

    if (!method) {
      console.error("[MCP API] Missing method in request");
      return new NextResponse(
        JSON.stringify({
          jsonrpc: "2.0",
          error: {
            code: -32600,
            message: "Invalid Request: method is required"
          }
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check authentication
    const session = await auth();
    console.log("[MCP API] Session retrieved:", session);

    if (!session?.user?.id) {
      console.error("[MCP API] Unauthorized request. No valid session.");
      return new NextResponse(
        JSON.stringify({
          jsonrpc: "2.0",
          error: {
            code: -32001,
            message: "Unauthorized: No valid session"
          }
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create JSON-RPC 2.0 request with unique ID
    const jsonRpcRequest = {
      jsonrpc: "2.0",
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      method: method,
      params: params
    };

    console.log("[MCP API] Sending JSON-RPC request to gateway:", jsonRpcRequest);

    // Send to the MCP gateway
    const mcpGatewayUrl = process.env.MCP_GATEWAY_URL || "http://143.198.108.210:8000/mcp";
    const response = await fetch(mcpGatewayUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonRpcRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[MCP API] MCP Gateway error:", response.statusText, errorText);
      throw new Error(`MCP Gateway error: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log("[MCP API] Response from MCP gateway:", data);
    
    // Return the JSON-RPC response
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    console.error("[MCP API] Error:", error);
    return new Response(
      JSON.stringify({ 
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: error.message 
        }
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
