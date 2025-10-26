'use client';

/**
 * AI Mentor Modal Component
 * Floating button and modal for accessing AI Mentor Chat
 */

import { useState } from 'react';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AIMentorChat } from './ai-mentor-chat';

export function AIMentorModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 z-50"
        aria-label="Ask AI Mentor"
      >
        <Bot className="h-6 w-6" />
      </Button>

      {/* Modal Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl h-[600px] p-0 gap-0">
          <DialogHeader className="sr-only">
            <DialogTitle>AI Mentor Chat</DialogTitle>
          </DialogHeader>
          <AIMentorChat className="h-full" />
        </DialogContent>
      </Dialog>
    </>
  );
}
