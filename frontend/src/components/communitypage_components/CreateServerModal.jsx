import React, { useState } from 'react';

function CreateServerModal({ isOpen, onClose, onCreateServer }) {
  const [serverName, setServerName] = useState('');
  const [serverDescription, setServerDescription] = useState('');
  const [serverIcon, setServerIcon] = useState('');

  const iconOptions = ['🌟', '👹', '🔥', '⚔️', '📺', '🛡️', '🦸‍♂️', '🌈', '💥'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (serverName.trim()) {
      onCreateServer({
        id: Date.now(),
        name: serverName,
        description: serverDescription,
        icon: serverIcon
      });
      setServerName('');
      setServerDescription('');
      setServerIcon('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="rounded-lg p-6 w-full max-w-md" style={{ background: '#111328' }}>
        <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
          <span className="text-red-500 mr-2">⦿</span> Buat Ultra Server Baru
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 font-medium mb-2">
              Nama Server
            </label>
            <input
              type="text"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
              style={{ background: '#1a1d36', border: '1px solid #2e3152' }}
              placeholder="Contoh: Ultra Seven Fans"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 font-medium mb-2">
              Deskripsi (Opsional)
            </label>
            <textarea
              value={serverDescription}
              onChange={(e) => setServerDescription(e.target.value)}
              className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
              style={{ background: '#1a1d36', border: '1px solid #2e3152' }}
              placeholder="Jelaskan tentang server ini"
              rows="3"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-300 font-medium mb-2">
              Icon Server (Opsional)
            </label>
            <div className="flex flex-wrap gap-2">
              {iconOptions.map(icon => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setServerIcon(icon)}
                  className={`w-10 h-10 text-xl flex items-center justify-center rounded ${
                    serverIcon === icon ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded text-gray-300 hover:bg-gray-700"
              style={{ border: '1px solid #2e3152' }}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
            >
              Buat Server
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateServerModal;