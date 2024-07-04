import { Button, Image } from 'react-bootstrap';
import { createChatBotMessage } from 'react-chatbot-kit';
import avatarIcon from "../../assets/avatar-icon.svg";
import expandIcon from "../../assets/expand.svg";
import closeIcon from "../../assets/close.svg";

const botName = 'Cortex Bot';

const CustomHeader = ({ toggleExpand,setIsOpen }) => {
  return (
    <div style={{ padding: '5px', borderRadius: '3px', display: 'flex', justifyContent: 'space-between',borderBottom:"1px solid rgb(255, 255, 255,0.3)" ,alignItems: 'center' }}>
       <Button  onClick={toggleExpand} className='expand-button d-none d-lg-block bg-transparent border-0' style={{ marginRight: 'auto' }}>
        <Image src={expandIcon} />
      </Button>
      <Button  onClick={()=> setIsOpen(false)} className='expand-button bg-transparent border-0' style={{ marginLeft: 'auto' }}>
        <Image src={closeIcon} />
      </Button>
    </div>
  );
};

const BotAvatar = (props) => {
  return (
    <div className='me-3'>
      <Image width={40} src={avatarIcon} />
    </div>
  );
};

const config = (toggleExpand,setIsOpen) => ({
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
  customComponents: {
    header: () => <CustomHeader toggleExpand={toggleExpand} setIsOpen={setIsOpen} />,
    botAvatar: (props) => <BotAvatar {...props} />,
  },
});

export default config;
