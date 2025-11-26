"use client";

import { useState, KeyboardEvent, useRef, useEffect } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-3 items-end p-4 border-t-2 border-[#1a1a1a] bg-[#ffffff]">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          adjustTextareaHeight();
        }}
        onKeyDown={handleKeyPress}
        placeholder="Ask about Revolver, The Beatles, or anything..."
        disabled={disabled}
        rows={1}
        className="flex-1 resize-none rounded-lg bg-[#faf9f6] border-2 border-[#1a1a1a] px-4 py-3 text-[#1a1a1a] placeholder:text-[#8b7355] focus:outline-none focus:border-[#8b7355] focus:shadow-[0_0_0_2px_#8b7355] disabled:opacity-50 disabled:cursor-not-allowed overflow-y-auto font-medium"
        style={{ minHeight: "48px", maxHeight: "120px" }}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        className="rounded-lg bg-[#1a1a1a] px-6 py-3 text-sm font-bold text-[#f5f1e8] border-2 border-[#1a1a1a] shadow-[4px_4px_0px_0px_#8b7355] transition-all hover:shadow-[2px_2px_0px_0px_#8b7355] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[4px_4px_0px_0px_#8b7355] disabled:hover:translate-x-0 disabled:hover:translate-y-0 uppercase tracking-wide"
      >
        Send
      </button>
    </div>
  );
}

