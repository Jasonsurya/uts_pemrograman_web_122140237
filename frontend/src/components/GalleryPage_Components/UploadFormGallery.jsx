// src/Components/GalleryPage_Components/UploadFormGallery.jsx
import React, { useState } from 'react';
import { useGallery } from '../../contexts/GalleryContextGallery';

const UploadFormGallery = () => {
  const { uploadItem } = useGallery();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) return;

    const url = URL.createObjectURL(file);
    const type = file.type.startsWith('video') ? 'video' : 'image';
    uploadItem({ id: Date.now(), url, caption, type, likes: 0, liked: false, comments: [] });

    setFile(null);
    setCaption('');
  };

  return (
    <form onSubmit={handleUpload} className="mb-6 bg-zinc-800 p-4 rounded-xl">
      <input type="file" accept="image/*,video/*" onChange={(e) => setFile(e.target.files[0])} className="mb-2 w-full text-white" />
      <input type="text" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full mb-2 p-2 bg-zinc-700 text-white rounded-md" />
      <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">Upload</button>
    </form>
  );
};

export default UploadFormGallery;
