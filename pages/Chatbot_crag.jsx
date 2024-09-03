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
            const response = await axios.post('http://127.0.0.1:5005/crag', { input: message }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log("Received response:", response.data);
            setChats(currentChats => [...currentChats, { role: "Liang's assistant", content: response.data.response }]);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsTyping(false);
            setMessage(''); // Clear the message input after sending
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
            <button
                onClick={toggleChat}
                className={`bg-blue-600 rounded-full p-4 shadow-lg transform transition-transform ${isOpen ? 'scale-0' : 'scale-100'}`}
            >
                <MdChat size={30} color="white" />
            </button>

            {isOpen && (
                <div className="bg-white rounded-lg shadow-lg p-4 w-80 h-96 flex flex-col mt-2">
                    <button onClick={toggleChat} className="self-end text-gray-600 hover:text-gray-900 transition-colors">
                        &times;
                    </button>
                    <h1 className="text-xl font-semibold text-center mb-4">Ask me about Liang Ou</h1>
                    <div className="flex-1 overflow-y-auto mb-4">
                        {chats.map((chat, index) => (
                            <p key={index} className={`p-2 rounded-lg mb-2 ${chat.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"}`}>
                                <b>{chat.role.toUpperCase()}</b>: {chat.content}
                            </p>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    {isTyping && <p className="italic text-center mb-2">Typing...</p>}
                    <form onSubmit={chat} className="flex items-center">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message here..."
                            className="flex-1 border border-gray-300 rounded-lg p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button type="submit" className="bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 transition-colors">
                            Send
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Chatbot;
