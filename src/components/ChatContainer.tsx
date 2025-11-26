"use client";

import { useState, useRef, useEffect } from "react";
import { Message } from "@/types/chat";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your Revolver-era Beatles Bot. Released in 1966, Revolver was a groundbreaking album that marked The Beatles' transition into more experimental and psychedelic music. Ask me anything about Revolver, The Beatles' other albums, their history, or the band members!",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ id, role, content }) => ({
            role,
            content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: error instanceof Error 
          ? `Sorry, I encountered an error: ${error.message}. Please make sure your API key is configured.`
          : "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] sm:h-[700px] rounded-lg border-2 border-[#1a1a1a] bg-[#ffffff] shadow-[8px_8px_0px_0px_#1a1a1a] overflow-hidden">
      {/* Header bar with Revolver styling */}
      <div className="bg-[#1a1a1a] text-[#f5f1e8] px-6 py-3 border-b-2 border-[#1a1a1a]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#8b7355]"></div>
            <div className="w-3 h-3 rounded-full bg-[#8b7355] opacity-60"></div>
            <div className="w-3 h-3 rounded-full bg-[#8b7355] opacity-40"></div>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xs uppercase tracking-widest font-bold">Revolver Chat</p>
          </div>
          <div className="w-12"></div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#faf9f6]">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#1a1a1a] text-[#f5f1e8] rounded-lg px-4 py-3 border-2 border-[#1a1a1a]">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-[#f5f1e8] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-2 h-2 bg-[#f5f1e8] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-2 h-2 bg-[#f5f1e8] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}

