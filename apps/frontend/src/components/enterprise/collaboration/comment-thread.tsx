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
    <div className="flex flex-col w-full max-w-3xl rounded-xl border border-border-default bg-surface-base">
      <div className="p-4 border-b border-border-subtle flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-neutral-400" />
        <h3 className="font-heading font-semibold text-neutral-0">Discussion</h3>
      </div>

      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar max-h-[500px] flex flex-col gap-6">
        <AnimatePresence>
          {comments.map((comment, i) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 text-xs font-semibold text-white mt-1">
                {comment.author.avatarInitials}
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-neutral-200">{comment.author.name}</span>
                  <span className="text-xs text-neutral-500">{comment.timestamp}</span>
                </div>
                <div className="text-sm text-neutral-300 bg-surface-ground p-3 rounded-lg rounded-tl-none border border-border-subtle">
                  {comment.content}
                </div>
                <div className="flex gap-3 mt-1">
                  <button className="text-xs text-neutral-500 hover:text-indigo-400 transition-colors">Reply</button>
                  <button className="text-xs text-neutral-500 hover:text-indigo-400 transition-colors">React</button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t border-border-subtle bg-surface-ground/50">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <textarea 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Write a comment... (Type @ to mention)"
              className="w-full resize-none rounded-lg border border-border-default bg-surface-base py-3 pl-4 pr-12 text-sm text-neutral-0 outline-none transition-colors focus:border-indigo-500 min-h-[44px] max-h-32 custom-scrollbar"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="absolute right-2 top-2 flex gap-1">
              <button type="button" className="p-1.5 text-neutral-400 hover:text-neutral-0 hover:bg-surface-raised rounded-md transition-colors">
                <Smile className="w-4 h-4" />
              </button>
              <button type="button" className="p-1.5 text-neutral-400 hover:text-neutral-0 hover:bg-surface-raised rounded-md transition-colors">
                <Paperclip className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button 
            type="submit"
            disabled={!inputValue.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white transition-all hover:bg-indigo-600 disabled:opacity-50 disabled:hover:bg-indigo-500"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
