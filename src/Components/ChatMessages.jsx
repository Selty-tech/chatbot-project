import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css';

function ChatMessages({ chatMessages, isTyping }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  return (
    <div className="chat-messages-container">
      {chatMessages.length === 0 ? (
        <div className="empty-chat-state">
          <h2>No messages yet</h2>
          <p>Start the conversation by sending a message below.</p>
        </div>
      ) : (
        chatMessages.map((chatMessage) => (
          <ChatMessage
            key={chatMessage.id}
            message={chatMessage.message}
            sender={chatMessage.sender}
            time={chatMessage.time}
          />
        ))
      )}

      {isTyping && (
        <div className="typing-indicator">
          <span className="typing-dot"></span>
          <span className="typing-dot"></span>
          <span className="typing-dot"></span>
          <span className="typing-text">Chatbot is typing...</span>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

export default ChatMessages;