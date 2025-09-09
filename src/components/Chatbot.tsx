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
      text: "Hello! I'm APMC Assistant. How can I help you with medical registration, CME programs, or general inquiries? Feel free to ask multiple questions - I'm here to help!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { label: "Registration", keyword: "registration" },
    { label: "CME Programs", keyword: "cme" },
    { label: "Fees", keyword: "fees" },
    { label: "Documents", keyword: "documents" },
    { label: "Contact", keyword: "contact" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses: Record<string, string> = {
    registration: "For medical registration, please visit our Online Services section. You'll need your qualification certificates, identity proof, and registration fee. The process typically takes 15-30 days for completion.\n\nWould you like to know more about:\n• Required documents\n• Fee structure\n• Registration process timeline\n• Renewal procedures",
    cme: "CME (Continuing Medical Education) programs are mandatory for all registered practitioners. You can register for upcoming CME events through our CME Registration portal. We offer both online and offline programs throughout the year.\n\nWhat specifically would you like to know about:\n• Upcoming CME events\n• Credit requirements\n• Registration process\n• Program schedule",
    contact: "You can reach us at:\n📞 Phone: +91-863-2340116\n📧 Email: apmcvjw@gmail.com\n🏢 Address: APMC Building, Vijayawada, Andhra Pradesh\n⏰ Office Hours: 9:30 AM - 5:30 PM (Mon-Fri)\n\nNeed help with something specific? I can assist with registration queries, document verification, or appointment scheduling.",
    fees: "Registration fees vary by category:\n• MBBS Fresh Registration: ₹2,000\n• MBBS Renewal: ₹1,000\n• PG Fresh Registration: ₹3,000\n• PG Renewal: ₹1,500\n• Specialist Registration: ₹5,000\n\nFees can be paid online or at our office. Would you like information about:\n• Payment methods\n• Late fee penalties\n• Fee exemptions\n• Receipt download",
    documents: "Required documents for registration:\n• Original degree certificate\n• Internship completion certificate\n• Character certificate\n• Identity proof (Aadhar/Passport)\n• Recent passport size photographs\n• Registration fee receipt\n\nNeed clarification on:\n• Document verification process\n• Notarization requirements\n• Digital copies acceptance\n• Document submission timeline",
    renewal: "For license renewal:\n• Submit renewal application 30 days before expiry\n• Complete mandatory CME credits\n• Pay renewal fees\n• Update contact information\n\nRenewal typically takes 7-15 working days. Need help with specific renewal requirements?",
    timeline: "Processing timelines:\n• Fresh Registration: 15-30 days\n• Renewal: 7-15 days\n• Document verification: 3-5 days\n• Certificate issuance: 2-3 days\n\nTrack your application status online or contact us for updates.",
    online: "Online services available:\n• Application submission\n• Document upload\n• Fee payment\n• Status tracking\n• Certificate download\n\nAll services are available 24/7 on our portal. Need help navigating any specific feature?",
    default: "I'm here to help with all your APMC queries! Here are some common topics:\n\n🏥 Medical Registration\n📚 CME Programs\n📞 Contact Information\n💰 Fee Structure\n📄 Required Documents\n🔄 Renewal Process\n⏱️ Processing Timeline\n💻 Online Services\n\nWhat would you like to know more about? Feel free to ask follow-up questions!",
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("registration") || lowerMessage.includes("register")) {
      return predefinedResponses.registration;
    }
    if (lowerMessage.includes("cme") || lowerMessage.includes("education") || lowerMessage.includes("credit")) {
      return predefinedResponses.cme;
    }
    if (lowerMessage.includes("contact") || lowerMessage.includes("phone") || lowerMessage.includes("address") || lowerMessage.includes("reach")) {
      return predefinedResponses.contact;
    }
    if (lowerMessage.includes("fee") || lowerMessage.includes("cost") || lowerMessage.includes("payment") || lowerMessage.includes("price")) {
      return predefinedResponses.fees;
    }
    if (lowerMessage.includes("document") || lowerMessage.includes("certificate") || lowerMessage.includes("paper")) {
      return predefinedResponses.documents;
    }
    if (lowerMessage.includes("renewal") || lowerMessage.includes("renew") || lowerMessage.includes("expire")) {
      return predefinedResponses.renewal;
    }
    if (lowerMessage.includes("timeline") || lowerMessage.includes("time") || lowerMessage.includes("duration") || lowerMessage.includes("how long")) {
      return predefinedResponses.timeline;
    }
    if (lowerMessage.includes("online") || lowerMessage.includes("portal") || lowerMessage.includes("website") || lowerMessage.includes("digital")) {
      return predefinedResponses.online;
    }
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! I'm here to help you with all your APMC queries. What would you like to know about today?";
    }
    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return "You're welcome! Feel free to ask if you have any more questions about APMC services. I'm here to help!";
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

  const handleQuickAction = (keyword: string) => {
    setInputMessage(keyword);
    setTimeout(() => {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: keyword,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);

      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getBotResponse(keyword),
          sender: "bot",
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);
    }, 100);
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

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="border-t border-b p-3">
                <p className="text-xs text-muted-foreground mb-2">Quick topics:</p>
                <div className="flex flex-wrap gap-1">
                  {quickActions.map((action) => (
                    <Button
                      key={action.keyword}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.keyword)}
                      className="text-xs h-7 px-2"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about APMC services..."
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