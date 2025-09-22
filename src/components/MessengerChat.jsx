import { useState, useEffect } from "react";

const mockMessages = [
    { id: 1, user: 'sofia_ig', text: 'Hola!! ¿Cómo estás?' },
    { id: 2, user: 'juan_dev', text: 'JAJAJAJ' },
    { id: 3, user: 'meme_master', text: 'Viste el nuevo reel?' },
];

export default function MessengerChat() {
    const [messages, setMessages] = useState([]);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
           if (counter < mockMessages.length) {
            setMessages(prev => [...prev, mockMessages[counter]]);
            setCounter(prev => prev + 1);
           } 
        }, 3000); // cada 3 segundos llega nuevo mensaje
        return () => clearInterval(interval);
    }, [counter]);
    return (
        <div style={{ padding: '1rem'}}>
            <h2>📘 Messenger Chat </h2>
            <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px'}}>
                {messages.map(msg => (
                    <div key={msg.id}>
                    <strong>{msg.user}:</strong> {msg.text}
                    </div>
                ))}
            </div>
        </div>
    );
}