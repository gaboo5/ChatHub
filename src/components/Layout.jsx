import { useState, useEffect } from 'react';
import InstagramChat from './InstagramChat';
import WhatsappChat from './WhatsappChat';
import MessengerChat from './MessengerChat';
import TelegramChat from './TelegramChat';
import UnifiedChat from './UnifiedChat'; 
import messages from '../data/messages.json';

export default function Layout({ onSelectPlatform, selectedPlatform }) {
    const [liveMessages, setLiveMessages] = useState(messages);
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Aplicar el modo oscuro - Efecto principal
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        // Guardar en localStorage
        localStorage.setItem('darkMode', darkMode.toString());
    }, [darkMode]);

    // Cargar el modo oscuro al iniciar
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            const isDark = savedMode === 'true';
            setDarkMode(isDark);
            // Aplicar al DOM inmediatamente
            if (isDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        } else {
            // Opcional: detectar preferencia del sistema
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setDarkMode(prefersDark);
            if (prefersDark) {
                document.documentElement.classList.add('dark');
            }
        }
    }, []);

    // Mensajes automáticos
    useEffect(() => {
        const interval = setInterval(() => {
            const platforms = ['Instagram', 'Whatsapp', 'Messenger', 'Telegram'];
            const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
            const newMsg = {
                user: `auto_${randomPlatform.toLowerCase()}`,
                text: `Mensaje automático ${Math.floor(Math.random() * 1000)}`,
                platform: randomPlatform,
                timestamp: new Date().toISOString()
            };
            setLiveMessages(prev => [...prev, newMsg]);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const filteredMessages = selectedPlatform && selectedPlatform !== 'Unificado'
        ? liveMessages.filter(msg => msg.platform === selectedPlatform)
        : liveMessages;

    const renderChat = () => {
        switch (selectedPlatform) {
            case 'Instagram':
                return <InstagramChat />;
            case 'Whatsapp':
                return <WhatsappChat />;
            case 'Messenger':
                return <MessengerChat />;
            case 'Telegram':
                return <TelegramChat />;
            case 'Unificado':
                return <UnifiedChat messages={filteredMessages} />;
            default:
                return (
                    <div className="flex items-center justify-center h-full p-8">
                        <div className="text-center bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                Bienvenido a 3NGTech
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Selecciona una plataforma para comenzar
                            </p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans transition-colors duration-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            
            {/* Header */}
            <header className="flex items-center justify-between bg-red-600 px-4 py-3 shadow">
                <div className="flex items-center gap-2">
                    <span className="text-white text-2xl font-bold">⚡ 3NGTech</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            const newMode = !darkMode;
                            setDarkMode(newMode);
                        }}
                        className="text-white text-sm bg-black/20 px-3 py-1 rounded-full hover:bg-black/30 transition"
                    >
                        {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
                    </button>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-white text-xl focus:outline-none"
                    >
                        ☰
                    </button>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside
                    className={`bg-white dark:bg-gray-900 w-64 p-4 space-y-2 shadow-md transition-transform duration-300
                        ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
                        md:translate-x-0 md:block fixed md:relative z-10 h-full`}
                >
                    {['Instagram', 'Whatsapp', 'Messenger', 'Telegram', 'Unificado'].map(platform => (
                        <button
                            key={platform}
                            onClick={() => {
                                onSelectPlatform(platform);
                                setMenuOpen(false);
                            }}
                            className={`w-full px-4 py-2 rounded-full text-sm transition
                                ${selectedPlatform === platform 
                                    ? 'bg-red-600 text-white' 
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-[#333]'
                                }`}
                        >
                            {platform}
                        </button>
                    ))}
                    <button
                        onClick={() => {
                            onSelectPlatform(null);
                            setMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-[#333] transition"
                    >
                        Mostrar todos
                    </button>
                </aside>

                {/* Main content */}
                <main className="flex-1 p-6 overflow-y-auto md:ml-64 bg-gray-100 dark:bg-gray-800">
                    {renderChat()}
                </main>
            </div>
        </div>
    );
}