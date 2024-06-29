import React, { useRef } from 'react';
import axios from 'axios';
import Loader from './Loader';
import { Config } from '../../config';

const ActionProvider = ({ createChatBotMessage, setState,chatHistory,setChatHistory, children }) => {
  const baseURL = Config.CHAT_API_BASE_URL;
  const chatHistoryRef = useRef(chatHistory);

  const handleMessage = async (message) => {
    setState((prevState) => {
      console.log("prev",prevState);
      const chatHistory = [...chatHistoryRef.current];
      if (chatHistory.length === 0 || chatHistory[chatHistory.length - 1].assistant) {
        chatHistory.push({ user: message, assistant: '' });
      } else {
        chatHistory[chatHistory.length - 1].user = message;
      }
      chatHistoryRef.current = chatHistory;

      return prevState
    });
    const loading = createChatBotMessage(<Loader />);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, loading],
    }));

    try {
      const response = await axios.post(`${baseURL}/chat`, {
        query: message,
        chat_history: chatHistoryRef.current,
      });

      const { answer } = response.data.response;

      const botMessage = createChatBotMessage(answer, { type: 'bot' });

      // Update the state with the bot's response and chat history
      setState((prev) => {
        const newPrevMsg = prev.messages.slice(0, -1); // Remove the loading message
        const chatHistory = [...chatHistoryRef.current];
        chatHistory[chatHistory.length - 1].assistant = answer;
        chatHistoryRef.current = chatHistory;

        return {
          ...prev,
          messages: [...newPrevMsg, botMessage],
          chatHistory: chatHistory,
        };
        
      });
    setChatHistory(chatHistoryRef.current);
    } catch (error) {
      console.error('Error fetching response:', error);
      const botMessage = createChatBotMessage('Sorry, I am having trouble understanding.', { messageType: 'bot' });
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages.slice(0, -1), botMessage],
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
