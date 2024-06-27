import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./routes/Navigation";
import Footer from "./components/Footer";
// import ChatbotWidget from './components/chatbot/ChatbotWidget';
import { ChatBotWidget } from "chatbot-widget-ui";
import chatLogo from "../src/assets/chat-bot.svg";
import { Image } from "react-bootstrap";

const App = () => {
  const location = useLocation();
  const showStepper = location.pathname !== "/login";
  const [messages, setMessages] = useState([]);

  return (
    <>
      <Navigation />
      {showStepper && (
        //  <ChatbotWidget />
        <ChatBotWidget
        apiKey="sk-proj-aKV63t4s0QRHbWDNrzTRT3BlbkFJt1ZLd6RnSRu9ga6v9twf"
        chatIcon={<div><Image src={chatLogo} /> </div>}
        chatbotName="Assistance Chatbot"
        isTypingMessage="Typing..."
        IncommingErrMsg="Oops! Something went wrong !"
        primaryColor="#5b2ae0"
        inputMsgPlaceholder="Send a Message"
        conversation={messages}
        className="chatbot-main"
        handleNewMessage={setMessages}
      />
      )}
      <Footer />
    </>
  );
};

export default App;
