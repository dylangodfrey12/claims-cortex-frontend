import React, { useState, useEffect, useRef } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import { Image } from 'react-bootstrap';
import chatLogo from "../../assets/chat-bot.svg";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const messageContainerRef = useRef(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const saveMessages = (messages, HTMLString) => {
    setMessages(messages);
  };

  const loadMessages = () => {
    return messages;
  };

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  const validateInput = (message) => {
    return message.trim().length > 0;
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  return (
    <div className="chatbot-widget">
      {isOpen && (
       <div className={`chatbot-container ${isExpanded ? 'expanded' : 'collapsed'}`} ref={messageContainerRef}>
          <Chatbot
            config={config(toggleExpand, setIsOpen)}
            messageParser={MessageParser}
            validator={validateInput}
            actionProvider={(props) => (
              <ActionProvider {...props} chatHistory={chatHistory} setChatHistory={setChatHistory} />
            )}
            saveMessages={saveMessages}
            messageHistory={loadMessages()}
          />
        </div>
      )}
      <button className="chatbot-toggle" onClick={toggleChatbot}>
        <Image src={chatLogo} />
        {/* {isOpen ? 'Close' : 'Chat'} */}
      </button>
    </div>
  );
};

export default ChatbotWidget;
