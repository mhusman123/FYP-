'use client';

/**
 * AI Mentor Modal Component
 * Floating button and modal for accessing AI Mentor Chat
 */

import { useState } from 'react';
import Link from 'next/link';
import { Bot, Brain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AIMentorChat } from './ai-mentor-chat';

export function AIMentorModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Opposite Floating Button (Bottom-Left): Socratic AI 1-on-1 Tutor */}
      <Link
        href="/ai-tutor"
        className="fixed bottom-6 left-6 h-13 px-4 rounded-full shadow-xl bg-gradient-to-r from-cyan-700 via-indigo-700 to-blue-700 hover:from-cyan-600 hover:to-blue-600 text-white font-bold text-xs flex items-center gap-2.5 z-40 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-cyan-400/30 backdrop-blur-md"
        aria-label="Socratic AI Tutor"
      >
        <Brain className="h-5 w-5 text-cyan-200" />
        <span className="hidden sm:inline font-semibold">Socratic AI Tutor</span>
      </Link>

      {/* Floating Action Button (Bottom-Right): AI Assistant Chat */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 z-50 transition-all duration-300 hover:scale-110 hover:shadow-xl animate-pulse cursor-pointer"
        aria-label="Ask AI Mentor"
      >
        <Bot className="h-6 w-6 animate-bounce" />
      </Button>

      {/* Modal Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl h-[620px] p-0 gap-0 animate-slide-up overflow-hidden flex flex-col">
          <div className="bg-[#17143A] px-4 py-2.5 border-b border-indigo-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-cyan-400" />
              <span className="text-xs sm:text-sm font-bold text-white">SST AI Pedagogical Assistant</span>
            </div>
            <div className="flex items-center gap-2 pr-6">
              <Button asChild size="sm" variant="ghost" className="h-7 text-[11px] font-semibold text-cyan-300 hover:text-white hover:bg-white/10 px-2 rounded-lg" onClick={() => setIsOpen(false)}>
                <a href="/ai-hub">
                  AI Hub ↗
                </a>
              </Button>
              <Button asChild size="sm" variant="ghost" className="h-7 text-[11px] font-semibold text-amber-300 hover:text-white hover:bg-white/10 px-2 rounded-lg" onClick={() => setIsOpen(false)}>
                <a href="/quiz-generator">
                  Quiz Arena ↗
                </a>
              </Button>
            </div>
          </div>
          <DialogHeader className="sr-only">
            <DialogTitle>AI Mentor Chat</DialogTitle>
          </DialogHeader>
          <AIMentorChat className="flex-1" />
        </DialogContent>
      </Dialog>
    </>
  );
}
