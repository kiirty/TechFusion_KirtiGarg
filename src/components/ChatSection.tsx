
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { SendHorizontal, Bot, User, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatSection = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your agricultural assistant. How can I help you with your crops today?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const generateResponse = (query: string) => {
    const responses = [
      "Based on your description, it sounds like your tomato plants might be suffering from early blight. Look for small brown spots on lower leaves with concentric rings. Remove infected leaves and apply a fungicide containing chlorothalonil or copper.",
      "Crop rotation is an effective strategy for disease management. I'd recommend avoiding planting the same crop in the same location for at least 3-4 years to break disease cycles.",
      "For organic pest control in your vegetable garden, consider introducing beneficial insects like ladybugs or lacewings. Neem oil and insecticidal soaps can also be effective for soft-bodied pests.",
      "The optimal soil pH for most vegetables is between 6.0 and 7.0. If your soil is too acidic, you can add lime to raise the pH. If it's too alkaline, sulfur can help lower it.",
      "Your apple trees might be experiencing fire blight, a bacterial disease. Prune infected branches 12 inches below visible damage during dry weather and disinfect tools between cuts.",
      "The yellow curling leaves on your cucumber plants could be a sign of downy mildew. This fungal disease thrives in humid conditions. Improve air circulation and apply a copper-based fungicide early in the infection."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const botMessage: Message = {
        role: 'assistant',
        content: generateResponse(input),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <section 
      id="chat" 
      className="min-h-screen flex flex-col justify-center py-20 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-center mb-12">
          <div className="text-center max-w-2xl">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Bot className="h-3.5 w-3.5 mr-2" />
              AI Assistant
            </div>
            <h2 className="text-3xl font-medium mb-4">Agriculture AI Chatbot</h2>
            <p className="text-muted-foreground">
              Get instant answers to your agricultural questions. Our AI assistant can help identify issues, 
              recommend solutions, and provide expert guidance.
            </p>
          </div>
        </div>
        
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl shadow-soft border border-slate-200/80 dark:border-slate-700/80 max-w-3xl mx-auto">
          <div className="h-[500px] flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "flex",
                      message.role === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div 
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-3 flex items-start space-x-2",
                        message.role === 'user' 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-secondary border border-secondary"
                      )}
                    >
                      <div className={cn(
                        "h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                        message.role === 'user' ? "bg-white/20" : "bg-primary/10"
                      )}>
                        {message.role === 'user' ? (
                          <User className="h-3.5 w-3.5" />
                        ) : (
                          <Bot className="h-3.5 w-3.5" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </div>
                        <div className={cn(
                          "text-xs opacity-70 text-right",
                          message.role === 'user' 
                            ? "text-primary-foreground" 
                            : "text-muted-foreground"
                        )}>
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl px-4 py-3 flex items-start space-x-2 bg-secondary border border-secondary">
                      <div className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-primary/10">
                        <Bot className="h-3.5 w-3.5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex space-x-1.5">
                          <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about crop diseases, treatments, or best practices..."
                  className="elegant-input flex-1"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className={cn(
                    "premium-button !px-4",
                    isLoading ? "opacity-70 cursor-wait" : ""
                  )}
                  disabled={isLoading}
                >
                  <SendHorizontal className="h-5 w-5" />
                </button>
              </form>
              
              <div className="mt-3 px-4 py-2 rounded-lg bg-secondary/80 text-xs text-muted-foreground">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                  <div>
                    This is a demo AI. For best results, be specific in your questions about crop diseases and treatments.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatSection;
