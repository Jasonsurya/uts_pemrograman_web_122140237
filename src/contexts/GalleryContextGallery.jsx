// src/contexts/GalleryContextGallery.js
import React, { createContext, useContext, useState } from 'react';

const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
  const [gallery, setGallery] = useState([
    {
      id: 1,
      url: 'https://i.ibb.co/qs4RKrR/ultraman-tiga.jpg',
      caption: 'Ultraman Tiga in action!',
      type: 'image',
      likes: 3,
      liked: false,
      comments: ['Awesome!', 'Legendary!']
    },
    {
      id: 2,
      url: 'https://i.ibb.co/bgt3Q9p/ultraman-dyna.jpg',
      caption: 'Ultraman Dyna - Flash type!',
      type: 'image',
      likes: 5,
      liked: false,
      comments: ['Cool pose!', 'Dyna is the best!']
    }
  ]);

  const uploadItem = (item) => {
    setGallery([item, ...gallery]);
  };

  const toggleLike = (itemId) => {
    setGallery((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              liked: !item.liked,
              likes: item.liked ? item.likes - 1 : item.likes + 1
            }
          : item
      )
    );
  };

  const addComment = (itemId, text) => {
    setGallery((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              comments: [...item.comments, text]
            }
          : item
      )
    );
  };

  return (
    <GalleryContext.Provider
      value={{
        gallery,
        uploadItem,
        toggleLike,
        addComment
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => useContext(GalleryContext);
