import React, { useState, useRef, useEffect } from 'react';
import styles from './AIPage.module.scss';

const AIPage = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Привет! Меня зовут Билинга. Я твой помощник в изучении английского языка. Попрактикуемся в общении или сыграем в игру?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);
  const currentResponseRef = useRef('');

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const newMessage = {
      role: 'user',
      content: inputMessage
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);
    currentResponseRef.current = '';

    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "openchat",
          prompt: inputMessage,
          stream: true
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '▋'
      }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim());
        
        for (const line of lines) {
          try {
            const parsedChunk = JSON.parse(line);
            if (parsedChunk.response) {
              currentResponseRef.current += parsedChunk.response;
              setMessages(prev => [
                ...prev.slice(0, -1),
                {
                  role: 'assistant',
                  content: currentResponseRef.current + '▋'
                }
              ]);
            }
          } catch (e) {
            console.error('Error parsing chunk:', e);
          }
        }
      }

      // Убираем курсор печатания в конце сообщения
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          role: 'assistant',
          content: currentResponseRef.current
        }
      ]);

    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Извините, произошла ошибка. Попробуйте еще раз позже.'
      }]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer} ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              message.role === 'user' ? styles.user : styles.assistant
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
      
      <div className={styles.inputContainer}>
        <textarea
          className={styles.input}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Введите сообщение..."
          rows={1}
          disabled={isLoading}
        />
        <button
          className={styles.sendButton}
          onClick={handleSendMessage}
          disabled={isLoading || !inputMessage.trim()}
        >
          {isLoading ? 'Отправка...' : 'Отправить'}
        </button>
      </div>
    </div>
  );
};

export default AIPage;
