import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate incoming payload
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const rawMessage = body?.message;
    if (typeof rawMessage !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string." },
        { status: 400 }
      );
    }

    const trimmedMessage = rawMessage.trim();
    if (!trimmedMessage) {
      return NextResponse.json(
        { error: "Message cannot be empty." },
        { status: 400 }
      );
    }

    if (trimmedMessage.length > 4000) {
      return NextResponse.json(
        { error: "Message exceeds the 4000 character limit." },
        { status: 400 }
      );
    }

    // Reuse provided sessionId or generate a new UUID
    const sessionId =
      typeof body?.sessionId === "string" && body.sessionId.trim()
        ? body.sessionId.trim()
        : crypto.randomUUID();

    const pageUrl = typeof body?.pageUrl === "string" ? body.pageUrl : "";

    // 2. Validate environment variables
    const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("Chat API Error: N8N_CHAT_WEBHOOK_URL environment variable is missing.");
      return NextResponse.json(
        { error: "Chatbot service is not configured on the server." },
        { status: 500 }
      );
    }

    // 3. Prepare headers and payload for n8n
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const authToken = process.env.N8N_CHAT_AUTH_TOKEN;
    if (authToken) {
      headers["X-Prime-Token"] = authToken;
    }

    const n8nPayload = {
      chatInput: trimmedMessage,
      sessionId,
      pageUrl,
    };

    // 4. Send secure request to n8n webhook
    let n8nResponse: Response;
    try {
      n8nResponse = await fetch(webhookUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(n8nPayload),
      });
    } catch (networkError: any) {
      console.error("Chat API Error: Failed to reach n8n webhook:", networkError.message);
      return NextResponse.json(
        { error: "AI assistant service is currently unavailable. Please try again in a moment." },
        { status: 502 }
      );
    }

    if (!n8nResponse.ok) {
      console.error(
        `Chat API Error: n8n webhook returned HTTP ${n8nResponse.status} ${n8nResponse.statusText}`
      );
      return NextResponse.json(
        { error: "AI assistant service is currently unavailable. Please try again in a moment." },
        { status: 502 }
      );
    }

    // 5. Parse n8n response and extract reply
    let responseData: any;
    try {
      responseData = await n8nResponse.json();
    } catch (jsonErr) {
      console.error("Chat API Error: Failed to parse n8n response as JSON");
      return NextResponse.json(
        { error: "Invalid response format from AI assistant service." },
        { status: 502 }
      );
    }

    // Handle array or object responses from n8n
    let dataObj = responseData;
    if (Array.isArray(responseData) && responseData.length > 0) {
      dataObj = responseData[0];
    }

    const replyText =
      dataObj?.reply ||
      dataObj?.output ||
      dataObj?.text ||
      dataObj?.message ||
      (typeof dataObj === "string" ? dataObj : "Thank you for reaching out. How else can I assist you?");

    const returnedSessionId =
      typeof dataObj?.sessionId === "string" && dataObj.sessionId.trim()
        ? dataObj.sessionId.trim()
        : sessionId;

    return NextResponse.json({
      reply: replyText,
      sessionId: returnedSessionId,
    });
  } catch (error: any) {
    console.error("Chat API Error (Unexpected):", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
