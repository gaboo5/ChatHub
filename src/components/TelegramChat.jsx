// src/components/TelegramChat.jsx
import { useState, useEffect, useMemo } from "react";

const mockMessages = [
    { id: 1, user: 'bot_telegram', text: 'Tu código de verificación es 123456', timestamp: new Date().toISOString() },
    { id: 2, user: 'soporte_tg', text: '¿En qué puedo ayudarte?', timestamp: new Date(Date.now() - 60000).toISOString() },
    { id: 3, user: 'bot_telegram', text: 'Recordatorio: Tu sesión expira en 10 minutos', timestamp: new Date(Date.now() - 120000).toISOString() }, // Mensaje adicional del mismo usuario
    { id: 4, user: 'usuario_tg', text: 'Tengo un problema con mi cuenta', timestamp: new Date(Date.now() - 180000).toISOString() },
    { id: 5, user: 'soporte_tg', text: 'Por favor, describe el problema con más detalle', timestamp: new Date(Date.now() - 240000).toISOString() }, // Otro mensaje del mismo usuario
];

export default function TelegramChat() {
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
            backgroundColor: '#f0f8ff',
            borderRadius: '8px',
            maxWidth: '600px',
            margin: 'auto',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}>
            <h2>🚀 Telegram Chat</h2>
            <div style={{
                marginTop: '1rem',
                maxHeight: '500px',
                overflowY: 'auto',
                border: '1px solid #a0d2ff',
                padding: '0.5rem',
                borderRadius: '4px',
                backgroundColor: '#e6f7ff',
            }}>
                {/* Renderizar mensajes agrupados */}
                {Object.entries(groupedMessages).map(([user, userMessages]) => (
                    <div key={user} style={{
                        marginBottom: '1rem',
                        padding: '0.5rem',
                        backgroundColor: '#ffffff',
                        borderRadius: '6px',
                        border: '1px solid #a0d2ff',
                    }}>
                        <strong style={{ color: '#1890ff', marginBottom: '0.3rem', display: 'block' }}>
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