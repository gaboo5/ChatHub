// src/components/InstagramChat.jsx
import { useState, useEffect, useMemo } from "react";

const mockMessages = [
    { id: 1, user: 'sofia_ig', text: 'Hola!! ¿Cómo estás?', timestamp: new Date().toISOString() },
    { id: 2, user: 'juan_dev', text: 'JAJAJAJ', timestamp: new Date(Date.now() - 60000).toISOString() },
    { id: 3, user: 'sofia_ig', text: '¿Qué haces?', timestamp: new Date(Date.now() - 120000).toISOString() }, // Mensaje adicional del mismo usuario
    { id: 4, user: 'meme_master', text: 'Viste el nuevo reel?', timestamp: new Date(Date.now() - 180000).toISOString() },
    { id: 5, user: 'sofia_ig', text: 'Hablamos luego!', timestamp: new Date(Date.now() - 240000).toISOString() }, // Otro mensaje del mismo usuario
];

export default function InstagramChat() {
    const [messages, setMessages] = useState([]);
    const [counter, setCounter] = useState(0);

    // Lógica para simular llegada de mensajes
    useEffect(() => {
        const interval = setInterval(() => {
           if (counter < mockMessages.length) {
            setMessages(prev => [...prev, mockMessages[counter]]);
            setCounter(prev => prev + 1);
           } 
        }, 3000); // cada 3 segundos llega nuevo mensaje
        return () => clearInterval(interval);
    }, [counter]);

    // Función para agrupar mensajes por usuario (similar a UnifiedChat)
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
        <div style={{
            padding: '1rem',
            backgroundColor: '#fafafa',
            borderRadius: '8px',
            maxWidth: '600px',
            margin: 'auto',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}>
            <h2>📸 Instagram Chat</h2>
            <div style={{
                marginTop: '1rem',
                maxHeight: '500px',
                overflowY: 'auto',
                border: '1px solid #ddd',
                padding: '0.5rem',
                borderRadius: '4px',
            }}>
                {/* Renderizar mensajes agrupados */}
                {Object.entries(groupedMessages).map(([user, userMessages]) => (
                    <div key={user} style={{
                        marginBottom: '1rem',
                        padding: '0.5rem',
                        backgroundColor: '#fff',
                        borderRadius: '6px',
                        border: '1px solid #eee',
                    }}>
                        <strong style={{ color: '#4B5563', marginBottom: '0.3rem', display: 'block' }}>
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