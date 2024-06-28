import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'Cortex Bot';

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm Cortex Assistant`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
  state: {
    messages: [],
    chatHistory: [],
  },
};

export default config;
