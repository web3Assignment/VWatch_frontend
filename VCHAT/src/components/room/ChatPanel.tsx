import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../hooks/useAuth';

export const ChatPanel: React.FC = () => {
  const { messages, sendMessage } = useChat();
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && user) {
      sendMessage(input.trim(), user.id, user.username);
      setInput('');
    }
  };

  const formatTime = (ts?: number | string) => {
    if (!ts) return '';
    const date = typeof ts === 'number' ? new Date(ts) : new Date(ts);
    return isNaN(date.getTime()) ? '' : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-surface-container-low rounded-[24px] border border-outline-variant/30 overflow-hidden">
      <div className="p-4 border-b border-outline-variant/30 bg-surface-container/50 flex justify-between items-center flex-shrink-0">
        <h3 className="font-headline-sm text-on-surface">Room Chat</h3>
        <span className="font-label-mono text-[10px] text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-full">LIVE</span>
      </div>
      
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-4 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <span className="material-symbols-outlined text-[36px] text-on-surface-variant/40 mb-2">chat_bubble_outline</span>
            <p className="font-body-md text-xs text-on-surface-variant">No messages yet. Start the conversation!</p>
          </div>
        )}

        {messages.map((msg) => {
          const isMe = msg.userId === user?.id;
          const isSystem = msg.userId === 'system';
          
          if (isSystem) {
            return (
              <div key={msg.id} className="text-center font-label-mono text-[11px] text-on-surface-variant my-2 bg-surface-container/40 py-1 px-3 rounded-full mx-auto w-fit">
                {msg.content}
              </div>
            );
          }
          
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="font-label-mono text-[10px] text-on-surface-variant font-bold">{msg.username}</span>
                {msg.timestamp && (
                  <span className="font-label-mono text-[9px] text-on-surface-variant/60">{formatTime(msg.timestamp)}</span>
                )}
              </div>
              <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] shadow-xs ${
                isMe 
                  ? 'bg-primary text-on-primary rounded-tr-xs' 
                  : 'bg-surface-container-highest text-on-surface rounded-tl-xs'
              }`}>
                <p className="font-body-md text-[14px] leading-relaxed break-words">{msg.content}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t border-outline-variant/30 bg-surface-container/30 flex-shrink-0">
        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message..."
            className="w-full bg-surface-container-high border border-outline-variant/50 rounded-full pl-4 pr-12 py-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="absolute right-1 top-1 bottom-1 aspect-square flex items-center justify-center rounded-full bg-primary text-on-primary disabled:opacity-40 hover:bg-tertiary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
