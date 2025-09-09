import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm APMC Assistant. How can I help you with medical registration, CME programs, or general inquiries?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses: Record<string, string> = {
    registration: "For medical registration, please visit our Online Services section. You'll need your qualification certificates, identity proof, and registration fee. The process typically takes 15-30 days for completion.",
    cme: "CME (Continuing Medical Education) programs are mandatory for all registered practitioners. You can register for upcoming CME events through our CME Registration portal. We offer both online and offline programs throughout the year.",
    contact: "You can reach us at:\n📞 Phone: +91-863-2340116\n📧 Email: apmcvjw@gmail.com\n🏢 Address: APMC Building, Vijayawada, Andhra Pradesh\n⏰ Office Hours: 9:30 AM - 5:30 PM (Mon-Fri)",
    fees: "Registration fees vary by category:\n• MBBS Fresh Registration: ₹2,000\n• MBBS Renewal: ₹1,000\n• PG Fresh Registration: ₹3,000\n• PG Renewal: ₹1,500\n• Specialist Registration: ₹5,000\nFees can be paid online or at our office.",
    documents: "Required documents for registration:\n• Original degree certificate\n• Internship completion certificate\n• Character certificate\n• Identity proof (Aadhar/Passport)\n• Recent passport size photographs\n• Registration fee receipt",
    default: "I understand you're looking for information. Here are some common topics I can help with:\n• Medical Registration\n• CME Programs\n• Contact Information\n• Fee Structure\n• Required Documents\n\nPlease specify what you'd like to know more about!",
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("registration") || lowerMessage.includes("register")) {
      return predefinedResponses.registration;
    }
    if (lowerMessage.includes("cme") || lowerMessage.includes("education")) {
      return predefinedResponses.cme;
    }
    if (lowerMessage.includes("contact") || lowerMessage.includes("phone") || lowerMessage.includes("address")) {
      return predefinedResponses.contact;
    }
    if (lowerMessage.includes("fee") || lowerMessage.includes("cost") || lowerMessage.includes("payment")) {
      return predefinedResponses.fees;
    }
    if (lowerMessage.includes("document") || lowerMessage.includes("certificate")) {
      return predefinedResponses.documents;
    }
    
    return predefinedResponses.default;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-medical-teal hover:bg-medical-teal-light shadow-lg z-50"
          size="icon"
        >
          <MessageCircle size={24} className="text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
          <CardHeader className="bg-medical-teal text-white rounded-t-lg flex flex-row items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <CardTitle className="text-lg">APMC Assistant</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              <X size={16} />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-medical-teal text-white"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.sender === "bot" && (
                          <Bot size={16} className="mt-1 text-medical-teal" />
                        )}
                        {message.sender === "user" && (
                          <User size={16} className="mt-1 text-white" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-line">{message.text}</p>
                          <p className={`text-xs mt-1 opacity-70`}>
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center gap-2">
                        <Bot size={16} className="text-medical-teal" />
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-medical-teal rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-medical-teal rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></div>
                          <div className="w-2 h-2 bg-medical-teal rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-medical-teal hover:bg-medical-teal-light"
                  size="icon"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;