import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const ServerContext = createContext({
    activeServer: null,
    setActiveServer: () => {},
    servers: [],
    loadServers: () => {},
    createServerError: (serverData) => {},
    sendMessage: (serverId, message) => {},
    messages: [],
    loadMessages: (serverId) => {},
    currentUser: null,
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
});

export const ServerProvider = ({ children }) => {
    const [activeServer, setActiveServer] = useState(null);
    const [servers, setServers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    
    const API_BASE_URL = 'http://localhost:6543'; 

    
    useEffect(() => {
        loadServers();
    }, []);

    
    const loadServers = async () => {
        try {
        
            const response = await axios.get(`${API_BASE_URL}/api/servers`); 
            setServers(response.data); 
        } catch (error) {
            console.error("Error loading servers:", error.response ? error.response.data : error.message);
        }
    };

    const createServerError = async (serverData) => { 
        try {
            const response = await axios.post(`${API_BASE_URL}/api/servers/create`, serverData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setServers([...servers, response.data]); 
            setActiveServer(response.data); 
            alert('Server komunitas berhasil dibuat!');
        } catch (error) {
            console.error("Error creating server:", error.response ? error.response.data : error.message);
            alert(`Gagal membuat server: ${error.response ? error.response.data.error : error.message}`);
        }
    };

    const loadMessages = async (serverId) => {
        if (serverId) {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/servers/${serverId}/messages`); 
                setMessages(response.data.messages);
            } catch (error) {
                console.error(`Error loading messages for server ${serverId}:`, error.response ? error.response.data : error.message);
                setMessages([]); 
            }
        } else {
            setMessages([]);
        }
    };

   
    const sendMessage = async (serverId, messageContent) => { 
        try {
            const response = await axios.post(`${API_BASE_URL}/api/servers/${serverId}/messages`, { content: messageContent }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setMessages([...messages, response.data.message_data]); 
        } catch (error) {
            console.error("Error sending message:", error.response ? error.response.data : error.message);
        }
    };


    const login = async (username, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/login`, { username, password });
            setCurrentUser(response.data.user); 
            setIsLoggedIn(true);
            alert('Login berhasil!');
            return true; 
        } catch (error) {
            console.error("Login failed:", error.response ? error.response.data : error.message);
            alert(`Login gagal: ${error.response ? error.response.data.error || error.response.data.message : error.message}`);
            return false; 
        }
    };

  
    const logout = async () => {
        try {
            await axios.post(`${API_BASE_URL}/api/logout`);
            setCurrentUser(null);
            setIsLoggedIn(false);
            alert('Logout berhasil!');
        } catch (error) {
            console.error("Logout failed:", error.response ? error.response.data : error.message);
            alert(`Logout gagal: ${error.response ? error.response.data.error || error.response.data.message : error.message}`);
        }
    };


    return (
        <ServerContext.Provider value={{
            activeServer,
            setActiveServer,
            servers,
            loadServers,
            createServerError, 
            sendMessage,
            messages,
            loadMessages,
            currentUser,
            isLoggedIn,
            login,
            logout
        }}>
            {children}
        </ServerContext.Provider>
    );
};