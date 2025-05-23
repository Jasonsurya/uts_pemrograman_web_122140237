// src/Components/Communitipage_Components/ServerList.jsx
import React, { useContext, useState } from 'react';
import { ServerContext } from "../../contexts/ServerContext";
import CreateServerModal from './CreateServerModal';

const ultramanServers = [
  { id: 1, name: 'Global Ultra Chat', description: 'Server utama untuk semua Ultra Warriors', icon: '🌟' },
  { id: 2, name: 'Kaiju Discussions', description: 'Diskusi tentang monster legendaris', icon: '👹' },
  { id: 3, name: 'Ultraman Taro Fans', description: 'Penggemar Ultraman Taro', icon: '🔥' },
  { id: 4, name: 'Ultra Weapons', description: 'Senjata dan teknologi Ultra', icon: '⚔️' },
  { id: 5, name: 'Showa Era', description: 'Diskusi era Showa (1966-1980)', icon: '📺' },
];

function ServerList() {
  const { activeServer, setActiveServer } = useContext(ServerContext);
  const [servers, setServers] = useState(ultramanServers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddServer = () => {
    setIsModalOpen(true);
  };

  const handleCreateServer = (newServer) => {
    // Add a random icon if none was specified
    const icons = ['🌟', '👹', '🔥', '⚔️', '📺', '🛡️', '🦸‍♂️', '🌈', '💥'];
    const serverWithIcon = {
      ...newServer,
      icon: newServer.icon || icons[Math.floor(Math.random() * icons.length)]
    };
    
    setServers([...servers, serverWithIcon]);
    setActiveServer(serverWithIcon);
  };

  return (
    <div className="w-64 flex flex-col h-full" style={{ background: '#111328', borderRight: '1px solid #2e3152' }}>
      <div className="p-4 border-b border-gray-700 font-bold text-xl text-white flex items-center">
        <span className="text-red-500 mr-2">⦿</span> Ultraverse Chronicle
      </div>
      
      {/* Server list */}
      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-gray-800">
          {servers.map(server => (
            <li
              key={server.id}
              onClick={() => setActiveServer(server)}
              className={`p-3 cursor-pointer hover:bg-opacity-30 transition-all duration-200 ${
                activeServer && activeServer.id === server.id 
                  ? 'bg-red-900 bg-opacity-30 border-l-4 border-red-500' 
                  : 'hover:bg-red-900 border-l-4 border-transparent'
              }`}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{server.icon}</span>
                <div>
                  <div className="font-medium text-white">{server.name}</div>
                  {server.description && (
                    <div className="text-xs text-gray-400 truncate">{server.description}</div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Create server button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleAddServer}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
        >
          <span className="mr-2">+</span> Buat Ultra Server
        </button>
      </div>
      
      {/* Create server modal */}
      <CreateServerModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateServer={handleCreateServer}
      />
    </div>
  );
}

export default ServerList;