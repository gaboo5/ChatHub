// src/components/WhatsappChat.jsx
import { useState, useEffect, useMemo } from "react";

const mockMessages = [
    { id: 1, user: 'lucas_wh', text: 'Te mando el archivo por acá', timestamp: new Date().toISOString() },
    { id: 2, user: 'ana_wh', text: 'Gracias!', timestamp: new Date(Date.now() - 60000).toISOString() },
    { id: 3, user: 'lucas_wh', text: '¿Lo recibiste?', timestamp: new Date(Date.now() - 120000).toISOString() }, // Mensaje adicional
    { id: 4, user: 'pedro_wh', text: 'Ya lo descargué', timestamp: new Date(Date.now() - 180000).toISOString() },
    { id: 5, user: 'lucas_wh', text: 'Perfecto!', timestamp: new Date(Date.now() - 240000).toISOString() }, // Otro mensaje
];

export default function WhatsappChat() {
    const [messages, setMessages] = useState([]);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
           if (counter < mockMessages.length) {
            setMessages(prev => [...prev, mockMessages[counter]]);
            setCounter(prev => prev + 1);
           }
        }, 3000);
        return () => clearInterval(interval);
    }, [counter]);

    // Agrupar mensajes por usuario
    const groupedMessages = useMemo(() => {
        const groups = {};
        messages.forEach(msg => {
            if (!groups[msg.user]) {
                groups[msg.user] = [];
            }
            groups[msg.user].push(msg);
        });
        return groups;
    }, [messages]);

    return (
        <div style={{ padding: '1rem', maxWidth: '600px', margin: 'auto' }}>
            <h2>💬 Whatsapp Chat</h2>
            <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', backgroundColor: '#f0f8ff' }}>
                {/* Renderizar mensajes agrupados */}
                {Object.entries(groupedMessages).map(([user, userMessages]) => (
                    <div key={user} style={{
                        marginBottom: '1rem',
                        padding: '0.5rem',
                        backgroundColor: '#e1ffc7',
                        borderRadius: '6px',
                        border: '1px solid #c3e6cb',
                    }}>
                        <strong style={{ color: '#155724', marginBottom: '0.3rem', display: 'block' }}>
                            {user}
                        </strong>
                        <div style={{ paddingLeft: '0.5rem' }}>
                            {userMessages.map(msg => (
                                <div key={msg.id} style={{
                                    marginBottom: '0.3rem',
                                    padding: '0.2rem',
                                    fontSize: '0.9rem',
                                }}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}