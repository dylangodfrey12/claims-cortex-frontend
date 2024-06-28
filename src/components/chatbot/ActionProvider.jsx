import React from 'react';
import axios from 'axios';
import Loader from './Loader';
import { Config } from '../../config';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const baseURL = Config.CHAT_API_BASE_URL;

  const handleMessage = async (message) => {
    let chatHistory=[]

    setState((prevState) => {
      chatHistory = prevState.messages
        .map((msg) => ({
          user: msg.type === 'user' ? msg.message : '',
          assistant: msg.type === 'bot' ? msg.message : '',
        }))
        .filter((msg) => msg.user || msg.assistant);
      return prevState;
    });
    console.log("chat history",chatHistory);
    const loading = createChatBotMessage(<Loader />)
        setState((prev) => ({ ...prev, messages: [...prev.messages, loading], }))

    try {
      const response = await axios.post(`${baseURL}/chat`, {
        query: message,
        chat_history:chatHistory,
      });

      const { input, answer } = response.data.response;

      const botMessage = createChatBotMessage(answer, { messageType: 'bot' });


      // Update the state with the bot's response
      setState((prev) => {
        const newPrevMsg = prev?.messages.slice(0, -1)
        return{...prev,
        messages: [...newPrevMsg, botMessage],
        chatHistory: [...prev.chatHistory, { user: input, assistant: answer }],}
      });
    } catch (error) {
      console.error('Error fetching response:', error);
      const botMessage = createChatBotMessage('Sorry, I am having trouble understanding.', { messageType: 'bot' });
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleMessage: handleMessage,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
