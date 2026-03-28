import { useEffect, useState } from 'react';
import { Chatbot } from 'supersimpledev';
import { ChatInput } from './Components/ChatInput';
import ChatMessages from './Components/ChatMessages';
import './App.css';

const defaultMessages = [
  {
    message: 'Hello Chatbot',
    sender: 'user',
    id: 'id1',
    time: Date.now()
  },
  {
    message: 'Hello! How can I help you?',
    sender: 'robot',
    id: 'id2',
    time: Date.now()
  }
];

function App() {
  const [chatMessages, setChatMessages] = useState(() => {
    const savedMessages = localStorage.getItem('messages');
    return savedMessages ? JSON.parse(savedMessages) : defaultMessages;
  });

  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    Chatbot.addResponses({
      goodbye: 'Goodbye. Sergi, have a great day!',
      'give me a unique id': () => {
        return `Sure. Here's a unique ID: ${crypto.randomUUID()}`;
      },
      'what is todays date': () => {
       return `Today is ${new Date().toLocaleDateString('en-GB')}`;
      },
      'what is today date': () => {
        return `Today is ${new Date().toLocaleDateString('en-GB')}`;
      },
      'what is the date today': () => {
        return `Today is ${new Date().toLocaleDateString('en-GB')}`;
      },
      'can you get me todays date ?': () => {
        return `Today is ${new Date().toLocaleDateString('en-GB')}`;
      },
      'can you get me todays date?': () => {
        return `Today is ${new Date().toLocaleDateString('en-GB')}`;
      },
      'todays date': () => {
        return `Today is ${new Date().toLocaleDateString('en-GB')}`;
      }
    });
  }, []);

  return (
    <div className="app-shell">
      <div className="app-container">
        <header className="app-header">
          <h1>Chatbot App</h1>
          <p className="app-subtitle">
            A React chatbot interface with persistent chat history and custom automated responses.
          </p>
        </header>

        <div className="chat-card">
          <ChatMessages
            chatMessages={chatMessages}
            isTyping={isTyping}
          />

          <ChatInput
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            isTyping={isTyping}
            setIsTyping={setIsTyping}
          />
        </div>
      </div>
    </div>
  );
}

export default App;