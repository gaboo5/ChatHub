// src/components/MessengerChat.jsx
import { useState, useEffect, useMemo } from "react";

const mockMessages = [
    { id: 1, user: 'carla_msn', text: 'Nos vemos a las 18!', timestamp: new Date().toISOString() },
    { id: 2, user: 'diego_msn', text: 'Perfecto, ahí estaré', timestamp: new Date(Date.now() - 60000).toISOString() },
    { id: 3, user: 'carla_msn', text: '¿Llevas la cámara?', timestamp: new Date(Date.now() - 120000).toISOString() }, // Mensaje adicional
    { id: 4, user: 'laura_msn', text: 'Yo también voy!', timestamp: new Date(Date.now() - 180000).toISOString() },
    { id: 5, user: 'carla_msn', text: 'Genial, nos vemos allá', timestamp: new Date(Date.now() - 240000).toISOString() }, // Otro mensaje
];

export default function MessengerChat() {
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
            backgroundColor: '#f0f2f5',
            borderRadius: '8px',
            maxWidth: '600px',
            margin: 'auto',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}>
            <h2>📨 Messenger Chat</h2>
            <div style={{
                marginTop: '1rem',
                maxHeight: '500px',
                overflowY: 'auto',
                border: '1px solid #ccd0d5',
                padding: '0.5rem',
                borderRadius: '4px',
                backgroundColor: '#ffffff',
            }}>
                {/* Renderizar mensajes agrupados */}
                {Object.entries(groupedMessages).map(([user, userMessages]) => (
                    <div key={user} style={{
                        marginBottom: '1rem',
                        padding: '0.5rem',
                        backgroundColor: '#e4e6eb',
                        borderRadius: '6px',
                        border: '1px solid #ccd0d5',
                    }}>
                        <strong style={{ color: '#050505', marginBottom: '0.3rem', display: 'block' }}>
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