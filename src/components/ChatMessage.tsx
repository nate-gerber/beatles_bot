import { Message } from "@/types/chat";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] sm:max-w-[70%] rounded-lg px-4 py-3 border-2 ${
          isUser
            ? "bg-[#1a1a1a] text-[#f5f1e8] border-[#1a1a1a] shadow-[4px_4px_0px_0px_#8b7355]"
            : "bg-[#ffffff] text-[#1a1a1a] border-[#1a1a1a] shadow-[4px_4px_0px_0px_#1a1a1a]"
        }`}
      >
        <p className={`text-sm leading-relaxed whitespace-pre-wrap ${isUser ? "font-medium" : ""}`}>
          {message.content}
        </p>
        <p
          className={`text-xs mt-2 font-mono ${
            isUser ? "text-[#8b7355]" : "text-[#8b7355]"
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

