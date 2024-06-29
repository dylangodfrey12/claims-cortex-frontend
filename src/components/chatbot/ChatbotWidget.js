import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import { Image } from 'react-bootstrap';
import chatLogo from "../../assets/chat-bot.svg";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const saveMessages = (messages, HTMLString) => {
    setMessages(messages);
  };

  const loadMessages = () => {
    console.log("messages",messages);
    return messages;
  };

  return (
    <div className="chatbot-widget">
      {isOpen && (
        <div className="chatbot-container">
          <Chatbot
            config={config}
            messageParser={MessageParser}
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
