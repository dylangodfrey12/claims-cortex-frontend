import React from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./routes/Navigation";
import Footer from "./components/Footer";
import ChatbotWidget from './components/chatbot/ChatbotWidget';
// import { ChatBotWidget } from "chatbot-widget-ui";

const App = () => {
  const location = useLocation();
  const showStepper = location.pathname !== "/login" ;
  return (
    <>
      <Navigation />
      {showStepper && (
        //  <ChatbotWidget />
      //   <ChatBotWidget
      //   apiKey="sk-proj-aKV63t4s0QRHbWDNrzTRT3BlbkFJt1ZLd6RnSRu9ga6v9twf"
      //   chatIcon={<div><Image src={chatLogo} /> </div>}
      //   chatbotName="Assistance Chatbot"
      //   isTypingMessage="Typing..."
      //   IncommingErrMsg="Oops! Something went wrong !"
      //   primaryColor="#5b2ae0"
      //   inputMsgPlaceholder="Send a Message"
      //   conversation={messages}
      //   className="chatbot-main"
      //   handleNewMessage={setMessages}
      // />
      <ChatbotWidget/>
      )}
      <Footer />
    </>
  );
};

export default App;
