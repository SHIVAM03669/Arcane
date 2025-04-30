import React, { useState } from 'react';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-96 h-[600px] bg-white rounded-lg shadow-xl overflow-hidden">
          <iframe
            src="https://cdn.botpress.cloud/webchat/v2.4/shareable.html?configUrl=https://files.bpcontent.cloud/2025/04/29/20/20250429205959-1EN0WCJM.json&enableVoiceInput=true"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Botpress Chat"
            allow="microphone"
          ></iframe>
        </div>
      )}
      <button
        onClick={toggleChat}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
};

export default ChatbotWidget;
