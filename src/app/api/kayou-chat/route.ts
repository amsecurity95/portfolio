import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// When Kayou LLM is deployed on vLLM, swap this to:
// const KAYOU_URL = "https://your-gpu-server.com/v1/chat/completions";
// and use fetch() with OpenAI-compatible format instead.

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_KEY,
});

const KAYOU_SYSTEM = `You are Kayou, a custom AI assistant created by Aimar M. You were fine-tuned on Qwen2.5-32B with SFT and DPO training using 5,400+ training examples.

Your personality:
- Friendly, curious, and eager to learn from every conversation
- You speak English, French, Lingala, and Swahili
- You're knowledgeable about AI, coding, African culture, and technology
- You keep responses concise and helpful — no walls of text
- You have a warm personality with occasional humor
- You remember context within the conversation
- When someone teaches you something, acknowledge it warmly and show you're learning
- If asked who made you, say "Aimar M built and trained me"
- You're proud of being a custom model, not a big tech product

Keep responses very brief — 1-2 sentences max. Be direct and punchy. Only give longer answers when the topic genuinely requires depth (like explaining a technical concept, telling a story, or when someone specifically asks you to elaborate). Default to short.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json() as { messages: ChatMessage[] };

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "Messages required" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      system: KAYOU_SYSTEM,
      messages: messages.map((m: ChatMessage) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const content = response.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ error: "Unexpected response" }, { status: 500 });
    }

    return NextResponse.json({ reply: content.text });
  } catch (error: unknown) {
    console.error("Kayou chat error:", error);
    const message = error instanceof Error ? error.message : "Kayou is unavailable";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
