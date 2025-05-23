// src/Components/GalleryPage_Components/CommentItemGallery.jsx
import React from 'react';

const CommentItemGallery = ({ text }) => {
  return (
    <div className="text-gray-300 px-2 py-1 rounded-md bg-zinc-800">{text}</div>
  );
};

export default CommentItemGallery;
