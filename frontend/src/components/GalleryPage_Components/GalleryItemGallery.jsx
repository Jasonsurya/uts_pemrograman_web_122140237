import React from 'react';
import LikeButtonGallery from './LikeButtonGallery';
import CommentSectionGallery from './CommentSectionGallery';

const GalleryItemGallery = ({ item }) => {
  return (
    <div className="bg-zinc-900 p-4 rounded-xl shadow-md">
      {item.type === 'image' ? (
        <img src={item.url} alt={item.caption} className="rounded-md w-full h-60 object-cover" />
      ) : (
        <video controls className="rounded-md w-full h-60">
          <source src={item.url} type="video/mp4" />
        </video>
      )}
      <div className="mt-2 text-sm">{item.caption}</div>
      <LikeButtonGallery itemId={item.id} />
      <CommentSectionGallery itemId={item.id} />
    </div>
  );
};

export default GalleryItemGallery;
