"use client";
import React, { useState, useRef, useEffect } from "react";
import CanvasScene from "@/components/CanvasScene";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, input.trim()]);
    setInput("");
  };
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="flex h-screen">
      {/* Chat panel */}
      <div className="w-1/2 flex items-center justify-center bg-gray-900">
        <div className="w-4/5 h-4/5 bg-gray-800 rounded-xl shadow-lg flex flex-col">
          <main className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className="self-start bg-gray-800 text-white px-3 py-2 rounded-md">
                {msg}
              </div>
            ))}
            <div ref={endRef} />
          </main>
          <div className="p-4 flex gap-2 border-t border-gray-700">
            <Input
              placeholder="Type a message..."
              className="flex-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <Button onClick={send}>Send</Button>
          </div>
        </div>
      </div>
      {/* Solar system panel */}
      <div className="w-1/2 relative">
        <CanvasScene />
      </div>
    </div>
  );
}
