// src/Components/GalleryPage_Components/CommentSectionGallery.jsx
import React, { useState } from 'react';
import { useGallery } from '../../contexts/GalleryContextGallery';
import CommentItemGallery from './CommentItemGallery';

const CommentSectionGallery = ({ itemId }) => {
  const { addComment, gallery } = useGallery();
  const [text, setText] = useState('');
  const item = gallery.find((item) => item.id === itemId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(itemId, text);
    setText('');
  };

  return (
    <div className="mt-4 text-sm">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-2 py-1 bg-zinc-800 text-white rounded-md"
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
        >
          Post
        </button>
      </form>
      <div className="mt-2 space-y-1">
        {item?.comments?.map((comment, idx) => (
          <CommentItemGallery key={idx} text={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSectionGallery;
