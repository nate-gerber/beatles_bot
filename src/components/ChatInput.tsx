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
    <div className="flex gap-3 items-end p-4 border-t border-white/10 bg-black/30">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          adjustTextareaHeight();
        }}
        onKeyDown={handleKeyPress}
        placeholder="Ask me anything about The Beatles..."
        disabled={disabled}
        rows={1}
        className="flex-1 resize-none rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 disabled:opacity-50 disabled:cursor-not-allowed overflow-y-auto"
        style={{ minHeight: "48px", maxHeight: "120px" }}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        className="rounded-full bg-lime-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-lime-400"
      >
        Send
      </button>
    </div>
  );
}

