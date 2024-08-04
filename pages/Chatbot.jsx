// pages/Chatbot.jsx
import React, { useEffect } from 'react';

const Chatbot = () => {
    useEffect(() => {
        // Append the Dialogflow widget script to the document head
        const script = document.createElement('script');
        script.src = "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js";
        script.async = true;
        document.head.appendChild(script);

        // Append the Dialogflow widget stylesheet to the document head
        const link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css";
        document.head.appendChild(link);
    }, []);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <df-messenger
                project-id="tutorial1-431206"
                agent-id="d8a01e06-8969-4c7d-8d7a-1b5fa88433bc"
                language-code="en"
                max-query-length="-1"
                style={{
                    '--df-messenger-font-color': '#000',
                    '--df-messenger-font-family': 'Google Sans',
                    '--df-messenger-chat-background': '#f3f6fc',
                    '--df-messenger-message-user-background': '#d3e3fd',
                    '--df-messenger-message-bot-background': '#fff'
                }}
            >
                <df-messenger-chat-bubble chat-title="Liang's Assistant" className="text-black"></df-messenger-chat-bubble>
            </df-messenger>
        </div>
    );
};

export default Chatbot;
