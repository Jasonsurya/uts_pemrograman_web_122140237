// src/contexts/GalleryContextGallery.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = 'http://localhost:6543'; // URL dasar API backend Anda

    const fetchGallery = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/gallery`);
            setGallery(response.data.gallery);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    const uploadItem = async (itemData) => {
        try {
            const formData = new FormData();
            formData.append('file', itemData.file);
            formData.append('caption', itemData.caption);

            const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setGallery([response.data.item, ...gallery]); 
        } catch (err) {
            setError(err.message);
        }
    };

    const toggleLike = async (itemId) => {
        try {
            const likedItem = gallery.find(item => item.id === itemId);
            if (likedItem?.liked) {
                await axios.delete(`${API_BASE_URL}/api/gallery/${itemId}/like`);
                setGallery(prev => prev.map(item =>
                    item.id === itemId ? { ...item, liked: false, likes: item.likes - 1 } : item
                ));
            } else {
                await axios.post(`${API_BASE_URL}/api/gallery/${itemId}/like`);
                setGallery(prev => prev.map(item =>
                    item.id === itemId ? { ...item, liked: true, likes: item.likes + 1 } : item
                ));
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const addComment = async (itemId, text) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/gallery/${itemId}/comment`, { text });
            setGallery(prev => prev.map(item =>
                item.id === itemId ? { ...item, comments: [...item.comments, response.data.comment] } : item
            ));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <GalleryContext.Provider
            value={{
                gallery,
                loading,
                error,
                uploadItem: (file, caption) => uploadItem({ file, caption }),
                toggleLike,
                addComment
            }}
        >
            {children}
        </GalleryContext.Provider>
    );
};

export const useGallery = () => useContext(GalleryContext);