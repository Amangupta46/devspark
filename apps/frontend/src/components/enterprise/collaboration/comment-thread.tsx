"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Paperclip, Send, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

interface Comment {
  id: string;
  author: {
    name: string;
    avatarInitials: string;
  };
  content: string;
  timestamp: string;
  replies?: Comment[];
}

interface CommentThreadProps {
  comments: Comment[];
  onSubmit: (content: string) => void;
}

export function CommentThread({ comments, onSubmit }: CommentThreadProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="border-border-default bg-surface-base flex w-full max-w-3xl flex-col rounded-xl border">
      <div className="border-border-subtle flex items-center gap-2 border-b p-4">
        <MessageSquare className="h-5 w-5 text-neutral-400" />
        <h3 className="font-heading text-neutral-0 font-semibold">Discussion</h3>
      </div>

      <div className="custom-scrollbar flex max-h-[500px] flex-1 flex-col gap-6 overflow-y-auto p-4">
        <AnimatePresence>
          {comments.map((comment, i) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-3"
            >
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 text-xs font-semibold text-white">
                {comment.author.avatarInitials}
              </div>
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-neutral-200">
                    {comment.author.name}
                  </span>
                  <span className="text-xs text-neutral-500">{comment.timestamp}</span>
                </div>
                <div className="bg-surface-ground border-border-subtle rounded-lg rounded-tl-none border p-3 text-sm text-neutral-300">
                  {comment.content}
                </div>
                <div className="mt-1 flex gap-3">
                  <button className="text-xs text-neutral-500 transition-colors hover:text-indigo-400">
                    Reply
                  </button>
                  <button className="text-xs text-neutral-500 transition-colors hover:text-indigo-400">
                    React
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="border-border-subtle bg-surface-ground/50 border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Write a comment... (Type @ to mention)"
              className="border-border-default bg-surface-base text-neutral-0 custom-scrollbar max-h-32 min-h-[44px] w-full resize-none rounded-lg border py-3 pr-12 pl-4 text-sm transition-colors outline-none focus:border-indigo-500"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="absolute top-2 right-2 flex gap-1">
              <button
                type="button"
                className="hover:text-neutral-0 hover:bg-surface-raised rounded-md p-1.5 text-neutral-400 transition-colors"
              >
                <Smile className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="hover:text-neutral-0 hover:bg-surface-raised rounded-md p-1.5 text-neutral-400 transition-colors"
              >
                <Paperclip className="h-4 w-4" />
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white transition-all hover:bg-indigo-600 disabled:opacity-50 disabled:hover:bg-indigo-500"
          >
            <Send className="ml-0.5 h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
