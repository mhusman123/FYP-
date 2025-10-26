'use client';

/**
 * AI Mentor Chat Component
 * Provides bilingual (English + Urdu) study assistance
 */

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Loader2, Globe } from 'lucide-react';

interface Message {
  id: string;
  prompt?: string;
  reply?: string;
  language: string;
  timestamp: Date;
  isUser?: boolean;
  content?: string;
}

interface AIMentorChatProps {
  className?: string;
}

export function AIMentorChat({ className }: AIMentorChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ur'>('en');
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load chat history on mount
  useEffect(() => {
    loadChatHistory();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChatHistory = async () => {
    try {
      const response = await fetch('/api/ai/chat?limit=50');
      if (response.ok) {
        const data = await response.json();
        const formattedMessages: Message[] = [];
        
        // Format chat history into message pairs
        data.history.forEach((chat: Message) => {
          formattedMessages.push({
            id: `${chat.id}-prompt`,
            content: chat.prompt,
            isUser: true,
            language: chat.language,
            timestamp: new Date(chat.timestamp),
          });
          formattedMessages.push({
            id: `${chat.id}-reply`,
            content: chat.reply,
            isUser: false,
            language: chat.language,
            timestamp: new Date(chat.timestamp),
          });
        });
        
        setMessages(formattedMessages.reverse());
      }
    } catch (err) {
      console.error('Failed to load chat history:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      isUser: true,
      language: selectedLanguage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: input,
          language: selectedLanguage,
          translateResponse: selectedLanguage === 'ur',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to get response');
      }

      // Simulate typing animation
      setTimeout(() => {
        setIsTyping(false);
        
        const aiMessage: Message = {
          id: data.conversationId || `ai-${Date.now()}`,
          content: data.message,
          isUser: false,
          language: data.language,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
      }, 1000);

    } catch (err) {
      setIsTyping(false);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      
      // Add error message to chat
      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        content: `❌ ${errorMessage}`,
        isUser: false,
        language: 'en',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const formEvent = new Event('submit', { bubbles: true, cancelable: true }) as unknown as React.FormEvent;
      handleSubmit(formEvent);
    }
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold">AI Wrapper Mentor</h2>
            <p className="text-xs text-muted-foreground">Chat Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <div className="flex gap-1">
            <Button
              variant={selectedLanguage === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedLanguage('en')}
            >
              EN
            </Button>
            <Button
              variant={selectedLanguage === 'ur' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedLanguage('ur')}
            >
              UR
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Bot className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {selectedLanguage === 'ur' 
                ? 'AI سرپرست میں خوش آمدید'
                : 'Welcome to AI Mentor'}
            </h3>
            <p className="text-muted-foreground max-w-md">
              {selectedLanguage === 'ur'
                ? 'اپنے مطالعے میں مدد کے لیے کوئی سوال پوچھیں'
                : 'Ask any question to get help with your studies'}
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            {!message.isUser && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Bot className="w-5 h-5 text-blue-600" />
              </div>
            )}
            
            <Card
              className={`max-w-[80%] p-3 ${
                message.isUser
                  ? 'bg-blue-600 text-white'
                  : 'bg-muted'
              }`}
            >
              <div className="flex flex-col gap-2">
                <p className="text-sm whitespace-pre-wrap break-words">
                  {message.content}
                </p>
                <div className="flex items-center gap-2 text-xs opacity-70">
                  <span>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  {message.language === 'ur' && (
                    <Badge variant="secondary" className="text-xs">
                      اردو
                    </Badge>
                  )}
                </div>
              </div>
            </Card>

            {message.isUser && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Bot className="w-5 h-5 text-blue-600" />
            </div>
            <Card className="max-w-[80%] p-3 bg-muted">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t p-4 bg-background">
        {error && (
          <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              selectedLanguage === 'ur'
                ? 'اپنا سوال یہاں لکھیں...'
                : 'Type your question here...'
            }
            className="min-h-[60px] max-h-[120px] resize-none"
            disabled={isLoading}
            dir={selectedLanguage === 'ur' ? 'rtl' : 'ltr'}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="self-end"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-2">
          {selectedLanguage === 'ur'
            ? 'Enter دبائیں یا بھیجیں پر کلک کریں'
            : 'Press Enter to send or Shift+Enter for new line'}
        </p>
      </div>
    </div>
  );
}
