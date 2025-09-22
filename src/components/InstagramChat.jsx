import { useState, useEffect } from "react";

const mockMessages = [
    { id: 1, user: 'sofia_ig', text: 'Hola!! ¿Cómo estás?' },
    { id: 2, user: 'juan_dev', text: 'JAJAJAJ' },
    { id: 3, user: 'meme_master', text: 'Viste el nuevo reel?' },
];

export default function InstagramChat() {
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
        <div style={styles.container}>
            <h2> Instagram Chat </h2>
            <div style={styles.chatBox}>
                {messages.map(msg => (
                    <div hey={msg.id} style={styles.message}>
                        <strong> {msg.user}:</strong> {msg.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '1rem',
        backgroundColor: '#fafafa',
        borderRadius: '8px',
        maxWith: '400px',
        margin: 'auto',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    chatBox: {
        marginTop: '1rem',
        maxHeight: '300px',
        overflowY: 'auto',
        border: '1px solid #ddd',
        padding: '0.5rem',
        borderRadius: '4px',
    },
    message: {
        marginBottom: '0.5rem',
        padding: '0.3rem',
        backgroundColor: '#fff',
        borderRadius: '4px',
        border: '1px solid #eee',
    },
};

<div className="bg-green-500 text-white p-4 rounded">
  Tailwind está funcionando 🎉
</div>
