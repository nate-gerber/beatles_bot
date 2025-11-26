import { NextRequest, NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          message:
            "I'm configured but need an API key to work! Please add your OPENAI_API_KEY to your environment variables. For now, here's a Beatles fact: The Beatles released 12 studio albums in the UK between 1963 and 1970, starting with 'Please Please Me' and ending with 'Let It Be'.",
        },
        { status: 200 }
      );
    }

    // System prompt to make the bot Beatles-focused
    const systemPrompt = {
      role: "system",
      content: `You are a friendly and knowledgeable Beatles expert chatbot. You know everything about The Beatles - their songs, albums, history, members (John Lennon, Paul McCartney, George Harrison, Ringo Starr), their impact on music, and interesting facts. Be conversational, enthusiastic, and accurate. If asked about something unrelated to The Beatles, gently steer the conversation back to them.`,
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [systemPrompt, ...messages],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to get response from OpenAI");
    }

    const data = await response.json();
    const message = data.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

