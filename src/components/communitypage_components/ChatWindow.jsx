// src/Components/Communitipage_Components/ChatWindow.jsx
import React, { useState, useContext, useEffect, useRef } from 'react';
import { ServerContext } from '../../contexts/ServerContext';
import MessageInput from './MessageInput';

function ChatWindow() {
  const { activeServer } = useContext(ServerContext);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Ultraman themed dummy messages based on active server
  useEffect(() => {
    // Reset messages when changing servers
    const ultraMessages = {
      'Global Ultra Chat': [
        { id: 1, sender: 'UltraFan1966', content: `Selamat datang di ${activeServer.name}! Baru selesai nonton episode baru Ultraman Decker!`, timestamp: new Date().toLocaleTimeString() },
        { id: 2, sender: 'KaijuMaster', content: 'Siapa Ultra favorit kalian dari semua series?', timestamp: new Date().toLocaleTimeString() },
        { id: 3, sender: 'M78Nebula', content: 'Ultraman Zero tetap yang terbaik menurutku!', timestamp: new Date().toLocaleTimeString() },
      ],
      'Kaiju Discussions': [
        { id: 1, sender: 'KaijuResearcher', content: `Dibandingkan Gomora dan Red King, siapa yang lebih kuat?`, timestamp: new Date().toLocaleTimeString() },
        { id: 2, sender: 'MonsterIsland', content: 'Zetton masih jadi kaiju terkuat dalam sejarah franchise ini!', timestamp: new Date().toLocaleTimeString() },
        { id: 3, sender: 'UltraScienceTech', content: 'Jangan lupa Kaiju baru di Ultraman Z!', timestamp: new Date().toLocaleTimeString() },
      ],
      'Ultraman Taro Fans': [
        { id: 1, sender: 'UltraSix', content: `Father of Ultra bangga dengan Taro!`, timestamp: new Date().toLocaleTimeString() },
        { id: 2, sender: 'TaroCollector', content: 'Siapa yang punya figure Ultraman Taro edisi Ultra Act?', timestamp: new Date().toLocaleTimeString() },
        { id: 3, sender: 'LandOfLight', content: 'Mengagumkan bagaimana Taro menjadi mentor untuk Ultra generasi baru', timestamp: new Date().toLocaleTimeString() },
      ],
      'Ultra Weapons': [
        { id: 1, sender: 'SpeciumBeam', content: `Ultra Bracelet vs. Beta Capsule, diskusi!`, timestamp: new Date().toLocaleTimeString() },
        { id: 2, sender: 'ColorTimer', content: 'Teknologi GUTS masih relevan di era modern', timestamp: new Date().toLocaleTimeString() },
        { id: 3, sender: 'SciencePatrol', content: 'Bagaimana pendapat kalian tentang Ultra Fusion Card?', timestamp: new Date().toLocaleTimeString() },
      ],
      'Showa Era': [
        { id: 1, sender: 'RetroUltra', content: `Episode Ultraman vs. Baltan adalah yang terbaik!`, timestamp: new Date().toLocaleTimeString() },
        { id: 2, sender: 'ClassicKaiju', content: 'Seiko Matsuda muncul di Ultraman Leo episode berapa ya?', timestamp: new Date().toLocaleTimeString() },
        { id: 3, sender: 'FirstGen', content: 'Kostum dan efek era Showa punya charm tersendiri', timestamp: new Date().toLocaleTimeString() },
      ]
    };
    
    // Set default messages if specific server messages aren't defined
    const defaultMessages = [
      { id: 1, sender: 'UltraSystem', content: `Selamat datang di ${activeServer.name}!`, timestamp: new Date().toLocaleTimeString() },
      { id: 2, sender: 'Zoffy', content: 'Semoga diskusi kita bermanfaat untuk semua Ultra Fans!', timestamp: new Date().toLocaleTimeString() },
    ];
    
    // Use server-specific messages or default to generic ones
    setMessages(ultraMessages[activeServer.name] || defaultMessages);
  }, [activeServer]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (message) => {
    if (message.trim() === '') return;
    
    const newMessage = {
      id: Date.now(),
      sender: 'You', // In a real app, this would be the current user's name
      content: message,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Server header */}
      <div className="p-4 border-b" style={{ background: '#111328', borderColor: '#2e3152' }}>
        <div className="flex items-center">
          <span className="text-2xl mr-3">{activeServer.icon || '🌟'}</span>
          <div>
            <h2 className="text-xl font-semibold text-white">{activeServer.name}</h2>
            {activeServer.description && (
              <p className="text-sm text-gray-400">{activeServer.description}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4" style={{ background: '#0a0d1b' }}>
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-4 ${message.sender === 'You' ? 'text-right' : ''}`}
          >
            <div className={`inline-block max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
              message.sender === 'You' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-800 text-white border border-gray-700'
            }`}>
              <div className="font-semibold text-sm">
                {message.sender === 'You' ? message.sender : (
                  <span className="text-red-400">{message.sender}</span>
                )} • {message.timestamp}
              </div>
              <div>{message.content}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatWindow;