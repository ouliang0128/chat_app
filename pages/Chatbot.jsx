// Sidenav.jsx
"use client"; // Add this line at the top of your file
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { MdChat } from 'react-icons/md';

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        axios.post('http://localhost:5328/api/clear_memory')
            .then(response => console.log('Memory cleared on refresh'))
            .catch(error => console.error('Failed to clear memory', error));
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chats]);

    const toggleChat = () => {
        if (isOpen) {
            setChats([]); // Clear all chat history when closing the chat window
        }
        setIsOpen(!isOpen);
    };

    const chat = async (event) => {
        event.preventDefault();
        console.log('Form submitted');
        if (!message) {
            console.log('No message to send');
            return;
        }

        setIsTyping(true);
        const updatedChats = [...chats, { role: "user", content: message }];
        setChats(updatedChats);

        try {
            console.log('Sending message:', message);
            const response = await axios.post('http://localhost:5328/api/process_question', { question: message });
            console.log("Received response:", response.data);
            setChats(currentChats => [...currentChats, { role: "Liang's assistant", content: response.data.answer }]);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsTyping(false);
            setMessage(''); // Clear the message input after sending
        }
    };

    return (
        <div className="chat-container">
            <button onClick={toggleChat} className={`toggle-chat-btn ${isOpen ? '' : 'hidden'}`}>
                <MdChat size={30} color="white" />
            </button>

            {isOpen && (
                <div className="chat-window">
                    <button onClick={toggleChat} className="close-btn">X</button>
                    <h1 className="chat-title">Ask me about Liang Ou</h1>
                    <div className="messages">
                        {chats.map((chat, index) => (
                            <p key={index} className={chat.role === "user" ? "user-msg" : "assistant-msg"}>
                                <b>{chat.role.toUpperCase()}</b>: {chat.content}
                            </p>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    {isTyping && <p className="typing-indicator">Typing...</p>}
                    <form onSubmit={chat} className="chat-form">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message here and hit Enter..."
                        />
                        {/* <button type="submit">Send</button> */}
                    </form>
                </div>
            )}
        </div>
    );
}

export default Chatbot;
