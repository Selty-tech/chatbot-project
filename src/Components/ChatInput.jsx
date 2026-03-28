import dayjs from 'dayjs';
import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import './ChatInput.css';

export function ChatInput({
  chatMessages,
  setChatMessages,
  isTyping,
  setIsTyping
}) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    const trimmedMessage = inputText.trim();

    if (isTyping || trimmedMessage === '') {
      return;
    }

    const userMessage = {
      message: trimmedMessage,
      sender: 'user',
      id: crypto.randomUUID(),
      time: dayjs().valueOf()
    };

    const updatedMessages = [...chatMessages, userMessage];

    setChatMessages(updatedMessages);
    setInputText('');
    setIsTyping(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));

      const response = await Chatbot.getResponseAsync(trimmedMessage);

      const botMessage = {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      };

      setChatMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.log(error);
      
      const errorMessage = {
        message: 'Sorry, something went wrong. Please try again.',
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      };

      setChatMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }

  function clearChatMessages() {
    const shouldClear = window.confirm('Are you sure you want to clear the chat?');

    if (!shouldClear) {
      return;
    }

    setChatMessages([]);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }

    if (event.key === 'Escape') {
      setInputText('');
    }
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
        className="chat-input"
        disabled={isTyping}
      />

      <button
        onClick={sendMessage}
        className="send-button"
        disabled={isTyping}
      >
        {isTyping ? 'Sending...' : 'Send'}
      </button>

      <button
        onClick={clearChatMessages}
        className="clear-button"
        disabled={isTyping && chatMessages.length === 0}
      >
        Clear
      </button>
    </div>
  );
}