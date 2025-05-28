import React, { useState } from 'react';

function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="p-4" style={{ background: '#111328', borderTop: '1px solid #2e3152' }}>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis pesan Ultra..."
          className="flex-1 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-white rounded-l-lg"
          style={{ background: '#1a1d36', border: '1px solid #2e3152' }}
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-2 rounded-r-lg hover:bg-red-700 transition-colors font-medium"
        >
          Kirim
        </button>
      </form>
      <div className="text-xs text-gray-500 mt-2 text-center">
        Diskusikan tokoh Ultra, Kaiju, dan momen ikonik dengan sesama penggemar
      </div>
    </div>
  );
}

export default MessageInput;