// src/Pages/CommunityPage.jsx
import React, { useContext } from 'react';
import ServerList from '../components/communitypage_components/ServerList';
import ChatWindow from '../components/communitypage_components/ChatWindow';
import { ServerContext, ServerProvider } from '../contexts/ServerContext';

function CommunityPage() {
  return (
    <ServerProvider>
      <div className="flex h-screen" style={{ background: '#0a0d1b' }}>
        {/* Server list sidebar */}
        <ServerList />
        
        {/* Main chat area */}
        <MainChatArea />
      </div>
    </ServerProvider>
  );
}

// Component untuk area chat utama
function MainChatArea() {
  const { activeServer } = useContext(ServerContext);

  return (
    <div className="flex-1 flex flex-col">
      {activeServer ? (
        <ChatWindow />
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-300">
          <div className="text-6xl mb-4">🌟</div>
          <h2 className="text-2xl font-semibold mb-2 text-white">Selamat Datang di Ultraverse Chronicle</h2>
          <p className="text-center max-w-md mb-6">
            Pilih server dari sidebar atau buat server baru untuk mulai chatting dengan komunitas Ultra Warriors dari seluruh dunia.
          </p>
          <div className="text-sm text-gray-400">
            Diskusikan tokoh Ultra favorit, kaiju legendaris, dan momen ikonik bersama penggemar lainnya.
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunityPage;