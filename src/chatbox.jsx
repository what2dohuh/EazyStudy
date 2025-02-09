import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./style/chatbot.css";

const genAI = new GoogleGenerativeAI('AIzaSyAOWo3asI7bPv0QaoEJ3c_D5mcLTJ4mtkY');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { text: input, user: true };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const prompt = `As an educational assistant: ${input}`;
      const result = await model.generateContent(prompt);
      const botResponse = result.response.text();

      setMessages(prev => [...prev, { text: botResponse, user: false }]);
    } catch (error) {
      console.error("Gemini API error:", error);
      setMessages(prev => [
        ...prev,
        { 
          text: "Sorry, I'm having trouble processing your request. Please try again.", 
          user: false 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (text) => {
    const parts = text.split(/(```[^`]+```)/);
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const code = part.slice(3, -3);
        return (
          <pre key={index} className="code-block">
            <code>{code}</code>
          </pre>
        );
      }
      return <p key={index}>{part}</p>;
    });
  };

  return (
    <div className="chatbot-wrapper">
      <button 
        className="chatbot-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot"
      >
        {isOpen ? '✖' : '🤖'}
      </button>

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h3>AI Study Assistant</h3>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>

          <div className="chatbot-messages">
            {messages.length === 0 && (
              <div className="welcome-message">
                <h4>Hi! I'm your AI study assistant.</h4>
                <p>I can help you with:</p>
                <ul>
                  <li>Explaining complex topics</li>
                  <li>Solving problems step by step</li>
                  <li>Providing study tips</li>
                  <li>Answering questions</li>
                </ul>
              </div>
            )}
            
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`chat-message ${msg.user ? "user" : "bot"}`}
              >
                <div className="message-content">
                  {msg.user ? msg.text : formatMessage(msg.text)}
                </div>
                <div className="message-time">
                  {new Date().toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              disabled={isLoading}
              rows="1"
            />
            <button 
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;