import React, { useRef } from 'react';
import Loader from './Loader';
import { Config } from '../../config';

const ActionProvider = ({ createChatBotMessage, setState, chatHistory, setChatHistory, children }) => {
    const baseURL = Config.CHAT_API_BASE_URL;
    const chatHistoryRef = useRef(chatHistory);
    const messageContainerRef = useRef(null);

    const handleMessage = async (message) => {
        setState((prevState) => {
            const chatHistory = [...chatHistoryRef.current];
            if (chatHistory.length === 0 || chatHistory[chatHistory.length - 1].assistant) {
                chatHistory.push({ user: message, assistant: '' });
            } else {
                chatHistory[chatHistory.length - 1].user = message;
            }
            chatHistoryRef.current = chatHistory;
            return prevState;
        });
        const loading = createChatBotMessage(<Loader />);
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, loading],
        }));

        const updateLastMessage = (message) => {
          setState((prev) => {
            return { 
              ...prev, 
              messages: [
                  ...prev.messages.slice(0, -1), 
                  { 
                      ...prev.messages.at(-1), 
                      message: <div style={{whiteSpace:"pre-line"}}>{message}</div>
                  }
              ]
          };
          });
        };


        try {
            const response = await fetch(`${baseURL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: message,
                    chat_history: chatHistoryRef.current,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let done = false;
            let botMessageContent = '';

            while (!done) {
                const { value, done: readerDone } = await reader.read();
                done = readerDone;
                const chunk = decoder.decode(value, { stream: true });

                if (chunk) {
                    // Remove the 'data: ' prefix and combine the message
                 
                    botMessageContent += chunk;
// eslint-disable-next-line
                    const botMessage = createChatBotMessage(<div><pre>{botMessageContent}</pre></div>, { type: 'bot', delay:-950});
// eslint-disable-next-line
                    setState((prev) => { // Remove the loading message
                        const chatHistory = [...chatHistoryRef.current];
                        chatHistory[chatHistory.length - 1].assistant = botMessageContent;
                        chatHistoryRef.current = chatHistory;
                        updateLastMessage(botMessageContent)

                        return {
                            ...prev,
                            // messages: [...newPrevMsg, botMessage],
                            chatHistory: chatHistory,
                        };
                    });
                }
            }

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
        <div ref={messageContainerRef}>
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
